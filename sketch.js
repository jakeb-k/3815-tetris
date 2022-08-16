
// need to add startup page, high score page and settings page
// need to display all relevant information on said pages  

let s;

let boxX;
let boxY; 
let collide; 


function preload(){
  rectImage = loadImage('rectangle.png'); 
}

function setup(){
  blocks = new Group();
  dBlocks = new Group();
  createCanvas(600,1100);
  initBlock(); 
  collideSprite = createSprite(width/2, 1061, width, 50, physics='static'); 
  collideSprite.shapeColor = (125,125,125); 
  angleMode(RADIANS); 
}

function initBlock(){

  // need to create object array that defines different size blocks
  // need to randomly call them when creating the sprite

  angleMode(RADIANS);
  s = createSprite(width/2 +10, height%20, 48, 148);
  dBlocks.add(s)  
  dBlocks.direction = HALF_PI; 
  dBlocks.speed = 4;  
  
}

function stopBlock(sprite){

  // need to add control that only inits once
  // even if has collided with multiple blocks

  sprite.speed = 0;
  sprite.direction = 0;
  sprite.rotationLocked = true;  
  sprite.immovable = true;  
  dBlocks.remove(sprite); 
  blocks.add(sprite); 
  initBlock();    
}


function draw(){
  background(125,125,125);
  gridDraw();
  
  dBlocks.collide(collideSprite, stopBlock);  
  dBlocks.collide(blocks, stopBlock);  
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
