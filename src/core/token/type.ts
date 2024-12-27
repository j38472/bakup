/**
 * File: type.ts
 * Description: token 通用类型
 * Author: zhx47
 */

/**
 * h5st token 类型
 */
export interface TokenType {
  magic: string;
  version: string;
  platform: string;
  expires: string;
  producer: string;
  expr: string;
  cipher: string;
  adler32: string;
}

export enum LocalTokenVersion {
  '03' = '03',
  '04' = '04',
}

export interface LocalTokenType {
  genLocalTK: (fp: string) => string;
}
