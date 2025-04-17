class CalcCredit {
    constructor(instance) {
        this.instance = instance;
        
        if (!this.instance) {
            return
        }
        this.chart = document.querySelector(InteractiveCalculatorCreditCollection.selectors.chart);
        console.debug(this.chart);
        this.button = document.querySelector(InteractiveCalculatorCreditCollection.selectors.button);
        if (!this.button) {
            return
        }
        

        this.fieldError = document.querySelector(InteractiveCalculatorCreditCollection.selectors.fieldError); 
        if (!this.fieldError) {
            return
        }
        
        this.init();        
    }
    init() {
       this.showChart();
    }

    showChart() {
        new Chart(this.chart, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }
    
}

class InteractiveCalculatorCreditCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        button: "[data-js-calccredit]",        
        fieldError: "[data-js-error]",
        chart: "[data-js-chart]",
    }
    constructor() {
        document.querySelectorAll(InteractiveCalculatorCreditCollection.selectors.instance).forEach(node => {
            new CalcCredit(node);
        });
    }
}

window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveCalculatorCollection = new InteractiveCalculatorCreditCollection();
});