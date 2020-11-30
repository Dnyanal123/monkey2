
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400,400);
  monkey = createSprite(100,305,20,20);
  monkey.scale = 0.1
  monkey.addAnimation("monkey",monkey_running);
  // monkey.debug = true;
  
  ground = createSprite(400,340,900,10);
 
  ground.velocityX =-7;
   
 
  console.log(ground.x)

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {

  background(390);
 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 200){
    monkey.velocityY = -10;
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
    
    
  
    
    
  
  obstacle();
  banana();
    
  drawSprites();   
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,500,50);
  
  if(obstacleGroup.isTouching(monkey)){
     ground.velocityX = 0;
     monkey.velocityX = 0;
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
    
 }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime,100,50);

}

function banana(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,200,20,20);
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -8;
  banana.y = Math.round(random(120,200));
  banana.lifetime = 100;
  monkey.depth = banana.depth + 1;
    
  foodGroup.add(banana);
 }
}

function obstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(800,310,20,20);
  obstacle.addAnimation("obstacle",obstacleImage)
  obstacle.scale = 0.15;
  obstacle.velocityX = -8;
  
  obstacle.lifetime = 100;
    
  obstacleGroup.add(obstacle);
 }
}
