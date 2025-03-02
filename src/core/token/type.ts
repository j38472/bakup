/**
 * File: type.ts
 * Description: token 通用类型
 * Author: zhx47
 */

/**
 * h5st token 类型
 */
export interface TokenBaseInfoType {
  magic: string;
  version: string;
  platform: string;
  expires: string;
  producer: string;
  expr: string;
  cipher: string;
  adler32: string;
}

export interface TokenCipherType {
  secret1: string;
  prefix: string;
  secret2?: string;
}

export interface TokenType {
  baseInfo: TokenBaseInfoType;
  cipher: TokenCipherType;
}

export enum LocalTokenVersion {
  '03' = '03',
  '04' = '04',
}

export interface LocalTokenType {
  genLocalTK: (fp: string) => string;
}
