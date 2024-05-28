const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export const encrypt = (inputText: string, shift: number) => {
    const textArray = inputText.split('');
    const outputArray: string[] = [];
    
    for (let i = 0; i < textArray.length; i++) {
        let isCharInLetters = false;
        for (let j = 0; j < letters.length; j++) {
            if(textArray[i] === letters[j]){
                isCharInLetters = true;
                const index = j + shift > 25 ? j + shift - 25 : j + shift;
                outputArray.push(letters[index])
            }
        }
        if (!isCharInLetters) {
            outputArray.push(textArray[i])
        }
    }
    
    return outputArray.join('');
};

// by using ascii code
export const encryptWithAscii = (inputText: string, shift: number) => {
    const textArray = inputText.split('');
    const outputArray: string[] = [];

    for (let i = 0; i < textArray.length; i++) {
        const currentAscii = textArray[i].charCodeAt(0)
        if(currentAscii >= 97 && currentAscii <= 122){
            const newAscii = currentAscii + shift > 122 ? currentAscii + shift - 25 : currentAscii + shift;
            outputArray.push(String.fromCharCode(newAscii))
        } else {
            outputArray.push(String.fromCharCode(currentAscii))
        }
    }

    return outputArray.join('');
}