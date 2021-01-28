class Calculator{

    constructor(previousTextElement, currentTextElement){
        this.previousTextElement = previousTextElement 
        this.currentTextElement = currentTextElement 
        this.clear()
    }
    clear() {
        this.previousOperand = '' 
        this.currentOperand = '' 
        this.operation = undefined 
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand + this.operation.toString()
        this.currentOperand = ''

    }
    compute(){
        let computation
        let prev = parseFloat(this.previousOperand)
        let curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return
        if(this.operation === '+') computation = (prev + curr).toString()
        if(this.operation === '-') computation = (prev - curr).toString()
        if(this.operation === '/') computation = (prev / curr).toString()
        if(this.operation === '*') computation = (prev * curr).toString()
        if(this.operation != '+' && this.operation != '/' && this.operation != '*' && this.operation != '-') return
        if(this.previousOperand.includes('.') || this.currentOperand.includes('.')){
            if(!computation.includes('.')) computation = computation + '.' + '0'
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay(){
        this.currentTextElement.innerText = this.currentOperand 
        this.previousTextElement.innerText = this.previousOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operation]') 
const equalsButton = document.querySelector('[data-equals]') 
const deleteButton = document.querySelector('[data-delete]') 
const allClearButton = document.querySelector('[data-all-clear]') 
const previousTextElement = document.querySelector('[data-previous]') 
const currentTextElement = document.querySelector('[data-current]') 

const calculator = new Calculator(previousTextElement, currentTextElement) 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
 })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
 })

 equalsButton.addEventListener('click', button => {
     calculator.compute()
     calculator.updateDisplay()
 })

 allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})