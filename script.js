document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const keys = document.querySelectorAll('.key');

  let displayValue = '0';
  let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;

  const updateDisplay = () => {
      display.textContent = displayValue;
  }

  keys.forEach(key => {
      key.addEventListener('click', () => {
          const { action } = key.dataset;
          const keyValue = key.textContent;

          if (!action) {
              if (displayValue === '0' || waitingForSecondValue) {
                  displayValue = keyValue;
                  waitingForSecondValue = false;
              } else {
                  displayValue += keyValue;
              }
          } else {
              switch (action) {
                  case 'clear':
                      displayValue = '0';
                      firstValue = null;
                      operator = null;
                      waitingForSecondValue = false;
                      break;
                  case 'delete':
                      displayValue = displayValue.slice(0, -1) || '0';
                      break;
                  case 'decimal':
                      if (!displayValue.includes('.')) {
                          displayValue += '.';
                      }
                      break;
                  case 'add':
                  case 'subtract':
                  case 'multiply':
                  case 'divide':
                      if (firstValue && operator && waitingForSecondValue) {
                          operator = action;
                          return;
                      }
                      if (firstValue === null) {
                          firstValue = parseFloat(displayValue);
                      } else if (operator) {
                          const result = performCalculation(firstValue, parseFloat(displayValue), operator);
                          displayValue = `${result}`;
                          firstValue = result;
                      }
                      operator = action;
                      waitingForSecondValue = true;
                      break;
                  case 'equals':
                      if (firstValue !== null && operator) {
                          displayValue = `${performCalculation(firstValue, parseFloat(displayValue), operator)}`;
                          firstValue = null;
                          operator = null;
                          waitingForSecondValue = false;
                      }
                      break;
              }
          }
          updateDisplay();
      });
  });

  const performCalculation = (first, second, operator) => {
      switch (operator) {
          case 'add':
              return first + second;
          case 'subtract':
              return first - second;
          case 'multiply':
              return first * second;
          case 'divide':
              return first / second;
          default:
              return second;
      }
  }

  updateDisplay();
});
