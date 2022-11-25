let canvas = document.getElementById('canvas'); // Получаем элемент
let ctx = canvas.getContext('2d'); // Будем работать в контексте 2д

// Draw Line
    //canvas.addEventListener('mousedown', lineDraw1);
    //canvas.addEventListener('mouseup', lineDraw2); 

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
        console.log(rect.left, rect.top);
        return [x, y]
    }

// Draw Circle
    let pos1;
    canvas.addEventListener('mousedown', circleDraw1);
    canvas.addEventListener('mouseup', circleDraw2);

    function circleDraw1(event) {
        let pos = getMousePos(canvas, event);
        pos1 = pos;
        ctx.beginPath();
    }

    function circleDraw2(event) {
        let pos2 = getMousePos(canvas, event);
        let avrX = (Math.abs(pos1[0] - pos2[0]) / 2) + Math.min(pos1[0], pos2[0]);
        let avrY = (Math.abs(pos1[1] - pos2[1]) / 2) + Math.min(pos1[1], pos2[1]);
        let diameter = Math.max( Math.abs(pos1[0] - pos2[0]), Math.abs(pos1[1] - pos2[1]) );

        ctx.arc(avrX, avrY, diameter/2, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }


