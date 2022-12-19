
class Properties {
    
    #FiguresPropUpdateCallbacks = [];

    lineWidthHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineWidth', +lineWidth.value)); 
    }

    lineStyleHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineStyle', lineStyle.value)); 
    }

    lineColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineColor', lineColor.value)); 
    }

    fillColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', fillColor.value, true)); 
    }

    addLinePropUpdateEventListener(callback) {
        this.#FiguresPropUpdateCallbacks.push(callback);
    }

}