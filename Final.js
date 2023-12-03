let gamename = "Bin";
let gamename2 = "Boss"


function preload(){
    backphoto = loadImage('data/Oscar.jpeg');
    bin1 = loadImage('data/bin1.png');
    bin2 = loadImage('data/bin2.png');
    bin3 = loadImage('data/bin3.png');
    trash1 = loadImage('data/trash1.png');
    trash2 = loadImage('data/trash2.png');
    trash3 = loadImage('data/trash3.png');
    trash4 = loadImage('data/trash4.png');
    font1 = loadFont('data/font1.otf');
    font2 = loadFont('data/font2.ttf');
    font3 = loadFont('data/font3.otf');
    startp = true;
}

function setup(){
    createCanvas(800,800);
    background(255);
    image(bin1, 100, 450);
    image(bin2, 500, 487);
    trash1.resize(90,0);// resizes the image; makes it smaller 
    image(trash1, 300, 300);
    trash2.resize(120,0); 
    image(trash2, 400,400);
    startbutton = new Button(160,420,'Start')

    // image(bin3, 400,100);
    // image(trash1, random(600), random(600));
    // image(trash2, random(600), random(600));
    // image(trash3, random(600), random(600));
    // image(trash4, random(600), random(600));
}
function draw(){
    // image(trash1, 300, 300);
    // image(trash2, 400,400);
    // fill('#6A9956');
    // textFont(font1,100);
    // text(texting, 100, 100);

    // textFont(font2,100);
    // text(texting, 100,300);

    if (startp){
        startPage();
    }

}

function startPage(){ // displays the homescreen
    background(0);
    backphoto.resize(1100,0); //Oscar the grouch photo
    image(backphoto,-150,100); // loads Oscar photo

    fill('#314123'); //dark green 
    textFont(font1, 150); 
    text(gamename, 20, 250); // Displays Game Name
    text(gamename2, 20, 380);

    startbutton.diplsay(); // displays start button 

    if (startbutton.inButton(mouseX, mouseY)){ // Chnages the button color if the mosue is hovering over
        startbutton.changecol(255); // white
    }else{
        startbutton.changecol('#314123'); // back to green 
    }
}

function mousePressed(){

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
        textFont(font1, 30);
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