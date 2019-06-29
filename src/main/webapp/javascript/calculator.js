var display = document.getElementById('display');
var firstnr = 0;
var result = 0;
var operator = "";

//functies voor de buttons
function myPlus() {
  firstnr = parseFloat(display.innerHTML);
  display.innerHTML = null;
  operator = "+";
  console.log("firstnr:" + firstnr);
}

function myMin() {
  firstnr = parseFloat(display.innerHTML);
  display.innerHTML = null;
  operator = "-";
  console.log("firstnr:" + firstnr);
}

function myProd() {
  firstnr = parseFloat(display.innerHTML);
  display.innerHTML = null;
  operator = "*";
  console.log("firstnr:" + firstnr);
}

function myDiv() {
  firstnr = parseFloat(display.innerHTML);
  display.innerHTML = null;
  operator = "/";
  console.log("firstnr:" + firstnr);
}

function myEquals() {
  if(operator == "+"){
    result = firstnr + parseFloat(display.innerHTML);
    firstnr = 0;
  }else if (operator == "-") {
    result = firstnr - parseFloat(display.innerHTML);
    firstnr = 0;
  }else if (operator == "*") {
    result = firstnr * parseFloat(display.innerHTML);
    firstnr = 0;
  }else if (operator == "/") {
    result = firstnr / parseFloat(display.innerHTML);
    firstnr = 0;
  }else if(display.innerHTML == null) {
    result = "geef een getal!"
  }
 display.innerHTML = result;
 console.log("firstnr: " + firstnr + ", result:" + result);
}

function myClear(){
  result = 0;
  firstnr = 0;
  display.innerHTML = 0;
  console.log("firstnr: " + firstnr + ", result:" + result);
}

function myBtn1() {
    if (display.innerHTML == "0") {
      display.innerHTML = "1";
    }else {
      display.innerHTML += "1";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn2() {
    if (display.innerHTML == "0") {
      display.innerHTML = "2";
    }else {
      display.innerHTML += "2";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn3() {
    if (display.innerHTML == "0") {
      display.innerHTML = "3";
    }else {
      display.innerHTML += "3";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn4() {
    if (display.innerHTML == "0") {
      display.innerHTML = "4";
    }else {
      display.innerHTML += "4";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn5() {
    if (display.innerHTML == "0") {
      display.innerHTML = "5";
    }else {
      display.innerHTML += "5";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn6() {
    if (display.innerHTML == "0") {
      display.innerHTML = "6";
    }else {
      display.innerHTML += "6";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn7() {
    if (display.innerHTML == "0") {
      display.innerHTML = "7";
    }else {
      display.innerHTML += "7";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn8() {
    if (display.innerHTML == "0") {
      display.innerHTML = "8";
    }else {
      display.innerHTML += "8";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn9() {
    if (display.innerHTML == "0") {
      display.innerHTML = "9";
    }else {
      display.innerHTML += "9";
    }
    console.log("firstnr: " + firstnr);
}

function myBtn0() {
    if (display.innerHTML == "0") {
      display.innerHTML = "0";
    }else {
      display.innerHTML += "0";
    }
    console.log("firstnr: " + firstnr);
}

//eventlisteneners toevoegen aan de buttons
//operator listeners
var plus = document.getElementById('btn_plus');
plus.addEventListener('click', myPlus);

var min = document.getElementById('btn_min');
min.addEventListener('click', myMin);

var div = document.getElementById('btn_div');
div.addEventListener('click', myDiv);

var prod = document.getElementById('btn_prod');
prod.addEventListener('click', myProd);

var eq = document.getElementById('btn_eq');
eq.addEventListener('click', myEquals);

var clear = document.getElementById('btn_clear');
clear.addEventListener('click', myClear);


//cijfer listeners
var btn1 = document.getElementById('btn_1');
btn1.addEventListener('click', myBtn1);

var btn2 = document.getElementById('btn_2');
btn2.addEventListener('click', myBtn2);

var btn3 = document.getElementById('btn_3');
btn3.addEventListener('click', myBtn3);

var btn4 = document.getElementById('btn_4');
btn4.addEventListener('click', myBtn4);

var btn5 = document.getElementById('btn_5');
btn5.addEventListener('click', myBtn5);

var btn6 = document.getElementById('btn_6');
btn6.addEventListener('click', myBtn6);

var btn7 = document.getElementById('btn_7');
btn7.addEventListener('click', myBtn7);

var btn8 = document.getElementById('btn_8');
btn8.addEventListener('click', myBtn8);

var btn9 = document.getElementById('btn_9');
btn9.addEventListener('click', myBtn9);

var btn0 = document.getElementById('btn_0');
btn0.addEventListener('click', myBtn0);