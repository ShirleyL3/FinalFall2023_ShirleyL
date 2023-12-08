// Shirley Landeros
// Creative Coding Final

let gamename = "Bin";
let gamename2 = "Boss"

let screen = 0;
let trash = new Array(14);
let myfonts = new Array(4);
let startp = true;
let gamep = false;
let tx;
let ty;
let overTrash = false;
let picked = false;
let xOffset = 0.0; 
let yOffset = 0.0; 

function preload(){
    backphoto = loadImage('data/Oscar2.jpeg');
    bin1 = loadImage('data/bin1.png');
    bin2 = loadImage('data/bin2.png');
    bin3 = loadImage('data/bin3.png');

    for (let i = 1; i< trash.length; i++){ //loads all 13 of my trash pngs
        trash[i] = loadImage('data/trash' + i + '.png')
    }

    for (let f = 1; f<myfonts.length; f ++){ //loads my 3 fonts
        myfonts[f] = loadFont('data/font' + f  + '.otf')
    }
}

function setup(){
    createCanvas(800,800);
    startbutton = new Button(190,400,'Start');
    garbageitem = new Garbage(trash[1]);
    tx = width/2.0;
    ty = height/2.0;
}

function draw(){
    if (startp){
        startPage();
    }
    if (gamep){
        gameScreen();
        garbageitem.draw();
    }
}

function mousePressed(){
    if ((startbutton.inButton(mouseX, mouseY)) && (startp == true)){
         screen = 0;
         gameScreen();
         startp = false;
         gamep = true
    }
    if (gamep){
        garbageitem.mousePressed();
    }   
}

function mouseDragged(){
    if(gamep){
        garbageitem.mouseDragged();
    }
}

function mouseReleased(){
    if(gamep){
        garbageitem.mouseReleased();
    }
}

function startPage(){ // displays the homescreen
    background(0);
    backphoto.resize(1210,0); //Oscar the grouch photo
    image(backphoto, 0, 0); // loads Oscar photo

    fill('#314123'); //dark green 
    textFont(myfonts[1], 150); 
    text(gamename, 20, 200); // Displays Game Name
    text(gamename2, 20, 330);

    startbutton.diplsay(); // displays start button 

    if (startbutton.inButton(mouseX, mouseY)){ // Chnages the button color if the mosue is hovering over
        startbutton.changecol(255); // white
    }else{
        startbutton.changecol('#314123'); // back to green 
    }
}

function gameScreen(){ 
    background(255);
    fill('#314123');
    textFont(myfonts[1],40);
    text('Time:', 30,50);
    text('Trash Left:', 30,100);
    // score keeper
    //https://editor.p5js.org/ehersh/sketches/Hk52gNXR7//

    //timer coutdown: https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG

    image(bin1, 100, 450);
    image(bin2, 500, 487);    
}


class Button{ // makes a button

    constructor(x, y, t) { // x position, y position, text
        this.x = x;
        this.y = y;
        this.t = t;
        this.colorshade = '#00A986';
    }

    diplsay(){ // displays button in rectangular box and intakes a text input
        fill(255, 100);
        rect(this.x -100, this.y - 20, 200, 40, 20);
        fill(this.colorshade);
        textFont(myfonts[1], 30);
        text(this.t, this.x-44, this.y + 10);
    }

    changecol(col){ // method that can change color of button
        this.colorshade = col;
    }

    inButton(x2, y2){ // checks if mouse is inside the button
        var d = dist(x2, y2, this.x, this.y);
        if (d<40){
            return true;
        }else{
            return false;
        }
    }
}

class Garbage{

    constructor(i){
        this.i = i;
        this.x = random(100,700);
        this.y = random(50,430);
        this.size = random(90,120);
    }

    display(){
        //this.i.resize(random(90,120), 0); //resizes the image object while keeping aspect ratio
    }

    draw(){// checks if mouse is inside the trash images ????
        tint(255, 255, 255);
        if (mouseX > tx-this.x && mouseX < tx+this.x && 
            mouseY > ty-this.y && mouseY < ty+this.y) {
            overTrash = true;
        } else {
            overTrash = false;
        } 
        image(this.i, tx, ty, this.size, this.size); // puts the image in a random location while giving it a random size 
    }

    mousePressed() {
        if(overTrash) { 
          picked = true; 
          
        } else {
          picked = false;
         
        }
        xOffset = mouseX-tx; 
        yOffset = mouseY-ty; 
    }

    mouseDragged() {
        if(picked) {
          tx = mouseX-xOffset; 
          ty = mouseY-yOffset; 
        }
    }
      
    mouseReleased() {
        picked = false;
    }
}