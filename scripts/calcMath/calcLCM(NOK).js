class CalcNok {
    constructor(instance) {
        this.instance = instance;
        
        if (!this.instance) {
            return
        }
        this.button = document.querySelector(InteractiveCalculatorNOKCollection.selectors.button);
        if (!this.button) {
            return
        }
        this.textarea = document.querySelector(InteractiveCalculatorNOKCollection.selectors.textarea);
        if (!this.textarea) {
            return
        }
        this.answer = document.querySelector(InteractiveCalculatorNOKCollection.selectors.answer);
        if (!this.answer) {
            return
        }

        this.numbersField = document.querySelector(InteractiveCalculatorNOKCollection.selectors.numbersField);         
        if (!this.numbersField) {
            return
        }

        this.fieldError = document.querySelector(InteractiveCalculatorNOKCollection.selectors.fieldError); 
        if (!this.fieldError) {
            return
        }
        this.textarea.value = '';
        this.init();        
    }
    init() {
        this.validationTextarea(this.textarea);
        this.handlerResult();
    }
    validationTextarea() {
        this.textarea.addEventListener('input', () => {
            const validChars = /^[0-9,\s]*$/;
    
            if (!validChars.test(this.textarea.value)) {                
                this.fieldError.innerHTML = "Недопустимый символ";            
                this.textarea.value = this.textarea.value.slice(0, -1);
            } else {            
                this.fieldError.innerHTML = '';
            }
        });
    }
    handlerResult() {
        this.button.addEventListener('click', () => {
            if (this.textarea.value === '') {
                this.validation();
                return;
            };
            const strNums = this.textarea.value;
            const arrFilter = strNums.split(',').filter((num) => num !== '0');                  
            const arrNums = arrFilter.map((elem) => Number(elem.trim()));
            const resStrNums = arrNums.filter((num) => num != '');
            
            if (resStrNums.length < 2) {
                this.validation();
                return;
            };
            let result = resStrNums[0];
            for (let i = 1; i < resStrNums.length; i++) {
                result = this.calcNok(result,resStrNums[i]);
            }
            this.numbersField.innerHTML = '';        
            this.numbersField.innerHTML = resStrNums.join(',');
                   
            this.answer.innerHTML = '';
            this.answer.innerHTML = result;
        });
    }
    validation() {
        this.fieldError.innerHTML = '';
        this.fieldError.innerHTML = 'Введите 2 или более чисел, нули не засчитываются';
    }
    calcNok(a, b) {    
        return (a * b) / this.calcNod(a, b);
    }
    calcNod(a, b){
        if (b === 0) return a;
        return this.calcNod(b, a % b);
    }
}

class InteractiveCalculatorNOKCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        button: "[data-js-calcnok]",
        textarea: "[data-js-textarea]",
        answer: "[data-js-answer]",
        numbersField: "[data-js-numbers]",
        fieldError: "[data-js-error]",
    }
    constructor() {
        document.querySelectorAll(InteractiveCalculatorNOKCollection.selectors.instance).forEach(node => {
            new CalcNok(node);
        });
    }
}

window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorNOKCollection();
});