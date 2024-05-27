$(document).ready(function() {
    function convertNumberToKanji(number) {

        if (number.eq(0)) return "0";

        const kanjiUnits = ["", "万", "億", "兆"];
        let result = "";
        let numberFloatString = "";
        let numberString = "";
        let numberInt = 0; 
        let numberUnit = 0;
        let isMinus = false;

        //マイナスの処理
        //マイナスは最後につける
        if (number.lt(0)){
            number = number.mul(-1);
            isMinus = true;
        }
        
        //小数点の処理
        let numberFloat = number.sub(number.floor());
        if (!numberFloat.eq(0)) { //少数の場合 equal0でない
            numberFloatString = "." + numberFloat.toFixed(2).toString().slice(2)
        }
        result = numberFloatString;
        
        //整数部の処理
        number = number.floor() //切り捨て
        numberString = number.toString();

        while (numberString != "") {
            if (numberString.length >= 4){
                let lastFourCharacters = numberString.substr(-4); 
                numberString = numberString.slice(0, -4);
                numberInt = parseInt(lastFourCharacters);
            }else {
                numberInt = parseInt(numberString);
                numberString = "";
            }
            //0だけのときは万億兆を表示させない
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

        const input1 = $('#number1').val();
        const input2 = $('#number2').val();

        //数値が入力されたか確認
        if (isNaN(input1) || isNaN(input2)) {
            $('#result').text("無効な計算");
            $('#kanjiResult').text("無効な計算");
            return;
        }

        const number1 = new Decimal(input1);
        const number2 = new Decimal(input2);
        const operator = $('#operator').val();
        let result;

        switch (operator) {
            case '+':
                result = number1.add(number2);
                break;
            case '-':
                result = number1.sub(number2);
                break;
            case '*':
                result = number1.mul(number2);
                break;
            case '/':
                result = number1.div(number2);
                break;
            default:
                result = NaN;
        }

        $('#result').text(result.toString());
        $('#kanjiResult').text(convertNumberToKanji(result));
        
    });
});
