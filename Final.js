let texting = "Bin Boss";


function preload(){
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

    let startbutton = new PlayButton(500,500,'Start')

    // image(bin3, 400,100);
    // image(trash1, random(600), random(600));
    // image(trash2, random(600), random(600));
    // image(trash3, random(600), random(600));
    // image(trash4, random(600), random(600));
}
function draw(){
    // image(trash1, 300, 300);
    // image(trash2, 400,400);
    fill('#6A9956');
    textFont(font1,100);
    text(texting, 100, 100);

    textFont(font2,100);
    text(texting, 100,300);

}

function startPage(){
    startbutton.diplsay();
}
