import { ctx } from '../../editor.js'

class EllipseDrawer {
    #avrX;
    #avrY;
    #radiusX;
    #radiusY;

    draw(ellipse) { // [x1, y1, x2, y2]

        ctx.beginPath();

        if (ellipse.style === 'solid') ctx.setLineDash([]);
        if (ellipse.style === 'dashed') ctx.setLineDash([20, 7]);
        if (ellipse.style === 'dotted') ctx.setLineDash([3, 7]);
        if (ellipse.style === 'dash-dotted') ctx.setLineDash([20, 7, 3, 7]);

        this.#avrX = (Math.abs(ellipse.coordinates[0] - ellipse.coordinates[2]) / 2) + Math.min(ellipse.coordinates[0], ellipse.coordinates[2]);
        this.#avrY = (Math.abs(ellipse.coordinates[1] - ellipse.coordinates[3]) / 2) + Math.min(ellipse.coordinates[1], ellipse.coordinates[3]);
        this.#radiusX = Math.abs(this.#avrX - ellipse.coordinates[0]);
        this.#radiusY = Math.abs(this.#avrY - ellipse.coordinates[1]);

        ctx.ellipse(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, 0, 0, 2 * Math.PI);

        if (!ellipse.fillColor) {
            ctx.lineWidth = ellipse.width;
            ctx.strokeStyle = ellipse.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = ellipse.fillColor;
            ctx.fill();

            this.#drawBorder(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, ellipse);
        }

    }

    #drawBorder(x, y, radiusX, radiusY, ellipse) {
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.lineWidth = ellipse.width
        ctx.strokeStyle = ellipse.lineColor;
        ctx.stroke();
    }
}

export { EllipseDrawer }