//Setting up calculator class. In this class, I placed a constructor that will take all the inputs for it and all the calculator function
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.MAX_DIGITS = 12;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (number === '.' && this.currentOperand === '0') {
            this.currentOperand = '0.';
        } else {
            if (this.currentOperand.length > 0) {
                let digits = this.getDigits();
                if (digits.length < this.MAX_DIGITS) {
                    this.currentOperand += number;
                }
            } else {
                this.currentOperand += number;
            }
        }
         
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                if (current === 0){
                    alert("Cannot divide by 0!");
                }
                computation = prev / current
                break   
            default:
                return     
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getPercent() {
        const currentNum = parseFloat(this.currentOperand);
        this.currentOperand = (currentNum / 100);
    }

    getDisplayNumber(number) {
        if (isNaN(number)) {
            this.clear();
            return;
        }
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.'[0]));
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay = '';
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay()  {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + ' ' + (this.operation || '');
      
        const currentOperandLength = this.currentOperand.toString().replace('.', '').replace('-', '').length;
        if (currentOperandLength > 12) {
            this.currentOperandTextElement.style.fontSize = '20px';
        } else {
            this.currentOperandTextElement.style.fontSize = '30px';
        }
    }

    getDigits() {
        let numberPattern = /\d+/g;
        return this.currentOperand.match(numberPattern).join('');
    }
}

// Selecting Elements from the html file 
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const percentButton = document.querySelector('[data-percent]');
const currentOperandTextElement = document.querySelector('[data-current-operand]'); 

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  })

  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })

  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })

  percentButton.addEventListener('click', button => {
    calculator.getPercent();
    calculator.updateDisplay();
  })


  

