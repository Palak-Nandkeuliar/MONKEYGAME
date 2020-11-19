var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var PLAY=1;
var END=0
var gameState=PLAY;
var survivalTime;
 survivalTime=0;

function preload(){
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(800, 600);
  
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
monkey.setVelocity(0,10);
  
ground=createSprite(400,350,2000,10);
ground.velocityX=-4;
ground.x=ground.width/2;
console.log(ground.x);

bananaGroup = createGroup();
obstacleGroup = createGroup();
  
  score=0;
}


function draw() {
background(400);
 
stroke("white");
textSize(20);
fill("white");
text("Score="+score,500,50);
  
stroke("black");
textSize(20);
fill("black");

text("Survival Time="+survivalTime,100,50);
  
if(gameState===PLAY){
  
survivalTime=Math.ceil(frameCount/frameRate());
  
if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
if(keyDown("space")&& monkey.y >= 220) {
        monkey.velocityY = -10;
    }
  
if(obstacleGroup.isTouching(monkey)){
  obstacleGroup.destroyEach();
  monkey.destroy();
  gameState=END;
}

if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
   monkeyScore=score+1;
}
  
monkey.velocityY = monkey.velocityY + 0.8

monkey.collide(ground);
  
spawnBanana();
spawnObstacle(); 
}
  else if(gameState===END){
    
    monkey.visible=false;
    
  
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
   bananaGroup.setVelocityEach(0);
   obstacleGroup.setVelocityEach(0);
    
survivalTime=0; 
  }
drawSprites();
 
}

function spawnBanana(){
if(frameCount % 120===0){
var banana=createSprite(200,100,10,10);
banana.x=610;
banana.y=random(100,250);
banana.addAnimation("banana",bananaImage);
banana.scale=0.08;
banana.velocityX=-5
banana.lifetime=152;
bananaGroup.add(banana);
  }
}

function spawnObstacle(){
if(frameCount%200===0){
var obstacle=createSprite(200,310,20,20);
obstacle.x=610;
obstacle.addAnimation("obstacle", obstacleImage)
obstacle.scale=0.18;
obstacle.velocityX=-5;
obstacle.lifetime=122;
obstacle.setCollider("rectangle",0,0,350,350);
obstacleGroup.add(obstacle); 
}
}
  





