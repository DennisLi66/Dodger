

class matrixMax{
    constructor(x){
        this.matrix = [];
        if (x == 4){
            this.matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        if (x == 5){
            this.matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        if (x == 7){
            for (let x = 0; x < 49; x++){
                this.matrix.push(0);
            }
        }
        if (x == 10){
            for (let x = 0; x < 100; x++){
                this.matrix.push(0);
            }
        }
    }
    get(id){
        return this.matrix[id];
    }
    set(id,state){
        this.matrix[id] = state;
    }
}

function randomlyGenerateBoard(brdSize,distance){

}

function translateMtoB(m){
    if (m.matrix.length == 100){
        let toWrite = "";
        for (let x = 0; x < 100; x++){
            if (m.matrix[x] == 0){
                toWrite += "<div class='oB10' id='" + x + "'></div>";
            }
            if (m.matrix[x] == 'H'){
                toWrite += "<div class='oB10hero' id='" + x + "'></div>";
            }
            if (m.matrix[x] == 'v'){
                toWrite += "<div class='oB10heroMovementRange' id='" + x + "'></div>";
            }
            if (m.matrix[x] == 'elr'){
                toWrite += "<div class='oB10LeftToRight' id='" + x + "'></div>";
            }
            if (m.matrix[x] == 'erl'){
                toWrite += "<div class='oB10RightToLeft' id='" + x + "'></div>";
            }
            if (m.matrix[x] == 'ebt'){
                toWrite += "<div class='oB10BottomToTop' id='" + x + "'></div>";
            }
            if (m.matrix[x] == 'etb'){
                toWrite += "<div class='oB10TopToBottom' id='" + x + "'></div>";
            }
        }
        document.getElementById("omniBoard").innerHTML = toWrite;
    }
    else{
        console.log("wack.");
    }
}

//////////Map Making
function borderWall(){
    let m = new matrixMax(10);
    for (let x = 0; x < 10; x++){
        m.set(x,'v');
        m.set(x+90,'v');
        m.set(x*10,'v');
        m.set(x*10+9,'v')
    }
    window.matr = m;
    randomizeHeroLocationBorderWall();
    translateMtoB(window.matr);
}

function randomizeHeroLocationBorderWall(){
    while (true){
        let space = Math.floor(Math.random() * Math.floor(100));
        window.hero = space;
        if (window.matr.get(space) != 'v'){
            window.matr.set(space,'H');
            return;
        }
    }
}


/////KEYPRESS

function readKeyPress(x){
    let y = x.which || x.keyCode;
    console.log(y);
    //65 or 37 is left
    if ((y == 65) || (y == 37)){
        moveHero(-1);
    }
    if ((y == 87) || (y == 38)){
        moveHero(-10);
    }
    if ((y == 68) || (y == 39)){
        moveHero(1);
    }
    if ((y == 83) || (y == 40)){
        moveHero(10);
    }
}

///////////////////HERO TRAVERSAL
function moveHero(distance){
    if (window.activeMap == false){
        return false;
    }
    if ((distance != 1) && (distance != -1) && (distance != 10) && (distance != -10)){
        return false;
    }
    if ((distance == -1 ) && (window.hero % 10 != 0)   && (window.matr.get(window.hero-1)) != 'v'    ){
        //rewrite herospace and distance;
        // console.log(distance);
        window.matr.set(window.hero,'0');
        window.hero -= 1;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
    if ((distance == -10) && (window.hero >= 10)  && (window.matr.get(window.hero-10)) != 'v'){
        window.matr.set(window.hero,'0');
        window.hero -= 10;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
    if ((distance == 1) && ((1 + window.hero) % 10 != 0) && (window.matr.get(window.hero+1)) != 'v'){
        window.matr.set(window.hero,'0');
        window.hero += 1;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
    if ((distance == 10) && (window.hero < 90) && (window.matr.get(window.hero+10)) != 'v'){
        window.matr.set(window.hero,'0');
        window.hero += 10;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
}

///enemy spawn

class enemyController{
    constructor(){
        this.library = [0];
        this.walls = [];
        for (let x = 1; x < 9; x++){
            this.walls.push(x);
            this.walls.push(90+x);
            this.walls.push(x*10)
            this.walls.push(x*10+9)
        }
    }
    pickWallRandom(){
        let wall = this.walls[Math.floor(Math.random() * Math.floor(this.walls.length))];
        return wall;
    }
    setAttackRandom(){
        // let rN = Math.floor(Math.random() * Math.floor(1) );
        let rN = 1;
        // console.log(rN);
        if (rN == 1){
            let wall = this.pickWallRandom();
            // console.log(wall);
            if (wall < 10){
                window.matr.set(wall,'etb');
            }
            if  (wall > 90){
                window.matr.set(wall,'ebt');
            }
            if (wall % 10 == 0){
                window.matr.set(wall,'elr');
            }
            if ((wall + 1)%10 == 0){
                window.matr.set(wall,'erl');
            }
            translateMtoB(window.matr);
        }
    }
}

function enemyShift(){
    //read board and move enemies
    /////order of checking merges, down,left,right
    //down checks left right and up
    //left checks right and up
    //right checks up
    // up wouldnt need to check because everyone before it has checked
    for (let x = 0; x < 100; x++){
        if (window.matr.get(x) == 'elr'){
            if ((x+2)%10 == 0){
                //set blank
                window.matr.set(x,0);
                translateMtoB(window.matr);
            }
            else if (window.matr.get(x+1) == 'H'){
                andItEnds()
            }
            else if (x % 10 == 0){
                window.matr.set(x,'v');
                window.matr.set(x+1,'elr')
                translateMtoB(window.matr);
            }
            else{
                window.matr.set(x,0);
                window.matr.set(x+1,'elr')
                translateMtoB(window.matr);
            }
        }
    }
}


function increaseDifficulty(){
    //increase tempo speed and enemy variety?
}

//////////////////

function clock(){
    window.time = 0;
    window.diff   =  0;
    window.en = new enemyController();
    progressTime();
}

function progressTime(){
    console.log(window.time);
    window.time++;
    if (window.time == 3){
        window.time = 0;
        enemyShift();
        window.en.setAttackRandom();
    }
    setTimeout(progressTime,1000)
}

//time 
function soTheGameBegins(){
    //generate board
    borderWall();
    clock();

}

function andItEnds(){
    alert();
}
