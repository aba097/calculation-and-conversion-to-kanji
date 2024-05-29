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

        //parseする
        //replaceで文字列内の空白を全削除
        const formula = $('#formula').val().replace(/\s+/g, '');

        let numList = [];
        let operators = []; 

        let flg = false;
        let startIdx = 0;
        let NaNFlg = false;
        for (let i = 0; i < formula.length; i++) {
            if((formula[i] >= '0' && formula[i] <= '9') || formula[i] == '.'){
                if(!flg){
                    flg = true;
                    startIdx = i;
                }
            }else {
                //数値チェック
                if(flg){
                    //数値に変換できなかったらアウト,1発目がoperatorでもここでアウトになる
                    let num = formula.slice(startIdx, i);
                    if(!isNaN(num)){
                        numList.push(num);
                    }else{
                        NaNFlg = true;
                        flg = false;
                        break;
                    }
                    flg = false;                    
                }

                //operatorの場合
                if(formula[i] == '+' || formula[i] == '-' || formula[i] == '*' || formula == '/' || formula[i] == 'x'){
                    operators.push(formula[i]);
                }else{
                    NaNFlg = true;
                    flg = false;
                    break;
                }
            }
        }
        //最後の数値チェック
        if(flg){
            //数値に変換できなかったらアウト
            let num = formula.slice(startIdx, formula.length);
            if(!isNaN(num)){
                numList.push(num);
            }else{
                NaNFlg = true;
            }
        }
        //numlist - 1 == operatorsが正しい
        if (numList.length -1 != operators.length){
            NaNFlg = true;
        }

        //入力が正しくない        
        if (NaNFlg) {
            $('#result').text("無効な計算");
            $('#kanjiResult').text("無効な計算");
            return;
        }

        //計算
        let num1 = new Decimal(numList.shift());
        while(numList.length > 0) {
            let num2 = new Decimal(numList.shift());
            let operator = operators.shift();
            switch (operator) {
                case '+':
                    num1 = num1.add(num2);
                    break;
                case '-':
                    num1 = num1.sub(num2);
                    break;
                case '*':
                    num1 = num1.mul(num2);
                    break;
                case 'x':
                    num1 = num1.mul(num2);
                    break;
                case '/':
                    num1 = num1.div(num2);
                    break;
                default:
                    num1 = NaN;
            }
        }
        
        $('#result').text(num1.toString());
        $('#kanjiResult').text(convertNumberToKanji(num1));
        
    });
});
