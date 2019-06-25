var canvas = document.querySelector('canvas');

//canvas.width = canvas.height*2;
canvas.style = "background: black;";

var context = canvas.getContext('2d');

var centreX = canvas.width/2;
var centreY = canvas.height/2;

context.translate(centreX, centreY);

var starArray = [];
var speed = 1;

var mouseIsDown = false;

function remap(value, low1, high1, low2, high2){
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}

canvas.addEventListener("mousedown", mouseUpDown, false);

function mouseUpDown(){
    mouseIsDown = !mouseIsDown;
    speed = 50;
}

canvas.addEventListener("mouseup", doMouseDown, false);

function doMouseDown(){
    mouseIsDown = !mouseIsDown;
    speed = 1;
}

function Star(){
    this.x = (Math.random() * canvas.width*2) - canvas.width;
    this.y = (Math.random() * canvas.height*2) - canvas.height;
    this.z = Math.random() * canvas.width;

    this.locsToStore = 7;

    this.prevX = [];
    this.prevY = [];

    this.update = function(){
        this.z -= speed;
        

        if(mouseIsDown){
            if(this.prevX.length < this.locsToStore){
                this.prevX.unshift(this.sx);
            }else{
                this.prevX.pop();
            }
            if(this.prevY.length < this.locsToStore){
                this.prevY.unshift(this.sy);
            }else{
                this.prevY.pop();
            }
        }else{
            if(this.prevX.length > 0){
                this.prevX.pop();
            }
            if(this.prevY.length > 0){
                this.prevY.pop();
            }
        }

        if(this.z < 1){
            this.x = (Math.random() * canvas.width*2) - canvas.width;
            this.y = (Math.random() * canvas.height*2) - canvas.height;
            this.z = canvas.width;

            this.prevX.length = 0;
            this.prevY.length = 0;
        }

        this.sx = remap(this.x / this.z, 0, 1, 0, canvas.width)
        this.sy = remap(this.y / this.z, 0, 1, 0, canvas.height)
    }

    this.show = function(){
        this.radius = remap(this.z, 0, canvas.width, 4, 0);

        // Draw star
        context.beginPath();
        context.arc(this.sx, this.sy, this.radius, 0, Math.PI*2, false);
        context.strokeStyle = "rgba(255, 255, 255, 1)";
        context.stroke();
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fill();

        // Draw warp path
        context.beginPath();
        context.moveTo(this.sx, this.sy)
        for(var i = 0; i < this.prevX.length; i++){
            context.lineTo(this.prevX[i], this.prevY[i]);
        }
        context.strokeStyle = "white";
        context.stroke();
        context.closePath();
    }
}

for(var i = 0; i < 1800; i++){
    starArray.push(new Star());
}


var backgroundChange = 0;

function animate(){
    context.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);

    for(var i = 0; i < starArray.length; i++){
        starArray[i].update();
        starArray[i].show();
    }

    canvas.style = "background-image: radial-gradient(white 0%, black " + backgroundChange + "%);";

    if(mouseIsDown){
        canvas.style = "background-image: radial-gradient(white 0%, black " + backgroundChange + "%);";
        backgroundChange += 0.5;
        if(backgroundChange > 20){
            backgroundChange = 20;
        }
    }else{
        backgroundChange -= 5;
        if(backgroundChange < 0){
            backgroundChange = 0;
        }
    }

    requestAnimationFrame(animate);
}

animate();