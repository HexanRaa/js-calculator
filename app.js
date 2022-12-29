const equal = document.querySelector("#equal");
const clear = document.querySelector("#allclear");
const del = document.querySelector("#del");
const currentDisplay = document.querySelector(".currentNumbers");
const prevDisplay = document.querySelector(".previousNumbers");
const decimalPoint = document.querySelector(".decimalpoint");
const numberButtons = document.querySelectorAll(`[data-number]`);
const operatorButtons = document.querySelectorAll(`[data-operation]`);
let firstNumber = 0;
let secondNumber = 0;
let currentOperator = "";
let currentOperation = "";

numberButtons.forEach(button => {
  button.addEventListener("click", () => displayNumbers(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => displayOperators(button.textContent));
});

equal.addEventListener("click", () => {
  secondNumber = currentDisplay.textContent;
  operate(currentOperator, firstNumber, secondNumber);
});

function displayNumbers(number) {
  currentDisplay.textContent += number;
}

function displayOperators(operator) {
  if (
    currentOperation.includes("+") ||
    currentOperation.includes("−") ||
    currentOperation.includes("×") ||
    currentOperation.includes("÷")
  ) {
    operate(currentOperator, firstNumber, currentDisplay.textContent);
    firstNumber = currentDisplay.textContent;
    currentDisplay.textContent += " " + operator;
    currentOperator = operator;
    currentOperation = `${firstNumber} ${currentOperator} ${secondNumber}`;
    prevDisplay.textContent = currentOperation;
    currentDisplay.textContent = "";
  } else {
    firstNumber = currentDisplay.textContent;
    currentDisplay.textContent += " " + operator;
    currentOperator = operator;
    currentOperation = `${firstNumber} ${currentOperator}`;
    prevDisplay.textContent = currentOperation;
    currentDisplay.textContent = "";
    return firstNumber, currentOperator, currentOperation;
  }
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      currentDisplay.textContent = roundResult(add(num1, num2));
      prevDisplay.textContent = `${num1} ${operator} ${num2}`;
      break;
    case "−":
      currentDisplay.textContent = roundResult(subtract(num1, num2));
      prevDisplay.textContent = `${num1} ${operator} ${num2}`;
      break;
    case "×":
      currentDisplay.textContent = roundResult(multiply(num1, num2));
      prevDisplay.textContent = `${num1} ${operator} ${num2}`;
      break;
    case "÷":
      if (num1 === 0 || num2 === 0) {
        currentDisplay.textContent = "ERROR";
        firstNumber = null;
        secondNumber = null;
        currentOperator = null;
        currentOperation = null;
      } else {
        currentDisplay.textContent = roundResult(divide(num1, num2));
        prevDisplay.textContent = `${num1} ${operator} ${num2}`;
      }
      break;
  }
  currentOperation = "";
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

clear.addEventListener("click", allClear);

function allClear() {
  currentDisplay.textContent = "";
  prevDisplay.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  currentOperation = "";
}

del.addEventListener("click", deleteChar);

function deleteChar() {
  currentDisplay.textContent = currentdisplay.textContent.substring(
    0,
    currentDisplay.textContent.length - 1
  );
}

decimalPoint.addEventListener("click", () =>
  displayDecimal(decimalPoint.textContent)
);

// DISPLAYING DECIMAL POINT
function displayDecimal(point) {
  if (currentDisplay.textContent.includes(".")) {
    return "";
  } else currentDisplay.textContent += ".";
}

//NUMBERS FROM KEYBOARD
window.addEventListener("keydown", numbersFromKeyboard);

function numbersFromKeyboard(e) {
  if (e.key >= 0 && e.key <= 9) displayNumbers(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    displayOperators(convertOperators(e.key));
  if (e.key === ".") displayDecimal(e.key);
  if (e.key === "Backspace") deleteNumbers();
  if (e.key === "Delete") allClear();
  if (e.key === "Enter") {
    operate(currentOperator, firstNumber, currentDisplay.textContent);
    firstNumber = currentDisplay.textContent;
    currentDisplay.textContent += " " + operator;
    currentOperator = operator;
    currentOperation = `${firstNumber} ${currentOperator}`;
    prevDisplay.textContent = currentOperation;
  }
}

function convertOperators(operator) {
  if (operator === "+") return "+";
  if (operator === "-") return "−";
  if (operator === "*") return "×";
  if (operator === "/") return "÷";
}
