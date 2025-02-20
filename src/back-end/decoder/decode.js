let textEntry = document.querySelector('#text-entry');
let keyEntry = document.querySelector('#code-entry');
let uncodeCodeButton = document.querySelector('#du-button');
let ToCoded = document.querySelector('#radio-text-coded');
let ToText = document.querySelector('#radio-coded-text');
let textResult = document.querySelector('.coded-result');


function encode(texte, cle) {
    const table_cryptage = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 éèù!,.?@#$%^&*()_+-=[]{}|;:"<>/£~';
    let encodedText = '';
    let keyIndex = 0;

    for (let i = 0; i < texte.length; i++) {
        const char = texte[i];

        
        if (table_cryptage.includes(char)) {
            const indexTexte = table_cryptage.indexOf(char);
            const indexCle = table_cryptage.indexOf(cle[keyIndex % cle.length].toLowerCase());
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
    const table_cryptage = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 éèù!,.?@#$%^&*()_+-=[]{}|;:"<>/£~';
    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < texte.length; i++) {
        const char = texte[i];

        
        if (table_cryptage.includes(char)) {
            const indexTexte = table_cryptage.indexOf(char);
            const indexCle = table_cryptage.indexOf(cle[keyIndex % cle.length].toLowerCase());
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
        textResult.textContent = `Cryptage réussi : ${result}`;
        textResult.style.backgroundColor = "rgb(73,73,73)";
        textResult.style.borderColor = "rgb(73,73,73)";
    } else if (ToText.checked) {
        let result = decode(textEntry.value, keyEntry.value);
        textResult.textContent = `Décryptage réussi : ${result}`;
        textResult.style.backgroundColor = "rgb(73,73,73)";
        textResult.style.borderColor = "rgb(73,73,73)";
    }
};


uncodeCodeButton.addEventListener('click', uncodeDecode);