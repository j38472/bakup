/**
 * File: sign.service.ts
 * Description: sign 算法业务层，用于具体算法初始化和生成，核心代码逻辑来自https://github.com/hyyds/sign/blob/main/app.py
 * Author: zhx47
 */

import { Injectable } from '@nestjs/common';
import { SignReqBody } from '../controller/dto/req.dto';
import { SignRes } from '../controller/dto/res.dto';
import { generateEp, generateSign } from '../core';
import { getRandomIDPro } from '../utils/baseUtils';

@Injectable()
export class SignService {
  getSign(reqBody: SignReqBody): SignRes {
    const client = reqBody.client,
      clientVersion = reqBody.clientVersion,
      uuid = reqBody.uuid || getRandomIDPro({ size: 16, customDict: '0123456789abcdef' });

    const signResult = generateSign(reqBody.functionId, reqBody.body, uuid, client, clientVersion);
    return new SignRes({
      client: client,
      clientVersion: clientVersion,
      functionId: reqBody.functionId,
      body: reqBody.body,
      ef: '1',
      ep: generateEp(uuid),
      uuid: uuid,
      st: signResult.st,
      sv: signResult.sv,
      sign: signResult.sign,
    });
  }
}
