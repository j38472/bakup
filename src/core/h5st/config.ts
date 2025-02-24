/**
 * File: config.ts
 * Description: h5st 加签算法参数配置
 * Author: zhx47
 */

import { H5stAlgoConfigType, H5stVersion } from './type';

export class H5stInitConfig {
  debug?: boolean = false;
  appId: string;
}

class H5st410AlgoConfig implements H5stAlgoConfigType {
  version = '4.1';
  env = {
    secret: 'HL4|FW#Chc3#q?0)',
    fv: 'v0.1.6',
    randomLength: 10,
  };
  visitKey = {
    seed: 'uct6d0jhqw',
    selectLength: 6,
    randomLength: 9,
    convertLength: 14,
  };
  defaultKey = {
    extend: '2475%+',
  };
  makeSign = {
    extendDateStr: '04',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '3+1&G!q2t7n5',
      prefix: '55',
      secret2: '8)[CJ?.rW0Bs2(89',
    },
  };
}

class H5st420AlgoConfig implements H5stAlgoConfigType {
  version = '4.2';
  env = {
    secret: 'DNiHi703B0&17hh1',
    bu1: '0.1.9',
    fv: 'h5_file_v4.2.0',
    randomLength: 10,
  };
  visitKey = {
    seed: '6d0jhqw3pa',
    selectLength: 4,
    randomLength: 11,
    convertLength: 14,
  };
  defaultKey = {
    extend: '9>5*t5',
  };
  makeSign = {
    extendDateStr: '74',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'qem7+)g%Dhw5',
      prefix: 'z7',
      secret2: 'x6e@RoHi$Fgy7!5k',
    },
  };
}

class H5st431AlgoConfig implements H5stAlgoConfigType {
  version = '4.3';
  env = {
    secret: '&d74&yWoV.EYbWbZ',
    bu1: '0.1.7',
    fv: 'h5_file_v4.3.1',
    randomLength: 10,
  };
  visitKey = {
    seed: 'kl9i1uct6d',
    selectLength: 3,
    randomLength: 12,
    convertLength: 10,
  };
  defaultKey = {
    extend: 'Z=<J_2',
  };
  makeSign = {
    extendDateStr: '22',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '+WzD<U36rlTf',
      prefix: '0J',
      secret2: 'ML0Qq&DS81pP/an@',
    },
  };
}

class H5st433AlgoConfig implements H5stAlgoConfigType {
  version = '4.3';
  env = {
    secret: '&d74&yWoV.EYbWbZ',
    bu1: '0.1.7',
    fv: 'h5_file_v4.3.3',
    randomLength: 10,
  };
  visitKey = {
    seed: 'kl9i1uct6d',
    selectLength: 3,
    randomLength: 12,
    convertLength: 10,
  };
  defaultKey = {
    extend: 'Z=<J_2',
  };
  makeSign = {
    extendDateStr: '22',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '+WzD<U36rlTf',
      prefix: '0J',
      secret2: 'ML0Qq&DS81pP/an@',
    },
  };
}

class H5st440AlgoConfig implements H5stAlgoConfigType {
  version = '4.4';
  env = {
    secret: 'r1T.6Vinpb.k+/a)',
    fv: 'v_lite_f_4.4.0',
    randomLength: 12,
  };
  visitKey = {
    seed: '1uct6d0jhq',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'qV!+A!',
  };
  makeSign = {
    extendDateStr: '88',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'HiO81-Ei89DH',
      prefix: '(>',
      secret2: 'eHL4|FW#Chc3#q?0',
    },
  };
}

class H5st471AlgoConfig implements H5stAlgoConfigType {
  version = '4.7';
  env = {
    secret: '_M6Y?dvfN40VMF[X',
    bu1: '0.1.5',
    fv: 'h5_file_v4.7.1',
    randomLength: 12,
  };
  visitKey = {
    seed: '1uct6d0jhq',
    selectLength: 5,
    randomLength: 10,
    convertLength: 15,
  };
  defaultKey = {
    extend: 'hh1BNE',
  };
  makeSign = {
    extendDateStr: '97',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '03',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '8[8I[]d?960w',
      prefix: 'cw',
      secret2: 'XsiRvI<7|NC-1g5X',
    },
  };
  customAlgorithm = {
    salt: '23k@X!',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    keyReverse: true,
    convertIndex: {
      hmac: 16,
    },
  };
}

class H5st472AlgoConfig implements H5stAlgoConfigType {
  version = '4.7';
  env = {
    secret: '_M6Y?dvfN40VMF[X',
    bu1: '0.1.5',
    fv: 'h5_file_v4.7.2',
    randomLength: 12,
  };
  visitKey = {
    seed: '1uct6d0jhq',
    selectLength: 5,
    randomLength: 10,
    convertLength: 15,
  };
  defaultKey = {
    extend: '87n8!-',
  };
  makeSign = {
    extendDateStr: '07',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '03',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'K3rOqML0Qq&D',
      prefix: 'C2',
      secret2: '=F)?n7@]OFX62bT5',
    },
  };
  customAlgorithm = {
    salt: 'JdM3|5',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    keyReverse: true,
    convertIndex: {
      hmac: 7,
    },
  };
}

class H5st473AlgoConfig implements H5stAlgoConfigType {
  version = '4.7';
  env = {
    secret: '_M6Y?dvfN40VMF[X',
    bu1: '0.1.5',
    fv: 'h5_file_v4.7.3',
    randomLength: 12,
  };
  visitKey = {
    seed: '1uct6d0jhq',
    selectLength: 5,
    randomLength: 10,
    convertLength: 15,
  };
  defaultKey = {
    extend: 'kEjxS-',
  };
  makeSign = {
    extendDateStr: '78',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '03',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'A._/XV*bOm%!',
      prefix: 'dl',
      secret2: 'qV!+A!tmuU#Z7/2_',
    },
  };
  customAlgorithm = {
    salt: '=LN6GO',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    keyReverse: true,
    convertIndex: {
      hmac: 3,
    },
  };
}

class H5st474AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.7';
  env = {
    secret: '_M6Y?dvfN40VMF[X',
    bu1: '0.1.5',
    fv: 'h5_file_v4.7.4',
    randomLength: 11,
  };
  visitKey = {
    seed: '1uct6d0jhq',
    selectLength: 5,
    randomLength: 10,
    convertLength: 15,
  };
  defaultKey = {
    extend: 'Mp(2C1',
  };
  makeSign = {
    extendDateStr: '47',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '03',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '4*iK&33Z|+6)',
      prefix: 'FX',
      secret2: 'zR>U5mz40W99&8sg',
    },
  };
  customAlgorithm = {
    salt: '7n5<G*',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    keyReverse: true,
    convertIndex: {
      hmac: 5,
    },
  };
}

class H5st481AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.8';
  env = {
    fv: 'h5_file_v4.8.1',
    randomLength: 11,
  };
  visitKey = {
    seed: '2mn87xbyof',
    selectLength: 6,
    randomLength: 9,
    convertLength: 14,
  };
  defaultKey = {
    extend: 'JdM3|5',
  };
  makeSign = {
    extendDateStr: '36',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'DbIAgz71j04v',
      prefix: 'mT',
    },
  };
  customAlgorithm = {
    salt: '7hh1BN',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    convertIndex: {
      hex: 6,
      hmac: 5,
    },
  };
}

class H5st482AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.8';
  env = {
    fv: 'h5_file_v4.8.2',
    randomLength: 11,
  };
  visitKey = {
    seed: '2mn87xbyof',
    selectLength: 6,
    randomLength: 9,
    convertLength: 14,
  };
  defaultKey = {
    extend: '0?6i#p',
  };
  makeSign = {
    extendDateStr: '84',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '=9CM=q#Qr6-8',
      prefix: 'Dv',
    },
  };
  customAlgorithm = {
    salt: 'Cp.jbF',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    convertIndex: {
      hex: 4,
      hmac: 14,
    },
  };
}

class H5st491AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.1',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'SDV&6(',
  };
  makeSign = {
    extendDateStr: '07',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'qodOHbSV1ik2',
      prefix: 'ba',
    },
  };
  customAlgorithm = {
    salt: 'x38rG0',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 6,
      hmac: 9,
    },
  };
}

class H5st492AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.2',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: '/Xi]Ti',
  };
  makeSign = {
    extendDateStr: '89',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'Tr0tY-F*crDf',
      prefix: 'id',
    },
  };
  customAlgorithm = {
    salt: '8I8)[C',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 5,
      hmac: 14,
    },
  };
}

class H5st493AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.3',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'pTQEqV',
  };
  makeSign = {
    extendDateStr: '77',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'UnHWNe%n]ro/',
      prefix: 'R,',
    },
  };
  customAlgorithm = {
    salt: '83qem7',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 3,
      hmac: 14,
    },
  };
}

class H5st494AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.4',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'A!2|cP',
  };
  makeSign = {
    extendDateStr: '28',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'cVH1SHb$xuK+',
      prefix: 'c%',
    },
  };
  customAlgorithm = {
    salt: 'Z7/2_7',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 1,
      hmac: 13,
    },
  };
}

class H5st495AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.5',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'b7mP0d',
  };
  makeSign = {
    extendDateStr: '69',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '74.jqb8960t7',
      prefix: '&]',
    },
  };
  customAlgorithm = {
    salt: 'BTR(2K',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 9,
      hmac: 1,
    },
  };
}

class H5st496AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.6',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'q00?6i',
  };
  makeSign = {
    extendDateStr: '08',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '3L%G6Oz1LeTY',
      prefix: '2F',
    },
  };
  customAlgorithm = {
    salt: 'd74&yW',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 0,
      hmac: 9,
    },
  };
}

class H5st497AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'h5_file_v4.9.7',
    randomLength: 12,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: ']d?960',
  };
  makeSign = {
    extendDateStr: '88',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'RvI<7|NC-1g5',
      prefix: '89',
    },
  };
  customAlgorithm = {
    salt: 'IQz9WS',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 3,
      hmac: 1,
    },
  };
}

class H5st500AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.0',
    randomLength: 12,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: 'tO(X0Y',
  };
  makeSign = {
    extendDateStr: '76',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '/#RfL268b74U',
      prefix: 'Z*',
    },
  };
  customAlgorithm = {
    salt: 'zI6fJ>',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 2,
      hmac: 3,
    },
    transformMessageOptions: {
      map: 'kjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponml',
      segments: 13,
      multiplier: 29,
    },
  };
}

class H5st501AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.1',
    randomLength: 13,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: '7wcba&',
  };
  makeSign = {
    extendDateStr: '36',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '=9pStUH7B64/',
      prefix: 'm2',
    },
  };
  customAlgorithm = {
    salt: 'rxn&50',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 4,
      hmac: 4,
    },
    transformMessageOptions: {
      map: 'baZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedc',
      segments: 4,
      multiplier: 18,
    },
  };
}

class H5st502AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.2',
    randomLength: 10,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: '21pyb9',
  };
  makeSign = {
    extendDateStr: '46',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'c(8?@!FJDNiH',
      prefix: '=6',
    },
  };
  customAlgorithm = {
    salt: '$SM04X',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 0,
      hmac: 12,
    },
    transformMessageOptions: {
      map: 'RQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYXWVUTS',
      segments: 5,
      multiplier: 24,
    },
  };
}

class H5st503AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.3',
    randomLength: 10,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: 'q%@S95',
  };
  makeSign = {
    extendDateStr: '72',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'R(2Kiv@u.M2U',
      prefix: 'Un',
    },
  };
  customAlgorithm = {
    salt: 'fJ>pil',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 6,
      hmac: 4,
    },
    transformMessageOptions: {
      map: 'jihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlk',
      segments: 4,
      multiplier: 6,
    },
  };
}

class H5st504AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.4',
    randomLength: 11,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: '#Qr6-8',
  };
  makeSign = {
    extendDateStr: '69',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '%Io1mj_wq%@S',
      prefix: 'U=',
    },
  };
  customAlgorithm = {
    salt: 'D8<NCk',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 7,
      hmac: 6,
    },
    transformMessageOptions: {
      map: 'dcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfe',
      segments: 6,
      multiplier: 25,
    },
  };
}

class H5st505AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.5',
    randomLength: 9,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: 'dU0jS0',
  };
  makeSign = {
    extendDateStr: '60',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: '&|@K3rOqML0Q',
      prefix: 'LE',
    },
  };
  customAlgorithm = {
    salt: '5Wk3$6',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 0,
      hmac: 5,
    },
    transformMessageOptions: {
      map: 'cbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfed',
      segments: 7,
      multiplier: 6,
    },
  };
}

class H5st506AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.6',
    randomLength: 12,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: 'crDf.u',
  };
  makeSign = {
    extendDateStr: '22',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'DbIAgz71j04v',
      prefix: 'nJ',
    },
  };
  customAlgorithm = {
    salt: 'R]dev/',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 5,
      hmac: 7,
    },
    transformMessageOptions: {
      map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
      segments: 7,
      multiplier: 6,
    },
  };
}

class H5st507AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.7',
    randomLength: 9,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: '[8I[]d',
  };
  makeSign = {
    extendDateStr: '36',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'yb9jU671lO85',
      prefix: '4K',
    },
  };
  customAlgorithm = {
    salt: '0Y1/Mv',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 1,
      hmac: 15,
    },
    transformMessageOptions: {
      map: 'XWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZY',
      segments: 6,
      multiplier: 5,
    },
  };
}

class H5st508AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '5.0';
  env = {
    fv: 'h5_file_v5.0.8',
    randomLength: 11,
  };
  visitKey = {
    seed: 'qw3pa2mn87',
    selectLength: 5,
    randomLength: 10,
    convertLength: 14,
  };
  defaultKey = {
    extend: '+6)]v$',
  };
  makeSign = {
    extendDateStr: '61',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'w',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'Ue<d1?SPKw5H',
      prefix: 'SV',
    },
  };
  customAlgorithm = {
    salt: 'A5fAU=',
    map: 'ZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcba',
    convertIndex: {
      hex: 1,
      hmac: 3,
    },
    transformMessageOptions: {
      map: 'jihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlk',
      segments: 4,
      multiplier: 22,
    },
  };
}

class Xcx310AlgoConfig implements H5stAlgoConfigType {
  version = '3.1';
  env = {
    secret: 'wm0!@w_s#ll1flo(',
    randomLength: 0,
  };
  visitKey = {
    seed: '0123456789',
    selectLength: 3,
    randomLength: 12,
    convertLength: 0,
  };
  defaultKey = {
    extend: '',
  };
  makeSign = {
    extendDateStr: '',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'a',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'xxxxxxxxxxxx',
      prefix: 'xx',
      secret2: 'ap0!@f_t#ll0flo*',
    },
  };
}

class Xcx420AlgoConfig implements H5stAlgoConfigType {
  version = '4.2';
  env = {
    secret: 'DNiHi703B0&17hh1',
    fv: 'xcx_v4.2.0',
    randomLength: 10,
  };
  visitKey = {
    seed: '6d0jhqw3pa',
    selectLength: 4,
    randomLength: 11,
    convertLength: 14,
  };
  defaultKey = {
    extend: '9>5*t5',
  };
  makeSign = {
    extendDateStr: '74',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '02',
      platform: 'a',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'qem7+)g%Dhw5',
      prefix: 'z7',
      secret2: 'x6e@RoHi$Fgy7!5k',
    },
  };
}

class Xcx471AlgoConfig implements H5stAlgoConfigType {
  version = '4.7';
  env = {
    secret: '_M6Y?dvfN40VMF[X',
    fv: 'xcx_v4.7.1',
    randomLength: 10,
  };
  visitKey = {
    seed: '1uct6d0jhq',
    selectLength: 5,
    randomLength: 10,
    convertLength: 15,
  };
  defaultKey = {
    extend: '?SPKw5',
  };
  makeSign = {
    extendDateStr: '22',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '03',
      platform: 'a',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'TY5G5cIQz9WS',
      prefix: 'LS',
      secret2: '$Yr%39]TC2u_p<&9',
    },
  };
  customAlgorithm = {
    salt: 'j04vfp',
    map: 'WVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkjihgfedcbaZYX',
    keyReverse: true,
    convertIndex: {
      hmac: 4,
    },
  };
}

class Xcx491AlgoConfig implements H5stAlgoConfigType {
  genSignDefault = true;
  version = '4.9';
  env = {
    fv: 'xcx_v4.9.1',
    randomLength: 10,
  };
  visitKey = {
    seed: 'z4rekl9i1u',
    selectLength: 4,
    randomLength: 11,
    convertLength: 8,
  };
  defaultKey = {
    extend: 'K.%@Ou',
  };
  makeSign = {
    extendDateStr: '98',
  };
  genLocalTK = {
    baseInfo: {
      magic: 'tk',
      version: '04',
      platform: 'a',
      expires: '41',
      producer: 'l',
      expr: '',
      cipher: '',
      adler32: '',
    },
    cipher: {
      secret1: 'Ox18GNmWXl00',
      prefix: 'kM',
    },
  };
  customAlgorithm = {
    salt: '$_+0zz',
    map: 'rqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvuts',
    convertIndex: {
      hex: 8,
      hmac: 2,
    },
  };
}

export const H5stAlgoConfigCollection: Record<string, H5stAlgoConfigType> = {
  [H5stVersion['4.1.0']]: new H5st410AlgoConfig(),
  [H5stVersion['4.2.0']]: new H5st420AlgoConfig(),
  [H5stVersion['4.3.1']]: new H5st431AlgoConfig(),
  [H5stVersion['4.3.3']]: new H5st433AlgoConfig(),
  [H5stVersion['4.4.0']]: new H5st440AlgoConfig(),
  [H5stVersion['4.7.1']]: new H5st471AlgoConfig(),
  [H5stVersion['4.7.2']]: new H5st472AlgoConfig(),
  [H5stVersion['4.7.3']]: new H5st473AlgoConfig(),
  [H5stVersion['4.7.4']]: new H5st474AlgoConfig(),
  [H5stVersion['4.8.1']]: new H5st481AlgoConfig(),
  [H5stVersion['4.8.2']]: new H5st482AlgoConfig(),
  [H5stVersion['4.9.1']]: new H5st491AlgoConfig(),
  [H5stVersion['4.9.2']]: new H5st492AlgoConfig(),
  [H5stVersion['4.9.3']]: new H5st493AlgoConfig(),
  [H5stVersion['4.9.4']]: new H5st494AlgoConfig(),
  [H5stVersion['4.9.5']]: new H5st495AlgoConfig(),
  [H5stVersion['4.9.6']]: new H5st496AlgoConfig(),
  [H5stVersion['4.9.7']]: new H5st497AlgoConfig(),
  [H5stVersion['5.0.0']]: new H5st500AlgoConfig(),
  [H5stVersion['5.0.1']]: new H5st501AlgoConfig(),
  [H5stVersion['5.0.2']]: new H5st502AlgoConfig(),
  [H5stVersion['5.0.3']]: new H5st503AlgoConfig(),
  [H5stVersion['5.0.4']]: new H5st504AlgoConfig(),
  [H5stVersion['5.0.5']]: new H5st505AlgoConfig(),
  [H5stVersion['5.0.6']]: new H5st506AlgoConfig(),
  [H5stVersion['5.0.7']]: new H5st507AlgoConfig(),
  [H5stVersion['5.0.8']]: new H5st508AlgoConfig(),
  [H5stVersion['xcx3.1.0']]: new Xcx310AlgoConfig(),
  [H5stVersion['xcx4.2.0']]: new Xcx420AlgoConfig(),
  [H5stVersion['xcx4.7.1']]: new Xcx471AlgoConfig(),
  [H5stVersion['xcx4.9.1']]: new Xcx491AlgoConfig(),
};
