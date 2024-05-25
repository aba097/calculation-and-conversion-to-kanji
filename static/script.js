$(document).ready(function() {
    function convertNumberToKanji(number) {
        const kanjiNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        const kanjiUnits = ["", "十", "百", "千", "万", "億", "兆"];

        if (number === 0) return kanjiNumbers[0];

        let result = "";
        let unitIndex = 0;

        while (number > 0) {
            const digit = number % 10;
            if (digit !== 0) {
                result = kanjiNumbers[digit] + kanjiUnits[unitIndex] + result;
            }
            number = Math.floor(number / 10);
            unitIndex++;
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
