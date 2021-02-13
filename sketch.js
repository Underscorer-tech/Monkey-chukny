var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup, b1, back;
var score, stone, s1, overt, oimg,himg,STATE,st; 
var STATE,st,life,h1,h2,h3;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  s1 = loadImage("obstacle.png");
  b1 = loadAnimation("back2.png");
  oimg = loadImage("game_over.png");
  himg = loadImage("heart.png");
}


function setup() {

  FoodGroup = new Group();
  obstacleGroup = new Group();

  STATE = 1
life = 3
st = 0;

  createCanvas(555, 400);

  back = createSprite(300, 50);
  back.addAnimation("ba", b1);
  //back.scale=2
  //back.velocity=-2

  

  overt = createSprite(300, 200);
  overt.addImage("over1", oimg);
  overt.visible = false;

  h1 = createSprite(325,15);
  h1.scale=0.02;
  h1.addImage("hi",himg)
  
   h2 = createSprite(355,15);
  h2.scale=0.02;
  h2.addImage("hi",himg)
  
   h3 = createSprite(385,15);
  h3.scale=0.02;
  h3.addImage("hi",himg)

  monkey = createSprite(30, 350, 20, 20);
  monkey.scale = 0.08
  // monkey.debug = true;
  monkey.addAnimation("running", monkey_running);
  ground = createSprite(300, 385, 600, 20);
  ground.visible = false;
 
}


function draw() {
  // background("white");

if (life == 2){
    h3.destroy();
  }
if (life == 1){
    h2.destroy();
  }
  
  if (life == 0){
    h1.destroy();
  }



  if (keyDown("space") && monkey.y > 345) {

    monkey.velocityY = -13;

  }

  if (monkey.isTouching(obstacleGroup)) {

    life= life-1
   obstacleGroup.destroyEach();
    
  }

  if (life === 0 ){
    
    STATE = 0
    
  }
  
  
  if (monkey.isTouching(FoodGroup)){
    
    score=score+10;
    FoodGroup.destroyEach();
    
  }
  
  if (STATE == 1){
    st = Math.round(frameCount/25);
    
  }
  
  if (STATE == 0) {
    overt.visible = true;
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();

  }

  monkey.velocityY = monkey.velocityY + 0.8;


  console.log("mouseY:"+" "+mouseY + " " + "mouseX: "+ mouseX+" "+"FrameCount:"+frameCount);
             
  monkey.collide(ground);

  stones();
  fruits();
 
  drawSprites();
  fill("black");
  stroke("white");
  textSize(16);
  textFont("Times New Roman")
  text("Survival Time:",410,25);
  text(st,525,25);
}

function stones() {

  if (frameCount % 100 === 0) {

    stone = createSprite(600, 350);
    stone.addImage("sa", s1);
    stone.velocityX = -6;
    stone.lifetime = 150;
    stone.scale = 0.09;
    obstacleGroup.add(stone);
   //stone.debug=true;
    stone.setCollider("circle",0,0,12)
  }

}

function fruits() {
  
  if (frameCount % 233 === 0 ){
  
  banana = createSprite(600,290);
  banana.addImage("b1",bananaImage);
  banana.velocityX= -6 ;
  banana.lifetime = 150;
    FoodGroup.add(banana);
    banana.scale=0.09;
  banana.y=Math.round(random(220,360));
 // banana.debug=true;
    banana.setCollider("circle",0,0,95);
  }
  
}





