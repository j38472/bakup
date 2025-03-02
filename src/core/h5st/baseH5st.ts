/**
 * File: baseH5st.ts
 * Description: h5st 加签算法通用父类
 * Author: zhx47
 */

import * as CryptoJS from 'crypto-js';
import { Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Cache } from 'nestjs-cache-manager-v6';
import { H5stInitConfig } from './config';
import { CANVAS_FP, STORAGE_FP_KEY, STORAGE_TOKEN_KEY, WEBGL_FP } from './constant';
import { defaultAlgorithmType, EnvCollectType, ErrCodes, H5stAlgoConfigType, H5stSignParamsType, H5stSignResultType, KVType, SignAlgorithmType } from './type';
import { BaseLocalToken } from '../token';
import { CustomAlgorithm } from '../algorithm';
import {
  containsReservedParamName,
  decodeBase64URL,
  filterCharactersFromString,
  formatDate,
  getRandomIDPro,
  getRandomInt10,
  isEmpty,
  isNullOrUndefined,
  isPlainObject,
  isSafeParamValue,
  selectRandomElements,
} from '../../utils/baseUtils';
import { BusinessError } from '../../utils/error';

export class BaseH5st {
  protected readonly logger: Logger;
  protected readonly defaultAlgorithm: defaultAlgorithmType;

  constructor(
    protected readonly clsService: ClsService,
    protected readonly cacheManager: Cache,
    protected readonly algos: CustomAlgorithm,
    protected readonly h5stVersion: string,
    protected readonly h5stAlgoConfig: H5stAlgoConfigType,
    protected readonly localToken: BaseLocalToken,
  ) {
    this.defaultAlgorithm = {
      local_key_1: (message: CryptoJS.lib.WordArray | string) => this.algos.MD5(message),
      local_key_2: (message: CryptoJS.lib.WordArray | string) => this.algos.SHA256(message),
      local_key_3: (message: CryptoJS.lib.WordArray | string, key: CryptoJS.lib.WordArray | string) => this.algos.HmacSHA256(message, key),
    };

    this.logger = new Logger(`H5st${h5stVersion}`);
  }

  /**
   * 打印调试日志（需要将settings.debug设置成true）
   * @param {string} message 调试日志
   */
  _log(message: string): void {
    if (this.clsService.get('h5stContext._debug')) {
      this.logger.log(message);
    }
  }

  /**
   * 缓存信息
   * @param {string} key key
   * @param {string} value value
   * @param {number} expire 过期时间
   */
  async setSync(key: string, value: string, expire: number): Promise<void> {
    const { pt_pin } = this.clsService.get('h5stContext');
    if (pt_pin) {
      await this.cacheManager.set(`${pt_pin}_${key}`, value, expire);
    }
  }

  /**
   * 获取缓存信息
   * @param {string} key key
   * @returns {string} value
   */
  async getSync(key: string): Promise<string> {
    const { pt_pin } = this.clsService.get('h5stContext');
    if (pt_pin) {
      return await this.cacheManager.get(`${pt_pin}_${key}`);
    }
    return null;
  }

  /**
   * 初始化
   * @param {H5stInitConfig} config
   */
  __iniConfig(config: H5stInitConfig): void {
    if ('string' !== typeof config.appId || !config.appId) {
      this.logger.error('settings.appId must be a non-empty string');
    }
    const appId = config.appId || '';
    if (appId) {
      // fp 大版本一致，但是 token 小版本不一致，区分
      this.clsService.set('h5stContext._storageFpKey', `${STORAGE_FP_KEY}_${appId}_${this.h5stAlgoConfig.version}`);
      this.clsService.set('h5stContext._storageTokenKey', `${STORAGE_TOKEN_KEY}_${appId}_${this.h5stVersion}`);
    }

    this.clsService.set('h5stContext._debug', Boolean(config.debug));
    this.clsService.set('h5stContext._appId', appId);

    this.clsService.set('h5stContext._version', this.h5stAlgoConfig.version);
    this.clsService.set('h5stContext.genLocalTK', this.h5stAlgoConfig.genLocalTK);
    this.clsService.set('h5stContext.customAlgorithm', this.h5stAlgoConfig.customAlgorithm);

    if (this.h5stAlgoConfig.version.includes('3.1.0')) {
      // 3.1 localTk中的参数是变化量，未写死
      const randomIDPro = getRandomIDPro({ size: 32, dictType: 'max' });
      const prefix = randomIDPro.slice(0, 2);
      const secret1 = randomIDPro.slice(0, 12);
      this.clsService.set('h5stContext.genLocalTK.cipher.prefix', prefix);
      this.clsService.set('h5stContext.genLocalTK.cipher.secret1', secret1);
    }

    this._log(`create instance with appId=${appId}`);
  }

  /**
   * 生成默认的签名key，在无algo信息或者lite算法才会调用
   * @param {string} token token
   * @param {string} fingerprint fp指纹
   * @param {string} time yyyyMMddhhmmssSSS 时间 + 随机字符串
   * @param {string} appId 应用ID
   * @returns {string} 签名key
   */
  __genDefaultKey(token: string, fingerprint: string, time: string, appId: string): string {
    const input = `${token}${fingerprint}${time}${appId}${this.h5stAlgoConfig.defaultKey.extend}`,
      express = this.algos.enc.Utf8.stringify(this.algos.enc.Base64.parse(decodeBase64URL(this.__parseToken(token, 16, 28)))),
      expressMatch = /^[123]([x+][123])+/.exec(express);
    let key = '';
    if (expressMatch) {
      const expressHit = expressMatch[0].split('');
      let keyRouter = '';
      expressHit.forEach((router: string) => {
        if (isNaN(Number(router))) {
          if (['+', 'x'].includes(router)) keyRouter = router;
        } else {
          const algoKey = `local_key_${router}`;
          if (this.defaultAlgorithm[algoKey]) {
            switch (keyRouter) {
              case '+':
                key = `${key}${this.__algorithm(algoKey, input, token)}`;
                break;
              case 'x':
                key = this.__algorithm(algoKey, key, token);
                break;
              default:
                key = this.__algorithm(algoKey, input, token);
            }
          }
        }
      });
    }
    this._log(`__genDefaultKey input=${input},express=${express},key=${key}`);
    return key;
  }

  /**
   * 配合__genDefaultKey的通用加密方法
   * @param {string} algoKey 默认加密方法key
   * @param {string} input 加密信息1
   * @param {string} token 加密信息2
   * @returns {string} 密文
   */
  __algorithm(algoKey: string, input: string, token: string): string {
    const defaultAlgorithm = this.defaultAlgorithm;

    if (algoKey === 'local_key_3') {
      return defaultAlgorithm[algoKey](input, token).toString(this.algos.enc.Hex);
    } else if (algoKey === 'local_key_1' || algoKey === 'local_key_2') {
      return defaultAlgorithm[algoKey](input).toString(this.algos.enc.Hex);
    } else {
      throw new Error('Unsupported algorithm key');
    }
  }

  /**
   * slice切分token
   * @param {string} token
   * @param {number} begin
   * @param {number} end
   * @returns {string}
   */
  __parseToken(token: string, begin: number, end: number): string {
    return token ? token.slice(begin, end) : '';
  }

  /**
   * 组装H5ST签名
   * @param {string} bodySign
   * @param {number} timestamp
   * @param {string} timeStr yyyyMMddhhmmssSSS日期
   * @param {string} envSign
   * @param signStrDefault
   * @returns {string}
   */
  __genSignParams(bodySign: string, timestamp: number, timeStr: string, envSign: string, signStrDefault?: string): string {
    const { _fingerprint, _appId, _isNormal, _token, _defaultToken, _version } = this.clsService.get('h5stContext');
    signStrDefault = signStrDefault ? `;${signStrDefault}` : '';
    return `${timeStr};${_fingerprint};${_appId};${_isNormal ? _token : _defaultToken};${bodySign};${_version};${timestamp};${envSign}${signStrDefault}`;
  }

  /**
   * 生成sign (每个版本不一致，需要自定义实现)
   * @param {string} key __genDefaultKey或者__genKey结果
   * @param {object} body 请求体
   * @returns {string}
   */
  __genSign(key: string, body: KVType[]): string {
    const signAlgorithmType = this.h5stAlgoConfig.signAlgorithmType,
      paramsStr = body
        .map((item: KVType) => {
          return item.key + ':' + item.value;
        })
        .join('&');
    let signedStr: string;
    if (signAlgorithmType == SignAlgorithmType.MD5_WRAP) {
      signedStr = this.algos.MD5(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    } else if (signAlgorithmType == SignAlgorithmType.SHA256_WRAP) {
      signedStr = this.algos.SHA256(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    } else if (signAlgorithmType == SignAlgorithmType.HMAC_SHA256_WRAP) {
      signedStr = this.algos.HmacSHA256(paramsStr, key).toString(this.algos.enc.Hex);
    } else {
      throw new BusinessError('未指定加密模式或者不兼容的加密模式');
    }
    this._log(`__genSign, paramsStr:${paramsStr}, signedStr:${signedStr}`);
    return signedStr;
  }

  /**
   * 4.7.4新增
   * @param key
   * @param body
   */
  __genSignDefault(key: string, body: KVType[]): string {
    const signAlgorithmType = this.h5stAlgoConfig.signAlgorithmType,
      paramsStr = body
        .filter((item) => item.key === 'functionId' || item.key === 'appid')
        .map((item: KVType) => {
          return item.key + ':' + item.value;
        })
        .join('&');
    let signedStr: string;
    if (signAlgorithmType == SignAlgorithmType.MD5_WRAP) {
      signedStr = this.algos.MD5(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    } else if (signAlgorithmType == SignAlgorithmType.SHA256_WRAP) {
      signedStr = this.algos.SHA256(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    } else if (signAlgorithmType == SignAlgorithmType.HMAC_SHA256_WRAP) {
      signedStr = this.algos.HmacSHA256(paramsStr, key).toString(this.algos.enc.Hex);
    } else {
      throw new BusinessError('未指定加密模式或者不兼容的加密模式');
    }
    this._log(`__genSign, paramsStr:${paramsStr}, signedStr:${signedStr}`);
    return signedStr;
  }

  /**
   * 获取依赖信息（LITE仅获取fp， 非LITE算法需要请求algo接口获取tk和__genKey算法）
   * @returns {void}
   */
  async __requestDeps(): Promise<void> {
    this._log('__requestDeps start.');
    let fingerprint = await this.getSync(this.clsService.get('h5stContext._storageFpKey'));
    if (fingerprint) {
      this._log(`__requestDeps use cache fp, fp:${fingerprint}`);
    } else {
      fingerprint = this.generateVisitKey();
      await this.setSync(this.clsService.get('h5stContext._storageFpKey'), fingerprint, 3600 * 24 * 365 * 1000);
      this._log(`__requestDeps use new fp, fp:${fingerprint}`);
    }
    this.clsService.set('h5stContext._fingerprint', fingerprint);
    this._log('__requestDeps end.');
  }

  /**
   * 检测参数
   * @param {object} body
   * @returns {object|null} 需要参与签名的参数
   */
  __checkParams(body: H5stSignParamsType): KVType[] | null {
    const appId = this.clsService.get('h5stContext._appId');
    let errorInfo: {
      code: ErrCodes;
      message: string;
    } = null;
    if (!appId) {
      errorInfo = {
        code: ErrCodes.APPID_ABSENT,
        message: 'appId is required',
      };
    }
    if (!isPlainObject(body)) {
      errorInfo = {
        code: ErrCodes.UNSIGNABLE_PARAMS,
        message: 'params is not a plain object',
      };
    }
    if (isEmpty(body)) {
      errorInfo = {
        code: ErrCodes.UNSIGNABLE_PARAMS,
        message: 'params is empty',
      };
    }
    if (containsReservedParamName(body)) {
      errorInfo = {
        code: ErrCodes.UNSIGNABLE_PARAMS,
        message: 'params contains reserved param name.',
      };
    }
    if (errorInfo) {
      throw new BusinessError(errorInfo.message);
    }
    const checkParams = Object.keys(body)
      .sort()
      .map(function (key: string): KVType {
        return {
          key: key,
          value: body[key as keyof H5stSignParamsType],
        };
      })
      .filter(function (obj: KVType) {
        return isSafeParamValue(obj.value);
      });

    if (checkParams.length === 0) {
      throw new BusinessError('在校验参数过程中，所有的参数都被丢弃了');
    }
    return checkParams;
  }

  /**
   * h5st 加签
   * @param params 需要参与加签的请求内容，已格式化为 key - value 格式
   * @param envSign env 加密字符串
   */
  __makeSign(params: KVType[], envSign: string): H5stSignResultType {
    const appId = this.clsService.get('h5stContext._appId'),
      fingerprint = this.clsService.get('h5stContext._fingerprint'),
      extendDateStr = this.h5stAlgoConfig.makeSign.extendDateStr;

    const now = Date.now(),
      dateStr = formatDate(now, 'yyyyMMddhhmmssSSS'),
      dateStrExtend = dateStr + extendDateStr;

    const defaultToken = this.localToken.genLocalTK(fingerprint);

    const key = this.__genDefaultKey(defaultToken, fingerprint, dateStrExtend, appId);
    this.clsService.set('h5stContext._defaultToken', defaultToken);

    if (!key) {
      return {};
    }
    const signStr = this.__genSign(key, params);
    const stk = params
      .map((item: KVType) => {
        return item.key;
      })
      .join(',');

    // 4.7.4 新增
    let signStrDefault = '';
    if (this.h5stAlgoConfig.genSignDefault) {
      signStrDefault = this.__genSignDefault(key, params);
    }

    const h5st = this.__genSignParams(signStr, now, dateStr, envSign, signStrDefault);

    this._log(
      '__makeSign, result:' +
        JSON.stringify(
          {
            key: key,
            signStr: signStr,
            _stk: stk,
            _ste: 1,
            h5st: h5st,
          },
          null,
          2,
        ),
    );
    return {
      _stk: stk,
      _ste: 1,
      h5st: h5st,
    };
  }

  /**
   * 收集环境信息，env 加密
   */
  async __collect() {
    const fingerprint = this.clsService.get('h5stContext._fingerprint');

    const env = await this.envCollect();
    env.fp = fingerprint;
    const envStr = JSON.stringify(env, null, 2);
    this._log(`__collect envCollect=${envStr}`);
    return this.envSign(envStr);
  }

  /**
   * h5st 加签入口
   */
  async sign(params: H5stSignParamsType, h5stInitConfig: H5stInitConfig, envSignStr?: string): Promise<H5stSignParamsType & H5stSignResultType> {
    const start = Date.now();
    this.__iniConfig(Object.assign({}, new H5stInitConfig(), h5stInitConfig));
    if (envSignStr) {
      this.envDecrypt(envSignStr);
    }

    const keys = this.clsService.get('h5stContext.stk');
    const filterParams: H5stSignParamsType = {};
    keys.forEach((key) => {
      let value = params[key as keyof H5stSignParamsType];
      if (value != undefined) {
        if (key === 'body') {
          value = CryptoJS.SHA256(value).toString();
        }
        filterParams[key as keyof H5stSignParamsType] = value;
      }
    });

    const checkParams = this.__checkParams(filterParams);
    if (checkParams == null) {
      return filterParams;
    }
    await this.__requestDeps();
    const envSign = await this.__collect();
    const makeSign = this.__makeSign(checkParams, envSign);
    this._log(`sign elapsed time!${Date.now() - start}ms`);
    return Object.assign({}, filterParams, makeSign);
  }

  /**
   * 收集环境信息
   * @returns {EnvCollectType}
   */
  async envCollect(): Promise<EnvCollectType> {
    const envExtend = this.clsService.get('h5stContext.envExtend'),
      randomLength = this.h5stAlgoConfig.env.randomLength;

    return this.coverEnv(envExtend, envExtend?.random?.length ?? randomLength);
  }

  /**
   * 生成fp
   * @returns {string}
   */
  generateVisitKey(): string {
    const { seed, selectLength, randomLength } = this.h5stAlgoConfig.visitKey;

    const selectedChars = selectRandomElements(seed, selectLength);
    const random = getRandomInt10();
    const filteredChars = filterCharactersFromString(seed, selectedChars);
    const combinedString =
      getRandomIDPro({
        size: random,
        customDict: filteredChars,
      }) +
      selectedChars +
      getRandomIDPro({
        size: randomLength - random,
        customDict: filteredChars,
      }) +
      random;
    return this.convertVisitKey(combinedString);
  }

  convertVisitKey(combinedString: string): string {
    if (this.h5stAlgoConfig.version.includes('3.1.0')) {
      const charArray = combinedString.split('');
      const finalArray = [];
      for (; charArray.length > 0; ) finalArray.push(9 - parseInt(charArray.pop()));
      return finalArray.join('');
    }

    const { convertLength } = this.h5stAlgoConfig.visitKey;

    const charArray = combinedString.split('');
    const firstPartArray = charArray.slice(0, convertLength);
    const secondPartArray = charArray.slice(convertLength);
    let finalArray = [];
    for (; firstPartArray.length > 0; ) finalArray.push((35 - parseInt(firstPartArray.pop(), 36)).toString(36));
    finalArray = finalArray.concat(secondPartArray);
    return finalArray.join('');
  }

  /**
   * env 加密
   */
  envSign(message: string): string {
    // 4.8.1开始不在使用AES算法，借助 Hex 魔改参数定位
    if (!isNullOrUndefined(this.h5stAlgoConfig.customAlgorithm?.convertIndex?.hex)) {
      return this.algos.enc.Base64.encode(this.algos.enc.Utf8.parse(message));
    }

    const secret = this.h5stAlgoConfig.env.secret;
    const temp = this.algos.AES.encrypt(message, secret, {
      iv: this.algos.enc.Utf8.parse('0102030405060708'),
    });

    // 这里从 4.7 开始会将 AES 加密结果通过自定义的 Base64.encode 编码
    if (this.h5stAlgoConfig.customAlgorithm?.map) {
      return this.algos.enc.Base64.encode(temp.ciphertext);
    }

    return temp.ciphertext.toString();
  }

  /**
   * Env 解密，并且存入当前上下文，用于后续生成新的 Env
   * @param envSign Env密文
   */
  envDecrypt(envSign: string) {
    try {
      let envDecrypt: string;
      // 4.8.1开始不在使用AES算法，借助 Hex 魔改参数定位
      if (!isNullOrUndefined(this.h5stAlgoConfig.customAlgorithm?.convertIndex?.hex)) {
        const wordArray = this.algos.enc.Base64.decode(envSign);
        envDecrypt = this.algos.enc.Utf8.stringify(wordArray);
      } else {
        const secret = this.h5stAlgoConfig.env.secret;
        const decrypt = this.algos.AES.decrypt(
          this.algos.lib.CipherParams.create({
            ciphertext: this.h5stAlgoConfig.customAlgorithm?.map ? this.algos.enc.Base64.decode(envSign) : this.algos.enc.Hex.parse(envSign),
          }),
          secret,
          { iv: this.algos.enc.Utf8.parse('0102030405060708') },
        );
        envDecrypt = decrypt.toString(this.algos.enc.Utf8);
        const salt = this.h5stAlgoConfig.customAlgorithm?.salt;
        if (salt && envDecrypt.endsWith(salt)) {
          envDecrypt = envDecrypt.slice(0, -salt.length);
        }
      }
      this.clsService.set('h5stContext.envExtend', JSON.parse(envDecrypt));
    } catch (error) {
      throw new BusinessError(`h5st解析失败，请确定提供的h5st与version匹配！${(error as Error).message}`);
    }
  }

  /**
   * 将接口提供的 Env 对象进行部分变量的针对应覆盖，生成一个新的 Env 对象
   * @param envExtend 接口提供的官方生成的 Env 解密对象
   * @param randomLength extend.random 的长度
   * @returns 新的 Env 对象
   */
  private async coverEnv(envExtend: EnvCollectType, randomLength: number): Promise<EnvCollectType> {
    const { pt_pin, userAgent } = this.clsService.get('h5stContext');

    const canvas = await this.getCanvasFp(),
      webglFp = await this.getWebgFp();

    const updateEnv: EnvCollectType = {
      pp: (() => {
        const ptPin = pt_pin;
        if (ptPin) {
          return {
            p1: ptPin,
          };
        }
        return {};
      })(),
      random: getRandomIDPro({ size: randomLength, dictType: 'max' }),
      sua: (() => {
        const regex = new RegExp('Mozilla/5.0 \\((.*?)\\)');
        const matches = regex.exec(userAgent);
        return matches?.[1] ?? '';
      })(),
      canvas: canvas,
      canvas1: canvas,
      webglFp: webglFp,
      webglFp1: webglFp,
    };

    if (envExtend) {
      Object.keys(envExtend).forEach((key: keyof EnvCollectType) => {
        if (updateEnv[key] !== undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          envExtend[key] = updateEnv[key];
        }
      });
    } else {
      envExtend = {
        ...updateEnv,
        extend: {
          wd: 0,
          l: 0,
          ls: 5,
          wk: 0,
          bu1: '0.1.6',
          bu2: -1,
          bu3: 36,
          bu4: 0,
          bu5: 0,
          bu6: 33,
          bu7: '',
          bu8: 0,
        },
        v: this.h5stAlgoConfig.env.fv,
        fp: this.clsService.get('h5stContext._fingerprint'),
      };
    }
    return envExtend;
  }

  /**
   * 随机生成一个 canvas 指纹
   * @returns canvas 指纹
   */
  private async getCanvasFp(): Promise<string> {
    let canvasFp = await this.getSync(CANVAS_FP);
    if (!canvasFp) {
      canvasFp = this.algos.MD5(`${getRandomInt10()}`).toString(this.algos.enc.Hex);
      await this.setSync(CANVAS_FP, canvasFp, 3600 * 24 * 365 * 1000);
    }
    return canvasFp;
  }

  /**
   * 随机生成一个 webgl 指纹
   * @returns webgl 指纹
   */
  private async getWebgFp(): Promise<string> {
    let webglFp = await this.getSync(WEBGL_FP);
    if (!webglFp) {
      webglFp = this.algos.MD5(`${getRandomInt10()}`).toString(this.algos.enc.Hex);
      await this.setSync(WEBGL_FP, webglFp, 3600 * 24 * 365 * 1000);
    }
    return webglFp;
  }
}
