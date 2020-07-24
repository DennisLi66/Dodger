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

function generateEmptyMatrix(n){
    return new matrixMax(n);
}

function placeHeroEmpty(n,s){
    let x = new matrixMax(n);
    x.set(s,'H');
    return x;
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


function makeEmptyMap(){
    window.activeMap = true;
    let m = generateEmptyMatrix(10);
    console.log(m.matrix.length);
    window.matr = new matrixMax(10);
    translateMtoB(m);
}

function makeHeroEmptyMap(){
    window.activeMap = true;
    let space = Math.floor(Math.random() * Math.floor(100));
    let m = placeHeroEmpty(10,space);
    window.hero = space;
    window.matr = m;
    highlightHeroMovementRange(2);
    translateMtoB(window.matr);
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
    if ((distance == -1 ) && (window.hero % 10 != 0)   && (window.matr.get(window.hero-1)) == 'v'    ){
        //rewrite herospace and distance;
        // console.log(distance);
        window.matr.set(window.hero,'v');
        window.hero -= 1;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
    if ((distance == -10) && (window.hero >= 10)  && (window.matr.get(window.hero-10)) == 'v'){
        window.matr.set(window.hero,'v');
        window.hero -= 10;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
    if ((distance == 1) && ((1 + window.hero) % 10 != 0) && (window.matr.get(window.hero+1)) == 'v'){
        window.matr.set(window.hero,'v');
        window.hero += 1;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
    if ((distance == 10) && (window.hero < 90) && (window.matr.get(window.hero+10)) == 'v'){
        window.matr.set(window.hero,'v');
        window.hero += 10;
        window.matr.set(window.hero,'H');
        translateMtoB(window.matr);
    }
}
function highlightHeroMovementRange(x){
    //look at hero space 
    if (isNaN(x)){

    }
    else{
        console.log('start');
        let toHighlight = [];
        toHighlight.push(window.hero);
        let rounds = x;
        let placeHolder = [];
        while (rounds > 0){
            for (let g = 0; g < toHighlight.length; g++){
                let h = toHighlight[g];
                if (h < 90 && h+10 != window.hero){
                    window.matr.set(h+10,'v');
                    placeHolder.push(h+10);
                }
                if (h >= 10 && h-10 != window.hero){
                    window.matr.set(h-10,'v');
                    placeHolder.push(h-10);
                }
                if (h%10 != 0 && h-1 != window.hero){
                    window.matr.set(h-1,'v');
                    placeHolder.push(h-1);
                }
                if ((h+1) % 10 != 0 && h+1 != window.hero){
                    window.matr.set(h+1,'v');
                    placeHolder.push(h+1);
                }
            }
            toHighlight = placeHolder;
            placeHolder = [];
            rounds--;
        }
        translateMtoB(window.matr);
    }

}
function removeHighLights(){
    for (let x = 0; x < 100; x++){
        if (window.matr.get(x) == 'v'){
            window.matr.set(x,0);
        }
    }
}