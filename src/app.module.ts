/**
 * File: app.module.ts
 * Description: nestjs 注入
 * Author: zhx47
 */

import { v4 } from 'uuid';
import { Request } from 'express';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ClsModule, ClsService } from 'nestjs-cls';
import { CacheModule } from 'nestjs-cache-manager-v6';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { cacheConfig, CacheConfigService, WinstonConfigService } from './config';
import { AppController } from './controller/app.controller';
import { AlgoController } from './controller/algo.controller';
import { CommandController } from './controller/command.controller';
import { H5stService } from './services/h5st.service';
import { SignService } from './services/sign.service';
import { CommandService } from './services/command.service';
import { CustomAlgorithm } from './core/algorithm';
import {
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
  Xcx310,
  Xcx420,
  Xcx471,
  Xcx491,
} from './core/h5st';
import { LocalTokenV3, LocalTokenV4 } from './core/token';
import { TokenFactory, H5stFactory } from './core';

@Module({
  imports: [
    // 在 中间件 初始化上下文对象
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.header('cf-ray') ?? v4(),
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [cacheConfig],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
      inject: [ConfigService],
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
      inject: [ClsService],
    }),
  ],
  controllers: [AppController, AlgoController, CommandController],
  providers: [
    CustomAlgorithm,
    LocalTokenV3,
    LocalTokenV4,
    TokenFactory,
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
    Xcx310,
    Xcx420,
    Xcx471,
    Xcx491,
    H5stFactory,
    H5stService,
    SignService,
    CommandService,
  ],
})
export class AppModule {}
