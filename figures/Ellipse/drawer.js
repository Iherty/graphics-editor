import { ctx } from '../../editor.js'

class EllipseDrawer {
    #avrX;
    #avrY;
    #radiusX;
    #radiusY;

    draw(ellipse) { // [x1, y1, x2, y2]

        this.#avrX = (Math.abs(ellipse.coordinates[0] - ellipse.coordinates[2]) / 2) + Math.min(ellipse.coordinates[0], ellipse.coordinates[2]);
        this.#avrY = (Math.abs(ellipse.coordinates[1] - ellipse.coordinates[3]) / 2) + Math.min(ellipse.coordinates[1], ellipse.coordinates[3]);
        this.#radiusX = Math.abs(this.#avrX - ellipse.coordinates[0]);
        this.#radiusY = Math.abs(this.#avrY - ellipse.coordinates[1]);

        ctx.beginPath();
        ctx.ellipse(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, 0, 0, 2 * Math.PI);

        if (!ellipse.isFill) {
            ctx.lineWidth = ellipse.lineWidth;
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
        ctx.lineWidth = ellipse.lineWidth
        ctx.strokeStyle = ellipse.lineColor;
        ctx.stroke();
    }
}

export { EllipseDrawer }