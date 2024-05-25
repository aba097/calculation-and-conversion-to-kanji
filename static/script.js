$(document).ready(function() {
    function convertNumberToKanji(number) {
        if (number === 0) return "0";

        const kanjiUnits = ["", "万", "億", "兆"];
        let result = "";
        let numberString = number.toString();
        let numberInt = 0; 
        let numberUnit = 0;

        while (numberString != "") {
            if (numberString.length >= 4){
                let lastFourCharacters = numberString.substr(-4); 
                numberString = numberString.slice(0, -4);
                numberInt = parseInt(lastFourCharacters);
            }else {
                numberInt = parseInt(numberString);
                numberString = "";
            }
            //0だけのとき
            if (numberInt != 0){
                result = numberInt.toString() + kanjiUnits[numberUnit] + result
            }
            numberUnit += 1
        }

        return result;
    }

    $('#calculator').submit(function(event) {
        event.preventDefault();

        const number1 = parseFloat($('#number1').val());
        const number2 = parseFloat($('#number2').val());
        const operator = $('#operator').val();
        let result;

        switch (operator) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
            case '/':
                result = number1 / number2;
                break;
            default:
                result = NaN;
        }

        if (isNaN(result)) {
            $('#result').text("無効な計算");
            $('#kanjiResult').text("無効な計算");
        } else {
            $('#result').text(result);
            $('#kanjiResult').text(convertNumberToKanji(Math.round(result)));
        }
    });
});
