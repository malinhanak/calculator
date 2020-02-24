class Calculator {
  constructor(previous, current) {
    this.previous = previous;
    this.current = current;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }
  getDisplayNumber(number) {
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

  updateDisplay() {
    this.current.innerText = this.getDisplayNumber(this.currentOperand);
    this.previous.innerText = this.previousOperand;
    if (this.operation != null) {
      this.previous.innerText = `${this.getDisplayNumber(
        this.previousOperand,
      )} ${this.operation}`;
    } else {
      this.previous.innerText = '';
    }
  }
}

const numerical = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operand]');
const del = document.querySelector('[data-delete]');
const clearAll = document.querySelector('[data-all-clear]');
const equal = document.querySelector('[data-equal]');
const current = document.querySelector('[data-current]');
const previous = document.querySelector('[data-previous]');

const calculator = new Calculator(previous, current);

numerical.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equal.addEventListener('click', (btn) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAll.addEventListener('click', (btn) => {
  calculator.clear();
  calculator.updateDisplay();
});

del.addEventListener('click', (btn) => {
  calculator.delete();
  calculator.updateDisplay();
});
