function add(a,b) {
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

const TOKEN_DIV = '/';
const TOKEN_MUL = '*';
const TOKEN_ADD = '+';
const TOKEN_SUB = '-';

function operate(a,b,operator) {
    switch(operator){
        case TOKEN_DIV: return divide(a,b);
        case TOKEN_MUL: return multiply(a,b);
        case TOKEN_SUB: return subtract(a,b); 
        case TOKEN_ADD: return add(a,b);
    }
}

//----------------------------------------------------
let operand1, operand2;
let operator;