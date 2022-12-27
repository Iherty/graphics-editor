
export default class Polygon {

    constructor(coordinates = [], width = 1, lineColor = '#000000', style = 'solid', fillColor = null) {
        this.coordinates = coordinates;
        this.width = width;
        this.lineColor = lineColor;
        this.style = style;
        this.fillColor = fillColor;
    }
}
