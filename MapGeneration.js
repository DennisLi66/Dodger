

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
    findStartsAndEnds(){
        let toReturn = [[],[]];
        for (let x = 0; x < this.matrix.length; x++){
            if (this.matrix[x] == 2){
                toReturn[0].push(x);
            }
            else if (this.matrix[x] == 3){
                toReturn[1].push(x);
            }
        }
        return toReturn;
    }
    traversal(starts){
        let finalPaths = [];
        let size = this.matrix.length;
        console.log("Size is " + size);
        for (let x = 0; x < starts.length; x++){
            let traversed = new Set();
            let paths = [];
            let placeHolder = [];
            paths.push([starts[x]]);
            while (paths.length != 0){
                for (let t = 0; t < paths.length; t++){
                    ///look left, right, up, and down
                    ///length of board is squareroot of 
                    let y = paths[t];
                    let num = y[y.length-1];
                    ////move down
                    if ((!(num >= (size-Math.sqrt(size)))) && !traversed.has(num + Math.sqrt(size))){
                        //if obstacle
                        if (this.matrix[num + Math.sqrt(size)] == 1){
                            // continue;
                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num + Math.sqrt(size));
                            copy.push(num + Math.sqrt(size));
                            //if exit : do
                            if (this.matrix[num+Math.sqrt(size)] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy);
                             }
                    }
                    ///move up 
                    // console.log(num);
                    if (!traversed.has(num - Math.sqrt(size)) && !(num <= Math.sqrt(size))){
                        if (this.matrix[num - Math.sqrt(size)] == 1){
                            // continue;
                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num - Math.sqrt(size));
                            copy.push(num - Math.sqrt(size));
                            //if exit : do
                            if (this.matrix[num-Math.sqrt(size)] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy);
                          }
                    }
                    //moveleft
                    if (!traversed.has(num - 1) && !(num % (Math.sqrt(size)) == 0)){
                        if (this.matrix[num-1] == 1){

                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num - 1);
                            copy.push(num -1);
                            //if exit : do
                            if (this.matrix[num-1] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy); 
                        }
                    }
                    //moveRight
                    if (!traversed.has(num + 1) && !((1 + num)%(Math.sqrt(size)) == 0)){
                        if (this.matrix[num + 1] == 1){

                        }
                        else{
                            let copy = y.slice(0);
                            traversed.add(num);
                            traversed.add(num + 1);
                            copy.push(num +1);
                            if (this.matrix[num+1] == 3){
                                finalPaths.push(copy);
                                paths = [];
                                placeHolder = [];
                                break;
                            }
                            placeHolder.push(copy);
                        }
                    }



                }
                paths = placeHolder;
                placeHolder = [];
                console.log(paths);
            }
            if (finalPaths.length <= x){
                finalPaths.push(false);
            }
        }
        return finalPaths;
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
        window.attackType = 1;
        window.strike = false;
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

function spawnEnemy(){
    //pick a random wall (not corner) and spawn an enemy there
    let walls = [];
    for (let x = 1; x < 9; x++){
        walls.push(x);
        walls.push(90+x);
        walls.push(x*10)
        walls.push(x*10+9)
    }

}

function increaseDifficulty(){
    //increase tempo speed and enemy variety?
}

//////////////////

function clock(){
    window.time = 0;
    timeup();
}

function timeup(){
    console.log(window.time);
    window.time++;
    setTimeout(timeup,33.3)
}

//time 
function soTheGameBegins(){
    //generate board
    borderWall();
}
