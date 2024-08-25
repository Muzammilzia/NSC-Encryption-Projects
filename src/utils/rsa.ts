import bigInt, { BigInteger } from 'big-integer';

export const randomPrime = (bits: number): BigInteger => {
  const min = bigInt.one.shiftLeft(bits - 1);
  const max = bigInt.one.shiftLeft(bits).prev();
  
  while (true) {
    const p = bigInt.randBetween(min, max);
    if (p.isProbablePrime(256)) {
      return p;
    } 
  }
}

export const generateRSAKey = (keysize: number): { e: BigInteger, n: BigInteger, d: BigInteger } => {
  const e = bigInt(65537);
  let p: BigInteger;
  let q: BigInteger;
  let totient: BigInteger;

  do {
    p = randomPrime(keysize / 2);
    q = randomPrime(keysize / 2);
    totient = bigInt.lcm(p.prev(), q.prev());
  } while (bigInt.gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());

  return {
    e, 
    n: p.multiply(q),
    d: e.modInv(totient),
  };
}

export const encryptRSA = (encodedMsg: BigInteger, n: BigInteger, e: BigInteger): BigInteger => {
  return encodedMsg.modPow(e, n);
}

export const decryptRSA = (encryptedMsg: BigInteger, d: BigInteger, n: BigInteger): BigInteger => {
  return encryptedMsg.modPow(d, n);
}

export const encodeRSA = (str: string): BigInteger => {
  const codes = str
    .split('')
    .map(i => i.charCodeAt(0))
    .join('');

  return bigInt(codes);
}

export const decodeRSA = (code: BigInteger): string => {
  const stringified = code.toString();
  let string = '';

  for (let i = 0; i < stringified.length; i += 2) {
    const num = Number(stringified.substr(i, 2));
    
    if (num <= 30) {
      string += String.fromCharCode(Number(stringified.substr(i, 3)));
      i++;
    } else {
      string += String.fromCharCode(num);
    }
  }

  return string;
}
