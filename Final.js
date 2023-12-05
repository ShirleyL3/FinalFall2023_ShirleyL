let gamename = "Bin";
let gamename2 = "Boss"

let screen = 0;
let trash = new Array(14);
let myfonts = new Array(4);
let startp = true;

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
}
function draw(){
    if (startp){
        startPage();
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

function mousePressed(){
    if ((startbutton.inButton(mouseX, mouseY)) && (startp == true)){
        screen = 0;
        gameScreen();
        startp = false; 
    }


}

function gameScreen(){
    background(255);
    image(bin1, 100, 450);
    image(bin2, 500, 487);
    image(trash[1], 300,300);
    garbageitem.display();

    if (garbageitem.inImg(mouseX, mouseY)){ // Chnages the button color if the mosue is hovering over
        garbageitem.highlight(255); // red
    }else{
        startbutton.changecol(0); // 
    }



    // trash[1].resize(90,0);// resizes the image; makes it smaller 
    // image(trash[1], 300, 300);
    // trash[2].resize(120,0); 
    // image(trash[2], 400,400);
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

    constructor(i, x, y){
        this.i = i;
        this.x = x;
        this.y = y;
    }
    display(){// displays the image at a random location
        this.i.resize(random(90,120), 0); //resizes the image object while keeping aspect ratio
        image(this.i, random(100,700), random(50,430)); // puts the image in a random location
    }
    highlight(highlighter){ // tints the image a red color to highlight it
        tint(highlighter,0,0,100);
    }
    inImg(x2, y2){// checks if mouse is inside the trash images
        var d = dist(x2, y2, this.x, this.y);
        if (d<100){
            return true;
        }else{
            return false
        }
    }
}