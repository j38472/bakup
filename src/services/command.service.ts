/**
 * File: command.service.ts
 * Description: 口令解析和生成业务层
 * Author: zhx47
 */

import * as CryptoJS from 'crypto-js';
import { Injectable } from '@nestjs/common';
import { SignReqBody } from '../controller/dto/req.dto';
import { SignService } from './sign.service';
import { BusinessError } from '../utils/error';

@Injectable()
export class CommandService {
  constructor(private readonly signService: SignService) {}

  private engRegex = /[$#@￥！][0-9A-Za-z]{6,20}[$%@!)￥！]|[2-9]{20}|[2-9]{16}/;
  private cnRegex =
    /(?:[2-9]{2}[斤包袋箱][\u4e00-\u9fa5]{2}[☂-➾⠁-⣿]){3}|(?:[\u4e00-\u9fa5]{4}[☂-➾⠁-⣿]){3}|[\u4e00-\u9fa5]{16}[☂-➾⠁-⣿]|[☂-➾⠁-⣿][\u4e00-\u9fa5]{14}[☂-➾⠁-⣿]|(?:[☂-➾⠁-⣿][\u4e00-\u9fa5]{6}){2}[☂-➾⠁-⣿]|(?:[0-9A-Za-zα-ωА-Яа-яÀ-ž]{3}[\u4e00-\u9fa5]{2}){2}[☂-➾⠁-⣿]|(?:[☂-➾⠁-⣿][0-9A-Za-zα-ωА-Яа-яÀ-ž]{2}[\u4e00-\u9fa5]{2}){2}[☂-➾⠁-⣿]/;
  private readonly sKey: string = '5yKhoqodQjuHGlKZ';
  private readonly ivParameter: string = '7WwXmH2TKSCIEJQ3';

  /**
   * 口令解析（返回一个用于访问的url，自行访问获取口令详情）
   * @param command 原始口令
   */
  jComExchange(command: string): string {
    const commandType = this.getCommandType(command);
    const newCommand: string = this.getNewText(command) ?? command;

    const encrypted = CryptoJS.AES.encrypt(newCommand, CryptoJS.enc.Utf8.parse(this.sKey), {
      iv: CryptoJS.enc.Utf8.parse(this.ivParameter),
    });

    const signReqBody = new SignReqBody();
    signReqBody.functionId = 'jComExchange';
    signReqBody.body = JSON.stringify({
      appCode: 'jApp',
      text: encodeURIComponent(encrypted.toString()),
      aliveMin: 1,
      commandType: commandType,
    });
    const signRes = this.signService.getSign(signReqBody);

    return `https://api.m.jd.com/client.action?${signRes.qs}`;
  }

  /**
   * 获取口令类型
   * @param command 原始口令
   */
  getCommandType(command: string) {
    if (this.cnRegex.test(command)) {
      return 3;
    } else if (this.engRegex.test(command)) {
      return 0;
    }
    throw new BusinessError('不符合口令规则');
  }

  /**
   * 获取口令（从原始口令中去除无用的值）
   * @param command 原始口令
   */
  getNewText(command: string): string {
    let result: string[] = [];
    const cnMatches = command.match(this.cnRegex);
    if (cnMatches) {
      result = result.concat(cnMatches);
    }
    const engMatches = command.match(this.engRegex);
    if (engMatches) {
      result = result.concat(engMatches);
    }
    return result.join(' ');
  }
}
