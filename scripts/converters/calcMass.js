class CalcMass {
    constructor(instance) {
        this.instance = instance;

        if (!this.instance) {
            return
        }   

        this.selectFrom = document.querySelector(InteractiveCalculatorMassCollection.selectors.selectFrom);    
        if (!this.selectFrom) {
          return
        }

        this.selectTo = document.querySelector(InteractiveCalculatorMassCollection.selectors.selectTo);
        if (!this.selectTo) {
          return
        }

        this.btnRes = document.querySelector(InteractiveCalculatorMassCollection.selectors.btnRes);
        if (!this.btnRes) {
          return
        }

        this.initValue = document.querySelector(InteractiveCalculatorMassCollection.selectors.initValue);
        if (!this.initValue) {
          return
        }

        this.result = document.querySelector(InteractiveCalculatorMassCollection.selectors.result);
        if (!this.result) {
            return
        }

        this.error = document.querySelector(InteractiveCalculatorMassCollection.selectors.error);
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
        //Основная ед. - кг
        const objValues = {
            "kg": 1,
            "mg": 1000000,
            "tn": 0.001,
            "zn": 0.01,
            "gr": 1000,
            "uzn": 35.273962,
        }

        //Конвертируем в кг
        if (this.error.innerHTML == '') {
            const value = this.initValue.value.replaceAll(' ', '')
            const valueInKg = Number(value) / objValues[this.selectFrom.value];
            const result = valueInKg * objValues[this.selectTo.value]; 
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

class InteractiveCalculatorMassCollection {
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
        document.querySelectorAll(InteractiveCalculatorMassCollection.selectors.instance).forEach(node => {
            new CalcMass(node);
        });
    }
}

window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorMassCollection();
});