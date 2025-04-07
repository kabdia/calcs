class CalcPercent {
    constructor(instance) {
        this.instance = instance;
        if (!this.instance) {
            return
        }
        this.select =  document.querySelector(InteractiveCalculatorPercentCollection.selectors.select);
        if (!this.select) {
            return
        }
        this.selectRound = document.querySelector(InteractiveCalculatorPercentCollection.selectors.selectRound);
        if (!this.selectRound) {
            return
        }
        this.input1 = document.querySelector(InteractiveCalculatorPercentCollection.selectors.input1);
        if (!this.input1) {
            return
        }
        this.span = document.querySelector(InteractiveCalculatorPercentCollection.selectors.span);
        if (!this.span) {
            return
        }
        this.input2 = document.querySelector(InteractiveCalculatorPercentCollection.selectors.input2);
        if (!this.input2) {
            return
        }
        this.result = document.querySelector(InteractiveCalculatorPercentCollection.selectors.result);
        if (!this.result) {
            return
        }
        this.button = document.querySelector(InteractiveCalculatorPercentCollection.selectors.button);
        if (!this.button) {
            return
        }
        this.error = document.querySelector(InteractiveCalculatorPercentCollection.selectors.error);
        this.placeholders = {
            'type1': ['процент','от','числа'],
            'type2': ['число 1', 'от', 'число 2'],
            'type3': ['число', '+', 'процент'],
            'type4': ['число', '-', 'процент'],
            'type5': ['число 1','>','число 2'],
            'type6': ['число 1','<','число 2'],
        }
        this.numRound = 0;
        this.init(); 
    }
   init() {         
        this.doChoice();
        this.doCalc();
        this.numRound = this.setNumRoundResult();
        this.validationInput(this.input1, this.input2);        
   }
   doChoice() {
        this.select.addEventListener('change', (e) => {            
            const value = e.target.value;     
            this.writePlaceholder(value);    
            this.result.innerHTML = '';
            this.selectRound.value = 0;        
        });        
   }
   writePlaceholder(value){
        this.input1.value = '';
        this.span.innerHTML = '';
        this.input2.value = '';

        const words = this.placeholders[value];       
        this.input1.placeholder = words[0];
        this.span.innerHTML = words[1];
        this.input2.placeholder = words[2];        
   }   
   doCalc() {
    this.button.addEventListener('click', () => {
        
       
        const valueSelect = this.select.value;
        this.result.innerHTML = '';
        switch (valueSelect) {
            case 'type1': {                     
                const result = this.getPercentageOfNumber();
                this.result.innerHTML = result.toFixed(this.numRound);
                break;
            }
            case 'type2': {
                const result = this.getPercentageOfNumberFromNumber();
                this.result.innerHTML = `${result.toFixed(this.numRound)}%`;
                break;
            }
            case 'type3': {
                const result = this.getPercentageAddNumber();
                this.result.innerHTML = result.toFixed(this.numRound);
                break;
            }
            case 'type4': {
                const result = this.getPercentageMinusNumber();
                this.result.innerHTML = result.toFixed(this.numRound);
                break;               
            }
            case 'type5': {
                const result = this.getPercentageMore();
                this.result.innerHTML = `${result.toFixed(this.numRound)}%`;
                break;
            }
            case 'type6': {
                const result = this.getPercentageLess();
                this.result.innerHTML = `${result.toFixed(this.numRound)}%`;
                break;
            }
        }
    });    
   }
   /* нахождение процента от числа*/ 
   getPercentageOfNumber() {    
        const percent = this.input1.value;
        const number = this.input2.value;        
        return (number * percent) / 100;
   }
   /*нахождение процента числа от числа*/
   getPercentageOfNumberFromNumber() {        
        const number1 = this.input1.value;
        const number2 = this.input2.value;        
        return (number1 / number2) * 100;
   }
   /*Добавить процент к числу*/
   getPercentageAddNumber() {
        const number = this.input1.value;
        const percent = this.input2.value;
        return number * (1 + (percent / 100));
   }
   /*Вычесть из числа процент*/
   getPercentageMinusNumber() {
        const number = this.input1.value;
        const percent = this.input2.value;
        return number * (1 - (percent / 100));
    }
    /*насколько процентов одно число больше другого*/
    getPercentageMore() {
        const number1 = this.input1.value;
        const number2 = this.input2.value;
        return (number1/number2) * 100 - 100;
    }
    /*насколько процентов одно число меньше другого*/
    getPercentageLess() {
        const number1 = this.input1.value;
        const number2 = this.input2.value;
        return 100 - (number1/number2 * 100);
    }
    setNumRoundResult() {
    this.selectRound.addEventListener('change', (e) => {
        this.numRound = e.target.value;
        return e.target.value;        
    });    
   }
   validationInput(input1, input2) {
    
    const inputs = [input1, input2];
    for (const input of inputs) {
        input.addEventListener('input', () => {
            const validChars = /^[0-9,\s]*$/;

            if (!validChars.test(input1.value) || !validChars.test(input2.value)) {                
                this.error.innerHTML = "Недопустимый символ";
                this.button.disabled = true;                            
            } else {            
                this.error.innerHTML = '';    
                this.button.disabled = false;            
            }
        });
    }    
}
}

class InteractiveCalculatorPercentCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        input1: "[data-js-input1]",
        input2: "[data-js-input2]",
        select: "[data-js-select]",
        selectRound: "[data-js-round]",
        span: "[data-js-span]",
        result: "[data-js-result]",
        button: "[data-js-calcpercent]",
        error: "[data-js-error]",
    }
    constructor() {
        document.querySelectorAll(InteractiveCalculatorPercentCollection.selectors.instance).forEach(node => {
            new CalcPercent(node);
        });
    }
}

window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorPercentCollection();
});