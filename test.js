    //         7               -1                 -1      
    //      6  |  0         -1     0            0    -1         
    //    5----+----1     -1    X     1       1    Y   -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
const xx=[0,1,1,1,0,-1,-1,-1];//otstup po X
const yy=[-1,-1,0,1,1,1,0,-1];//Otstup po Y
const left=-1;
const right=1;
const _=undefined;
const direction=['|','/','-','\\'];
const centr=77;
var turnside=1
var Frames=15
var OutputFramesleft=0;
// // print process.argv
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
//   });

//   if(process.argv.length>2)
//     cprint(process.argv.length)
// sleep(9999)
const arg=arguments;
var world=[ // world[Y][X]
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  //0
    [1,0,0,1,1,1,1,0,1,1,1,0,0,0,0,1,0,0,1],  //1
    [1,1,0,0,1,1,0,0,0,0,1,0,0,0,1,0,0,0,1],  //2
    [1,0,0,0,1,0,1,1,1,0,0,0,0,0,1,1,0,0,1],  //3
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],  //4 <<
    [1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1],  //5
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],    //6
    [1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1],    //7
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],    //8
    [1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1],    //9
    [1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1],    //10
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1],    //11
    [1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],    //12
    [1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],    //13
    [1,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,1],     //14
    [1,1,0,0,0,1,1,1,0,0,0,1,0,0,1,0,0,0,1],    //15
    [1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1],    //16
    [1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1],    //17
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];   //18
//   0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I

var Player={X:5,Y:7,Z:0,Direction:0};

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}
  
//      7   0   1      -1    0    1         -1   -1   -1 
//          |                    
//      6---+---2      -1    X    1          0    Y    0       
//          |              
//      5   4   3      -1    0    1          1    1    1     
function CwalkOrdinal(Dir){ //!!NB!! esli ordinal'no upersa v pramuju poverhnost', to personazh povernetsa
    var lDir=(Dir+left)<<29>>>29;
    var rDir=(Dir+right)<<29>>>29;
    var Y=Player.Y
    var X=Player.X
    var L=  world[Y+yy[lDir]][X+xx[lDir]];//Left prepatstvie
    var C=  world[Y+yy[Dir]] [X+xx[Dir]];                 //Dagonal(center)
    var R=  world[Y+yy[rDir]][X+xx[rDir]];//Right prepatstvie

    //// Dobavit' proverku na ordinal'niy tile cherez OTSTUP i proverku cherez CArdinalniy tile
    if(Dir%2){  //Ordinal Direction
        if(L&&R){    //TUpIk                                
            cprint('Upersa v stenu (CwalkOrdinal)');                 //     ####
            Newframe(Dir);
            return -1   //       @ # 
        }
        else if(L){  //esli slevo prepatstvie
            cprint("Prepatstvie (L="+L+") s levo")
            Newframe(lDir,_,_,'r');
            return 0
        }else if(R){      //esli spravo prepatstvie
            cprint("Prepatstvie (R="+R+") s Pravo");
            Newframe(rDir,_,_,'r');
            return 0
        }else if(!C){
            if(R||L){
                cprint('OPYAT CHETO POWLO NETA',545454)
            }
            Newframe(Dir,);
            return 1
        }else{
            cprint("Puersa v Ostrie?? CwalkOrdinal -> else");
            Newframe(Dir,_,_,'r');
            return 0
        }
    }else
    cprint('ERROR? -> else Ordinalno ne ordinalno??',95959);
    return -2
}

function Walk(Dir){ 
    Dir=Dir<<29>>>29;

    var Y=Player.Y
    var X=Player.X

    Player.X+=xx[Dir];
    Player.Y+=yy[Dir];
    Newframe();
    if(world[Player.Y][Player.X]===1){
        for(i=0;i<14;i++){
            cprint('ERR! OUT OF BOUNDS!',6565)
        }
    }
}

function Cwalk(Dir){    //complete
    Dir=Dir<<29>>>29;
    var Y=Player.Y;
    var X=Player.X;
    var dY=Y+yy[Dir];
    var dX=X+xx[Dir];
    var C=world[dY][dX];     //Prepatstvie po pramoi

    Newframe(Dir,_,_,'y');
    if(Dir%2){  //Diagonalniy variant
        return CwalkOrdinal(Dir);  
    }
    else{
        if(C){
            Newframe(Dir,_,_,'o');                   //     -->X
            return false;
        }
        else{
            Newframe(Dir,_,_,'p');
            return true;        //      -->...
        }
    }
}

function loadingBar(delta,max){
    var width=61;
    var fill=((delta-1)/max)*width
    var char=' '
    if(fill<0)
        fill=width
    for(i=0;i<centr-width/2;i++){
        process.stdout.write(" ")
    }

    process.stdout.write('[')
    for(i=1;i<=width;i++){
        if(i<=fill)
            char='=';
        process.stdout.write(char)
        char=' ';
    }
    process.stdout.write(']')

}

/**Vqvidenie novogo frayma 
 * vsegda vivodit "@" na pozicii Player.X/Y
 * 
 * "o" napravlenie dvizhenija otnositel'no Player.X/Y
 * "q" dop cherez dX, dY 
 * @Napravlenie {int} Dir - Napravlenie metki otnositel'no Player'a
 * @Cvet {string} color - r/lb/o/b/p.*/
function Newframe(Dir,dX,dY,color,time){

    console.clear();
    color=getColor(color);
    if(!time)
        time=100;
    var DirX=Player.X+xx[Dir]
    var DirY=Player.Y+yy[Dir]
    if(dX){
        DirX=dX+xx[Dir]
        DirY=dY+yy[Dir]
    }

    console.log('\n \n \n\ \n \n \n \n');

    cprint(OutputFramesleft-1,0,'lb');
    loadingBar(OutputFramesleft,Frames);

    process.stdout.write('\n\t \t \t \t \t \t╔════');
    for(x=1;x<world[0].length-1;x++){
        process.stdout.write('═══');
    }
    console.log('════╗')
    for(y=0;y<world.length;y++){
        process.stdout.write('\t \t \t \t \t \t║ ');
        for(x=0;x<world[0].length;x++){
            if(x==Player.X && y== Player.Y){
                process.stdout.write("\x1b[31m\x1b[46m @ \x1b[0m");
            }else if(x==DirX && y==DirY){
                if(world[y][x])//stroka (X)
                    process.stdout.write("\x1b[43m \x1b"+color+"X\x1b[0;43m \x1b[0m");
                else
                    process.stdout.write("\x1b"+color+' o \x1b[0m');
            }else if(x==dX&&y==dY){
                if(world[y][x])//stroka (X)
                    process.stdout.write("#\x1b"+color+"q\x1b[0m#");
                else
                    process.stdout.write("\x1b"+color+" q \x1b[0m");
            }else{
                if(world[y][x])//stroka (X)
                    process.stdout.write('\x1b[47m#X#\x1b[0m');
                else
                    process.stdout.write('   ');
            }
        }
        console.log(' ║');
    }
    process.stdout.write('\t \t \t \t \t \t╚════');
    for(x=1;x<world[0].length-1;x++){
        process.stdout.write('═══');
    }
    console.log('════╝')
    if(world[Player.Y][Player.X]){
        cprint('WARNING OUt OF BOUNDS!',12345);
        cprint('WARNING OUt OF BOUNDS!',12345);
        cprint('WARNING OUt OF BOUNDS!',12345);
        cprint('WARNING OUt OF BOUNDS!',12345);
    }
    sleep(time);
}

const Orion={
    CanWalk(X,Y,Z,Dir){
        Dir=Dir<<29>>>29;

        var L=world[Y+yy[(Dir+left)<<29>>>29]] [X+xx[(Dir+left)<<29>>>29]];//Left
        var C=world[Y+yy[(Dir)<<29>>>29]]      [X+xx[(Dir)<<29>>>29]];//Dagonal(center)
        var R=world[Y+yy[(Dir+right)<<29>>>29]][X+xx[(Dir+right)<<29>>>29]];//Right
        Newframe(Dir,X,Y,'lb');
        if(Dir%2)  //Diagonalniy variant
            if(L&&R){
                Newframe(Dir,X,Y,'lb');  //  X   X
                return false;       //   \ /
            }
            else{
                Newframe(Dir,X,Y,'lb');
                return true;
        }else
            if(C){
                Newframe(Dir,X,Y,'r');                  //     -->X
                return false;
            }
            else
                Newframe(Dir,X,Y,'lb')
                return true;        //      -->...
    }
}
/**@Color {string}color - r/lb/o/b/p. */
function getColor(color){
    switch(color){
        case "r":
            return '[31m';
        case 'lb':
            return '[32m';
        case 'o':
            return '[33m';
        case 'b':
            return '[34m';
        case "p":
            '[35m'
    } 
        //console.log('ERRRRROR getColor skipnul switch.case')
    return '[34m';
}
function cprint(text,slep,color){
    color=getColor(color);
    text=text.toString();
    
    for(i=0;i<centr-text.length/2;i++){
        process.stdout.write(" ")
    }
    process.stdout.write("\x1b"+color+text+'\x1b[0m\n')
    if(slep===_)
        slep=1000
    sleep(slep)
}

main();

/**function newPrewalk
 * Idet vpered poka ne kosnetsa stenq (peredom)
 * return 1 / -1?
 */
function Prewalk(Dir){
    Player.Direction=Dir;

    if(Player.Direction%2){// \ / 
        while(CwalkOrdinal(Dir)){    // v CwalkOrdinal izmenit' Return val !!!!
            Walk(Dir)

            if(Player.Direction!=Dir){  //err handler
                cprint('error!?')
                return -1
            }
        }
        
        cprint('Upersa v stenu Prewalk  (Dir='+Dir+')',9333)
        Dir+=turnside
        cprint('New Dir(+1)='+Dir,5555);
        if(Cwalk(Dir))
            Walk(Dir)
        else
            Dir+=2*turnside
        Player.Direction=Dir
        return 1
    }

    while (Cwalk(Dir)){ // Esli Cardinal Dir +
        Walk(Dir)
        if(Player.Direction!=Dir){  //err handler
            cprint('error!?')
            return -1
        }
    }
    Player.Direction=Dir+2*turnside
    return 1
}

// function ppppPrewalk(Dir){  //vizvrashaet Napravlenie
//     while( Cwalk(Dir) ){
//         if(Dir!=Player.Direction){
//             Dir=Player.Direction;
//             Walk(Dir)
//             cprint('Eto bql posledniy Walk pered reTURN',5454)
//             return;
//         }
//         Walk(Dir);
//     }
//     cprint("Upersa v stenku?",1111)



// // console.log('\n \n')
// //     var tmp=Player.Direction +2;
// //     cprint("Player.Direction="  +Player.Direction)
// //     cprint("tmp="               +tmp)
// //     sleep(98765)






//     Player.Direction=(Player.Direction+2)<<29>>>29;
//     Dir=Player.Direction;
//     cprint('New dir='+Dir)
//     cprint('Cwalk(Dir)=='+Cwalk(Dir));
//     // if((Dir%2==1) && !(Cwalk(Dir+left)*Cwalk(Dir+right))){   
//     //     for(i=0;i<4;i++){
//     //         cprint('ETA POeBOTA NE beZPOLEZZNA!!!!!!!!!!!!!!!!!!!!!',76767)
//     //     }
//     //     Player.Direction=(Dir+right)%8;    //<<29>>>29;          
        
//     //     if(Cwalk(Player.Direction)){
//     //         Walk(Player.Direction)  
//     //         cprint('Dir: '+Player.Direction)                                    //  ==>-->
//     //     // dobavi' suda BREAK!<<<<<<???
//     //     }
//     //     else{                                           //     x
//     //         Player.Direction=Dir+=2;    
//     //         cprint('Dir+2: '+Player.Direction)                                            //  ==>X                                             //    |x    
//     //         }                                           //          Break;    
//     // cprint('debug dir%')
//     // }
//     cprint('Konec PREWALKA1!!!',2222)
//     //return Dir;
// }

function Obbegalka(Dir,frames){    //vozvrashaet Direction

    if(frames==null)
        frames=100
    
    var count=0;
    while(count<frames){   //Kazhdaja iiteracija - noviy koordinat
        OutputFramesleft=frames-count;

        var DirCheck=Dir-(2*turnside)<<29>>>29;        //kosyak1!!!11!!>>>>> (esli nachalo bqlo s cardinal direction)
        var Reverse=Dir-4<<29>>>29;
        if(Cwalk(DirCheck)){   //Proverka esli sleva pustoy tile
            if(!Orion.CanWalk(Player.X+xx[DirCheck],Player.Y+yy[DirCheck],Player.Z,Reverse))
                Dir=DirCheck; // Proverit;
            Walk(Dir);
        }

        //esli idesh v dol'
        while(!Cwalk(Dir)){  //Poka nemozhet idti v storonu Dir
            Dir=Dir+2*turnside<<29>>>29;
            //cprint("povorot: "+Dir)
        }
        Walk(Dir);
        count++;
    } 
}
/////?????? PROVERit' NA PDIR !?!??!?!??!??!??!?!??????????????????!?!?!??!?!?!
function main(){
    Player={X:8,Y:6,Z:0};
    if(process.argv.length>2){
        if(process.argv[2]<8 && process.argv[2]>=0)
            Player.Direction= (+process.argv[2]);   
        if(process.argv.length>3){
            var tmp=process.argv[3]
            if( tmp=='-1'||
                tmp=='l'||
                tmp=='left'){
                turnside=-1
            }
        }
        if(process.argv.length>4){
            Frames=(+process.argv[4]);
            cprint(Frames)
        }
        //sdelat' argv to string
    }
    var Pdir=Player.Direction; 
    
    Newframe(Pdir,_,_,'p',1000);         //Vqvesti perviy frame

    Prewalk(Pdir);     //Idti vpered poka ne stuknewsa v prepatstvie

    Newframe(Player.Direction,_,_,'p',1000);  
    //return//debug
    cprint("Nachalo bezkonechnogo cikla",555);
    Obbegalka(Player.Direction,Frames);
}