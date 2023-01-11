
export default class PropertiesHandlers {
    
    #FiguresPropUpdateCallbacks = [];
    #storeFiguresProperties = {};
    #lineWidthButton;
    #lineStyleButton;
    #lineColorButton; 
    #isFillButton; 
    #fillColorButton;

    constructor(lineWidthButton, lineStyleButton, lineColorButton, isFillButton, fillColorButton) {
        this.#lineWidthButton = lineWidthButton;
        this.#lineStyleButton = lineStyleButton;
        this.#lineColorButton = lineColorButton;
        this.#isFillButton = isFillButton;
        this.#fillColorButton = fillColorButton;
    }

    lineWidthHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('width', +this.#lineWidthButton.value)); 
        this.#storeFiguresProperties['width'] = this.#lineWidthButton;
    }

    lineStyleHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('style', this.#lineStyleButton.value));
        this.#storeFiguresProperties['style'] = this.#lineStyleButton;
    }

    lineColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineColor', this.#lineColorButton.value));
        this.#storeFiguresProperties['lineColor'] = this.#lineColorButton;
    }

    fillColorHandler(event) {

        if (event.type === 'click') {

            console.log(this.#isFillButton.checked)
            if (this.#isFillButton.checked) {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', "#e66465"));
                this.#fillColorButton.value = "#e66465";
                this.#storeFiguresProperties['fillColor'] = this.#fillColorButton;

            } else {
                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', null));
                this.#storeFiguresProperties['fillColor'] = null;
            }

        } else {

            this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', this.#fillColorButton.value));
            this.#storeFiguresProperties['fillColor'] = this.#fillColorButton;
            this.#isFillButton.checked = true;
        }
    
    }

    updateFigurePropertiesToCurrent() {

        for (let key in this.#storeFiguresProperties) {
            console.log(key, this.#storeFiguresProperties[key])
            console.log(this.#storeFiguresProperties['fillColor']);

            if (key === 'width') {
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, +(this.#storeFiguresProperties[key].value) ) );
            } else if ( this.#storeFiguresProperties[key] === null ) {
                // this.#FiguresPropUpdateCallbacks.forEach(item => item(key, null) );
                
            } else {
                console.log(key, this.#storeFiguresProperties[key])
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, this.#storeFiguresProperties[key].value ));
            }
        
        }
    }

    addFigurePropertyUpdateEventListener(callback) {
        this.#FiguresPropUpdateCallbacks.push(callback);
    }

}