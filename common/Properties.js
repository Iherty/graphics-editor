import { lineWidthButton, lineStyleButton, lineColorButton, fillColorButton, isFillButton } from '../editor.js'

export default class PropertiesHandler {
    
    #FiguresPropUpdateCallbacks = [];
    #storeFiguresLastProp = {};

    lineWidthHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('width', +lineWidthButton.value)); 
        this.#storeFiguresLastProp['width'] = +lineWidthButton.value;
    }

    lineStyleHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('style', lineStyleButton.value));
        this.#storeFiguresLastProp['style'] = lineStyleButton.value;
    }

    lineColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineColor', lineColorButton.value));
        this.#storeFiguresLastProp['lineColor'] = lineColorButton.value;
    }

    fillColorHandler(event) {

        if (event.type === 'click') {

            if (isFillButton.checked) {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', "#e66465"));
                this.#storeFiguresLastProp['fillColor'] = "#e66465";

            } else {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', null)); 
            }

        } else {

            this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', fillColorButton.value));
            this.#storeFiguresLastProp['fillColor'] = fillColorButton.value;
            isFillButton.checked = true;
        }
    
    }

    updatePropToCurrent() {

        for (let key in this.#storeFiguresLastProp) {
            this.#FiguresPropUpdateCallbacks.forEach(item => item(key, this.#storeFiguresLastProp[key])); 
        }
    }

    addFigurePropUpdateEventListener(callback) {
        this.#FiguresPropUpdateCallbacks.push(callback);
    }

}