var exit=false;
var Pdir=Player.Direction();
const run=true;
const walk=false;
var walkdelay=450;
var debw=3000;
var tmp=false;
//var Compas=['NE','E','SE','S','SW','W','NW']
var TrnL=function(){return (Rpid-2>>>0)%8};
var TrnR=function(){return (Rpid+2>>>0)%8};

function say(text){
 Orion.Print(text);
 //Orion.Wait(500);
}

function Cwalk(Direction){  //no arg = Player.Direction
    if(Direction==null)
        Direction=Player.Direction();
    return Orion.CanWalk(Direction,Player.X(),Player.Y(),Player.Z());
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
//function Turn(Direction){   //no arg +=2
    // if(Direction==null)
    //         Direction=(Player.Direction()+2)%8;
    // if(Direction==Player.Direction())
    //  return;
    // while(Direction!=Player.Direction()){
    //     Orion.Turn(Direction);
    //         Orion.Wait(60);
    //         if(Direction!=Player.Direction()){
    //             say('Turn FAILED!')
    //             say('Player.Direction='+Player.Direction()+' ('+Compas[Player.Direction()%8>>>0]+')');
    //             say('Pdir='+Pdir+' ('+Compas[Pdir]+')');
    //         }
    // }
   // return;
//}

function Walk(Direction){
    var moved = Orion.Step(Direction,walk);
    Orion.Wait(440); //~440wlk  //~215rn
    if(!moved)
        say("Шаг неудачен") //Ubrat'
    return moved;
}
    
    
    		//PRAVELN'no JA ZAPUTALSA EPT
        //         7               		-1                 -1      
    //      6  |  0         		 0    -1           -1     0         
    //    5----+----1      1    Y   -1       -1    X    1        
    //      4  |  2          1     0            0     1         
    //         3                1                  1      

    //         7               -1                  -1      
    //      6  |  0         -1     0            0     -1         
    //    5----+----1     -1    X     1       1    Y    -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
    // var xx=[-1,-1,0,1,1,1,0,-1]; /// NE{RTAVO:NP}
    // var yy=[0,1,1,1,0,-1,-1,-1]; //NEVERMNo
    // switch(x) {
    //     case (7||0||1):
    //         ///dsda
    //       break;
    //     case y: 
    //   }

function main(){
    var minus2=(-4>>>0)%8;
    say('DEBUG: ' + minus2); 
   // while(!exit){

        Pdir=Player.Direction();
       // Orion.SetTrack(true, x[Pdir], y[Pdir]);


// void Orion.Resend();
// Synchronisation with the server. Can be used every few seconds.


    while( Cwalk(Pdir) ){
        say("<:"+Cwalk(Pdir-1)+'\t'+Cwalk(Pdir+1)+':>');
        if(Pdir%2==1&&!(Cwalk(Pdir-1)*Cwalk(Pdir+1))){   
            Pdir=(Pdir+1)%8;    //<<29>>>29;    
            //Orion.Track(true, x[Pdir], y[Pdir]);          
            
            if(Cwalk(Pdir)){                                //    X
            say('.МОГУ. пойти ваерёд после нармализации');  //  ==>-->
            Walk(Pdir)                                      //          Break;
            }
            else{                                           //     x
                say('.НЕ МОГУ. пойти ваерёд')               //  ==>X
                Pdir+=2;    
                //Orion.Track(true, x[Pdir], y[Pdir]);                                //    |x
            }                                               //          Break;
            break;
        }else{                                              //   x
            Walk(Pdir);                                     //  ==>-->-....-X
        }                                                   //  x   x
    }
    
                    
        say("Nachalo bezkonechnogo cikla");
    while(!exit){   //Kazhdaja iiteracija - noviy koordinat
        
        Mining();
        say('[mining complete!]')
        PdirLft=Pdir-2<<29>>>29;
        //Orion.Track(true, x[Pdir], y[Pdir]);
        if(Cwalk(PdirLft)){   //Proverka esli sleva pustoy tile
            Pdir=PdirLft;
            //Orion.Track(true, x[Pdir], y[Pdir]);
            Walk(Pdir);
            say('Proverka esli sleva pustoy tile[uspeshno]')
        }

        //esli idesh v dol'
        while(!Cwalk(Pdir)){  //Poka nemozhet idti v storonu Pdir
            Pdir=Pdir+2<<29>>>29;
            //Orion.Track(true, x[Pdir], y[Pdir]);
            say('Poka nemozhet idti v storonu Pdir[uspeshno]')
        }
        Walk(Pdir);
        if(Player.Mana()==100){
        	Magery();
        }
        // if(Cwalk((Player.Direction()-2<<29>>>29))) //32 64

        // while(!Cwalk()){        //Cwalk "VPERED"
        //     say('V etu storonu ne proiti.')
        //     Orion.Wait(debw);
        //     Pdir=Pdir+2<<29>>>29;

        // if(!Orion.Step(Pdir,run)){
        //     Orion.Print('red','ERROR NE POLUCIlos PROITI');
        // }else{
        //     say('Uspeshniy shag');
        // }
        // Orion.Wait(walkdelay);
        // }
    }   
    

}
//} //Perviy While(Exit)