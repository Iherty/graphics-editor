
class Ellipse {

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor = 'black', fillColor = 'green') {
        this.coordinates = coordinates;
        this.isFill = isFill;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
    }
}

export {Ellipse}