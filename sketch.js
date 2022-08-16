


let s;

let boxX;
let boxY; 
let collide; 

function preload(){
  rectImage = loadImage('rectangle.png'); 
}

function setup(){
  createCanvas(600,1100);
  s = createSprite(width/2 +10, height%20, 50, 150);
  s.direction = 90;
  s.speed = 2; 
  
  angleMode(RADIANS); 
}


function draw(){
  background(125,125,125);
  gridDraw();
  
  // will need to set bool that changes the collision part
  // depending on current rotation
  if(s.y > 960){
    s.speed = 0; 
  }
}

function keyReleased() {
   if (keyCode === UP_ARROW) {    
    s.rotation += HALF_PI; 
  }
  if(keyCode == LEFT_ARROW) {
    s.x -=50;
  }
  if(keyCode == RIGHT_ARROW) {
    s.x +=50;
  }
}

function gridDraw() {
	for(let i=35; i<=500; i+=50) {
		for(let h=35; h<=1000;h+=50) {
			noFill();   
			rect(i,h,50,50); 
		}
	}
}


