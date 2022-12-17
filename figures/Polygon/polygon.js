
class Polygon {

    constructor(coordinates = [], isFill = false, fillColor = 'green', lineColor = 'black', lineWidth = 1, style = 'solid') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.style = style;
        this.isFill = isFill;
        this.fillColor = fillColor;
    }
}

export {Polygon}