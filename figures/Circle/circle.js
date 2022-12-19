
class Circle {

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor = 'black', fillColor = '#e66465', style = 'solid') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
        this.lineStyle = style;
        this.isFill = isFill;
    }
}

export { Circle }