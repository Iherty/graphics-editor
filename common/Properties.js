import PointerHandlers from "./Pointer.js";

export default class PropertiesHandlers {
    
    #FiguresPropUpdateCallbacks = [];
    // Старый колбек Pointer остается в массиве. А в старом хендлере содержится старая выбранная фигура из drawnFigures. В итоге она меняется вместе с новоц фигурой. 
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

            if (this.#isFillButton.checked) {

                this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', "#e66465"));
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
        // Нужно чтобы он обновял данные только новым PointerHandler. А так получается старые, кто уже был в коллбек, тоже обрабатывает. Соответственно и this._figure старый
        // Есть еще один баг. На канвасе есть фигуры заполненные. Указателем нажимаем. Потом выбираем другую фигуру, кнопку. И у выбранной фигуры исчезает заливка? Как и почему?
        // Это связано с предыдущим багом, что старые указатели остаются в колбеке и фигуры тоже с ними меняются. 
        // Решено. Удалить позднее этот комментарий
        for (let key in this.#storeFiguresProperties) {

            if (key === 'width') {
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, +(this.#storeFiguresProperties[key].value) ) );
            } else if ( this.#storeFiguresProperties[key] === null ) {
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, null) );
                
            } else {
                this.#FiguresPropUpdateCallbacks.forEach(item => item(key, this.#storeFiguresProperties[key].value ));
            }
        
        }
    }

    addFigurePropertyUpdateEventListener(callback) {
        this.#FiguresPropUpdateCallbacks.push(callback);
    }

}