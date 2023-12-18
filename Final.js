// Shirley Landeros
// Creative Coding Final

// tried to make the game reploop when clicking play again however it wouldnt work; I tried to use redraw(); but using noLoop would break the game

let gamename = "Bin";
let gamename2 = "Boss"

let screen = 0;
let trash = new Array(13);
let trashlst = new Array(13);
let myfonts = new Array(4);
let pollutionImg = new Array(5);
let rescueImg = new Array(5);
let startp = true;
let gamep = false;
let tx;
let ty;
let countdown = 20;
let bin1;
let bin2;
let trashcount = 13;
let lastMessage = 'In our relentless pursuit of progress, we have overlooked a crucial reality: our planet is suffering. Pollution, in various forms, suffocating our home. From polluted air to oceans choked with plastic, our actions are pushing our world to the brink. Time is slipping away. This is not just about saving the planet; it is about safeguarding our future. We must act urgently to preserve the Earth, our only home, before it is too late.'
let messageChar = 0;
let margin = 25;

function preload(){
    backphoto = loadImage('data/Oscar.jpeg');
    bin1 = loadImage('data/bin1.png');
    bin2 = loadImage('data/bin2.png');

    for (let i = 0; i< trash.length; i++){ //loads all 13 of my trash pngs
        trash[i] = loadImage('data/trash' + i + '.png');
    }

    for (let f = 1; f< myfonts.length; f ++){ //loads my 3 fonts
        myfonts[f] = loadFont('data/font' + f  + '.otf');
    }

    for (let p = 0; p< pollutionImg.length; p ++){ //loads my 5 polltuion jpegs
        pollutionImg[p] = loadImage('data/pollution' + p  + '.jpeg');
    }

    for (let r = 0; r< rescueImg.length; r ++){ //loads my 5 rescue Images
        rescueImg[r] = loadImage('data/rescue' + r  + '.jpeg')
    }
}

function setup(){
    createCanvas(800,800);
    startbutton = new Button(190,400,'Start');
    playAgain = new Button(400,650,'Again?');

    for(let g = 0; g< trash.length; g++){ // iterates through trash array
        trashlst[g] = new Garbage(trash[g], random(100,700), random(50,430), g);
    }
    setInterval(timeCount, 1000);
    frameRate(20);
}

function draw(){
    console.log(frameCount)
    if (startp){
        frameCount = 0; // is constantly zero until game page starts 
        startPage();
    }
    if (gamep){
        // console.log(frameCount)
        gameScreen();
        
        for (let i = 0; i< trashlst.length; i++){
            trashlst[i].draw(); // displays trash
        } 
        if (trashcount > 0 && countdown == 0){ //if you lose
            frameRate(20); // 20 frames per second 

            if (frameCount < 460){ 
                image(pollutionImg[0],0,0);
                endText(1);
            } 
            else if (frameCount < 520){
                image(pollutionImg[1], 0, 0, 0, 800);
                endText(1);
            } 
            else if (frameCount < 580){
                image(pollutionImg[2], 0, 0);
                endText(1);
            }
            else if (frameCount < 640){
                image(pollutionImg[3], 0, 0, 1000, 800);
                endText(1);
            }
            else if (frameCount < 700){
                image(pollutionImg[4], 0, 0);
                endText(1);
            }
            else if (frameCount >= 700){
                background(0);
                gamep = false;
                endPage();
            }
        }
        if (trashcount== 0 && countdown >= 0){ //if won
            
            if (frameCount  < 460){
                image(rescueImg[0],0, 0, 800,800);
                endText(2);
            } 
            else if (frameCount < 520){
                image(rescueImg[1], 0, 0, 0, 800);
                endText(2);
            } 
            else if (frameCount < 580){
                image(rescueImg[2], 0, 0, 0, 800);
                endText(2);
            }
            else if (frameCount < 640){
                image(rescueImg[3], 0, 0, 900, 800);
                endText(2);
            }
            else if (frameCount < 700){
                image(rescueImg[4], 0, 0, 0, 800);
                endText(2);
            }
            // if (frameCount > 500) frameCount = 0;
            else if (frameCount >= 700){
                background(0);
                gamep = false;
                endPage();
            }
        }// if state.
    }
    if ((gamep == false) && (startp == false)){ // shows ending text
        endPage();
    } // gamep if state. 
}// end of draw

function endText(num){ // Displays ending text
    if (num ==1){
        fill('#D11A0F'); // Red
        textFont(myfonts[1], 70);
        text('YOU LOSE!!', 250,400);
        text('THE WORLD IS DOOMED', 20,470);
    }
    if (num == 2){
        fill('#2ACD22'); // Green
        textFont(myfonts[1], 70);
        text('YOU WIN!!', 250,400);
        text('THE WORLD IS SAVED!', 40,450);
    }
}

function mousePressed(){
    if ((startbutton.inButton(mouseX, mouseY)) && (startp == true)){ // once start button pressed
         screen = 0;
         gameScreen();
         startp = false;
         gamep = true
    }
    if (playAgain.inButton(mouseX, mouseY)){ // once play again pressed
        gamep = false;
        startp = true;
        redraw();
        startPage();
        // redraw();

    }
    if (gamep){
        for (let i = 0; i< trashlst.length; i++){ // trash items being pressed 
            trashlst[i].mousePressed();
        }
    }   
}

function mouseDragged(){ //moving the trash objects by dragging
    if(gamep){
        for (let i = 0; i< trashlst.length; i++){
            trashlst[i].mouseDragged();
        }
    }
}

function mouseReleased(){ // drops mouse at new postion when released
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


function endPage(){ // displays the letter at the end of the game
    
    background(0);
    let currString = lastMessage.substring(0, messageChar); // returns all characters of the lastMessage str

    // prints the message string with some margins
    push();
    fill('#EA0F00'); //red
    textFont(myfonts[1],35);
    textAlign(CENTER, TOP);
    text(currString, margin + 10, margin + 10, width - margin*2, height - margin);// keeps text from going out of web frame
    pop();

    messageChar += random(0.3,1); // Increase the current character and this also changes teh pace of the characters displayed

    playAgain.diplsay(); // displays play again button 

    if (playAgain.inButton(mouseX, mouseY)){ // Chnages the button color if the mosue is hovering over
        playAgain.changecol(255); // white
    }else{
        playAgain.changecol('#314123'); // back to green 
    }
    
}

function gameScreen(){ 
    background(255);
    fill('#314123');
    textFont(myfonts[3],40);
    text('Trash Left: ' + trashcount, 30,100); // keeps track of trash left 

    //Timer 
    if (countdown <= 30 && countdown > 10) {
        text("Time: " + countdown, 30 , 50);
    }
    if (countdown <= 10){
        text('Time:', 30,50);
        fill('#EA0F00'); //red
        textSize(140);
        text(countdown, 400 , 200);
    }

    image(bin1, 100, 450);
    image(bin2, 500, 487);
    // console.log(mouseX,mouseY);
}

function timeCount() { // Starts coutdown once on Game Page
    if (countdown> 0 && gamep == true){
      countdown--;
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
        this.found = false;
    }

    draw(){// checks if mouse is inside the trash images
        if (mouseX > this.x && mouseX < this.x+this.size && 
            mouseY > this.y && mouseY < this.y+this.size) { // checks if mouse is in image
            this.overTrash = true;
        } else {
            this.overTrash = false;
        }
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

    correctbin(){
        stroke('#34C941');// Green
        strokeWeight(15);
        line(360,631, 410,700);
        line(410,700, 460, 550);
    }

    wrongbin(){
        stroke('#D11A0F'); //red
        strokeWeight(15);
        line(340,560, 480,700);
        line(480,560, 340,700);
    } // prints X for the first 2

    inbin(){ // checks if the trash item is in either of the bins 

        // bin 1
        if (this.x > 100 && this.x < 300 && 
            this.y > 400 && this.y < 600){ // checks if the image is in the area of the garbage bin
                if (this.type == 1 || this.type == 2 || this.type ==3 || this.type == 5
                    || this.type ==6 || this.type ==7 || this.type ==8 || this.type == 11 || this.type == 12 ){ // these specific items belong in bin1
                    for (let i = 0; i < trashlst.length; i++){ 
                        if(trashlst[i].type == this.type){ // if the type in the list matches the types in the if loop
                            trashlst.splice(i, 1); // deletes i and takes in index and # of items to del
                            trashcount -= 1; // deincrements the count by 1 if del
                            this.found = true
                        } // if stat
                    } //for loop
                } //if stat
                else if (!this.found){
                    this.wrongbin();
                    stroke(255);
                    strokeWeight(0);
                    this.found = true;
                } 
        } //if stat

        //bin2
        if (this.x>500 && this.x < 700 && 
            this.y >400 && this.y < 600){
                if (this.type == 0 || this.type ==4 || this.type == 9 || this.type == 10){ // these items belong to bin2
                    for (let i = 0; i < trashlst.length; i++){
                        if(trashlst[i].type == this.type){
                            trashlst.splice(i, 1);
                            trashcount -=1;
                            this.found = true;
                        } // if stat
                    } // for loop
                    
                }// if stat
                else if (!this.found){
                    this.wrongbin();
                    stroke(255);
                    strokeWeight(0);
                    this.found = true;
                }
        } //if stat
    } // inBin Class
}// class 

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
