export const encryptRailFence = (message: string, key: string) => {
  const numRails = parseInt(key, 10);
  if (isNaN(numRails) || numRails <= 1) {
    return "";
  }

  const rail: string[][] = Array.from({ length: numRails }, () => []);

  let railIndex = 0;
  let direction = 1; // 1 for down, -1 for up

  for (let char of message) {
    rail[railIndex].push(char);
    railIndex += direction;

    if (railIndex === 0 || railIndex === numRails - 1) {
      direction *= -1;
    }
  }

  return rail.flat().join("");
};

export const decryptRailFence = (cipherText: string, key: string) => {
  const numRails = parseInt(key, 10);
  if (isNaN(numRails) || numRails <= 1) {
    return "";
  }

  const rail: string[][] = Array.from({ length: numRails }, () => []);
  const railLength = Array(numRails).fill(0); 

  let railIndex = 0;
  let direction = 1;

  // Determine the length of each rail
  for (let i = 0; i < cipherText.length; i++) {
    railLength[railIndex]++;
    railIndex += direction;

    if (railIndex === 0 || railIndex === numRails - 1) {
      direction *= -1;
    }
  }

  let index = 0;
  // Fill each rail with the correct number of characters from the ciphertext
  for (let i = 0; i < numRails; i++) {
    for (let j = 0; j < railLength[i]; j++) {
      rail[i].push(cipherText[index++]);
    }
  }
  
  
  let result = "";
  railIndex = 0;
  direction = 1;

  // Read off the characters in a zigzag pattern to decrypt
  for (let i = 0; i < cipherText.length; i++) {
    result += rail[railIndex].shift();
    railIndex += direction;

    if (railIndex === 0 || railIndex === numRails - 1) {
      direction *= -1;
    }
  }

  return result;
};
