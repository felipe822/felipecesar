//(variaveis para posição inicial do jogador);
var x = 390;
var y = 350;
//(variaveis para objeto);
var xo=150;
var yo=1;
var vxo=[];
var vyo=[];
//(Variaveis para disparo);
var xd=0; 
var yd=0;
var Disparo = false;
let Vidas = 15;
let Pontos = 0;
let Nivel = 1;
var velocidade=2;
//(Variaveis para colisão);
var raiok = 25;
var raioj= 25;
var raioP = 25;
var raioO = 30;
var qtobjetos=2;
var barreiradepontos=10;

//(variaveis para imagens)
let imgI;
let imgNI;
let imgN;
let imgtela1;
let imgtiro;
let imgtela4;
let imgtela3;
let imgtela2;

var tela = 1;

function preload() {
  imgI = loadImage('inimigo1.png');
  imgN = loadImage('nave-1.png');
  imgNI = loadImage('inimigo2.png');
  imgtela1 = loadImage('Star-Wars-TELA1.png');
  imgtiro = loadImage('disparo-png-4.png ');
  imgtela4 = loadImage('game over.png');
  imgtela3 = loadImage('TELA4 (2).png')
  imgtela2 = loadImage('tela2-1.png')
}

function setup() {
  
  //(Tamanho do fundo da tela);
  createCanvas(800, 500);
  
  for(var i = 0; i < qtobjetos; i++){
            vxo[i]= random(0,800);
            vyo[i]= random(0,500);
  }
}

function draw() {
  if(tela ==1 ){
    //imagem inicial
   
    background(0)
    image(imgtela1,250,150,300,200);
    textSize(32);
    text("APERTE ENTER PARA JOGAR",200, 450);
    fill('White');
    if(keyIsDown(ENTER)){
    	tela = 2;
    }
  }
  if(tela == 2 ){
  //imagem de jogo
  
  background(0);
  image(imgtela2,1,1)  
  fill(0, 102, 153);
  textSize(25);
  text('Vidas:'+ Vidas, 10, 35);
  text('Pontos:'+ Pontos, 350, 35);
  text('Nivel:'+ Nivel, 650, 35);
  fill(255);
 
     for(var i = 0; i < qtobjetos; i++){
       
       //ellipse(vxo[i],vyo[i],50,50)
       image(imgNI,vxo[i],vyo[i])
       vyo[i]= vyo[i]+2;
        velocidade = random(1);
      
       if(vyo[i] > 500){
         
         vyo[i]=-100;
         Vidas--;
              
        }
        if( dist(xd,yd,vxo[i],vyo[i]) < raiok + raioj){
         vxo[i]= random(0,800);
         vyo[i]=-100;
           Pontos++
           xd=x;
           yd=y;
           
         }
       
       if( dist(x,y,vxo[i],vyo[i]) < raioP + raioO){
       x = 390;
       y = 400;
        vxo[i]= random(0,800);
        vyo[i]= 700;  
        Vidas--;
        
        }
      
       
  }
  
  
  
  //(objeto aparecendo e sumindo da tela);
  if( dist(xd,yd,xo,yo) < raioP + raioP){
     
     xo= random(0,800)
     yo= 700;
     velocidade=random(1)
  }
    
    if( dist(x,y,xo,yo) < raioj + raiok){
     fill(0);
     Vidas--;
     xo= random(0,800)
     yo= 700;
    velocidade=random(1)
    }
    fill(77) 
    //ellipse(xo,yo,2*raioP,2*raioP); 
    imageMode(CENTER);
    image(imgI,xo,yo);
    yo=yo+1;
    
    
  
  if(yo > 500){
            velocidade=random(2)
            yo= - random(500);
            xo= random(0,800); 
            
            
  }
   else{
     yo+=velocidade;
    
  }
  
     if(yo > 500){
             
     }
    
  //Disparo(Tiro);
  if( (keyIsDown(CONTROL) && Disparo==false)){
       xd=x;
       yd=y;
       Disparo= true;
     }
  if(Disparo === true){
       //fill('red');
       imageMode(CENTER);
       image(imgtiro,xd,yd);
       //ellipse(xd,yd,7,7);
       yd=yd-19;
         
    
    if( yd < 0 ){
       Disparo = false;
       
       }  
  }
  
         //incremento de pontos;
       if(Pontos > barreiradepontos){
         Nivel= Nivel + 1;
        
         barreiradepontos = barreiradepontos + 10;
       }
         //implementar a dinâmica de mudança de nivel 
       if( Nivel > 1){
           velocidade=random(3,5)       
          
       }
       if(Nivel > 2){
        velocidade=random(5,3,7)
         
       }  
  
       if( Nivel > 3){
           velocidade=random(6,7)       
          
       }
       if(Nivel > 4){
        velocidade=random(7,8)
         
       }   
       if( Nivel > 4){
           velocidade=random(8,9)       
          
       }
       if( Nivel > 5){
           velocidade=random(10,12)       
          
       }
       if(Nivel > 7 ){
          velocidade = random(12,15,)
       }
       
//(movimentação do jogador);
  if (keyIsDown(LEFT_ARROW)) {
    x -= 8;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 8;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 8;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 8;
  }

       //(jogador);
       fill(215);     
       //ellipse(x,y,50,50);      
       imageMode(CENTER);
       image(imgN,x,y)
  }
  if(Vidas<=0 ){
    tela = 3;
   //imagem final
  	background(0)
    image(imgtela3,140,210,0,0); 
    textSize(32);   
    fill('White');
    text("GAME OVER"+"\n" ,350, 350);
    textSize(15);
    text("APERTE ESPAÇO PARA VOLTAR A JOGAR",320,400)
    if(keyIsDown(32)){
     tela = 2;
     Vidas=15;
     velocidade=random(1);
     Pontos= 0;
     Nivel = 1;
     x=350;
     y=500;
     for(var i = 0; i < qtobjetos; i++){
     vxo[i]= random(0,800);
     vyo[i]= random(0);
     }
     xo=0;
     yo=2;
    }
  }
  if(Nivel == 8 ){
    tela = 4;
    background(220)
    image(imgtela4,350,240,0,0);
    textSize(32);   
    fill('Black');
    text("PARABÉNS,VOCÊ GANHOU O JOGO",150, 350);
    textSize(15);
    text("APERTE ESPAÇO SE QUISER JOGAR NOVAMENTE",460,400)
    if(keyIsDown(32)){
     tela = 2;
     Vidas=15;
     velocidade=random(1);
     Pontos= 0;
     Nivel = 1;
     x=350;
     y=500;
     for(var i = 0; i < qtobjetos; i++){
     vxo[i]= random(0,800);
     vyo[i]= random(0);
     }
     xo=0;
     yo=2;
    }
  }
}