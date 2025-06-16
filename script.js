// Calculator display reference
const display = document.getElementById('display');

// Array to store calculation history
let calculationHistory = [];

/**
 * Saves a calculation to history
 * @param {string} expression - The calculation expression
 * @param {number} result - The calculation result
 */
function saveToHistory(expression, result) {
  calculationHistory.push({
    expression: expression,
    result: result,
    timestamp: new Date().toLocaleTimeString()
  });
}

/**
 * Displays the calculation history
 */
function showHistory() {
  if (calculationHistory.length === 0) {
    document.getElementsByClassName('history-empty').innerHTML = '';
    const historyEmpty = document.querySelector('.history-empty');
    historyEmpty.textContent = 'No calculation history available';
  }

  // Clear the history list
  const historyList = document.querySelector('ul');
  historyList.innerHTML = '';

  // Create a list item for each calculation
  calculationHistory.forEach((calc, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${calc.expression} = ${calc.result} (${calc.timestamp})`;
    historyList.appendChild(listItem);
  });
}

/**
 * Appends a number to the calculator display
 * @param {string} number - The number to append
 */
function appendNumber(number) {
  display.value += number;
}

/**
 * Appends an operator to the calculator display
 * Handles operator replacement if the last character is already an operator
 * @param {string} operator 
 */
function appendOperator(operator) {
  const lastChar = display.value.slice(-1);

  if ('+-*/%'.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + operator;
  } else {
    display.value += operator;
  }
}

/**
 * Clears the calculator display
 */
function clearDisplay() {
  display.value = '';
}

/**
 * Deletes the last character from the display
 */
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/**
  * Clears the display after an error or when Escape is pressed
 */
function clearDisplay() {
  display.value = '';
}

/* Calculates the result of the expression in the display */
function calculate() {
  try {
    const expression = display.value;
    // Evaluate the expression and update display
    const result = eval(expression);
    // Handle division by zero
    if (!isFinite(result)) {
      throw new Error('Division by zero');
    }
    display.value = result;
    // Save to history after successful calculation
    saveToHistory(expression, result);
  } catch (error) {
    display.value = 'Error';
    // Clear the error after 1.5 seconds
    setTimeout(clearDisplay, 1500);
  }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  
  // Handle number keys and decimal point
  if (/^[0-9.]$/.test(key)) {
    appendNumber(key);
  }
  // Handle operators
  else if (['+', '-', '*', '/', '%'].includes(key)) {
    appendOperator(key);
  }
  // Handle power operator
  else if (key === '^') {
    appendOperator('**');
  }
  // Handle equals and Enter key
  else if (key === '=' || key === 'Enter') {
    calculate();
  }
  // Handle backspace
  else if (key === 'Backspace') {
    deleteLast();
  }
  // Handle Escape key to clear
  else if (key === 'Escape') {
    clearDisplay();
  }
  // Handle 'h' key to show history
  else if (key === 'h' || key === 'H') {
    showHistory();
  }
});
