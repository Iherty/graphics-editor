import { ctx } from '../editor.js'

class LineDrawer {

    draw(line) {

        ctx.beginPath();

        if (line.style === 'solid') ctx.setLineDash([]);
        if (line.style === 'dashed') ctx.setLineDash([20, 7]);
        if (line.style === 'dotted') ctx.setLineDash([3, 7]);
        if (line.style === 'dash-dotted') ctx.setLineDash([20, 7, 3, 7]);

        ctx.moveTo(line.coordinates[0], line.coordinates[1]);
        ctx.lineTo(line.coordinates[2], line.coordinates[3]);
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.lineColor;
        ctx.stroke();

    }
}

export { LineDrawer }
