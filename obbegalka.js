var exit=false;
var walkdelay=450;
var debw=3000;
var tmp=false;
var PrevLeft=false;
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
  
    while(Player.Mana()>25){//>15
        
        Orion.Cast('poison');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('self');
        Orion.Wait(3000);
    }

    for(i=0;i<12;i++){  //Esli meditatsiya spadaet =-> ubrat'
        Orion.UseSkill('meditation');
        if(!Orion.WaitJournal('You are at peace || You lose', Orion.Now()+1000, Orion.Now()+3050))
            return	
    }	
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
            if(Orion.ValidateTargetTile('mine',X+x, Y+y,Z)){
                Orion.SetTrack(true, X+x*2, Y+y*2);
                for(i=0;i<66;i++){
                    Hid();
                    Orion.UseType('0x0E85', '0xFFFF');
                    if (Orion.WaitForTarget(1000))
                        Orion.TargetTileRelative('mine', x, y,Z);
                        
                    if(Orion.WaitJournal('There is no ore', Orion.Now(), Orion.Now()+1000))
                        break;  //NADEJUS' VQBJET IZ for cikla
                    else
                        Orion.WaitJournal('You loosen || You put', Orion.Now(), Orion.Now()+6050);//Orion.Wait(5800);  
                }
                Orion.Wait(30);
            }
        }
    }	
}

function Walk(Direction,run){
    PrevLeft=Cwalk(Direction-2<<29>>>29);
    var speed=220;
    if(!run){
        run=false;
        speed=450;
    }
    prevC=Player.X()+Player.Y();
    var moved = Orion.Step(Direction,run);
    Orion.Wait(speed); //~440wlk  //~215rn
    if(!moved)      // HEDNYA KAKAJATA A NE BOOOL
        say("Шаг неудачен") //Ubrat'
    if(prevC==Player.X()+Player.Y())
        say("STOIM PERDIM") /// ZACIKLIT'!?!?!?!??!?!?!
    return moved;
}  

    //         7               -1                  -1      
    //      6  |  0         -1     0            0     -1         
    //    5----+----1     -1    X     1       1    Y    -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
    // var xx=[-1,-1,0,1,1,1,0,-1]; /// NE{RTAVO:NP}
    // var yy=[0,1,1,1,0,-1,-1,-1]; //NEVERMNo

function main(){
    var Pdir=Player.Direction();
       // Orion.SetTrack(true, x[Pdir], y[Pdir]);

// void Orion.Resend();
// Synchronisation with the server. Can be used every few seconds.

    while( Cwalk(Pdir) ){
        say("<:"+Cwalk(Pdir-1)+'  '+Cwalk(Pdir+1)+':>');
        if(Pdir%2==1&&!(Cwalk(Pdir-1)*Cwalk(Pdir+1))){   
            Pdir=(Pdir+1)%8;    //<<29>>>29;    
            //Orion.Track(true, x[Pdir], y[Pdir]);          
            
            if(Cwalk(Pdir)){                                    //    X
                say('.МОГУ. пойти ваерёд после нармализации');  //  ==>-->
                Walk(Pdir,true);                                      //          Break;
            }
            else{                                            //     x
                say('.НЕ МОГУ. пойти ваерёд');               //  ==>X
                Pdir+=2;                                     //    |x
                //Orion.Track(true, x[Pdir], y[Pdir]);      //    
            }                                               //          Break;
            break;
        }else{                                              //   x
            Walk(Pdir,true);                                     //  ==>-->-....-X
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
            if(!PrevLeft)
                while(1){
                    Hid();
                    wait(6000);
                    say('USHOL KUDATO NETUDA');
                }
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
        	Magery();       // Zamenit' na zapusk otdel'nogo scripta
        }
    }   
}