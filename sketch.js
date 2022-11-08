
//initializing variables
var playerPositions = [[200,200],[220,200],[240,200],[260,200]];
var currentKey = 'none';
var apple = [];
var gameState = 0;
var score = 0;
var highscore = 0;
var restart, restartImg;
var win = false;

function preload() {
  //loading restart button image
  restartImg = loadImage("restartbutton.png");
}

function setup() {
  createCanvas(400,400);

  //creating sprite for restart button
  restart = createSprite(200,300);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  restart.visible = false;

  //setting framerate to 8 to reduce the speed of the snake
  frameRate(8);

  //creating the first apple
  createApple();
}

function draw() 
{
  background(10);

  console.log(gameState)
  if (gameState === 0) {
    //start state

    push();
    fill(250);
    textSize(60);
    textAlign(CENTER);
    text("SNAKE",200,180);
    textSize(20);
    text("Press SPACE to play",200,200)
    pop();

    handleKeyPresses();

    if(currentKey == 'space') {
      gameState = 1;
      currentKey = 'none';
    }

  } else if(gameState === 1) {
    //play state

    //outer border
    push();
    fill(10);
    stroke(150,0,0);
    strokeWeight(20);
    rect(0,0,399,399);
    pop();

    //main play loop
    displayApple()
    displayPlayer(playerPositions);
    movePlayer(playerPositions);
    handleKeyPresses();
    eatApple(playerPositions);
    checkApplePosition(playerPositions);

    //score text
    push();
    textSize(40);
    fill(230);
    text(score,5,35);
    pop();

    //checking if player has lost
    checkForLoss(playerPositions);

    //checking if player has won
    if(score >= 320) {
      win=true;
      gameState = 2;
    }

  } else if (gameState === 2) {
    //end state

    //making restart button visible
    restart.visible = true;

    //outer border
    push();
    fill(10);
    stroke(150,0,0);
    strokeWeight(20);
    rect(0,0,399,399);
    pop();

    displayPlayer(playerPositions);

    //game over text
    push();
    textAlign(CENTER);
    textSize(40);
    fill(240); 

    //displays "you win" if you won, and "game over" if you lost
    if(win) {
      text("YOU WIN",200,140);
    } else {
    text("GAME OVER",200,140);
    }

    //score and highscore
    text("Score: "+score,200,180);
    text("Highscore: "+highscore,200,220);
    pop();

    //updating the highscore depending on the score
    if(score > highscore) {
      highscore = score;
    }

    //restarts game when button is pressed
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function checkApplePosition(pos) {
  //checks if the apple is underneath the player so that the snake and apple are not overlapping
  for(var i = 1; i<pos.length; i++) {
    if(apple[0] === pos[i][0] && apple[1] === pos[i][1]) {
      createApple();
    }
  }
}

function checkForLoss(pos) {
  //checks if the player has run into itself or hit the edge
  if(gameState === 1) {
  for(var i = 1; i<pos.length; i++) {
    if(pos[0][0] === pos[i][0] && pos[0][1] === pos[i][1]) {
      gameState = 2;
    }
  }

  if(pos[0][0]<=0 || pos[0][0]>=380 || pos[0][1]<=0 || pos[0][1]>=380) {
    gameState = 2;
  } else {

  }
  }
}

function reset() {
  //resets the game
  gameState = 0;
  restart.visible = false;
  score = 0;
  playerPositions = [[200,200],[220,200],[240,200],[260,200]];
  currentKey = "none";
  createApple();
}

function displayPlayer(positions) {
  //displays player
  for(var i = 0; i<positions.length; i++) {
    push();
    fill(0,200-i*(150/positions.length),0);
    rect(positions[i][0],positions[i][1],20,20);
    pop();

  }
}

function eatApple(pos) {
  //checks if the player has eaten the apple
  //creates a new apple, increases the length of the snake, and increases score if true
  if(apple[0] === pos[0][0] && apple[1] === pos[0][1]) {
    createApple();

    let newPos = [[-20][-20]];

    pos.push(newPos);

    score++;
  }
}

function createApple() {
  //creates an apple in a random position
  let x = floor(random(1,19))*20;
  let y = floor(random(1,19))*20;

  apple = [x,y];
}

function displayApple() {
  //displays apple
  push();
  fill(200,0,0);
  stroke(10);
  strokeWeight(8);
  rect(apple[0],apple[1],20,20);
  pop();
}

function handleKeyPresses() {
  //movement control
  if(keyIsDown(LEFT_ARROW) && currentKey != 'right') {
    currentKey = 'left';
  } else if(keyIsDown(RIGHT_ARROW) && currentKey != 'left' && currentKey != 'none') {
    currentKey = 'right';
  } else if(keyIsDown(UP_ARROW) && currentKey != 'down') {
    currentKey = 'up';
  } else if(keyIsDown(DOWN_ARROW) && currentKey != 'up') {
    currentKey = 'down';
  } else if(keyIsDown(32) && gameState != 1) {
    currentKey = 'space';
  }
}

function movePlayer(pos) {
  //moves player based on what key they pressed
  if(currentKey != 'none') {

  let newPos;

  if(currentKey === 'left') {
  newPos = [pos[0][0]-20,pos[0][1]];
  } else if(currentKey === 'right') {
    newPos = [pos[0][0]+20,pos[0][1]];
  } else if(currentKey === 'up') {
    newPos = [pos[0][0],pos[0][1]-20];
  } else if(currentKey === 'down') {
    newPos = [pos[0][0],pos[0][1]+20];
  } else {
    console.log("move player error");
  }

  pos.pop();
  pos.unshift(newPos);
  }
}