/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");

canvas.height = 800;
canvas.width = 900;
cellHeight = 50;
cellWidth = 50;

var context = canvas.getContext("2d");

context.fillStyle = "green";
context.fillRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < canvas.width / cellWidth; i++) {
    for (var j = 0; j < canvas.height / cellHeight; j++) {
        context.fillStyle = ((i+j) % 2 === 0) ? "red" : "green";
        context.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
    //context.fillStyle = (i % 2 === 0) ? "green" : "red";
    //context.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
}
