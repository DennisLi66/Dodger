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
        let isEnemy = window.matr.isEnemy(window.hero);
        if (isEnemy){
            andItEnds();
            return false;
        }
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
        return true;
    }
    if ((distance == -10) && (window.hero >= 10)  && (window.matr.get(window.hero-10)) != 'v'){
        window.matr.set(window.hero,'0');
        window.hero -= 10;
        let isEnemy = window.matr.isEnemy(window.hero);
        if (isEnemy){
            andItEnds();
            return false;
        }
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
        return true;
    }
    if ((distance == 1) && ((1 + window.hero) % 10 != 0) && (window.matr.get(window.hero+1)) != 'v'){
        window.matr.set(window.hero,'0');
        window.hero += 1;
        let isEnemy = window.matr.isEnemy(window.hero);
        if (isEnemy){
            andItEnds();
            return false;
        }
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
        return true
    }
    if ((distance == 10) && (window.hero < 90) && (window.matr.get(window.hero+10)) != 'v'){
        window.matr.set(window.hero,'0');
        window.hero += 10;
        let isEnemy = window.matr.isEnemy(window.hero);
        if (isEnemy){
            andItEnds();
            return false;
        }
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
        return true;
        
    }
}

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
    isEnemy(x){
        if (this.get(x) == 'elr'){
            return true;
        }
        if (this.get(x) == 'erl'){
            return true;
        }
        if (this.get(x) == 'etb'){
            return true;
        }
        if (this.get(x) == 'ebt'){
            return true;
        }
        return false;
    }
}
class assistantMatrix{
    constructor(){
        this.matrix = [];
        for (let y = 0; y < 100; y++){
            let cpy = window.matr.get(y);
            if (cpy == 'v' || cpy == 'H'){
                this.matrix[y] == cpy;
            }
            else{
                this.matrix[y] == 0;
            }
        }
    }
    addEnemyTo(y,z){
        if (this.matrix[y] == 0){
            this.matrix[y] = z;
            return;
        }
        this.matrix[y] = this.matrix[y] + z;
    }
    //make the matrix blank
    blanken(){
        let m = [];
        for (let y = 0; y < 100; y++){
            if (y < 10 || y > 90 || y % 10 == 0 || (y+1)%10 == 0){
                m.push('v');
            }
            else{
                m.push(0);
            }
        }
        this.matrix = m;
    }
    setToReal(){
    for (let y = 0; y < 100; y++){
        if (this.matrix[y] == 'r'){
            window.matr.set(y,'elr');
        }
        if (this.matrix[y] == 'l'){
            window.matr.set(y,'erl');
        }
        if (this.matrix[y] == 't'){
            window.matr.set(y,'etb');
        }
        if (this.matrix[y] == 'b'){
            window.matr.set(y,'ebt');
        }
    }
    this.blanken();
    translateMtoB(window.matr);
    }
}

//////////Map Making

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

function borderWall(){
    let m = new matrixMax(10);
    for (let x = 0; x < 10; x++){
        m.set(x,'v');
        m.set(x+90,'v');
        m.set(x*10,'v');
        m.set(x*10+9,'v')
    }
    window.activeMap = true;
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

    //update to matrix checking
    let ender = false;
    for (let x = 100; x > 0; x--){
        // if (window.matr.get(x) == 'elr'){
        //     if ((x+2)%10 == 0){
        //         window.matr.set(x,0);
        //     }
        //     else if ((window.matr.get(x+1) == 'H') && x % 10 == 0){
        //         window.matr.set(x,'v');
        //         window.assMax.addEnemyTo(x+1,'r');
        //         ender = true;
        //     }
        //     else if (window.matr.get(x+1) == 'H'){
        //         window.matr.set(x,0);
        //         window.assMax.addEnemyTo(x+1,'r');
        //         ender = true;
        //     }
        //     else if (x % 10 == 0){
        //         window.matr.set(x,'v');
        //         window.assMax.addEnemyTo(x+1,'r');
        //     }
        //     else{
        //         window.matr.set(x,0);
        //         window.assMax.addEnemyTo(x+1,'r');
        //     }
        // }
        // if (window.matr.get(x) == 'erl'){
        //     if ((x - 1) % 10 == 0){
        //         window.matr.set(x,0);
        //     }
        //     else if ((window.matr.get(x-1) == 'H') && (x+1)%10 == 0 ){
        //         window.matr.set(x,'v');
        //         window.assMax.addEnemyTo(x-1,'l');
        //         ender = true;
        //     }
        //     else if (window.matr.get(x-1) == 'H'){
        //         window.matr.set(x,0);
        //         window.assMax.addEnemyTo(x-1,'l');
        //         ender = true;
        //     }
        //     else if ((x+1)%10 == 0 ){
        //         window.matr.set(x,'v');
        //         window.assMax.addEnemyTo(x-1,'l');
        //     }
        //     else{
        //         window.matr.set(x,0);
        //         window.assMax.addEnemyTo(x-1,'l');
        //     }
        // }
        // if (window.matr.get(x) == 'etb'){
        //     if (x > 80){
        //         window.matr.set(x,0);
        //     }
        //     else if ((window.matr.get(x+10) == 'H') && x < 10){
        //         window.matr.set(x,'v');
        //         window.assMax.addEnemyTo(x+10,'l');
        //         ender = true;
        //     }
        //     else if (window.matr.get(x+10) == 'H'){
        //         window.matr.set(x,0);
        //         window.assMax.addEnemyTo(x+10,'t');
        //         ender = true;
        //     }
        //     else if (x < 10 ){
        //         window.matr.set(x,'v');
        //         window.assMax.addEnemyTo(x+10,'t');
        //     }
        //     else{
        //         window.matr.set(x,0);
        //         window.assMax.addEnemyTo(x+10,'t');
        //     }
        // }
        if (window.matr.get(x) == 'ebt'){
            if (x < 20){
                window.matr.set(x,0);
            }
            else if ((window.matr.get(x-10) == 'H') && x > 90){
                window.matr.set(x,'v');
                window.assMax.addEnemyTo(x+10,'b');
                ender = true;
            }
            else if (window.matr.get(x-10) == 'H'){
                window.matr.set(x,0);
                window.assMax.addEnemyTo(x-10,'b');
                ender = true;
            }
            else if (x > 90){
                window.matr.set(x,'v');
                window.assMax.addEnemyTo(x-10,'b');
            }
            else{
                window.matr.set(x,0);
                window.assMax.addEnemyTo(x-10,'b'); 
            }
        }
    }
    window.assMax.setToReal();
    if (ender){
        andItEnds();
    }
}

//////////////////

function clock(){
    window.time = 0;
    window.diff   =  0;
    window.en = new enemyController();
    progressTime();
}

function progressTime(){
    if (!window.activeMap){
        return false;
    }
    console.log(window.time);
    window.time++;
    if (window.time == 3){
        window.time = 0;
        enemyShift();
        window.en.setAttackRandom();
    }
    setTimeout(progressTime,33)
}

//time 
function soTheGameBegins(){
    //generate board
    borderWall();
    window.assMax = new assistantMatrix();
    clock();

}

function andItEnds(){
    translateMtoB(window.matr);
    window.activeMap = false;
    alert("Over");
}
