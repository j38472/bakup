import * as CryptoJS from 'crypto-js';
import { BusinessError } from '../../utils/error';
import { getRandomElement } from '../../utils/baseUtils';

export function generateSign(functionId: string, body: string, uuid: string, client: string, clientVersion: string) {
  const st = Date.now(),
    version = [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
    r1r2 = getRandomElement(version),
    r1 = r1r2[0],
    r2 = r1r2[1],
    sv = `1${r1}${r2}`,
    input = `functionId=${functionId}&body=${body}&uuid=${uuid}&client=${client}&clientVersion=${clientVersion}&st=${st}&sv=${sv}`,
    ret_bytes = sub_126AC(Buffer.from(input), r1, r2),
    sign = CryptoJS.MD5(Buffer.from(ret_bytes).toString('base64')).toString();
  return {
    st,
    sv,
    sign,
  };
}

function bytes2bin(bytes: Buffer): number[] {
  const arr: number[] = [];
  for (const byte of bytes) {
    arr.push((byte & 128) >> 7, (byte & 64) >> 6, (byte & 32) >> 5, (byte & 16) >> 4, (byte & 8) >> 3, (byte & 4) >> 2, (byte & 2) >> 1, byte & 1);
  }
  return arr;
}

function bin2bytes(arr: number[]): Buffer {
  const length = Math.floor(arr.length / 8);
  const result = Buffer.alloc(length);

  for (let j = 0; j < length; j++) {
    result[j] =
      (arr[j * 8] << 7) |
      (arr[j * 8 + 1] << 6) |
      (arr[j * 8 + 2] << 5) |
      (arr[j * 8 + 3] << 4) |
      (arr[j * 8 + 4] << 3) |
      (arr[j * 8 + 5] << 2) |
      (arr[j * 8 + 6] << 1) |
      arr[j * 8 + 7];
  }

  return result;
}

function sub_12ECC(input: Buffer): Buffer {
  const arr = [0x37, 0x92, 0x44, 0x68, 0xa5, 0x3d, 0xcc, 0x7f, 0xbb, 0x0f, 0xd9, 0x88, 0xee, 0x9a, 0xe9, 0x5a];
  const key2 = Buffer.from('80306f4370b39fd5630ad0529f77adb6');
  const arr1 = Buffer.alloc(input.length);

  for (let i = 0; i < input.length; i++) {
    let r0 = input[i];
    const r2 = arr[i & 0xf];
    const r4 = key2[i & 7];
    r0 ^= r2;
    r0 ^= r4;
    r0 += r2;
    let r2_new = r2 ^ r0;
    r2_new ^= key2[i & 7];
    arr1[i] = r2_new & 0xff;
  }

  return arr1;
}

function sub_10EA4(input: Buffer): Buffer {
  const table = [
    [0, 0],
    [1, 4],
    [2, 61],
    [3, 15],
    [4, 56],
    [5, 40],
    [6, 6],
    [7, 59],
    [8, 62],
    [9, 58],
    [10, 17],
    [11, 2],
    [12, 12],
    [13, 8],
    [14, 32],
    [15, 60],
    [16, 13],
    [17, 45],
    [18, 34],
    [19, 14],
    [20, 36],
    [21, 21],
    [22, 22],
    [23, 39],
    [24, 23],
    [25, 25],
    [26, 26],
    [27, 20],
    [28, 1],
    [29, 33],
    [30, 46],
    [31, 55],
    [32, 35],
    [33, 24],
    [34, 57],
    [35, 19],
    [36, 53],
    [37, 37],
    [38, 38],
    [39, 5],
    [40, 30],
    [41, 41],
    [42, 42],
    [43, 18],
    [44, 47],
    [45, 27],
    [46, 9],
    [47, 44],
    [48, 51],
    [49, 7],
    [50, 49],
    [51, 63],
    [52, 28],
    [53, 43],
    [54, 54],
    [55, 52],
    [56, 31],
    [57, 10],
    [58, 29],
    [59, 11],
    [60, 3],
    [61, 16],
    [62, 50],
    [63, 48],
  ];
  const arr = bytes2bin(input);
  const arr1: number[] = Array(arr.length)
    .fill(0)
    .map(() => 0);

  for (const [from, to] of table) {
    arr1[to] = arr[from];
  }

  return bin2bytes(arr1);
}

function sub_4B7C(input: Buffer): Buffer {
  const table = [
    [0, 6, 0, 1],
    [1, 4, 1, 0],
    [2, 5, 0, 1],
    [3, 0, 0, 1],
    [4, 2, 0, 1],
    [5, 3, 0, 1],
    [6, 1, 1, 0],
    [7, 7, 0, 1],
  ];
  const arr = bytes2bin(input);
  const arr1: number[] = Array(8)
    .fill(0)
    .map(() => 0);

  for (let i = 0; i < 8; i++) {
    arr1[table[i][1]] = arr[i] === 0 ? table[i][2] : table[i][3];
  }

  return bin2bytes(arr1);
}

function sub_10D70(input: Buffer): Buffer {
  return input.length === 1 ? sub_4B7C(input) : Buffer.from('');
}

function sub_12510(input: Buffer): Buffer {
  let output = Buffer.from('');
  const length = Math.floor(input.length / 8);

  for (let i = 0; i < length; i++) {
    const start = i * 8;
    const end = (i + 1) * 8;
    output = Buffer.concat([output, sub_10EA4(input.subarray(start, end))]);
  }

  if (input.length % 8 !== 0) {
    output = Buffer.concat([output, sub_10D70(input.subarray(-(input.length % 8)))]);
  }

  return output;
}

function sub_126AC(input: Buffer, random1: number, random2: number): Buffer {
  let arr = [0, 1, 2];

  if (random2 === 1) {
    arr = [1, 2, 0];
  } else if (random2 === 2) {
    arr = [2, 0, 1];
  }

  const version = arr[random1];

  switch (version) {
    case 0:
      return sub_12510(input);
    case 2:
      return sub_12ECC(input);
    case 1:
      throw new BusinessError('无法确定Sign的代码逻辑');
  }
}
