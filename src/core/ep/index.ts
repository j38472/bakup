import { getRandomDevice, getRandomElement, getRandomIDPro } from '../../utils/baseUtils';

export function generateEp(uuid: string): string {
  const randomDevice = getRandomDevice();
  return JSON.stringify({
    hdid: 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
    ts: Date.now(),
    ridx: -1,
    cipher: {
      d_model: base64Encode(randomDevice.model),
      wifiBssid: 'dW5hbw93bq==', // unknown
      osVersion: base64Encode(getRandomElement(['10', '11', '12', '13'])),
      d_brand: base64Encode(randomDevice.brand),
      screen: base64Encode(getRandomElement(['640x1136', '750x1334', '1080x1920', '2297*1080'])),
      uuid: base64Encode(uuid),
      aid: base64Encode(uuid),
      openudid: base64Encode(uuid),
      area: base64Encode(getRandomIDPro({ size: 2 }) + '_' + getRandomIDPro({ size: 4 }) + '_' + getRandomIDPro({ size: 5 }) + '_' + getRandomIDPro({ size: 5 })),
    },
    ciphertype: 5,
    version: '1.2.0',
    appname: 'com.jingdong.app.mall',
  });
}

function base64Encode(input: string): string {
  let oldBin = '';
  const tempStr: string[] = [];
  let result = '';
  const base64List = 'KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/';

  for (const ch of input) {
    oldBin += ch.charCodeAt(0).toString(2).padStart(8, '0');
  }

  for (let i = 0; i < oldBin.length; i += 6) {
    const segment = oldBin.substring(i, i + 6).padEnd(6, '0');
    tempStr.push(segment);
  }

  for (const item of tempStr) {
    result += base64List[parseInt(item, 2)];
  }

  while (result.length % 4 !== 0) {
    result += '=';
  }

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function base64Decode(input: string): string {
  const result: string[] = [];
  const base64List = 'KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/';
  const bin6List: string[] = [];

  input = input.replace(/=+$/, '');

  for (const ch of input) {
    const binSegment = base64List.indexOf(ch).toString(2).padStart(6, '0');
    bin6List.push(binSegment);
  }

  const binStr = bin6List.join('');

  for (let i = 0; i < binStr.length; i += 8) {
    const bin8Segment = binStr.substring(i, i + 8);
    if (bin8Segment.length === 8) {
      result.push(String.fromCharCode(parseInt(bin8Segment, 2)));
    }
  }

  return result.join('');
}
