class CalcLength {
    constructor(instance) {
        this.instance = instance;

        if (!this.instance) {
            return
        }   

        this.selectFrom = document.querySelector(InteractiveCalculatorLengthCollection.selectors.selectFrom);    
        if (!this.selectFrom) {
          return
        }

        this.selectTo = document.querySelector(InteractiveCalculatorLengthCollection.selectors.selectTo);
        if (!this.selectTo) {
          return
        }

        this.btnRes = document.querySelector(InteractiveCalculatorLengthCollection.selectors.btnRes);
        if (!this.btnRes) {
          return
        }

        this.initValue = document.querySelector(InteractiveCalculatorLengthCollection.selectors.initValue);
        if (!this.initValue) {
          return
        }

        this.result = document.querySelector(InteractiveCalculatorLengthCollection.selectors.result);
        if (!this.result) {
            return
        }

        this.error = document.querySelector(InteractiveCalculatorLengthCollection.selectors.error);
        if (!this.error) {
            return
        }

        this.init()
    }

    init() {
        this.btnRes.addEventListener('click', () => this.convert());
        this.validation();
    }
    
    convert() {
        //Основная ед. - метр
        const objValues = {
            "m": 1,
            "mm": 1000,
            "sm": 100,
            "dm": 10,
            "km": 0.001,            
        }

        //Конвертируем в м
        if (this.error.innerHTML == '') {
            const value = this.initValue.value.replaceAll(' ', '');         
            const valueInM = Number(value) / objValues[this.selectFrom.value];           
            const result = valueInM * objValues[this.selectTo.value];             
            this.writeResult(result);  
        } else {
            return
        }            
    }    
    writeResult(value){
        this.result.innerHTML = '';
        this.result.innerHTML = value;
    }
    validation() {
        this.initValue.addEventListener('input', () => {            
            const validChars = /^[0-9,\s]*$/;
            
            if (!validChars.test(this.initValue.value) || this.initValue.value === '') {                
                this.error.innerHTML = "Недопустимый символ или поле должно быть заполнено";            
                this.initValue.value = this.initValue.value.slice(0, -1);               
            } else {            
                this.error.innerHTML = '';
            }
        })
    }
    
}

class InteractiveCalculatorLengthCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        selectFrom: "[data-js-selectFrom]",
        selectTo: "[data-js-selectTo]",
        btnRes: "[data-js-res]",
        initValue: "[data-js-value]",
        result: "[data-js-result]",
        error: "[data-js-error]"
    }
    constructor() {
        document.querySelectorAll(InteractiveCalculatorLengthCollection.selectors.instance).forEach(node => {
            new CalcLength(node);
        });
    }
}

window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorLengthCollection();
});