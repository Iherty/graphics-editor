
export default class CircleDrawer {
    #avrX;
    #avrY;
    #radius;

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(circle) { // [x1, y1, x2, y2]

        this.ctx.beginPath();

        if (circle.style === 'solid')  this.ctx.setLineDash([]);
        if (circle.style === 'dashed')  this.ctx.setLineDash([20, 7]);
        if (circle.style === 'dotted')  this.ctx.setLineDash([3, 7]);
        if (circle.style === 'dash-dotted')  this.ctx.setLineDash([20, 7, 3, 7]);

        this.#avrX = (Math.abs(circle.coordinates[0] - circle.coordinates[2]) / 2) + Math.min(circle.coordinates[0], circle.coordinates[2]);
        this.#avrY = (Math.abs(circle.coordinates[1] - circle.coordinates[3]) / 2) + Math.min(circle.coordinates[1], circle.coordinates[3]);
        this.#radius = Math.max(Math.abs(circle.coordinates[0] - circle.coordinates[2]), Math.abs(circle.coordinates[1] - circle.coordinates[3])) / 2;
        circle.avrX = this.#avrX;
        circle.avrY = this.#avrY;
        circle.radius = this.#radius

        this.ctx.arc(this.#avrX, this.#avrY, this.#radius, 0, 2 * Math.PI);
        if (!circle.fillColor) {
            this.ctx.lineWidth = circle.width;
            this.ctx.strokeStyle = circle.lineColor;
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = circle.fillColor;
            this.ctx.fill();

            this.#drawBorder(this.#avrX, this.#avrY, this.#radius, circle.width, circle.lineColor);
        }
    }

    #drawBorder(x, y, radius, width, color) { 
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
}
