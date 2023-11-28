var exit=false;
//var Pdir=Player.Direction();
const run=true;
const walk=false;
var walkdelay=450;
var debw=3000;
var tmp=false;
const turn_delay=50;    //proverit'

//VAr iz TEST.js
 
const left=-1; 
const right=1;
const _=undefined;
var turnside=1;

//var Compas=['NE','E','SE','S','SW','W','NW']
// var TrnL=function(){return (Rpid-2>>>0)%8};
// var TrnR=function(){return (Rpid+2>>>0)%8};

function say(text){
    Orion.Print(text);
}

		//PRAVELN'no JA ZAPUTALSA EPT 
    //         7               -1                  -1      
    //      6  |  0         -1     0            0     -1         
    //    5----+----1     -1    X     1       1    Y    -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
    // const xx=[0,1,1,1,0,-1,-1,-1];//otstup po X  
    // const yy=[-1,-1,0,1,1,1,0,-1];//Otstup po Y
     var xx=[-1,-1,0,1,1,1,0,-1]; /// NE{RTAVO:NP}
     var yy=[0,1,1,1,0,-1,-1,-1]; //NEVERMNo

//      7   0   1      -1    0    1         -1   -1   -1 
//          |                    
//      6---+---2      -1    X    1          0    Y    0       
//          |              
//      5   4   3      -1    0    1          1    1    1     
function CwalkOrdinal(Dir){ //!!NB!! esli ordinal'no upersa v pramuju poverhnost', to personazh povernetsa
    var lDir=(Dir+left)<<29>>>29;
    var rDir=(Dir+right)<<29>>>29;
    var Y=Player.Y()
    var X=Player.X()
    var X=Player.Z()
    var rY=Player.Y()+xx[rDir]
    var rX=Player.X()+yy[rDir]
    var L=  Orion.CanWalk(lDir,X,Y,Z);//Left prepatstvie
    var C=  Orion.CanWalk(lDir,rX,rY,Z);//Dagonal(center)
    var R=  Orion.CanWalk(rDir,X,Y,Z);//Right prepatstvie

    //// Dobavit' proverku na ordinal'niy tile cherez OTSTUP i proverku cherez CArdinalniy tile
    if(Dir%2){  //Ordinal Direction
        if(!L&&!R){    //TUpIk                                
            say('Upersa v stenu (CwalkOrdinal)');                 //     ####
            return -1   //       @ # 
        }
        else if(!L){  //esli slevo prepatstvie
            say("Prepatstvie (L="+L+") s levo")
            return 0
        }else if(!R){      //esli spravo prepatstvie
            say("Prepatstvie (R="+R+") s Pravo");
            return 0
        }else if(C){
            if(!R||!L){
                say('OPYAT CHETO POWLO NETA')
            }
            return 1
        }else{
            say("Puersa v Ostrie?? CwalkOrdinal -> else");
            return 0
        }
    }else
    say('ERROR? -> else Ordinalno ne ordinalno??');
    return -2
}

// function Cwalk(Direction){  //no arg = Player.Direction
//     if(Direction==null)
//         Direction=Player.Direction();
//     return Orion.CanWalk(Direction,Player.X(),Player.Y(),Player.Z());
// }

function Cwalk(Dir){    //complete
    Dir=Dir<<29>>>29;
    var Y=Player.Y();
    var X=Player.X();
    // var dY=Y+yy[Dir];
    // var dX=X+xx[Dir];
    // var C=world[dY][dX];     //Prepatstvie po pramoi

    if(Dir%2){  //Diagonalniy variant
        return CwalkOrdinal(Dir);  
    }
    else{
        Orion.CanWalk(Dir,X,Y,Player.Z())
    }
}

function gotomines(){
	var co=[
    [2547,2547,  2553,   2566,    2580,   2581,   2581,   2558,    2520],
    [831	,795,   766,    737,    695,    665,    633,    599,    558]];
	 var coMinnoc=Math.abs(Player.X()-co[0][co[0].length-1])+Math.abs(Player.Y()-co[1][co[1].length-1]);
	 var coMines=Math.abs(Player.X()-co[0][0])+Math.abs(Player.Y()-co[1][0]);
 
	if(coMines<coMinnoc)
        for(i=2;i<=co[0].length-1;i++)	// SHAHTA -> minoc
	        Orion.Print(Orion.WalkTo(co[0][i],  co[1][i]));
	else
	    for(i=co[0].length-3;i>=0;i--)  // MINNOC -> shahta
	        Orion.Print(Orion.WalkTo(co[0][i],  co[1][i]));
	
	Orion.Turn(4);
}

function Hid(){
	if(!Player.Hidden()){
		Orion.WarMode(1);
		Orion.WarMode(0);
		Orion.UseSkill('Hiding');
		Orion.Wait(3000);
	}
}

function Magery(){
//return
    while(Player.Mana()>30){//>15
   
        Orion.Cast('poison');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('self');
        Orion.Wait(3000);
    }

    Orion.UseSkill('meditation');
    Orion.Wait(2500);    
}
	
function Mining()
{
    var Y=Player.Y();
    var X=Player.X();
    var Z=Player.Z();
    for(x=(-1);x<2;x++){
        for(y=(-1);y<2;y++){
      //  if(Player.Mana()==100)
      //  Magery();
         Orion.Print(Orion.ValidateTargetTile('mine',X+x, Y+y));
            if(Orion.ValidateTargetTile('mine',X+x, Y+y)){
        
                Orion.SetTrack(true, X+x*2, Y+y*2);
                for(ii=0;ii<66;ii++){
                    Hid();
                    Orion.UseType('0x0E85', '0xFFFF');
                    //Orion.UseObject('0x40435F67');  // /\USE TYPE/\
                    if (Orion.WaitForTarget(1000))
                        Orion.TargetTileRelative('mine', x, y,Z);
                        
                    if(Orion.WaitJournal('There is no ore', Orion.Now(), Orion.Now()+500))
                        break;  //NADEJUS' VQBJET IZ for cikla
                    else
                        Orion.WaitJournal('You loosen || You put', Orion.Now(), Orion.Now()+6050);//Orion.Wait(5800);  
                }
            }
        }
    }	
}

function Walk(Direction){
    var moved = Orion.Step(Direction,walk);
    Orion.Wait(440); //~440wlk  //~215rn
    if(!moved)
        say("Шаг неудачен") //Ubrat'
    return moved;
}
    
function Obbegalka(Dir){    //vozvrashaet Direction

    var DirCheck=Dir-(2*turnside)<<29>>>29;        //kosyak1!!!11!!>>>>> (esli nachalo bqlo s cardinal direction)
    var Reverse=Dir-4<<29>>>29;
    if(Cwalk(DirCheck)){   //Proverka esli sleva pustoy tile
        if(!Orion.CanWalk(Reverse,Player.X()+xx[DirCheck],Player.Y()+yy[DirCheck],Player.Z()))
            Dir=DirCheck; // Proverit;
        Walk(Dir);
    }

    //esli idesh v dol'
    while(!Cwalk(Dir)){  //Poka nemozhet idti v storonu Dir
        Dir=Dir+2*turnside<<29>>>29;
    }
    Walk(Dir);
    
}

/**function newPrewalk
 * Idet vpered poka ne kosnetsa stenq (peredom)
 * return 1 / -1?
 */
function Prewalk(Dir){
    //Player.Direction=Dir;
   
    if(Dir%2){// \ / 
        while(CwalkOrdinal(Dir)){    // v CwalkOrdinal izmenit' Return val !!!!
            Walk(Dir)

            if(Player.Direction()!=Dir){  //err handler
                cprint('error!?')
                return -1
            }
        }
        
        say('Upersa v stenu Prewalk  (Dir='+Dir+')')
        Dir+=turnside
        cprint('New Dir(+1)='+Dir);
        if(Cwalk(Dir))
            Walk(Dir)
        else
            Dir+=2*turnside
        // Player.Direction()=Dir
        return 1
    }

    while (Cwalk(Dir)){ // Esli Cardinal Dir +
        Walk(Dir)
        if(Player.Direction()!=Dir){  //err handler
            cprint('error!?')
            return -1
        }
    }
    // Player.Direction=Dir+2*turnside
    Orion.Turn(Dir+2*turnside);
    Orion.Wait(turn_delay); //????
    return 1
}

function main(){

// void Orion.Resend();
// Synchronisation with the server. Can be used every few seconds.

    /////tst,js
    Prewalk(Player.Direction());     //Idti vpered poka ne stuknewsa v prepatstvie

    say("Nachalo bezkonechnogo cikla");
    while(!exit){
        Mining();
        Obbegalka(Player.Direction());
        if(Player.Mana()==100)
        	Magery();
    }
}