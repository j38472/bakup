/**
 * File: h5st.factory.ts
 * Description: h5st 算法工厂
 * Author: zhx47
 */

import { Inject, Injectable } from '@nestjs/common';
import {
  BaseH5st,
  H5st410,
  H5st420,
  H5st431,
  H5st433,
  H5st440,
  H5st471,
  H5st472,
  H5st473,
  H5st474,
  H5st481,
  H5st482,
  H5st491,
  H5st492,
  H5st493,
  H5st494,
  H5st495,
  H5st496,
  H5st497,
  H5st500,
  H5st501,
  H5st502,
  H5st503,
  H5st504,
  H5st505,
  H5st506,
  H5st507,
  H5st508,
  H5st509,
  Xcx310,
  Xcx420,
  Xcx471,
  Xcx491,
  H5stVersion,
} from './h5st';

@Injectable()
export class H5stFactory {
  private instances = new Map<H5stVersion, BaseH5st>();

  constructor(
    @Inject(H5st410) private readonly h5st410: H5st410,
    @Inject(H5st420) private readonly h5st420: H5st420,
    @Inject(H5st431) private readonly h5st431: H5st431,
    @Inject(H5st433) private readonly h5st433: H5st433,
    @Inject(H5st440) private readonly h5st440: H5st440,
    @Inject(H5st471) private readonly h5st471: H5st471,
    @Inject(H5st472) private readonly h5st472: H5st472,
    @Inject(H5st473) private readonly h5st473: H5st473,
    @Inject(H5st474) private readonly h5st474: H5st474,
    @Inject(H5st481) private readonly h5st481: H5st481,
    @Inject(H5st482) private readonly h5st482: H5st482,
    @Inject(H5st491) private readonly h5st491: H5st491,
    @Inject(H5st492) private readonly h5st492: H5st492,
    @Inject(H5st493) private readonly h5st493: H5st493,
    @Inject(H5st494) private readonly h5st494: H5st494,
    @Inject(H5st495) private readonly h5st495: H5st495,
    @Inject(H5st496) private readonly h5st496: H5st496,
    @Inject(H5st497) private readonly h5st497: H5st497,
    @Inject(H5st500) private readonly h5st500: H5st500,
    @Inject(H5st501) private readonly h5st501: H5st501,
    @Inject(H5st502) private readonly h5st502: H5st502,
    @Inject(H5st503) private readonly h5st503: H5st503,
    @Inject(H5st504) private readonly h5st504: H5st504,
    @Inject(H5st505) private readonly h5st505: H5st505,
    @Inject(H5st506) private readonly h5st506: H5st506,
    @Inject(H5st507) private readonly h5st507: H5st507,
    @Inject(H5st508) private readonly h5st508: H5st508,
    @Inject(H5st509) private readonly h5st509: H5st509,
    @Inject(Xcx310) private readonly xcx310: Xcx310,
    @Inject(Xcx420) private readonly xcx420: Xcx420,
    @Inject(Xcx471) private readonly xcx471: Xcx471,
    @Inject(Xcx491) private readonly xcx491: Xcx491,
  ) {
    this.instances.set(H5stVersion['4.1.0'], this.h5st410);
    this.instances.set(H5stVersion['4.2.0'], this.h5st420);
    this.instances.set(H5stVersion['4.3.1'], this.h5st431);
    this.instances.set(H5stVersion['4.3.3'], this.h5st433);
    this.instances.set(H5stVersion['4.4.0'], this.h5st440);
    this.instances.set(H5stVersion['4.7.1'], this.h5st471);
    this.instances.set(H5stVersion['4.7.2'], this.h5st472);
    this.instances.set(H5stVersion['4.7.3'], this.h5st473);
    this.instances.set(H5stVersion['4.7.4'], this.h5st474);
    this.instances.set(H5stVersion['4.8.1'], this.h5st481);
    this.instances.set(H5stVersion['4.8.2'], this.h5st482);
    this.instances.set(H5stVersion['4.9.1'], this.h5st491);
    this.instances.set(H5stVersion['4.9.2'], this.h5st492);
    this.instances.set(H5stVersion['4.9.3'], this.h5st493);
    this.instances.set(H5stVersion['4.9.4'], this.h5st494);
    this.instances.set(H5stVersion['4.9.5'], this.h5st495);
    this.instances.set(H5stVersion['4.9.6'], this.h5st496);
    this.instances.set(H5stVersion['4.9.7'], this.h5st497);
    this.instances.set(H5stVersion['5.0.0'], this.h5st500);
    this.instances.set(H5stVersion['5.0.1'], this.h5st501);
    this.instances.set(H5stVersion['5.0.2'], this.h5st502);
    this.instances.set(H5stVersion['5.0.3'], this.h5st503);
    this.instances.set(H5stVersion['5.0.4'], this.h5st504);
    this.instances.set(H5stVersion['5.0.5'], this.h5st505);
    this.instances.set(H5stVersion['5.0.6'], this.h5st506);
    this.instances.set(H5stVersion['5.0.7'], this.h5st507);
    this.instances.set(H5stVersion['5.0.8'], this.h5st508);
    this.instances.set(H5stVersion['5.0.9'], this.h5st509);
    this.instances.set(H5stVersion['xcx3.1.0'], this.xcx310);
    this.instances.set(H5stVersion['xcx4.2.0'], this.xcx420);
    this.instances.set(H5stVersion['xcx4.7.1'], this.xcx471);
    this.instances.set(H5stVersion['xcx4.9.1'], this.xcx491);
  }

  getInstance(key: H5stVersion): BaseH5st | undefined {
    return this.instances.get(key);
  }
}
