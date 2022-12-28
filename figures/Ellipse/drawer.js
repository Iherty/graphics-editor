import DrawerBase from '../DrawerBase.js';

export default class EllipseDrawer extends DrawerBase {
    #avrX;
    #avrY;
    #radiusX;
    #radiusY;

    draw(ellipse, isFinishPath = false) { // [x1, y1, x2, y2]
        
        this.ctx.beginPath();

        if (ellipse.style === 'solid') this.ctx.setLineDash([]);
        if (ellipse.style === 'dashed') this.ctx.setLineDash([20, 7]);
        if (ellipse.style === 'dotted') this.ctx.setLineDash([3, 7]);
        if (ellipse.style === 'dash-dotted') this.ctx.setLineDash([20, 7, 3, 7]);

        this.#avrX = (Math.abs(ellipse.coordinates[0] - ellipse.coordinates[2]) / 2) + Math.min(ellipse.coordinates[0], ellipse.coordinates[2]);
        this.#avrY = (Math.abs(ellipse.coordinates[1] - ellipse.coordinates[3]) / 2) + Math.min(ellipse.coordinates[1], ellipse.coordinates[3]);
        this.#radiusX = Math.abs(this.#avrX - ellipse.coordinates[0]);
        this.#radiusY = Math.abs(this.#avrY - ellipse.coordinates[1]);
        ellipse.avrX = this.#avrX;
        ellipse.avrY = this.#avrY;
        ellipse.radiusX = this.#radiusX;
        ellipse.radiusY = this.#radiusY;


        this.ctx.ellipse(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, 0, 0, 2 * Math.PI);

        if (!isFinishPath) {

            if (!ellipse.fillColor) {
                this.ctx.lineWidth = ellipse.width;
                this.ctx.strokeStyle = ellipse.lineColor;
                this.ctx.stroke();
            } else {
                this.ctx.fillStyle = ellipse.fillColor;
                this.ctx.fill();
    
                this.#drawBorder(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, ellipse);
            }
    
        }
        
    }

    #drawBorder(x, y, radiusX, radiusY, ellipse) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.lineWidth = ellipse.width
        this.ctx.strokeStyle = ellipse.lineColor;
        this.ctx.stroke();
    }
}
