$(document).ready(function() {
    function convertNumberToKanji(number) {

        const kanjiUnits = ["", "万", "億", "兆"];
        let result = "";
        let numberInt = 0; 
        let numberUnit = 0;
        let isMinus = false;

        //小数点の処理
        numberFloat = parseFloat(number) - parseInt(number)
        if(numberFloat < 0){
            //-が入っているからslice3する
            numberFloatString = numberFloat.toFixed(2).toString().slice(3)
        }else{
            numberFloatString = numberFloat.toFixed(2).toString().slice(2)
        }
    
        number = parseInt(number)
        if (number === 0 && numberFloatString === "00") return "0";



        if (numberFloatString != "00"){
            result = "." + numberFloatString
        }
        //マイナスは最後につける
        if (number < 0) {
            number = number * -1
            isMinus = true
        }
        let numberString = number.toString();

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

        if (isMinus) {
            result = "-" + result
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
            $('#kanjiResult').text(convertNumberToKanji(result));
        }
    });
});
