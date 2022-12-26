
export default class Line {

    constructor(coordinates = [], width = 1, lineColor = 'black', style = 'solid') {
        this.coordinates = coordinates;
        this.width = width;
        this.lineColor = lineColor;
        this.style = style;
    }
}
