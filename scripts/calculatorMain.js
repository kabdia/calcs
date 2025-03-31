class CalculatorMain {
    constructor(instance) {
        this.instance = instance;
        
        if (!this.instance) {
            return
        }          

        this.createCalculator();

        this.windowCalc = document.querySelector(InteractiveCalculatorCollection.selectors.windowCalc);
        if (!this.windowCalc) {
            return
        }
        this.windowHistory = document.querySelector(InteractiveCalculatorCollection.selectors.windowHistory);
        if (!this.windowHistory) {
            return
        }
        this.finish = false;
        this.num = 0;
        this.instance.addEventListener('click', this.handlerCalc.bind(this));
        
    }

    createCalculator() {
        const calc = `
        <div class="calculator__instance_body">
            <div class="calculator__data">
                <textarea class="calculator__data__output" data-output readonly> </textarea>
                <textarea class="calculator__data__input" data-input readonly>0</textarea>
            </div>
            <div class="calculator__btn">                       
                
                <div class="btn" data-operator="CE">CE</div>                
                <div class="btn" data-operator="backspace"><</div>
                                             
                <div class="btn" data-operator="/">/</div>
                <div class="btn" data-value="7">7</div>
                <div class="btn" data-value="8">8</div>
                <div class="btn" data-value="9">9</div>               
                <div class="btn" data-value="4">4</div>
                <div class="btn" data-value="5">5</div>
                <div class="btn" data-value="6">6</div>
                <div class="btn" data-operator="-">-</div>
                <div class="btn" data-value="1">1</div>
                <div class="btn" data-value="2">2</div>
                <div class="btn" data-value="3">3</div>
                <div class="btn" data-operator="+">+</div>               
                <div class="btn" data-value="0">0</div>
                <div class="btn" data-operator=",">,</div>
                <div class="btn" data-operator="=">=</div>              
            </div>
        </div>`
        
        this.instance.insertAdjacentHTML('afterBegin', calc);
    }

    handlerCalc(e) {
        const elem = e.target;
        this.handlerInput(elem);        
    }

    handlerInput(elem) {                
        if (elem.hasAttribute('data-value')) {
            if (this.finish === true) {
                this.windowCalc.innerHTML = '';
                this.finish = false;
            }
            if (this.windowCalc.innerHTML === "0") {
                this.windowCalc.innerHTML = '';  
                this.windowCalc.innerHTML = elem.dataset.value;              
            } else {                
                this.windowCalc.innerHTML += elem.dataset.value;
            }            
        } else if (elem.hasAttribute('data-operator')) {          
            this.makeOperation(elem);           
        }     
    }
    makeOperation(elem) {        
        const operator = elem.dataset.operator;    
        const currentValue = +this.windowCalc.innerHTML;  
        console.debug(operator, currentValue)      
        switch (operator) {            
            case 'CE': 
                this.clearInput(); 
                break;
            case 'backspace': console.debug('backspace'); break;                
            case '/': 
                this.showHistory(this.num, operator); 
                this.num /= currentValue;                
                this.finish = true;            
                break;
            case '-':  
                this.showHistory(this.windowCalc.innerHTML, operator); 
                this.num -= currentValue;                                 
                this.finish = true;
                break;
            case '+':               
                this.showHistory(this.windowCalc.innerHTML, operator); 
                this.num += currentValue;                                
                this.finish = true;
                break;            
            case ',': console.debug(','); break;
            case '=': 
                switch (this.lastOperator) {
                    case '+':
                        this.num += currentValue;  // Сложение
                        break;
                    case '-':
                        this.num -= currentValue;  // Вычитание
                        break;
                    case '/':
                        this.num /= currentValue;  // Деление
                        break;
                    case '*':
                        this.num *= currentValue;  // Умножение (если будет добавлена кнопка *)
                        break;
                    default:
                        break;
                }
                this.getTotal(operator); 
                break;
        }

        if (operator === '+' || operator === '-' || operator === '/' || operator === '*') {
            this.lastOperator = operator;
        }
    }
    clearInput() {
        this.windowHistory.innerHTML = '';
        this.windowCalc.innerHTML = "0";
        this.num = 0;
    }  
    changePlusMinus() {

    }
    getTotal(operator) {          
        this.showHistory(this.windowCalc.innerHTML, operator);
        this.windowCalc.innerHTML = this.num;
    }
    showHistory(value, operator) {  
        if (this.windowHistory.innerHTML === "") {            
            this.windowHistory.innerHTML = value + '' + operator;
        } else {
            this.windowHistory.innerHTML += value + '' + operator;            
        }
        
    }
    
}

class InteractiveCalculatorCollection {

    static selectors = {
        instance:  "[data-js-calculator]",        
        windowCalc: "[data-input]",
        windowHistory: "[data-output]",
    }

    constructor() {
        document.querySelectorAll(InteractiveCalculatorCollection.selectors.instance).forEach(node => {
            new CalculatorMain(node);
        })
    }
}


window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorCollection()

});