class CalcIMT {
    constructor(instance) {
        this.instance = instance;

        if (!this.instance) {
            return
        }   

        this.selectPerson = document.querySelector(InteractiveCalculatorIMTCollection.selectors.selectPerson);    
        if (!this.selectPerson) {
          return
        }

        this.valueHeight = document.querySelector(InteractiveCalculatorIMTCollection.selectors.valueHeight);
        if (!this.valueHeight) {
          return
        }

        this.valueWeight = document.querySelector(InteractiveCalculatorIMTCollection.selectors.valueWeight);
        if (!this.valueWeight) {
          return
        }

        this.valueRes = document.querySelector(InteractiveCalculatorIMTCollection.selectors.valueRes);
        if (!this.valueRes) {
          return
        } 
        
        this.valueResStatus = document.querySelector(InteractiveCalculatorIMTCollection.selectors.valueResStatus);
        if (!this.valueResStatus) {
          return
        }  

        this.error = document.querySelector(InteractiveCalculatorIMTCollection.selectors.error);
        if (!this.error) {
            return
        }

        this.btnRes = document.querySelector(InteractiveCalculatorIMTCollection.selectors.btnRes);
        if (!this.btnRes) {
            return
        }

        this.init()
    }

    init() {
        console.debug(this.btnRes)
        this.btnRes.addEventListener('click', () => this.getResult());
        //this.validation();
    }
    
    getCalculation() {
        const height = this.valueHeight.value;
        const weight = this.valueWeight.value;        

        const res = +weight / Math.pow(+height, 2)
        return res.toFixed(2);

    }
    getResult() {
        console.debug('+')
        const index = this.getCalculation();
        const person = this.selectPerson.value;
        console.log(index, person)
        if (person === 'woman') {
            if (index < 19) {                
                this.setResult('Недостаточный вес');
            } else if (index >=19 && index<24) {
                this.setResult('Нормальный вес');              
            } else if (index >= 24 && index <30) {
                
                this.setResult('Незначительный избыток веса');                  
            } else if (index >= 30 && index <40) {                
                this.setResult('Склонность к ожирению');
            } else if (index >= 40) {
                this.setResult('Сильное ожирение');               
            }
        }
        if (person === 'man') {
            if (index < 20) {
                this.setResult('Недостаточный вес');
            } else if (index >=20 && index<25) {
                this.setResult('Нормальный вес');
            } else if (index >= 25 && index <30) {
                this.setResult('Незначительный избыток веса');
            } else if (index >= 30 && index <40) {
                this.setResult('Склонность к ожирению');
            } else if (index >= 40) {
                this.setResult('Сильное ожирение'); 
            }
        }
    }
    setResult(value) {
        this.valueResStatus.innerHTML = '';
        this.valueResStatus.innerHTML = value;
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

class InteractiveCalculatorIMTCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        selectPerson: "[data-js-value-person]",
        valueHeight: "[data-js-value-height]",
        valueWeight: "[data-js-value-weight]",
        valueRes: "[data-js-result]",   
        valueResStatus: "[data-js-result-status]", 
        btnRes: "[data-js-btn]",   
        error: "[data-js-error]"
    }
    constructor() {
        document.querySelectorAll(InteractiveCalculatorIMTCollection.selectors.instance).forEach(node => {
            new CalcIMT(node);
        });
    }
}

window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorIMTCollection();
});