var canvas = null;
var ended = null;
var ctx = null;

// Waiting to receive the OffScreenCanvas
self.onmessage = function (e) {
    //Initiate the canvas and start the counting
    canvas = e.data.canvas;
    ended= e.data.ended;
    ctx = canvas.getContext("2d");

    updateCanvas();

};

updateCanvas = function (e) {
    if (ended) {
        return;
    }

    ctx.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.clientWidth,
        videoRef.current.clientHeight
    );

    ctx.fillStyle = '#FFF';
    ctx.font = '24px Segoe UI';
    const date = new Date();
    const dateText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds().toString().padStart(3, '0')}`;
    ctx.fillText(`${nameRef.current}${dateText}`, 10, 50, canvasRef.current.width - 20);


    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
};