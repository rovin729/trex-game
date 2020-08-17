var PLAY=1;
var END=0;
var gamestate = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudgroup,cloudimage,cloud;
var obstaclegroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameover,restart,gameoverImage,restartImage;
var score=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudimage = loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  
  obstacle2=loadImage("obstacle2.png");
  
  obstacle3=loadImage("obstacle3.png");
  
  obstacle4=loadImage("obstacle4.png");
  
  obstacle5=loadImage("obstacle5.png");
  
  obstacle6=loadImage("obstacle6.png");
  
  restartImage=loadImage("restart.png");
  
  gameoverImage=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,20);
  
  ground = createSprite(400,180,800,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(400,180,800,10);
  invisibleGround.visible = false;
  
  cloudgroup = new Group();
  obstaclegroup = new Group();
  
  gameover = createSprite(400,75);
  restart = createSprite(400,125);
  
  gameover.addImage(gameoverImage);
  restart.addImage(restartImage);
  
  gameover.scale=0.5;
  restart.scale=0.5;
  
  gameover.visible=false;
  restart.visible=false;
}

function draw() {
  background("white");
  
  text(score, 700,50);
  
  if(gamestate===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space")&&trex.isTouching(ground)||keyDown("UP_ARROW")&&trex.isTouching(ground)) {
      trex.velocityY = -10;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
  
    spawnClouds();
  
    spawnObstacles();
    
    if(obstaclegroup.isTouching(trex)){
       gamestate=END;
    }
    
  }else if(gamestate===END){
    gameover.visible=true;
    restart.visible=true;
    
    ground.velocityX=0;
    trex.velocityY=0;
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    
    trex.addImage(trex_collided);
    
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
  }
  
if(mousePressedOver(restart)){
     reset();
}
  drawSprites();
}

function reset() {
  gamestate=PLAY;
  gameover.visible=false;
  restart.visible=false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score=0;
  trex.changeAnimation(trex_running);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(800,120,40,10);
    cloud.y = Math.round(random(80,150));
    cloud.addImage("cloud",cloudimage);
    cloud.velocityX = -4;
    cloud.scale=0.75
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,165,10,40);
    obstacle.velocityX = -(1.5*getFrameRate()/100+6);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
        
      case 1:
        obstacle.addImage(obstacle1);
        break;
      
      case 2:
        obstacle.addImage(obstacle2);
        break;
        
      case 3:
        obstacle.addImage(obstacle3);
        break;
        
      case 4:
        obstacle.addImage(obstacle4);
        break;
        
      case 5:
        obstacle.addImage(obstacle5);
        break;
        
      case 6:
        obstacle.addImage(obstacle6);
        break;
        
      default:
        break;
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.45;
    obstacle.lifetime = 140;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}