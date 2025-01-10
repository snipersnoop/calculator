// Initialize variables
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
const switch1 = document.getElementById('switch1');
const switch2 = document.getElementById('switch2');
const switch3 = document.getElementById('switch3');

switch1.addEventListener('click', () => {
  if (switch2.hasAttribute('checked')) {
    switch2.removeAttribute('checked');
  }
  if (switch3.hasAttribute('checked')) {
    switch3.removeAttribute('checked');
  }
  switch1.setAttribute('checked', '');
  if (switch1.hasAttribute('checked')) {
    document.documentElement.setAttribute('data-theme', 'first');
  }
});

switch2.addEventListener('click', () => {
  if (switch1.hasAttribute('checked')) {
    switch1.removeAttribute('checked');
  }
  if (switch3.hasAttribute('checked')) {
    switch3.removeAttribute('checked');
  }
  switch2.setAttribute('checked', '');
  if (switch2.hasAttribute('checked')) {
    document.documentElement.setAttribute('data-theme', 'second');
  }
});

switch3.addEventListener('click', () => {
  if (switch1.hasAttribute('checked')) {
    switch1.removeAttribute('checked');
  }
  if (switch2.hasAttribute('checked')) {
    switch2.removeAttribute('checked');
  }
  switch3.setAttribute('checked', '');
  if (switch3.hasAttribute('checked')) {
    document.documentElement.setAttribute('data-theme', 'third');
  }
});



// Functions
function reset() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}

function deleteLast() {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0') {
    currentOperand = number.toString();
  } else {
    currentOperand += number.toString();
  }
  updateDisplay();
}

function chooseOperation(selectedOperation) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operation = undefined;
  previousOperand = '';
  updateDisplay();
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandTextElement.innerText = '';
  }
}

// Event listeners
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton = document.querySelector('[data-reset]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
  });
});

equalsButton.addEventListener('click', () => {
  compute();
});

resetButton.addEventListener('click', () => {
  reset();
});

deleteButton.addEventListener('click', () => {
  deleteLast();
});

// Initialize display
updateDisplay();
