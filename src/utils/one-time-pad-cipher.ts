export function encryptOneTimePad(message: string, key: string): string {
  if (message.length !== key.length) {
    return '';
  }

  let ciphertext = "";
  for (let i = 0; i < message.length; i++) {
    const charCodeMessage = message.charCodeAt(i);
    const charCodeKey = key.charCodeAt(i);
    let encryptedChar: string;
    if(charCodeMessage !== 32){
        encryptedChar = String.fromCharCode(
          ((charCodeMessage + charCodeKey) % 26) + 65
        );
    }else {
        encryptedChar = " "
    }
    ciphertext += encryptedChar;
  }

  return ciphertext;
}

export function decryptOneTimePad(ciphertext: string, key: string): string {
  if (ciphertext.length !== key.length) {
    return '';
  }

  let decryptedMessage = "";
  for (let i = 0; i < ciphertext.length; i++) {
    const charCodeCiphertext = ciphertext.charCodeAt(i);
    const charCodeKey = key.charCodeAt(i);
    let decryptedChar: string;
    if(charCodeCiphertext !== 32){
        decryptedChar = String.fromCharCode(
          ((charCodeCiphertext - charCodeKey + 26) % 26) + 65
        );
    } else {
        decryptedChar = " ";
    }
    decryptedMessage += decryptedChar;
  }

  return decryptedMessage;
}
