const alphabet = "abcdefghijklmnopqrstuvwxyz";
const exceptions = " .!";
let magicSpell = null,
    ningengo = null,
    overload = null;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function translate(str, value) {
    let res = ""

    for (i = 0; i < str.length; i++) {
        if (exceptions.indexOf(str[i]) != -1) {
            res += str[i];
            continue;
        }
        let v = alphabet.indexOf(str[i]) + value;

        if (v >= alphabet.length) {
            v = v - alphabet.length;
        }
        if (v < 0 ) {
            v = alphabet.length + v;
        }
        res += alphabet[v];
    }
    return res;
}

function triggerFromQueryString() {
    let magicGet = getParameterByName('m'),
        ningengoGet = getParameterByName('n');
    
    if ((magicGet != null && magicGet.length == 0) || (ningengoGet != null && ningengoGet.length == 0)) {
        return;
    }

    if (magicGet != null && magicGet.length > 0) {
        magicSpell.value = magicGet;
    }

    if (ningengoGet != null && ningengoGet.length > 0) {
        ningengo.value = ningengoGet;
    }

    document.querySelector("#WiseButtonTellMeYourSecrets").click();
}

function getLetterOverloadValue(letter) {
    return alphabet.indexOf(letter.toLowerCase()) - 1;
}

window.addEventListener('load', function () {
    let overloadGet = getParameterByName('o');

    magicSpell = document.querySelector("#MagicalSpell");
    ningengo = document.querySelector("#SadHumanLanguage");
    overload = document.querySelector("#LetterOverload");
    
    if (overloadGet != null && overloadGet.length > 0) {
        overload.value = parseInt(overloadGet);
    }

    document.querySelector("#WiseButtonTellMeYourSecrets").addEventListener('click', function() {
        let letterOverload = getLetterOverloadValue(overload.value);

        if (ningengo.value.length == 0) {
            ningengo.value = translate(magicSpell.value, letterOverload);
            return;
        }
        magicSpell.value = translate(ningengo.value, letterOverload * -1);

    });
    triggerFromQueryString();
});