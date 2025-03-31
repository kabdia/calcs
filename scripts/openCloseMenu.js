class Menu {
    constructor(instance) {
        this.instance = instance;
        if (!this.instance) {
            return
        }        
        this.buttonClose = document.querySelector(InteractiveMenuCollection.selectors.buttonClose);
        this.menu = document.querySelector(InteractiveMenuCollection.selectors.menu);
        this.init();
    }

    init() {
         this.openMenu();
         this.closeMenu();       
    }    
    openMenu(){
        this.instance.addEventListener('click', () => {
            this.menu.classList.add('isActive');
        });
    } 
    closeMenu(){
       
        this.buttonClose.addEventListener('click', () => {
            
            this.menu.classList.remove('isActive');
        });
    } 
}

class InteractiveMenuCollection {
    static selectors = {
        instance:  "[data-js-open-menu]",        
        menu:  "[data-js-menu]", 
        buttonClose: "[data-js-close-menu]",      
    }

    constructor() {
        document.querySelectorAll(InteractiveMenuCollection.selectors.instance).forEach(node => {
            new Menu(node);
        })
    }
}


window.App = {};
document.addEventListener('DOMContentLoaded', () => {
    App.InteractiveMenuCollection = new InteractiveMenuCollection();
});