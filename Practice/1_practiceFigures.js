let canvas = document.getElementById('canvas'); // Получаем элемент
let ctx = canvas.getContext('2d'); // Будем работать в контексте 2д
// https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/ellipse

// Draw 'G'
ctx.fillRect(200, 0, 100, 100);
ctx.fillRect(100, 0, 101, 400);

// Draw 'L'
ctx.clearRect(120, 5, 5, 80); 
ctx.clearRect(120, 80, 60, 5);

// Draw O
ctx.clearRect(120, 120, 5, 60);
ctx.clearRect(120, 120, 60, 5);
ctx.clearRect(180, 120, 5, 60);
ctx.clearRect(120, 180, 65, 5);

// Draw 'E'
ctx.clearRect(120, 310, 65, 5); // E
ctx.clearRect(120, 310, 5, 70);
ctx.clearRect(120, 380, 65, 5);
ctx.clearRect(120, 350, 65, 5);

// Draw a Rectangle
ctx.clearRect(220, 20, 60, 60);
ctx.strokeRect(225, 25, 50, 50);
ctx.strokeStyle = 'white';
ctx.stroke();

// Draw 'V'
ctx.beginPath();
ctx.moveTo(120, 210);
ctx.lineTo(150, 290);
ctx.lineTo(180, 210);
ctx.lineWidth = 5;
ctx.strokeStyle = 'white';
ctx.stroke();

// Draw a triangle at the bottom
ctx.beginPath();
ctx.moveTo(590, 390);
ctx.lineTo(590, 310);
ctx.lineTo(510, 390);
ctx.fill();

// Draw a triangle at the top
ctx.beginPath();
ctx.moveTo(590, 10);
ctx.lineTo(510, 10);
ctx.lineTo(590, 90);
ctx.fill();

// Draw a circle
ctx.beginPath();
ctx.arc(400, 200, 50, 0, 2 * Math.PI); // (x, y, radius, startAngle, endAngle, anticlockwise), where x, y - center coordinates
ctx.stroke();


// Draw a circle 2/4
ctx.beginPath();
ctx.arc(400, 200, 50, 0, 1 * Math.PI, true);
ctx.fill();

// Draw a circle 2/4
ctx.beginPath();
ctx.arc(400, 200, 50, 0, 1.5 * Math.PI);
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
ctx.stroke();

// Draw a circle 1/4
ctx.beginPath();
ctx.arc(400, 200, 49, 1.55, 1.5 * Math.PI);
ctx.fillStyle = 'white';
ctx.fill();


// Draw curve Right
ctx.beginPath();
ctx.moveTo(310, 315);
ctx.bezierCurveTo(310, 315, 490, 350, 310, 380);
ctx.stroke();

// Draw curve Left

ctx.beginPath();
ctx.moveTo(290, 315);
ctx.bezierCurveTo(290, 315, 110, 350, 290, 380);
ctx.stroke();