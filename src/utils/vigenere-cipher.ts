const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function generateAlphabetTable() {
  const table = [];

  for (let i = 0; i < alphabet.length; i++) {
    const row = [];
    for (let j = 0; j < alphabet.length; j++) {
      const index = (i + j) % alphabet.length;
      row.push(alphabet[index]);
    }
    table.push(row);
  }

  return table;
}

export const encryptVigenere = (str: string, key: string) => {
  let outputText = "";
  let inputPointer = 0;
  let keyPointer = 0;

  while (inputPointer < str.length) {
    const i = alphabet.indexOf(str.toUpperCase()[inputPointer]);
    if (i >= 0) {
      const j = alphabet.indexOf(key.toUpperCase()[keyPointer]);
      outputText += generateAlphabetTable()[i][j];
      keyPointer++;
      if (keyPointer >= key.length) {
        keyPointer = 0;
      }
    } else {
      outputText += str[inputPointer];
    }
    inputPointer++;
  }
  return outputText;
};

export const decryptVigenere = (str: string, key: string) => {
  let outputText = "";
  let inputPointer = 0;
  let keyPointer = 0;
  const table = generateAlphabetTable();

  while (inputPointer < str.length) {
    const j = alphabet.indexOf(key.toUpperCase()[keyPointer]);
    const i = table[j].indexOf(str.toUpperCase()[inputPointer]);
    if (i >= 0) {
      outputText += alphabet[i];
      keyPointer++;
      if (keyPointer >= key.length) {
        keyPointer = 0;
      }
    } else {
      outputText += str[inputPointer];
    }
    inputPointer++;
  }
  return outputText;
};
