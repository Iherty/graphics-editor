
export default class PropertiesHandlers {
    
    #FiguresPropUpdateCallbacks = [];
    #storeFiguresCurrentProperties = {};
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
        this.#storeFiguresCurrentProperties['width'] = this.#lineWidthButton;
    }

    lineStyleHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('style', this.#lineStyleButton.value));
        this.#storeFiguresCurrentProperties['style'] = this.#lineStyleButton;
    }

    lineColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineColor', this.#lineColorButton.value));
        this.#storeFiguresCurrentProperties['lineColor'] = this.#lineColorButton;
    }

    fillColorHandler(event) {

        if (event.type === 'click') {

            if (this.#isFillButton.checked) {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', "#e66465"));
                this.#storeFiguresCurrentProperties['fillColor'] = this.#fillColorButton;

            } else {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', null));
                this.#fillColorButton = null;
                this.#storeFiguresCurrentProperties['fillColor'] = this.#fillColorButton;
            }

        } else {

            this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', this.#fillColorButton.value));
            this.#storeFiguresCurrentProperties['fillColor'] = this.#fillColorButton;
            this.#isFillButton.checked = true;
        }
    
    }

    updateFigurePropertiesToCurrent() {

        for (let key in this.#storeFiguresCurrentProperties) {

            if (key === 'width') {
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, +(this.#storeFiguresCurrentProperties[key].value) ));
            } else {
                // Ошибка когда после указателя выбирается фигуры другая. 
                // Обновляются данные null.value = ошибка 
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, this.#storeFiguresCurrentProperties[key].value)); 
            }
        }
    }

    addFigurePropertyUpdateEventListener(callback) {
        this.#FiguresPropUpdateCallbacks.push(callback);
    }

}