'use strict'

let lineWidth = document.querySelector('.properties-form-lineWidth');

lineWidth.addEventListener('click', function() {
    let x = lineWidth.name;
    console.log(x)
})
 
class Properties {
    #lineWidth;
    #lineWidthUpdateCallbacks = [];

    lineWidthHandler() {
        this.#lineWidth = lineWidth.value;
        this.#lineWidthUpdateCallbacks.forEach(item => item(lineWidth, this.#lineWidth)); // Название свойства, значение свойства
        // Когда фигура получит, то сможет проверить, что изменилось? Какое свойство фигуры и присвоит ей это значение
    }

    addLineWidthUpdateEventListener(callback) {
        this.#lineWidthUpdateCallbacks.push(callback);
    }
}