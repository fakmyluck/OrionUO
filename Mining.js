/// UDALit'


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

function Hid(){
	if(!Player.Hidden()){
		Orion.WarMode(1);
		Orion.WarMode(0);
		Orion.UseSkill('Hiding');
		Orion.Wait(3000);
	}
}

function Magery(){
    while(Player.Mana()>35){//>15
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
        if(Player.Mana()==100)
        Magery();
            if(Orion.ValidateTargetTileRelative('mine',x, y)||Orion.ValidateTargetTileRelative('mine',x, y,5)){
                Orion.SetTrack(true, X+x*2, Y+y*2);
                for(i=0;i<66;i++){
                    Hid();
                    Orion.UseType('0x0E85', '0xFFFF');
                    
                    if (Orion.WaitForTarget(1000))
                        Orion.TargetTileRelative('mine', x, y,Z);
                        
                    if(Orion.WaitJournal('There is no ore', Orion.Now(), Orion.Now()+800))
                        break;  //NADEJUS' VQBJET IZ for cikla
                    else
                        Orion.WaitJournal('You loosen || You put', Orion.Now(), Orion.Now()+6050);//Orion.Wait(5800);  
                }
            }
        }
    }	
}

function sbrosrudi(){
	Orion.WalkTo(4223, 638, 0);
	for(i=0;i<15;i++){
	var findItems0 = Orion.FindType('0x19B9|0x19B7|0x19BA|0x19B8', '0xFFFF', 'backpack', 'item|fast');
	if (findItems0[0])
	{
		Orion.DragItem(findItems0[0]);
		Orion.Wait('300');
	}
	else
	break
	Orion.DropDraggedItem('0x403FB167');
	Orion.Wait('500');
	}
	
	Orion.WalkTo(4219, 611, 0);
	return 0;
}

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

    //         7                 -1                  -1      
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
        if((Player.Weight()/Player.MaxWeight())>0.95)
        	Pdir=sbrosrudi();
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