
class Circle {

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor = 'black', fillColor = 'green', style = 'solid') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
        this.lineStyle = style;
        this.isFill = isFill;
    }
}

export { Circle }