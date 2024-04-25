const NUMBER = '8';
const PRINT = '=';


class Token{
    constructor(kind, val = 0){
        this.kind = kind;
        this.val = val;
    }
}

class Token_stream{
    constructor(){
        this.full=false;
        this.bufferToken=null;
    }
    ignore(char) {
        if(this.full && this.bufferToken == char.kind) return this.full=false;
        this.full=false;

        let nextChar = 0;
        while(nextChar = displayBuffer.pop() && nextChar!=undefined){
            if(nextChar == char) return;
        }
    }

    unget(token) {
        this.full = true;
        this.bufferToken = token;
    }

    get() {
        if(this.full) {this.full = false; return this.bufferToken;}

        let char = displayBuffer.pop();


        switch(char){

            case PRINT:
            case '(':
            case ')':
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                return new Token(char);

            case '.': // numbers
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                {
                    while(true) {
                        let nextChar = displayBuffer.pop();
                        if (nextChar === '.' || !isNaN(parseInt(nextChar))) char += nextChar;
                        else {
                            displayBuffer.push(nextChar); // Put back the non-numeric character
                            break;
                        }
                    }
                    return new Token(NUMBER, parseFloat(char))
                }
            default:
                return new Token(PRINT);

        }
    }
}


//------------------------------------------------------

function primary(ts){
    let t = ts.get();
    console.log(t);
    if(typeof t === 'undefined') return;
    switch(t.kind){
        case '-': return 0-primary(ts);
        case NUMBER: return t.val;
        default:
            return displayBuffer = "0".split('');   
    }
}

function term(ts){
    
    let left = primary(ts);
    let t = ts.get();
    
    console.log(t);
    while(true) {
        switch(t.kind) {
            case'*':
                left *= primary(ts);
                t = ts.get();
                break;
            case'/':
                let d = primary(ts);
                if(d==0) return displayBuffer.textContent = "Divide by zero";
                left /= d;
                t = ts.get();
                break;
            default:
                ts.unget(t);
                return left;
        }
    }
}

function expression(ts){
    let left = term(ts);
    let t = ts.get();
    console.log(t);
    while(true) {
        switch(t.kind) {
            case'+':
                left+=term(ts);
                t=ts.get();
                break;
            case '-':
                left-=term(ts);
                t=ts.get();
                break;
            default:
                ts.unget(t);
                return left;
        }
    }
}

function calculate(ts) {
    
    displayBuffer.reverse();
    result = expression(ts);
    displayBuffer = result.toString().split('');
}

//------------------------------------------------------
let displayBuffer = [];

//----------------------------------------------------
const calcButtons = Array.from(document.querySelectorAll("button"));
const calcDisplay = document.querySelector(".calc-display");
calcButtons.forEach(button => {
    button.addEventListener("click", () => updateDisplayBuffer(button))
})

function updateDisplayBuffer(button) {
    switch(button.className){
        case'N':case'O':
            displayBuffer.push(button.value);
            break;
        case'=':
            let ts = new Token_stream();
            calculate(ts);
            break;
        case'CE':
            displayBuffer.pop();
            break;
        case'AC':
            clearDisplayBuffer();
            break;
        }
    calcDisplay.textContent=displayBuffer.join('');
    if(button.className == '=') clearDisplayBuffer(); 
}

function clearDisplayBuffer() {
    displayBuffer = [];
}