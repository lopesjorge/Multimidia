document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector("#video");
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext('2d');

    video.addEventListener("loadedmetadate", function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    var cont = 0;
    var draw = function() {
        if (video.paused || video.ended) return;
        var x = 0;
        var y = 0;
        context.drawImage(video, x, y, canvas.width, canvas.height);
        var imageData = context.getImageData(x, y, canvas.width, canvas.height);
        var data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let red = data[i + 0];
            let green = data[i + 1];
            let blue = data[i + 2];
            let media = (red + green + blue) / 3;

            data[i + 0] = media;
            data[i + 1] = media;
            data[i + 2] = media;
        }

        context.putImageData(imageData, x, y);
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.width = 120;
        if (cont++ % 300 == 0) {
            var imgs = document.querySelector("#imgs");
            imgs.appendChild(image);
        }
        requestAnimationFrame(draw);
    }

    video.addEventListener("play", function() {

        if (video.paused || video.ended) return;
        draw();
    });
});