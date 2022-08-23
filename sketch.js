
// need to add startup page, high score page and settings page
// need to display all relevant information on said pages  
const MAIN_MENU = 0; 
const SETTINGS = 2;
const SCORE = 3; 
const HOW_TO = 4;
const GAME = 5;


let scoreIndex = 0; 
let currentState = 0; 
let s;
let boxX;
let boxY; 
let collide; 
let colCount = 0; 
let gameRun = true; 
let setupConstr = 0;
let textFly = 700; 


function preload(){
  arcadeFont = loadFont("SuperLegendBoy.ttf");
}

function setup(){
  createCanvas(600,1100);
  background('black');  
  print(currentState); 
}

function initBlock(){

  // need to create object array that defines different size blocks
  // need to randomly call them when creating the sprite
   
  angleMode(RADIANS);
  if(colCount <= 2) {
  s = createSprite(width/2 +10, height%20, 48, 148);
  dBlocks.add(s)  
  dBlocks.direction = HALF_PI; 
  dBlocks.speed = 5;  
  }
}

function stopBlock(sprite){

  // have added the control, but colCount continues to add
  // on single collision with another block
  // and will inevitably stop dropping
  
  colCount +=1; 
  sprite.speed = 0;
  sprite.direction = 0;
  sprite.rotationLocked = true;  
  sprite.immovable = true;  
  dBlocks.remove(sprite); 
  blocks.add(sprite); 
  initBlock();   
}


function colliderBlock(sprite){
  colCount = 0;
  sprite.speed = 0;
  sprite.direction = 0;
  sprite.rotationLocked = true;  
  sprite.immovable = true;  
  dBlocks.remove(sprite); 
  blocks.add(sprite); 
  initBlock();   

}


function draw(){
  switch(currentState) {
        case MAIN_MENU:
            startUpPage();
            navBox(); 
        break;
        case GAME:
            if(setupConstr === 0){
              gameSetup(); 
              setupConstr ++; 
            }
            gamePlay();
        break;
        case SCORE:
            scorePage();  
        break; 
        case SETTINGS:
            settingsPage();  
        break; 
  }
  
  
}

// need to add ESC function to allow player to exit game
function gamePlay(){
  background(125,125,125);
  gridDraw();
  dBlocks.collide(collideSprite, colliderBlock);  
  dBlocks.collide(blocks, stopBlock); 
}

function gameSetup() {
  blocks = new Group();
  dBlocks = new Group();
  createCanvas(600,1100);
  initBlock(); 
  collideSprite = createSprite(width/2, 1061, width, 50, physics='static'); 
  collideSprite.shapeColor = (125,125,125); 
  angleMode(RADIANS); 

}

function startUpPage(){
    background('black'); 
    fill('white');
    textSize(80);
    textFont(arcadeFont);  
    textAlign(CENTER, TOP);  
    text("TETRIS",width/2,100);
    rectMode(CORNER); 
    textSize(30); 
    text('JAKEB KNOWLES \n S517623 \n 3815ICT', width/2, height-150); 
}

function scorePage(){
  background('black');
  fill('white'); 
  rect(100,height-100, 150,50);
  textSize(20); 
  fill('black');
  text('ESCAPE', 100,height-110);
  textSize(40);
  fill('white'); 
  textFont(arcadeFont); 
  text("HIGH SCORES", width/2, 100);
  scores = [10,9,8,7,6,5,4,3,2,1,0];
  users =['ASD', 'ERF', 'TYP', 'JSK', 'KBG', 'SEW','LBJ','POA','MNB','RFV', 'YOP']; 
  for(i = 1; i < 6.5; i+=0.5){ 
    if(scoreIndex >= 10){
      scoreIndex = 0;
      break; 
    } else {
    scoreIndex++;  
    }
    fill('white');
    if(scores[scoreIndex] !== NaN){
      text((scores[scoreIndex]+1)*100, width/2-100, i*125+70);
      text('- '+ users[scoreIndex], width/2+75, i*125+70); 
    }  
  } 
}

function settingsPage() {
  background('black');
  settingsBox();
  
  
  fill('white'); 
  rect(100,height-100, 150,50); 

  fill('black');
  text('ESCAPE',100, height-110); 


}

//add constraint to check if s.x % 50 is true and to move to
// the closest multiple of 50 if not 
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

function mousePressed() {
  widthConst = [75, 525];
  heightConst = [250, 350];
  if(currentState === MAIN_MENU){
    if(mouseX > widthConst[0] && mouseX < widthConst[1]  && mouseY>heightConst[0] && mouseY< heightConst[1]) {
          fill('grey');
          currentState = GAME; 
          print(currentState); 
      }
    if(mouseX > widthConst[0] && mouseX < widthConst[1]  && mouseY>heightConst[0]+200 && mouseY< heightConst[1]+200) {
          fill('grey');
          currentState = SCORE; 
          print(currentState); 
      }
    if(mouseX > widthConst[0] && mouseX < widthConst[1]  && mouseY>heightConst[0]+400 && mouseY< heightConst[1]+400) {
          fill('grey');
          currentState = SETTINGS; 
          print(currentState); 
      }
  }
  if(currentState === SCORE || currentState === SETTINGS ){
    if(mouseX > 25 && mouseX < 175  && mouseY> height-125 && mouseY< height-75) {
          currentState = MAIN_MENU; 
    }
  }
}

function navBox(){
  names = ['PLAY', 'SCORES', 'SETTINGS'];
  
  rectMode(CENTER); 
  for(i = 300; i <= 700; i += 200) {
    fill(255,255,255); 
    rect(width/2, i, 450,100); 
    if(i-500 < 0){
      textFont(arcadeFont); 
      textSize(50);
      fill('black'); 
      textAlign(CENTER); 
      text(names[0],width/2,i-25);   
    } else if(i-500 > 0){
      fill('black');
      text(names[2],width/2,i-25);   
    } else {
      fill('black');
      text(names[1],width/2,i-25); 
    }  
  }
}

function settingsBox(){
  names = ['Field Size', 'Game Lv', 'Normal or Extended Mode', 'Player or AI Mode'];
  
  rectMode(CENTER); 
  
    fill(255,255,255); 
    textSize(50);
    text('Settings', width/2, 50);

    rect(width/2, 200, 450,100); 
    rect(width/2, 350, 450,100); 
    rect(width/2, 500, 450,100); 
    rect(width/2, 650, 450,100); 
    
    textFont(arcadeFont); 
    textSize(20);
    fill('black');
    textAlign(CENTER);

    text(names[0],width/2, 200);   
    text(names[1],width/2,350);   
    text(names[2],width/2,500);
    text(names[3],width/2,650);  
}  

//add grid constraint function

function gridDraw() {
	for(let i=35; i<=500; i+=50) {
		for(let h=35; h<=1000;h+=50) {
			noFill(); 
      strokeWeight(5);   
			rect(i+25,h+25,51,51); 
      strokeWeight(2); 
		}
	}
}
