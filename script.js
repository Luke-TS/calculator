let currentNum = '';
let operator = '';
let storedNum = '';

const numpad = [...document.querySelectorAll('.num-btn')];
numpad.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.textContent);
        currentNum += btn.textContent;
        console.log(currentNum);
        if(!storedNum) {
            display(currentNum);
        } else {
            display(storedNum, operator, currentNum);
        }
    });
});

const operators = [...document.querySelectorAll('#operators button')];
operators.forEach(btn => {
    btn.addEventListener('click', () => {
        if(currentNum && !storedNum) {
            operator = btn.textContent;
            display(currentNum, operator);
            storedNum = currentNum;
            currentNum = '';
        } else if (currentNum && storedNum) {
            storedNum = operate(storedNum, currentNum, operator);
            operator = btn.textContent;
            currentNum = '';
            display(storedNum, operator);
        };
    });
});

const screen = document.getElementById('screen');
function display(...args) {
    for(let i = 0; i < args.length; i+=2) {
        if(Math.round(args[i]) !== args[i]) {
            args[i] = Math.round(args[i] * 1000) / 1000;
        }
    };
    screen.textContent = args.join('');
}

let clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    display('');
    storedNum = '';
    currentNum = '';
    operator = '';
});

const equalBtn = document.getElementById('equal-btn');
equalBtn.addEventListener('click', () => {
    operate(storedNum, currentNum, operator);
});
function operate(num1, num2, operator) {
    let val = 'ERROR';
    switch (operator) {
        case '+':
            val = add(num1, num2);
            break;
        case '-':
            val = sub(num1, num2);
            break;
        case '*':
            val = multiply(num1, num2);
            break;
        case '/':
            val = divide(num1, num2);
            break;
        default:
            console.log('invalid operator');
            break;
    };
    currentNum = val;
    storedNum = '';
    display(currentNum)
    return val;
};

function add(a, b) {return +a + +b};
function sub(a, b) {return a-b};
function multiply(a, b) {return a * b};
function divide(a, b) {
    if (b == 0) {
        console.log('divide by 0 error');
        storedNum = '';
        currentNum = '';
        operator = '';
        return NaN;
    } else {
        return a / b;
    };
};
