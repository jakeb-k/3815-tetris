
//Below are the variables that determine the state of the game,
const MAIN_MENU = 0; 
const SETTINGS = 2;
const SCORE = 3; 
const HOW_TO = 4;
const GAME = 5;

//index used to cycle through saved scores
let scoreIndex = 0; 
//initial variable that when altered will change the state of the game
let currentState = 0;
//the sprite variable 
let s;

//variable that allows control block init, so multiple blocks do not
//init on collision with multiple blocks
let colCount = 0; 

//constraint that allows for functions that need to be called in the play
//loop can be only called once
let setupConstr = 0;

//variable that will denote how many lines have been cleared 
let clearedLines = 0;
//score of the current session
let totalScore = 0; 
//the level the user is on
let level = 1; 
//the mode the user is in
let mode = 'PvP'; 
//the random block to be dropped
let rBlock; 
//the I tetronimo
let iBlock;
//the Z tetronimo
let zBlock;
//the T tetronimo
let tBlock;
//the O tetronimo
let oBlock;
//function responsible for pre-loading resources used
function preload(){
  arcadeFont = loadFont("SuperLegendBoy.ttf");
  tBlock = loadImage('./TBlock.png');
  zBlock = loadImage('./ZBlock.png');
  iBlock = loadImage('./IBlock.png');
  oBlock = loadImage('./OBlock.png'); 
}
//initial function that is needed to start the program
function setup(){
  createCanvas(800,1100);
  background('black');   
}

//function that is reponsible for dropping blocks into the field
//is called at start of game or on collision with another block,
function initBlock(){

  let r; 
  r = Math.floor(Math.random() * 4) + 1;  
  console.log(r); 
  if(r == 1){
    rBlock = iBlock;
  } else if(r == 2){
    rBlock = tBlock; 
  } else if(r == 3){
    rBlock = zBlock;
  }else if(r == 4) {
    rBlock = oBlock; 
  }
  angleMode(RADIANS);
  if(colCount <= 2) {
  s = createSprite(width/2 -190, height%20, 48, 148); 
  s.addImage(rBlock); 
  s.direction = HALF_PI; 
  s.speed = 5;
  }
}
//function called when a dropping block collides with a stopped block
//or collider 
//is reponsible for applying the stopped block characteristics 
function stopBlock(sprite){

  colCount +=1; 
  s.speed = 0;
  s.direction = 0;
  s.rotationLocked = true;  
  s.immovable = true;  
 
  blocks.add(s); 
  initBlock();   
}

//function that is responsible for stopping block when it collides with something
function colliderBlock(sprite){ 
  colCount = 0;
  s.speed = 0;
  s.direction = 0;
  s.rotationLocked = true;  
  s.immovable = true;  
  blocks.add(s); 
  initBlock();   

}

//in-built p5 function that loops continuously
//used to check current state of game
//as well as allow for navigation throughout
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
            strokeWeight(5); 
            gamePlay(); 
            gameEscape(); 
            
        break;
        case SCORE:
            scorePage();  
        break; 
        case SETTINGS:
            settingsPage();  
        break; 
  }
  
  
}
//calls functions and variables that need to be updated throughout the 
//runtime of the game
function gamePlay(){
  background(125,125,125);
  gridDraw();
  s.collide(collideSprite, colliderBlock);  
  s.collide(blocks, stopBlock);
  textSize(25); 
  fill('black');
  text('Total Score: '+totalScore, 700, 200); 
  text('Lines Cleared: '+clearedLines, 700, 300); 
  text('Current Mode: '+mode, 720, 400); 
  text('Current Level: '+level, 700, 500); 
}
//function that sets up bottom and side colliders 
//as well as initing the two groups(classes) of tetronimos
function gameSetup() {
  blocks = new Group();
  dBlocks = new Group();
  createCanvas(900,1100);
  initBlock();  
  collideSprite = createSprite(235, 1061, 1500, 150, physics='static'); 
  vertCollideSprite = createSprite(-15,510,4,950, physics='static');
  vertCollideSprite2 = createSprite(485,510,4,950, physics='static'); 
  collideSprite.shapeColor = (125,125,125);
  vertCollideSprite.shapeColor = (250,250,250); 
  
  angleMode(RADIANS); 

}
//function used to navigate to quit game 
//and removes all game objects if game is quit. 
//as well as resume game as was, if user does not want to quit. 
function gameEscape() {
  if(keyCode == ESCAPE){
    fill('white'); 
    rect(width/2, height/2, 500,200);
    fill('black');
    textSize(28);
    text('QUIT GAME?', width/2, height/2-75);  
    rect(width/2-100, height/2+50, 100, 50);
    fill('white'); 
    textSize(20); 
    text('EXIT', width/2-100, height/2+50);
    fill('black'); 
    rect(width/2+100, height/2+50, 100, 50);
    fill('white'); 
    textSize(14); 
    text('CONTINUE', width/2+100, height/2+50);
    if(mouseIsPressed === true) {
      if(mouseX >= 350 && mouseX <= 450 && mouseY >= 575 && mouseY <= 625){
        collideSprite.remove();
        vertCollideSprite.remove();
        vertCollideSprite2.remove(); 
        s.remove(); 
        dBlocks.remove();
        blocks.remove(); 
        currentState = MAIN_MENU;  
        setupConstr = 0; 
      }
      if(mouseX >= 550 && mouseX <= 650 && mouseY >= 575 && mouseY <= 625){
        s.speed = 5; 
      }
    }
  }
}
//function responsible for GUI of startUpPage
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

//function responsilbe for GUI of score page
//displays all previous high scores. 
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
//function responsible for displaying settings GUI 
function settingsPage() {
  background('black');
  settingsBox();
  
  
  fill('white'); 
  rect(100,height-100, 150,50); 

  fill('black');
  text('ESCAPE',100, height-110); 


}

//function responsible for moving the blocks, 
//and checking that the move is valid and within the grid
//also checks if the user has pressed esc button the exit 
function keyReleased() {
  if(vertCollideSprite.overlap(s)!=true && vertCollideSprite2.overlap(s)!=true){
    if(keyCode == LEFT_ARROW) {
      s.x -=50;
    }
    if (keyCode === UP_ARROW) {    
      s.rotation += HALF_PI; 
    }
    if(keyCode == RIGHT_ARROW) {
      s.x +=50;   
    }
  } if (vertCollideSprite.overlap(s)==true) {
    if(keyCode == RIGHT_ARROW) {
      s.x +=50;   
    }
  }
  if (vertCollideSprite2.overlap(s)==true) {
    if(keyCode == LEFT_ARROW) {
      s.x -=50;
    }
  }

if(keyCode == ESCAPE){
   s.speed = 0;  
  }
}


//function that checks mouse position on click, to allow navigation
function mousePressed() {
  widthConst = [75, 525];
  heightConst = [250, 350];
  if(currentState === MAIN_MENU){
    if(mouseX > widthConst[0] && mouseX < widthConst[1]  && mouseY>heightConst[0] && mouseY< heightConst[1]) {
          fill('grey');
          currentState = GAME; 
          
      }
    if(mouseX > widthConst[0] && mouseX < widthConst[1]  && mouseY>heightConst[0]+200 && mouseY< heightConst[1]+200) {
          fill('grey');
          currentState = SCORE; 
           
      }
    if(mouseX > widthConst[0] && mouseX < widthConst[1]  && mouseY>heightConst[0]+400 && mouseY< heightConst[1]+400) {
          fill('grey');
          currentState = SETTINGS; 
          
      }
  }
  if(currentState === SCORE || currentState === SETTINGS ){
    if(mouseX > 25 && mouseX < 175  && mouseY> height-125 && mouseY< height-75) {
          currentState = MAIN_MENU; 
    }
  }
}
//function that displays the navigation options on the startup page
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
//function that displays the settings options on the settings page
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
//this is the function that is responsible for drawing game grid
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
