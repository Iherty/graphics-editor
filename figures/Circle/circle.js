
export default class Circle {

    constructor(coordinates = [], width = 1, lineColor = '#000000', style = 'solid', fillColor = null, radius = null) {
        this.coordinates = coordinates;
        this.width = width;
        this.lineColor = lineColor;
        this.style = style;
        this.fillColor = fillColor;
        this.radius = radius;
    }
}
