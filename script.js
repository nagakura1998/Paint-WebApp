const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const eraseEl = document.getElementById("erase");
const ctx = canvas.getContext("2d");

let size = 30;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;
let isEraser = false;

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        if (!isEraser) {
            const x2 = e.offsetX;
            const y2 = e.offsetY;
            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);
            x = x2;
            y = y2;
        }
        else{
            mouseX = e.pageX - canvas.offsetLeft;
            mouseY = e.pageY - canvas.offsetTop;
            ctx.clearRect(mouseX, mouseY, size, size);
        }
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

increaseBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

eraseEl.addEventListener("click", () => {
    if (document.querySelector('#erase:checked')){
        isEraser = true;
    }
    else{
        isEraser = false;
    }
    console.log(isEraser)
})

clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}