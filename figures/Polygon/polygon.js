
class Polygon {

    constructor(coordinates = [], width = 1, lineColor = 'black', style = 'solid', fillColor = null) {
        this.coordinates = coordinates;
        this.width = width;
        this.lineColor = lineColor;
        this.style = style;
        this.fillColor = fillColor;
    }
}

export {Polygon}