const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
let isDrawing = false;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

context.lineWidth = 5;
context.lineCap = 'round';
context.strokeStyle = 'black';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
  isDrawing = true;
  draw(event);
}

function stopDrawing() {
  isDrawing = false;
  context.beginPath();
}

function draw(event) {
  if (!isDrawing) return;
  context.strokeStyle = document.getElementById('colorPicker').value;
  context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  context.stroke();
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});


const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'drawing.png';
  link.click();
});
