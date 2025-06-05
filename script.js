// Calculator display reference
const display = document.getElementById('display');

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

/* Calculates the result of the expression in the display */
function calculate() {
  try {
    // Evaluate the expression and update display
    const result = eval(display.value);
    // Handle division by zero
    if (!isFinite(result)) {
      throw new Error('Division by zero');
    }
    display.value = result;
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
});
