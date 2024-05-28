const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const encryptHillCipher = (str: string, key: string) => {
    if(key.length !== 9) return "";
    const stringChunks = breakStringIntoChunks(str, 3);

    return stringChunks.map(chunk => {
        const keyMatrix = twoDimensionStrMatrixToNumMatrix(stringToSquareMatrix(key));
        const strMatrix = oneDimensionStrMatrixToNumMatrix(createSingleDimensionMatrix(chunk));
    
        const multiplicationResult = multiplyMatrices(strMatrix, keyMatrix).map(num => num % 26);
    
        const result = multiplicationResult.map(item => alphabets[item]).join("");
        return result;
    }).join("");
}

export const decryptHillCipher = (str: string, key: string) => {
    if(key.length !== 9) return "";
    const stringChunks = breakStringIntoChunks(str, 3);

    return stringChunks.map(chunk => {
        const keyMatrix = twoDimensionStrMatrixToNumMatrix(stringToSquareMatrix(key));
        const strMatrix = oneDimensionStrMatrixToNumMatrix(createSingleDimensionMatrix(chunk));
        let output = "";
    
        const multiplicativeDeterminent = multiplicativeInverseWithMod(determinant3x3(keyMatrix), 26);
    
        const adjointOfKeyMatrix = adjointMatrix(keyMatrix).map(row => row.map(num => {
            const mod = num % 26;
            if(mod < 0){
                return mod + 26   
            } 
            return mod;
        }))
    
        if(multiplicativeDeterminent){
            const result = adjointOfKeyMatrix.map(row => row.map(num => ((num * multiplicativeDeterminent) % 26)))
            output = multiplyMatrices(strMatrix, result).map(num => (num % 26)).map(item => alphabets[item]).join("")
        }
        
        return output;
    }).join("");
}

const oneDimensionStrMatrixToNumMatrix = (matrix: string[]): number[] => matrix.map(character => alphabets.indexOf(character));

const twoDimensionStrMatrixToNumMatrix = (matrix: string[][]): number[][] => matrix.map(row => oneDimensionStrMatrixToNumMatrix(row));

const stringToSquareMatrix = (s: string): string[][] => {
    // Calculate the size of the square matrix
    const size = Math.sqrt(s.length);

    // Check if the length of the string is a perfect square
    if (!Number.isInteger(size)) {
        return []
    }

    // Create the square matrix
    const matrix: string[][] = [];
    for (let i = 0; i < size; i++) {
        const row: string[] = [];
        for (let j = 0; j < size; j++) {
            row.push(s[i * size + j]);
        }
        matrix.push(row);
    }

    return matrix;
};

const createSingleDimensionMatrix = (str: string) => str.split('');

const multiplyMatrices = (matrix1: number[], matrix2: number[][]): number[] => {
    const cols1 = matrix1.length;
    const rows2 = matrix2.length;

    const result: number[] = [];

    for (let i = 0; i < cols1; i++) {
        let sum = 0;
        for (let j = 0; j < rows2; j++) {
            sum += matrix1[j] * matrix2[i][j];
        }
        result.push(sum);
    }

    return result;
}

const extendedGCD = (a: number, b: number): { gcd: number, x: number, y: number } => {
    if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
    } else {
        const { gcd, x, y } = extendedGCD(b, a % b);
        return { gcd, x: y, y: x - Math.floor(a / b) * y };
    }
};

const multiplicativeInverseWithMod = (a: number, mod: number): number | null => {
    const { gcd, x } = extendedGCD(a, mod);

    if (gcd !== 1) {
        // No multiplicative inverse if a and mod are not coprime
        return null;
    } else {
        // Ensure the result is positive
        return (x % mod + mod) % mod;
    }
};

const determinant3x3 = (matrix: number[][]): number => {
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[0][2];
    const d = matrix[1][0];
    const e = matrix[1][1];
    const f = matrix[1][2];
    const g = matrix[2][0];
    const h = matrix[2][1];
    const i = matrix[2][2];

    const determinant = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    return determinant;
};


const determinant2x2 = (matrix: number[][]): number => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
};

const cofactor = (matrix: number[][], row: number, col: number): number => {
    const subMatrix: number[][] = [];
    for (let i = 0; i < 3; i++) {
        if (i === row) continue;
        const subRow: number[] = [];
        for (let j = 0; j < 3; j++) {
            if (j === col) continue;
            subRow.push(matrix[i][j]);
        }
        subMatrix.push(subRow);
    }
    const sign = ((row + col) % 2 === 0) ? 1 : -1;
    return sign * determinant2x2(subMatrix);
};

const adjointMatrix = (matrix: number[][]): number[][] => {
    const cofactors: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cofactors[i][j] = cofactor(matrix, i, j);
        }
    }

    // Transpose the cofactor matrix to get the adjoint matrix
    const adjoint: number[][] = [
        [cofactors[0][0], cofactors[1][0], cofactors[2][0]],
        [cofactors[0][1], cofactors[1][1], cofactors[2][1]],
        [cofactors[0][2], cofactors[1][2], cofactors[2][2]]
    ];

    return adjoint;
};

const breakStringIntoChunks = (str: string, chunkSize: number = 3): string[] => {
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += chunkSize) {
        let chunk = str.slice(i, i + chunkSize);
        // If the last chunk has fewer characters than chunkSize, pad it with 'x'
        if (chunk.length < chunkSize) {
            chunk = chunk.padEnd(chunkSize, 'x');
        }
        chunks.push(chunk);
    }
    return chunks;
};
