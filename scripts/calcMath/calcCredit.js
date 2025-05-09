class CalcCredit {
    constructor(instance) {
        this.instance = instance;
        
        if (!this.instance) {
            return
        }
        this.chart = document.querySelector(InteractiveCalculatorCreditCollection.selectors.chart);
        if (!this.chart) {
          return
        }
        
        this.selectRound = document.querySelector(InteractiveCalculatorCreditCollection.selectors.selectRound);
        if (!this.selectRound) {
          return
        }
        this.button = document.querySelector(InteractiveCalculatorCreditCollection.selectors.button);
        if (!this.button) {
            return
        }   
        this.fieldError = document.querySelectorAll(InteractiveCalculatorCreditCollection.selectors.fieldError); 
        if (!this.fieldError) {
            return
        }
        this.sumCurrent = document.querySelector(InteractiveCalculatorCreditCollection.selectors.sumCurrent);
        if (!this.sumCurrent) {
          return
        }
        this.percent = document.querySelector(InteractiveCalculatorCreditCollection.selectors.percent);
        if (!this.percent) {
          return
        }
        this.month = document.querySelector(InteractiveCalculatorCreditCollection.selectors.month);
        if (!this.month) {
          return
        }
        this.monthPay = document.querySelector(InteractiveCalculatorCreditCollection.selectors.monthPay);
        if (!this.monthPay) {
          return
        }
        this.sumOverPay = document.querySelector(InteractiveCalculatorCreditCollection.selectors.sumOverPay);
        if (!this.sumOverPay) {
          return
        }
        this.resSum = document.querySelector(InteractiveCalculatorCreditCollection.selectors.resSum);
        if (!this.resSum) {
          return
        }
        this.chartInstance = null;
        this.dataForChart = {percent: 13158, currentSum: 300000}
        this.instance.addEventListener('click', this.validationInput.bind(this));
        this.init();        
    }
    init() {
       this.showChart();      
       this.button.addEventListener('click', () => this.calcRes());
       this.sumCurrent.addEventListener('input', (e) => this.validationInput(e));
       this.percent.addEventListener('input', (e) => this.validationInput(e));
       this.month.addEventListener('input', (e)=> this.validationInput(e));
    }
    calcRes() {
      const sumMonthPay = this.calcPay();
      const overPay = this.calcOverPay(sumMonthPay);

      const percent = this.roundNum(overPay);
      const totalSum = this.roundNum(Number(this.sumCurrent.value) + overPay);
      //устанавливаем ежемесячный платеж
      this.monthPay.innerHTML = '';
      this.monthPay.innerHTML = this.roundNum(sumMonthPay);
      //устанавливаем переплату
      this.sumOverPay.innerHTML = '';
      this.sumOverPay.innerHTML = percent;
      //устанавливаем сумму кредита и переплаты
      this.resSum.innerHTML = '';      
      this.resSum.innerHTML = totalSum;
      //устанавливаем значения в графике      
      this.setSumCurrentInChart(percent, this.roundNum(Number(this.sumCurrent.value)));   
      this.showChart();   
    }
    // Расчет ежемесячного платежа
    calcPay() {      
      const sumCurrent = parseFloat(this.sumCurrent.value); // Сумма кредита
      const yearPercent = parseFloat(this.percent.value); // Годовая ставка (%)
      const months = parseFloat(this.month.value); // Срок в месяцах

      const monthPercent = yearPercent / 12 / 100; // Месячная ставка (делим на 12 и на 100)
      
      const annuityRatio = (monthPercent * Math.pow(1 + monthPercent, months)) / 
                      (Math.pow(1 + monthPercent, months) - 1);

      return sumCurrent * annuityRatio;
    }
    calcOverPay(sumMonthPay) {
      const sum = parseFloat(this.sumCurrent.value);
      const months = parseFloat(this.month.value);
      return (sumMonthPay * months) - sum;
    }
    showChart() {
      if (this.chartInstance) {            
        this.chartInstance.update();
        console.debug(this.chartInstance.data.datasets[0].data)
        return;
      }
      this.chartInstance = new Chart(this.chart, {
            type: 'pie',
            data: {
              labels: ['Проценты', 'Основной долг'],
              datasets: [{                
                data: [this.dataForChart.percent, this.dataForChart.currentSum],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                x: {
                  display: false // Отключаем ось X
                },
                y: {
                  display: false // Отключаем ось Y
                }
              }
            }
          });
  }
  roundNum(num){
    const value = this.selectRound.value;
    return num.toFixed(value);
  } 
  validationInput(e){    
    const input = e.target; 
    
    if (input === this.sumCurrent) {
        const validChars = /^[0-9\s]*$/;      
        const value = input.value;               
        !validChars.test(value) ? input.nextElementSibling.innerHTML = "Недопустимый символ": input.nextElementSibling.innerHTML = '';
    } else if (input === this.percent) {
        const validChars = /^[0-9\s\%]*$/;    
        const value = input.value;                  
        !validChars.test(value) ? input.nextElementSibling.innerHTML = "Недопустимый символ": input.nextElementSibling.innerHTML = '';
    } else if (input === this.month) {
        const validChars = /^[0-9\s]*$/;    
        const value = input.value;                  
        !validChars.test(value) ? input.nextElementSibling.innerHTML = "Недопустимый символ": input.nextElementSibling.innerHTML = '';
    }
  } 
  setSumCurrentInChart(currentSum, percent) {
    this.dataForChart.currentSum = currentSum;
    this.dataForChart.percent = percent;
    this.chartInstance.data.datasets[0].data = [this.dataForChart.currentSum, this.dataForChart.percent];
  }           
}


class InteractiveCalculatorCreditCollection {
    static selectors = {              
        instance: "[data-js-calculator]",
        button: "[data-js-calccredit]",        
        fieldError: "[data-js-error]",
        chart: "[data-js-chart]",
        selectRound: "[data-js-round]",

        sumCurrent: "[data-js-sumcurrent]",
        percent: "[data-js-percent]",
        month: "[data-js-month]",

        monthPay: "[data-js-monthpay]",
        sumOverPay: "[data-js-overpay]",
        resSum: "[data-js-ressum]",
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