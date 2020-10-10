var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground;

var banannaGroup, banannaImage,bananna;
var obstaclesGroup,FoodGroup;
var obstacleImage;

var survivalTime=0;
var score=0;



function preload(){
   monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  banannaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 600);
  
monkey = createSprite(40,400,20,50);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(45,430,1500,10);
ground.velocityX=-4;
ground.x=ground.width/2;

  
 FoodGroup = new Group();
obstaclesGroup = new Group();
  
    

}

function draw() {
  //trex.debug = true;
  background(255);
 // text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/60);
   // ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    
    spawnbanannas();
    spawnObstacles();
    
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
      stroke("white");
      textSize(20);
      fill("white");
      text("score:"+score,500,50);
      
      stroke("black");
      textSize(20);
      fill("black");
      survivalTime = Math.ceil(frameCount/frameRate())
      text("survivalTime:"+survivalTime,100,50);
    }
  }
  else if (gameState === END) {
  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    banannaGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    banannaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
    monkey.collide(ground);
  
  
  drawSprites();
}

function spawnbanannas() {
  //write code here to spawn the bananna
  if (frameCount % 60 === 0) {
    var bananna = createSprite(400,400,40,10);
    bananna.y = Math.round(random(400,120));
   bananna.addImage(banannaImage);
   bananna.scale = 0.1;
    bananna.velocityX = -3;
    
     //assign lifetime to the variable
    bananna.lifetime = 200;
    
    //adjust the depth
    bananna.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each bananna to the group
    FoodGroup.add(bananna);
    
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,420,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addImage(obstacleImage);
     //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
     
    }
    
   
  }



