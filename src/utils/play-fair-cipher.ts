const createKeyGridMatrix = (key: string) => {
  const alphabet = "abcdefghiklmnopqrstuvwxyz";
  const keyWithoutJAlphabet = [...new Set(key.replace("j", "i").split(""))];
  const grid = keyWithoutJAlphabet.concat(
    alphabet.split("").filter((c) => !keyWithoutJAlphabet.includes(c))
  );
  return Array.from({ length: 5 }, (_, i) => grid.slice(i * 5, i * 5 + 5));
};

const prepareMessage = (message: string) => {
  const cleanMessage = message.replace(/j/g, "i").replace(/[^a-z]/g, "");
  let preparedMessage = "";

  for (let i = 0; i < cleanMessage.length; i += 2) {
    let char1 = cleanMessage[i];
    let char2 = cleanMessage[i + 1] || "X";

    if (char1 === char2) {
      preparedMessage += char1 + "X";
      i--;
    } else {
      preparedMessage += char1 + char2;
    }
  }

  return preparedMessage;
};

const findCharacterPosition = (grid: string[][], char: string) => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (grid[row][col] === char) {
        return { row, col };
      }
    }
  }
  return null;
};

const processDigraph = (
  grid: string[][],
  char1: string,
  char2: string,
  encrypt = true
) => {
  const pos1 = findCharacterPosition(grid, char1);
  const pos2 = findCharacterPosition(grid, char2);
  let newChar1, newChar2;

  if (!pos1 || !pos2) return "";

  if (pos1.row === pos2.row) {
    newChar1 = grid[pos1.row][(pos1.col + (encrypt ? 1 : 4)) % 5];
    newChar2 = grid[pos2.row][(pos2.col + (encrypt ? 1 : 4)) % 5];
  } else if (pos1.col === pos2.col) {
    newChar1 = grid[(pos1.row + (encrypt ? 1 : 4)) % 5][pos1.col];
    newChar2 = grid[(pos2.row + (encrypt ? 1 : 4)) % 5][pos2.col];
  } else {
    newChar1 = grid[pos1.row][pos2.col];
    newChar2 = grid[pos2.row][pos1.col];
  }

  return newChar1 + newChar2;
};

export function encryptPlayFair(message: string, key: string): string {
  const keyGrid = createKeyGridMatrix(key);
  const cleanMessage = prepareMessage(message);
  let cipherText = "";

  for (let i = 0; i < cleanMessage.length; i += 2) {
    cipherText += processDigraph(keyGrid, cleanMessage[i], cleanMessage[i + 1]);
  }

  return cipherText;
}

export function decryptPlayFair(cipherText: string, key: string): string {
  const keyGrid = createKeyGridMatrix(key);
  let decryptedMessage = "";

  for (let i = 0; i < cipherText.length; i += 2) {
    decryptedMessage += processDigraph(
      keyGrid,
      cipherText[i],
      cipherText[i + 1],
      false
    );
  }

  return decryptedMessage;
}
