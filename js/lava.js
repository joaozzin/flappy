//variaveis
var player;
var score = 0;
var hightScore = 0;
var biomeCounter = 0;
var lastScore = 0;
var downEdge,upEdge;
var obstacles; 
var pressed = true;

//varImgs
var nuvemSakura,nuvemdesert,nuvemSea,nuvemForest;
var bgDesert,bgSakura,bgForest,bgSea;
var desert,forest,sea,sakura;
var flappyImg;

function preload(){
    //loadImages
    flappyImg = loadImage("/assets/lava.png");
    //baixo
    desert = loadImage("/assets/desert.png");
    sakura = loadImage("/assets/sakura.png");
    forest = loadImage("/assets/forest.png");
    sea = loadImage("/assets/sea.png");
    //cima
    nuvemForest = loadImage("/assets/nuvemForest.png");
    nuvemSakura = loadImage("/assets/nuvemSakura.png");
    nuvemdesert = loadImage("/assets/nuvemDesert.png");
    nuvemSea = loadImage("/assets/nuvemSea.png");

    //bgLoad
    bgSakura = loadImage("/assets/bgSakura.png");
    bgDesert = loadImage("/assets/bgDesert.png");
    bgForest = loadImage("/assets/bgForest.png");
    bgSea    = loadImage("/assets/bgSea.png");
    
    //createSprites
    player   = createSprite(300,100,64,64);
    upEdge   = createSprite(windowWidth/2,0,windowWidth,5);
    downEdge = createSprite(windowWidth/2,windowHeight,windowWidth,5);

    //createGroups
    obstacles = createGroup();

    //addImages
    player.addImage(flappyImg);

    //shapeColor
    upEdge.shapeColor   = "#e76060";
    downEdge.shapeColor = "#e76060";

}

function setup(){

    //tela
    createCanvas(windowWidth,windowHeight);

}

function draw(){
    //funçoes
    addImages();
    mecanica();
    criarObstaculos();
    colisao();

    //score , biomeCounter e hightScore
    biomeCounter +=1;
    score += 1;
    if(hightScore<score){
        hightScore = score;
    }
    
    //text scores
    push();

    textSize(50);
    fill("#18523F");
    text("score: "+score,50,50);
    text("hight score: "+hightScore,50,100);
    text("last score: "+lastScore,50,150);
    
    pop();

    //desenhar
    drawSprites();
}
function mecanica(){ 
    //gravidade
    var maxSpeed = 4;
    if(player.velocityY < 10){
        player.velocityY += 1;
    }

    //pulo
    if(keyDown("up") && pressed === false){
        player.velocityY = -maxSpeed*2;

    }
    if(keyWentUp("up")){
        pressed = true;
    }

    //dash
    if(keyDown("right")){
        player.velocityY = 3;
    }
}

function colisao(){
    //bordas
    if(player.isTouching(obstacles) || player.isTouching(upEdge)){
        //resetar score
        lastScore = score;
        score = 0;
        biomeCounter = 0;

        //resetar player
        player.y = 100;
        player.velocityY = 0;

        //resetar obstaculos
        obstacles.destroyEach();
        obstacles.clear();

        //resetar pressed
        pressed = true;


    }
    if(player.isTouching(downEdge)){
        player.collide(downEdge);
        if(pressed){
            pressed = false;
        }
    }
}

function criarObstaculos(){
    var randomvar = Math.round(random(-windowHeight+60,-60));

    if(score%100 === 0){
        var obstacle  = createSprite(windowWidth+10,randomvar                             ,50,windowHeight*2-300);
        var obstacle2 = createSprite(windowWidth+10,randomvar+windowHeight-20+windowHeight,50,windowHeight*2-300);
        obstacles.add(obstacle);
        obstacles.add(obstacle2);
        
        //velocidade
        obstacle.velocityX  = -10;
        obstacle2.velocityX = -10;

        //addImages
        if(biomeCounter > 3000){
            obstacle.addImage(nuvemdesert);
            obstacle2.addImage(desert);
        }else if(biomeCounter > 2000){
            obstacle.addImage(nuvemForest);
            obstacle2.addImage(forest);
        }else if(biomeCounter > 1000){
            obstacle.addImage(nuvemSea);
            obstacle2.addImage(sea);
        }else{
            obstacle.addImage(nuvemSakura);
            obstacle2.addImage(sakura);
        } 
    }
    
        //lifeTime
        obstacles.setLifetimeEach(60);
};

function addImages(){
    //fundo
    if(biomeCounter > 4000){
        biomeCounter = 0;
    }else if(biomeCounter > 3000){
        background(bgDesert);
    }else if(biomeCounter > 2000){
        background(bgForest);
    }else if(biomeCounter > 1000){
        background(bgSea);        
    }else{
        background(bgSakura);
    } 
}