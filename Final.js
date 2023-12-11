// Shirley Landeros
// Creative Coding Final

let gamename = "Bin";
let gamename2 = "Boss"

let screen = 0;
let trash = new Array(13);
let trashlst = new Array(13);
let myfonts = new Array(4);
let startp = true;
let gamep = false;
let tx;
let ty;
let countdown = 20;
let bin1;
let bin2;
let trashcount = 13;

function preload(){
    backphoto = loadImage('data/Oscar2.jpeg');
    bin1 = loadImage('data/bin1.png');
    bin2 = loadImage('data/bin2.png');
    bin3 = loadImage('data/bin3.png');

    for (let i = 0; i< trash.length; i++){ //loads all 13 of my trash pngs
        trash[i] = loadImage('data/trash' + i + '.png');
    }

    for (let f = 1; f< myfonts.length; f ++){ //loads my 3 fonts
        myfonts[f] = loadFont('data/font' + f  + '.otf')
    }
}

function setup(){
    createCanvas(800,800);
    startbutton = new Button(190,400,'Start');

    for(let g = 0; g< trash.length; g++){ // iterates through trash array
        trashlst[g] = new Garbage(trash[g], random(100,700), random(50,430), g);
        //trashlst.push(new Garbage(trash[g], random(100,700), random(50,430), g));
    }

    setInterval(timeCount, 1000);
}

function draw(){
    if (startp){
        startPage();
    }
    if (gamep){
        gameScreen();
        for (let i = 0; i< trashlst.length; i++){
            trashlst[i].draw();
        }
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
        for (let i = 0; i< trashlst.length; i++){
            trashlst[i].mousePressed();
        }
    }   
}

function mouseDragged(){
    if(gamep){
        for (let i = 0; i< trashlst.length; i++){
            trashlst[i].mouseDragged();
        }
    }
}

function mouseReleased(){
    if(gamep){
        for (let i = 0; i< trashlst.length; i++){
            trashlst[i].mouseReleased();
        }
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
    textFont(myfonts[3],40);
    text('Trash Left: ' + trashcount, 30,100);

    //Timer 
    if (countdown <= 20) {
        text("Time: " + countdown, 30 , 50);
    }
    if (countdown == 0) {
        /// New fucntion
    }

    // score keeper
    //https://editor.p5js.org/ehersh/sketches/Hk52gNXR7//

    image(bin1, 100, 450);
    image(bin2, 500, 487);
}

function timeCount() { // Starts coutdown once on Game Page
    if (countdown> 0 && gamep == true){
      countdown--;
    }
}

//function for tracking number of trash left 


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

    constructor(i,x,y,type){ //image, position x, position y
        this.i = i;
        this.x = x;
        this.y = y;
        this.type = type
        this.size = random(90,120);
        this.overTrash = false;
        this.picked = false;
        this.xOffset = 0.0; 
        this.yOffset = 0.0; 

    }

    draw(){// checks if mouse is inside the trash images
        if (mouseX > this.x && mouseX < this.x+this.size && 
            mouseY > this.y && mouseY < this.y+this.size) { // checks if mouse is in image
            this.overTrash = true;
        } else {
            this.overTrash = false;
        } // chnaged tx and ty
        image(this.i, this.x, this.y, this.size, this.size); // puts the image in a random location while giving it a random size 
    }

    mousePressed() {
        if(this.overTrash) { 
            this.picked = true;

        } else {
          this.picked = false;
         
        }
        this.xOffset = mouseX-this.x; // movement of each unique object
        this.yOffset = mouseY-this.y; 
    }

    mouseDragged() {
        if(this.picked) {
          this.x = mouseX-this.xOffset; // new unique position
          this.y = mouseY-this.yOffset; 
        }
    }
      
    mouseReleased() {
        this.picked = false; //drops unique object
        this.inbin();
    }

    inbin(){

        if (this.x > 100 && this.x < 300 && 
            this.y > 450 && this.y < 550){ // 
                if (this.type == 1 || this.type == 2 || this.type ==3 || this.type == 5
                    || this.type ==6 || this.type ==7 || this.type ==8 || this.type == 11 || this.type == 12 ){
                    for (let i = 0; i < trashlst.length; i++){
                        if(trashlst[i].type == this.type){
                            trashlst.splice(i, 1);
                            trashcount -= 1;
                        }
                    }
                } //if stat
        } //if stat

        if (this.x>500 && this.x < 600 &&
            this.y >437 && this.y < 487){
                if (this.type == 0 || this.type ==4 || this.type == 9 || this.type == 10){
                    for (let i = 0; i < trashlst.length; i++){
                        if(trashlst[i].type == this.type){
                            trashlst.splice(i, 1);
                            trashcount -=1;
                        } // if stat
                    } // for loop
                }// if stat
        } //if stat
    } // inBin Class
}// class 
