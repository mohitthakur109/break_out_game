// need to create two variable one for canvas object
//and another one to draw context for canvas
var canvas=document.getElementById('myCanvas');
var ctx= canvas.getContext('2d'); // return the drawing context on the canvas


var x=canvas.width/2; //send ball in middle
var y=canvas.height-30; // 30px up from bottom of stage
var dx=2;
var dy=-2;
var ballRadius=10;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;
var leftPressed=false;
var brickRowCount=3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffSetTop=30;
var brickOffSetLeft=30;
var score=0;
var lives=3;
var audio;
var bricks=[]; //empty array

for(c=0;c<brickColumnCount;c++){
	bricks[c]=[]; // array inside array
	for(r=0;r<brickRowCount;r++){
	bricks[c][r]={x:0,y:0,status:1};
	}
}
document.addEventListener("keydown",keyDownHandler); //call function when key pressed
document.addEventListener("keyup",keyUpHandler); // call function when key release
/* we add event listener to the document*/

function drawBricks(){
	for(c=0;c<brickColumnCount;c++){
	    var color;
		if(c==0)color="#626567";
		else if(c==1)color="#F1C40F";
		else if(c==2)color="#06FAF3"; 
		else if(c==3) color="#D35400";
		else color="#4BCBA6";
		for(r=0;r<brickRowCount;r++){
			if(bricks[c][r].status==1){
				var brickX=(c*(brickWidth+brickPadding)+brickOffSetLeft);
				var brickY=(r*(brickHeight+brickPadding)+brickOffSetTop);
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight); 
				ctx.fillStyle=color;
				ctx.fill(); 
				ctx.closePath();
				}
		}
	}
}

function keyDownHandler(e){
	if(e.keyCode==39){
	rightPressed=true;
	}else if(e.keyCode==37){
	leftPressed=true;
	}
}
function keyUpHandler(e){

   if(e.keyCode==39){
	rightPressed=false;
	}else if(e.keyCode==37){
	leftPressed=false;
	}

}
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2); 
	ctx.fillStyle="#2471A3";
	ctx.fill(); 
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight); 
	ctx.fillStyle="#F50F20";
	ctx.fill(); 
	ctx.closePath();
}

function collisionDetection(){
	for(c=0;c<brickColumnCount;c++){
		for(r=0;r<brickRowCount;r++){
		var b=bricks[c][r];
		    if(b.status==1){
				if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
					dy=-dy;
					b.status=0;
					var brickSound = new Audio('brick.mp3');
                    brickSound.play();
					score++;
					if(score==(brickColumnCount*brickRowCount)){
					    audio.pause();
						alert("You Win ,CONGRATULATION !");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore(){
	ctx.font="16px Arial";
	ctx.fillStyle="#A217B3";
	ctx.fillText("Score: "+score,8,20); 
	//last two are x and y coordinate
}

function drawLives(){
	ctx.font="16px Arial";
	ctx.fillStyle="#A217B3";
	ctx.fillText("Lives: "+lives,canvas.width-65,20); 
}
function draw(){
// drawing code
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	if(y+dy<ballRadius){
	dy=-dy;
	}else if(y+dy>canvas.height-ballRadius){
	if(x>paddleX&&x<paddleX+paddleWidth){
	dy=-dy;
	}else {
	    lives--;
		if(!lives){
		alert("Game over");
		document.location.reload();
		}else {
		x=canvas.width/2;
		y=canvas.height-30;
		dx=2;
		dy=-2;
		paddleX=(canvas.width-paddleWidth)/2;
		}
	/* reload the page when game over*/
	}
	
	
	
	}

	if(x+dx<ballRadius||x+dx>canvas.width-ballRadius){
	dx=-dx;
	}
    
	if(rightPressed&&paddleX<canvas.width-paddleWidth){
	paddleX+=7;
	}else if(leftPressed&&paddleX>0){
	paddleX-=7;
	}
	x+=dx;
	y+=dy;
	
	requestAnimationFrame(draw);
	
}

document.addEventListener("mousemove",mouseMoveHandler);

function mouseMoveHandler(e){
	var relativeX=e.clientX-canvas.offsetLeft;
	// e.clientX is x position of mouse
	if(relativeX>paddleWidth/2&&relativeX<canvas.width-paddleWidth/2){
		paddleX=relativeX-paddleWidth/2;
	}
}
draw();

function startGame() {
    
   audio = new Audio('audio_file.wav');
   audio.play();
   audio.loop=true;
}


//setInterval(draw,10);
/* first parameter function to be executed 
second parameter indicate milliseconds before
execution
*/
