var PLAY = 1;
var END = 0;
var ball,ballImg;
var ground,groundImage,invisibleGround;
var obstacle1,obstacle2,obstacle3,obstacleGroup;
var score = 0;
var GameOver,restart,GameOverImg,restartImg;
var gameState = PLAY;


function preload(){

ballImg = loadImage("ball.png");
groundImage = loadImage("ground.png");

obstacle1 = loadImage("obstacle1.jpg");
obstacle2 = loadImage("obstacle2.jpg");
obstacle3 = loadImage("obstacle3.jpg");

GameOverImg = loadImage("GameOver.png");
restartImg = loadImage("restart.png");


}

function setup() {
 createCanvas(1200,1200);


 ball = createSprite(50,180,20,50);
 ball.addImage(ballImg);
 ball.scale = 0.5;

 ground = createSprite(400,400,1200,60);
 ground.addImage(groundImage);
 ground.x = ground.width/3;
 ground.velocityX = -(6 + 3*score/100);

 GameOver = createSprite(600,100);
 GameOver.addImage(GameOverImg);

 restart = createSprite(600,200);
 restart.addImage(restartImg);

 GameOver.scale = 0.5;
 restart.scale = 0.5;

 GameOver.visible = false;
 restart.visible = false;

 invisibleGround = createSprite(400,500,1200,10);
 invisibleGround.visible = true;

 obstacleGroup = new Group();
 score = 0;

 drawSprites()

}

function draw() {
    //ball.debug = true;

  //background(200);
 text("score:" + score,500,50);

 if(gameState===PLAY){
     score = score + Math.round(getFrameRate()/60)
     ground.velocityX = -(6 + 3*score/100);


   if(touches.length >0 || keyDown('space') && ball.y >=160){
       ball.velocityY = -12;
       touches = []
   }

   ball.velocityY = ball.velocityY + 0.9

   if(ground.x < 0){
       ground.x = ground.width/2;
   }

   spawnobstacles();

   if(obstacleGroup.isTouching(ball)){
       gameState = END;
   }
 }
 else if(gameState === END){
     GameOver.visible = true;
     restart.visible = true;

     ground.velocityX = 0;
     ball.velocityY = 0;
     obstacleGroup.setVelocityXEach(0);

     obstacleGroup.setLifetimeEach(-2);


   if(mousePressedOver(restart)){
       reset();
   }

 }
}
function spawnobstacles(){
    if(frameCount % 60 ===0){
        var obstacle = createSprite(1200,160,10,40)
        obstacle.velocityX = -(6 + 3*score/100);


        var rand = Math.round(random(1,3));
        switch(rand){
            case 1:obstacle.addImage(obstacle1)
            break;
            case 2:obstacle.addImage(obstacle2)
            break;
            case 3:obstacle.addImage(obstacle3)
            break;

            default:break;
        }

        obstacle.scale = 0.5;
        obstacle.lifetime = 600;
        obstacleGroup.add(obstacle);
    }

}
function reset(){
    gameState = PLAY;
    GameOver.visible = false;
    restart.visible = false;

    obstacleGroup.destroyEach();

    score = 0;
}