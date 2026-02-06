// basic maths operation
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0) return "wrong"
    return a / b
}

// create variable
let firstNumber = ''
let myOperator = null
let secondNumber = ''
let shouldResetScreen = false

// operate function
function operate(operator,a,b){
    switch(operator){
        case '+': return add(a, b);
        case '-': return subtract(a,b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null; 
    }
}

// DOM selection
const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");

const clearButton = document.querySelector(".clear");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal")
const equalsButton = document.querySelector(".equal");

// Display helpers
function updateDisplay(){
    currentDisplay.textContent = currentDisplay.textContent || '0'
}

function clearDisplay(){
    firstNumber = ''
    secondNumber = ''
    myOperator = null
    currentDisplay.textContent = '0'
    previousDisplay.textContent = ''
}

// Number input
numberButton.forEach(button => {
    button.addEventListener("click", () => {
        if(shouldResetScreen){
            currentDisplay.textContent = ''
            shouldResetScreen = false
        }currentDisplay.textContent += button.textContent;
        updateDisplay(); 
    })
})

// decimal input
decimalButton.addEventListener("click", () => {
    if (currentDisplay.textContent.includes('.')) return;
    
    currentDisplay.textContent += '.';
})

// operator button
operatorButton.forEach(button => {
    button.addEventListener("click", () => {
        if(myOperator !== null) evaluate();

        firstNumber = currentDisplay.textContent;

        if(button.textContent === "x"){
            myOperator = "*"
        }else{
            myOperator = button.textContent 
        }

        previousDisplay.textContent = `${firstNumber} ${myOperator}`;
        shouldResetScreen = true
    })
})

// evaluation logic
function evaluate(){
    if(!myOperator || shouldResetScreen) return;
    
    secondNumber = currentDisplay.textContent;
    
    let result = operate(myOperator, Number(firstNumber), Number(secondNumber));

    if(typeof result === "number"){
        result = Math.round(result * 100000) / 100000;
    }

    currentDisplay.textContent = result
    previousDisplay.textContent = ""
    myOperator = null
    shouldResetScreen = true
}

// equal and clear function
equalsButton.addEventListener('click', evaluate);

clearButton.addEventListener('click', clearDisplay);
