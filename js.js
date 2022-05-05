let canvas = document.getElementById("game"),
    context = canvas.getContext("2d"),
    count = 0,
    width,
    height,
    color,
    array = [],
    o,
    grid = 6,
    x = 0,
    y = 0,
    dy = grid,
    dx = grid,
    base10 = "0123456789",
    base16 = "0123456789ABCDEF",
    b10 = true,
    b16 = true,
    size1 = window.innerWidth,
    size2 = window.innerHeight,
    data,
    i = 0,
    image = new Image(size1, size2)
image.crossOrigin = "Anonymous";
image.src = "https://i.imgflip.com/6f04o5.jpg"

canvas.width = window.innerWidth
canvas.height = window.innerHeight
function draw() {
    if (i < 10) {
        i++
        requestAnimationFrame(draw);
    }
    context.drawImage(image, x, y, size1, size2)
    data = context.getImageData(x, y, size1, size2)
}

requestAnimationFrame(draw);
/* for (let i = 0; i < size1 * size2; i++) {
    width = i
    if (i >= size1) {
        width = i - Math.floor(i / size1) * size1
    }
    color = ((1 << 24) * Math.random() | 0).toString(16)
    color = (context.getImageData(x, y, 1, 1).data)
    array.push(color)
    context.fillStyle = `#${color}`
    context.fillRect(width, Math.floor(i / size2), 2, 2)
 
} */
/* function loop() {
    requestAnimationFrame(loop)
    if (++count < 1) {
        return
    }
    count = 0
    for (let i = 0; i < array.length; i++) {
        width = i
        if (i >= size1) {
            width = i - Math.floor(i / size1) * size1
        }
        b10 = true
        b16 = true
        o = array[i];
        if (typeof array[i] == "string") {
            o = array[i].toUpperCase();
        }
        for (let i = 0; i < o.length; i++) {
            if (b10 && base10.indexOf(o[i]) == -1)
                b10 = false;
            if (b16 && base16.indexOf(o[i]) == -1)
                b16 = false;
        }
        if (b16) {
            array[i] = parseInt(array[i], 16)
        }
        array[i] += 1
        color = array[i]
        if (array[i] > 999999) {
            array[i] = i
        }
        color = color.toString(16)
        context.fillStyle = `#${color}`
        context.fillRect(width, Math.floor(i / size2), 2, 2)
    }
} */
function getRandomInt(min, max) {
    let o = Math.random()
    if (o != 0) {
        return Math.floor(o * (max - min)) + min;
    }
    else {
        getRandomInt(min, max)
    }
}
function loop() {
    requestAnimationFrame(loop);
    if (++count < 1) {
        return
    }
    count = 0
    /* x += dx;
    y += dy; */
    if (x > canvas.width - size1) {
        x += -3;
        dx = getRandomInt(-grid, -grid);
        dy = getRandomInt(-grid, grid);
    }
    if (y > canvas.height - size2) {
        y += -3;
        dx = getRandomInt(-grid, grid);
        dy = getRandomInt(-grid, -grid);
    }
    if (y < 0) {
        y += 3;
        dx = getRandomInt(-grid, grid);
        dy = getRandomInt(grid, grid);
    }
    if (x < 0) {
        x += 3;
        dx = getRandomInt(grid, grid);
        dy = getRandomInt(-grid, grid);
    }


    /* for (let i = 0; i < array.length; i++) {
        width = i
        if (i >= size1) {
            width = i - Math.floor(i / size1) * size1
        }
        if (i != array.length - 1) {
            array[i] = array[i + 1]
        } else {
            array[i] = array[0]
        }
        color = array[i]
        context.fillStyle = `#${color}`
        context.fillRect(width + x, Math.floor(i / size2) + y, 2, 2)
    } */
    if (i % 4 == 2) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(data, x, y)
    }
    for (let i = 0; i < data.data.length; i += 1) {
        if (i != data.data.length - 1) {
            data.data[i] = data.data[i + 1]
        } else {
            data.data[i] = data.data[3]
        }
    }
    i++
}
document.addEventListener('keydown', function (e) {
    if (e.which === 37) {
        dx = -grid;
        dy = 0;
    }
    else if (e.which === 38) {
        dy = -grid;
        dx = 0;
    }
    else if (e.which === 39) {
        dx = grid;
        dy = 0;
    }
    else if (e.which === 40) {
        dy = grid;
        dx = 0;
    }
});
requestAnimationFrame(loop);
