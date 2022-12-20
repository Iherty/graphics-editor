import { ctx  } from '../../editor.js';

class CircleDraw {
    #avrX;
    #avrY;
    #radius;

    draw(circle) { // [x1, y1, x2, y2]

        ctx.beginPath();

        if (circle.style === 'solid') ctx.setLineDash([]);
        if (circle.style === 'dashed') ctx.setLineDash([20, 7]);
        if (circle.style === 'dotted') ctx.setLineDash([3, 7]);
        if (circle.style === 'dash-dotted') ctx.setLineDash([20, 7, 3, 7]);

        this.#avrX = (Math.abs(circle.coordinates[0] - circle.coordinates[2]) / 2) + Math.min(circle.coordinates[0], circle.coordinates[2]);
        this.#avrY = (Math.abs(circle.coordinates[1] - circle.coordinates[3]) / 2) + Math.min(circle.coordinates[1], circle.coordinates[3]);
        this.#radius = Math.max(Math.abs(circle.coordinates[0] - circle.coordinates[2]), Math.abs(circle.coordinates[1] - circle.coordinates[3])) / 2;

        ctx.arc(this.#avrX, this.#avrY, this.#radius, 0, 2 * Math.PI);
        if (!circle.fillColor) {
            ctx.lineWidth = circle.width;
            ctx.strokeStyle = circle.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = circle.fillColor;
            ctx.fill();

            this.#drawBorder(this.#avrX, this.#avrY, this.#radius, circle.width, circle.lineColor);
        }
    }

    #drawBorder(x, y, radius, width, color) { 
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

export { CircleDraw }