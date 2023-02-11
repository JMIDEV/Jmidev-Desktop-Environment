var calculationinputdiv = document.querySelector(".calculationinputdiv");
var calculationinput = document.querySelector(".calculationinput");
var calculationresultdiv = document.querySelector(".result");
var calculationresultoutputtext = document.querySelector(".resulttextoutput");

var writingcursor = 0;
var justcalculated = false;
var showinginputdash = true;
var currentinput = "";
var lastanswer = 0;
var pinumber = Math.PI;

document.querySelectorAll(".calculation").forEach(function(button){

    button.onclick = function(){addtoinput(button.innerHTML)};

});

function resetcalc(){

    //lastanswer = 0;
    justcalculated = false;
    showinginputdash = true;
    currentinput="";
    calculationresultoutputtext.innerHTML = "0";
    writingcursor = 0;
    updateinputfield(true);
    
}

function delinput(){

    //currentinput = currentinput.slice(0, -1);

    movecursor(-1);

    if(currentinput.substring(writingcursor, writingcursor+1) != "A"){

        currentinput = currentinput.substring(0, writingcursor) + currentinput.substring(writingcursor+1, currentinput.length);

    }
    else{

        currentinput = currentinput.substring(0, writingcursor) + currentinput.substring(writingcursor+3, currentinput.length);

    }

    updateinputfield(true);

}

function addtoinput(whattoinput){

    if(justcalculated){

        currentinput = "";

        if(whattoinput == "+" || whattoinput == "-" || whattoinput == "*" || whattoinput == "/" || whattoinput == "(" || whattoinput == ")"){

            currentinput = "Ans";
            writingcursor = 3;

        }

        else{

            writingcursor = 0;

        }

    }
    justcalculated = false;
    currentinput = currentinput.substring(0, writingcursor) + whattoinput + currentinput.substring(writingcursor);
    movecursor(1);
    /*if(whattoinput != "Ans"){

        movecursor(1);
    
    }
    else{

        movecursor(3);
    
    }*/
    //currentinput = currentinput + whattoinput;
    updateinputfield(true);

}

function movecursor(amount){

    if(writingcursor+amount < currentinput.length+1 && writingcursor+amount >= 0){

        if(amount > 0 && currentinput.substring(writingcursor, writingcursor+1) == "A"){

            writingcursor += amount*3;

        }

        else if(amount < 0 && currentinput.substring(writingcursor-1, writingcursor) == "s"){

            writingcursor += amount*3;

        }

        else{

            writingcursor += amount;

        }

    }

    updateinputfield(true);

}

function setCharAt(str,index,chr) {

    if(index > str.length) return str;
    return str.substring(0,index) + chr + str.substring(index+1);

}

function updateinputfield(inputdash){

    calculationinput.innerHTML = currentinput;

    if(inputdash && writingcursor != currentinput.length){
        
        calculationinput.innerHTML = setCharAt(calculationinput.textContent, writingcursor, "_");
    
    }

    else if(inputdash && writingcursor == currentinput.length){
        
        calculationinput.innerHTML = calculationinput.innerHTML + "_";
    
    }

    else if(writingcursor == currentinput.length){

        calculationinput.innerHTML = calculationinput.innerHTML + " ";

    }

    /*var textNode = calculationinput.textContent;
    var charWidth = calculationinput.offsetWidth / textNode.length;
    var overflowChars = Math.floor((calculationinput.scrollWidth - calculationinput.offsetWidth) / charWidth);*/

    var characterwidth = calculationinput.offsetWidth / calculationinput.textContent.length;
    var numberofcharactersonscreen = Math.floor(calculationinputdiv.offsetWidth/characterwidth);

    //console.log(numberofcharactersonscreen);

    if(calculationinputdiv.offsetWidth < calculationinputdiv.scrollWidth && writingcursor >= numberofcharactersonscreen){

        calculationinput.innerHTML = calculationinput.innerHTML.substring(writingcursor-numberofcharactersonscreen, writingcursor+1);

    }

    else{

        calculationinput.innerHTML = calculationinput.innerHTML.substring(0, numberofcharactersonscreen);

    }

}
/*
function formatresult(result, maxlength){

    if (result.toString().length > maxlength){

        let scientificNotation = result.toExponential();
        let parts = scientificNotation.split("e+");
        let mantissa = parts[0];
        let exponent = parts[1];
        let mantissaLength = mantissa.length;
        let shortenedMantissa = mantissaLength > maxlength - exponent.length - 3 ?
            mantissa.substring(0, maxlength - exponent.length - 3) : mantissa;
        return `${shortenedMantissa}e+${exponent}`;

    }
    else{

        return result.toString();

    }

}
*/
function calculateresult(){

    try{

        var expression = math.evaluate(currentinput, { Ans:lastanswer, π:pinumber });
        lastanswer = expression;

        var characterwidth = calculationresultoutputtext.offsetWidth / calculationresultoutputtext.textContent.length;
        var numberofcharactersonscreen = Math.floor(calculationresultdiv.offsetWidth/characterwidth);

        if(lastanswer.toString().length < numberofcharactersonscreen){

            calculationresultoutputtext.innerHTML = lastanswer;

        }
        
        else{

            /*calculationresultoutputtext.innerHTML = math.format(lastanswer, {precision: numberofcharactersonscreen});
            var resultparts = calculationresultoutputtext.textContent.split("e");
            var epart = "e" + resultparts[1];
            calculationresultoutputtext.innerHTML = math.format(lastanswer, {precision: (numberofcharactersonscreen-(epart.length))});
            console.log((numberofcharactersonscreen-(epart.length)));*/

            calculationresultoutputtext.innerHTML = lastanswer.toPrecision(numberofcharactersonscreen-1);
            var resultparts = calculationresultoutputtext.textContent.split("e");
            var epart = "e" + resultparts[1];
            if(epart != "eundefined"){
                
                calculationresultoutputtext.innerHTML = lastanswer.toPrecision(numberofcharactersonscreen-(epart.length));

            }

        }

        //calculationresultoutputtext.innerHTML = formatresult(lastanswer, numberofcharactersonscreen);

    }
    
    catch (error){

        calculationresultoutputtext.innerHTML = "Error";
        //calculationresultoutputtext.innerHTML = error;

    }

    console.log(lastanswer);

    justcalculated = true;

}

window.setInterval(function(){

    showinginputdash = !showinginputdash;
    updateinputfield(showinginputdash);

}, 500);

// KEYBOARD INPUT

document.querySelectorAll(".calcbutton").forEach(function(btn){

    btn.addEventListener("click", function() {
        
        this.blur();

    });

});

document.addEventListener('keydown', function(event) {

    if(event.key == "1"){

        addtoinput("1");

    }

    
    if(event.key == "2"){

        addtoinput("2");

    }

    
    if(event.key == "3"){

        addtoinput("3");

    }

    
    if(event.key == "4"){

        addtoinput("4");

    }

    
    if(event.key == "5"){

        addtoinput("5");

    }

    
    if(event.key == "6"){

        addtoinput("6");

    }

    
    if(event.key == "7"){

        addtoinput("7");

    }

    
    if(event.key == "8"){

        addtoinput("8");

    }

    
    if(event.key == "9"){

        addtoinput("9");

    }

    if(event.key == "0"){

        addtoinput("0");

    }

    if(event.key == "+"){

        addtoinput("+");

    }

    if(event.key == "-"){

        addtoinput("-");

    }

    if(event.key == "*"){

        addtoinput("*");

    }

    if(event.key == "/"){

        addtoinput("/");

    }

    if(event.key == "p" || event.key == "P"){

        addtoinput("π");

    }

    if(event.key == "a" || event.key == "A"){

        addtoinput("Ans");

    }

    if(event.key == "("){

        addtoinput("(");

    }

    if(event.key == ")"){

        addtoinput(")");

    }

    if(event.key == "." || event.key == ","){

        addtoinput(".");

    }

    if(event.key == "ArrowLeft"){

        movecursor(-1);

    }

    if(event.key == "ArrowRight"){

        movecursor(1);

    }

    if(event.key == "Backspace"){

        delinput();

    }

    if(event.key == "Escape"){

        resetcalc();

    }

    if(event.key == "Enter"){

        calculateresult();

    }

});