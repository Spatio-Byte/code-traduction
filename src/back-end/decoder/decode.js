let textEntry = document.querySelector('#text-entry');
let keyEntry = document.querySelector('#code-entry');
let uncodeCodeButton = document.querySelector('#du-button');
let ToCoded = document.querySelector('#radio-text-coded');
let ToText = document.querySelector('#radio-coded-text');
let textResult = document.querySelector('.coded-result');

// this script is made by spatio if you want to re-use please credit me I take of my time to make this encoding script
// the credit : https://github.com/Spatio-Byte/



function encode(texte, cle) {
    if (!cle) {
        throw new Error("the key cannot be empty");
    }

    const table_cryptage = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 éèù!,.?@#$%^&*()_+-=[]{}|;:"`¤µ<>/£~°§';
    let encodedText = '';
    let keyIndex = 0;

    for (let i = 0; i < texte.length; i++) {
        const char = texte[i];

        if (table_cryptage.includes(char)) {
            const indexTexte = table_cryptage.indexOf(char);
            const indexCle = table_cryptage.indexOf(cle[keyIndex % cle.length]);
            if (indexCle === -1) {
                throw new Error(`The char '${cle[keyIndex % cle.length]}' of the key is not valid!`);
            }
            const indexChiffre = (indexTexte + indexCle) % table_cryptage.length;
            encodedText += table_cryptage[indexChiffre];
            keyIndex++;
        } else {
            encodedText += texte[i];
        }
    }

    return encodedText;
}

function decode(texte, cle) {
    if (!cle) {
        throw new Error("The key cannot be empty!");
    }

    const table_cryptage = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 éèù!,.?@#$%^&*()_+-=[]{}|;:"`¤µ<>/£~°§';
    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < texte.length; i++) {
        const char = texte[i];

        if (table_cryptage.includes(char)) {
            const indexTexte = table_cryptage.indexOf(char);
            const indexCle = table_cryptage.indexOf(cle[keyIndex % cle.length]);
            if (indexCle === -1) {
                throw new Error(`The char '${cle[keyIndex % cle.length]}' of the key is not valid!`);
            }
            const indexOriginal = (indexTexte - indexCle + table_cryptage.length) % table_cryptage.length;
            decryptedText += table_cryptage[indexOriginal];
            keyIndex++;
        } else {
            decryptedText += texte[i];
        }
    }

    return decryptedText;
}

function uncodeDecode () {
    if (ToCoded.checked) {
        let result = encode(textEntry.value, keyEntry.value);
        if (result.length < 1) {
            textResult.textContent = `One of the entry are not filled`;
            textResult.style.backgroundColor = "rgb(73,73,73)";
            textResult.style.borderColor = "rgb(73,73,73)";
        } else {
            textResult.textContent = `Sucessfully encrypted : ${result}`;
            textResult.style.backgroundColor = "rgb(73,73,73)";
            textResult.style.borderColor = "rgb(73,73,73)";
        };
        
    } else if (ToText.checked) {
        let result = decode(textEntry.value, keyEntry.value);
        if (result.length < 1) {
            textResult.textContent = `One of the entry are not filled`;
            textResult.style.backgroundColor = "rgb(73,73,73)";
            textResult.style.borderColor = "rgb(73,73,73)";
        } else {
            textResult.textContent = `Sucessfully decrypted : ${result}`;
            textResult.style.backgroundColor = "rgb(73,73,73)";
            textResult.style.borderColor = "rgb(73,73,73)";
        };
    }
};


uncodeCodeButton.addEventListener('click', uncodeDecode);