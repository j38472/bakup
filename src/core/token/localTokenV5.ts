/**
 * File: localTokenV5.ts
 * Description: localToken v5 算法
 * Author: zhx47
 */

import { ClsService } from 'nestjs-cls';
import { Injectable, Logger } from '@nestjs/common';
import { CustomAlgorithm } from '../algorithm';
import { LocalTokenV4 } from './localTokenV4';
import { getRandomIDPro } from '../../utils/baseUtils';

@Injectable()
export class LocalTokenV5 extends LocalTokenV4 {
  protected readonly logger = new Logger(LocalTokenV5.name);

  constructor(
    protected readonly clsService: ClsService,
    protected readonly algos: CustomAlgorithm,
  ) {
    super(clsService, algos);
  }

  extend() {
    const randomIDPro = getRandomIDPro({
        size: 12,
        customDict: '0123456789abcdefghijklmnopqrstuvwxyzABCDOPQRSTUVWXYZ_-',
      }),
      secret1 = randomIDPro.substring(0, 5) + '1' + randomIDPro.substring(5, randomIDPro.length - 1);
    this.clsService.set('h5stContext.genLocalTK.cipher.secret1', secret1);
  }
}
