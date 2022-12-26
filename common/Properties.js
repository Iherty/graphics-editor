
export default class PropertiesHandler {
    
    #FiguresPropUpdateCallbacks = [];
    #storeFiguresLastProp = {};

    lineWidthHandler(lineWidthButton) {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('width', +lineWidthButton.value)); 
        this.#storeFiguresLastProp['width'] = +lineWidthButton.value;
    }

    lineStyleHandler(lineStyleButton) {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('style', lineStyleButton.value));
        this.#storeFiguresLastProp['style'] = lineStyleButton.value;
    }

    lineColorHandler(lineColorButton) {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineColor', lineColorButton.value));
        this.#storeFiguresLastProp['lineColor'] = lineColorButton.value;
    }

    fillColorHandler(event, isFillButton, fillColorButton) {

        if (event.type === 'click') {

            if (isFillButton.checked) {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', "#e66465"));
                this.#storeFiguresLastProp['fillColor'] = "#e66465";

            } else {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', null));
                this.#storeFiguresLastProp['fillColor'] = null;
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