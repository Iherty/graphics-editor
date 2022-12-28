import DrawerBase from '../DrawerBase.js';

export default class LineDrawer extends DrawerBase {

    draw(line) {

        this.ctx.beginPath();

        if (line.style === 'solid') this.ctx.setLineDash([]);
        if (line.style === 'dashed') this.ctx.setLineDash([20, 7]);
        if (line.style === 'dotted') this.ctx.setLineDash([3, 7]);
        if (line.style === 'dash-dotted') this.ctx.setLineDash([20, 7, 3, 7]);

        this.ctx.moveTo(line.coordinates[0], line.coordinates[1]);
        this.ctx.lineTo(line.coordinates[2], line.coordinates[3]);
        this.ctx.lineWidth = line.width;
        this.ctx.strokeStyle = line.lineColor;
        this.ctx.stroke();

    }
}

