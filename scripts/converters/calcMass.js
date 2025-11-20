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

        this.init()
    }

    init() {
        this.btnRes.addEventListener('click', () => this.convert());
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
        const valueInKg = Number(this.initValue.value) / objValues[this.selectFrom.value];
        const result = valueInKg * objValues[this.selectTo.value];
        console.log(result);
    }
    
}

class InteractiveCalculatorMassCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        selectFrom: "[data-js-selectFrom]",
        selectTo: "[data-js-selectTo]",
        btnRes: "[data-js-res]",
        initValue: "[data-js-value]",
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