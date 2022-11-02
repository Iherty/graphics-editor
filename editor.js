let canvas = document.getElementById('canvas'); // Получаем элемент
let ctx = canvas.getContext('2d'); // Будем работать в контексте 2д

canvas.addEventListener('mousedown', lineDraw1); // передать функцию без вызова!
canvas.addEventListener('mouseup', lineDraw2);

function lineDraw1(event) { 
    let arr = getMousePos(canvas, event);
    ctx.beginPath();
    ctx.lineTo(arr[0], arr[1]);
}

function lineDraw2(event) { 
    let arr = getMousePos(canvas, event);
    ctx.lineTo(arr[0], arr[1]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}



function getMousePos(canvas, event) { // 
    // Метод.getBoundClientRect возвращает координаты прямоугольника, который заключает в себе элемент
    // Метод работает в контексте окна left = x; top = y;
    let rect = canvas.getBoundingClientRect(); 
    
    // event.clientX/clientY - содержит в себе координаты курсора мыши по оси X, Y. 
    // Относительно верхнего левого угла окна
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}




