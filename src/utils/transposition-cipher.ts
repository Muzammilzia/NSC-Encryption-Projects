export const encryptTransposition = (plainText: string, key: string) => {   
  const table: string[][] = [];
  const key_lst = Array.from(key).sort();
  let k = 0;

  const totalRows = Math.ceil(plainText.length / key.length);
  
  for (let i = 0; i < totalRows; i++) {
    let row: string[] = [];
    for (let j = 0; j < key.length; j++) {

      if (k > plainText.length - 1) {
        row.push("-");
      } else if (plainText[k]) {
        row.push(plainText[k]);
      }
      k++;
    }
    table.push(row);
  }

  let k_indx = 0;
  let cipher = "";

  for (let _ = 0; _ < key.length; _++) {
    const curr_idx = key.indexOf(key_lst[k_indx]);
    for (const row of table) {
        if(row[curr_idx]) {
            cipher += row[curr_idx];
        }
    }
    k_indx++;
  }

  return cipher;
};

export const decryptTransposition = (cipher: string, key: string): string => {
  const totalRows = Math.ceil(cipher.length / key.length);
  const totalColumns = key.length;
  const key_lst = Array.from(key).sort();

  const table: string[][] = Array.from({ length: totalRows }, () => new Array(totalColumns).fill(''));

  let k = 0;
  // Fill the table column by column according to the sorted key order
  for (let col = 0; col < totalColumns; col++) {
      const originalIndex = key.indexOf(key_lst[col]);
      for (let row = 0; row < totalRows; row++) {
          if (k < cipher.length) {
              table[row][originalIndex] = cipher[k];
              k++;
          }
      }
  }

  let plainText = "";
  for (const row of table) {
      plainText += row.join('');
  }

  plainText = plainText.replace(/-+$/, '');
  return plainText;
};