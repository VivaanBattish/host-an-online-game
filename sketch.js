var PLAY = 1;
var END = 0;
var START = 2;
var WIN = 3;
var gameState = START;
var monkey , monkey_running,monkey_stop;
var banana1,banana2,banana3,bananaImage,obstacleImage;
var ground,score=0,obstaclesGroup;
var lol,footballnoise,kaboom,thunder,kudo,checkpoint;
function preload(){
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 footballnoise = loadSound("Crunch.wav-10098-Free-Loops.com.mp3");
 kaboom = loadSound("KickWhoosh FS041103.mp3");
 thunder = loadSound("maro-jump-sound-effect_1.mp3");
 kudo = loadSound("maro-jump-sound-effect_1.mp3");
 checkpoint = loadSound("GunShotSnglShotIn PE1098109.mp3");
}

function setup() {
createCanvas(800,530);
lol = createSprite(-20,300,10,2000)
  ground = createSprite(400,520,800,150); 
ground.shapeColor="coral";
ground2 = createSprite(400,475,800,50); 
ground2.visible = false;
monkey = createSprite(100,405,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.15;
bannana1 = createSprite(750,random(260,425),40,40);
bannana2 = createSprite(1000,random(260,425),40,40);
bannana3 = createSprite(1300,random(260,425),40,40);
bannana1.addImage(bananaImage);
bannana2.addImage(bananaImage);
bannana3.addImage(bananaImage); 
bannana1.scale=0.1;
bannana2.scale=0.1;
bannana3.scale=0.1;
obstaclesGroup = createGroup();
}


function draw() {
background("green");

reallyrestart();
}
function jump(){
if(keyDown("space")&&monkey.isTouching(ground)){
kudo.play();
  monkey.velocityY=-25;
}  
 monkey.velocityY = monkey.velocityY + 1.5 ; 
}
function monkeytouch(){
if(monkey.isTouching(bannana1)){
footballnoise.play();
bannana1.x=750;   
bannana1.y=random(260,425) 
bannana1.velocityX=random(-5,-10);
score = score+1;
}
if(monkey.isTouching(bannana2)){
footballnoise.play();
bannana2.x=1000;   
bannana2.y=random(260,425) 
bannana2.velocityX=random(-5,-10);
score = score+1;
}
if(monkey.isTouching(bannana3)){
footballnoise.play();
bannana3.x=1300;   
bannana3.y=random(260,425) 
bannana3.velocityX=random(-5,-10);
score = score+1;
}
}
function returnback(){
if(lol.isTouching(bannana1)){
bannana1.x=750;   
bannana1.y=random(260,425) 
bannana1.velocityX=random(-5,-10);
}  
if(lol.isTouching(bannana2)){
bannana2.x=1000;   
bannana2.y=random(260,425) 
bannana2.velocityX=random(-5,-10);
}
if(lol.isTouching(bannana3)){
bannana3.x=1300;   
bannana3.y=random(260,425) 
bannana1.velocityX=random(-5,-10);
}
}
function obstacles(){

  if (frameCount % 80=== 0) {
   var obstacle = createSprite(1000,430,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.3 ;
    obstacle.velocityX = -8;
    obstacle.lifetime = 300;  
    obstacle.setCollider("circle",0,0,160);
    obstacle.debug = true;
    obstaclesGroup.add(obstacle);
  }
}
function destroy(){
if(monkey.isTouching(obstaclesGroup)){
kaboom.play();
gameState=END;
}  
}
function reallyrestart(){

  if(gameState===PLAY){
   jump();
monkey.collide(ground2); 
bannana1.velocityX=random(-5,-10);
bannana2.velocityX=random(-5,-10);
bannana3.velocityX=random(-5,-10);
textSize(30);
fill("black");
text("bannana ate="+score,220,100);
  monkeytouch(); 
returnback();
obstacles()
destroy();
compliment();
drawSprites();  
} 

  if(score===31){
 gameState= WIN;
}
  if(gameState===WIN){
textSize(90);
fill("black");
text("YOU WIN",150,150);  
textSize(50);
text("Press R to Play Again",110,300);  
}
  if(gameState===START){
textSize(90);
fill("black");
text("Press R to Play",50,250);  
textSize(50);
text("Get 31 point to win.",100,350);  
text("Eat bannanas to socre points.",50,400);  
}
  if(gameState===END){
background("yellow");
textSize(50);
fill("red");
text("Monkey has been caught!!!",50,200); 
fill("black ");
text("press R to restart",130,300); 
textSize(30);
fill("black");
text("bannana ate="+score,220,100);
}
    if(keyDown("R")&&gameState===START){
gameState=PLAY;
    }
 if(keyDown("R")&&gameState===WIN){
score = 0;
   thunder.play();
gameState=PLAY; 
obstaclesGroup.destroyEach();
monkey.x=100; 
monkey.y=405; 
bannana1.x=750;   
bannana1.y=random(260,425) 
bannana2.x=1000;   
bannana2.y=random(260,425)
bannana3.x=1300;   
bannana3.y=random(260,425)
 }
  if(keyDown("R")&&gameState===END){
gameState=PLAY; 
thunder.play();
score=0;
obstaclesGroup.destroyEach();
monkey.x=100; 
monkey.y=405; 
bannana1.x=750;   
bannana1.y=random(260,425) 
bannana2.x=1000;   
bannana2.y=random(260,425)
bannana3.x=1300;   
bannana3.y=random(260,425)
}
}
function compliment(){
  if(score>0 && score%10 === 0){
       checkpoint.play() 
  score=score+1;  
  }
}