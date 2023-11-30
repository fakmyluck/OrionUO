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
 /*   if(Player.Mana()==100){//>15
        Orion.Cast('poison');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('self');
        Orion.Wait(2500);
    }

    Orion.UseSkill('meditation');
    //Orion.Wait(2500);    */
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
               																																											 //Orion.SetTrack(true, X+x*2, Y+y*2);
                for(i=0;i<66;i++){
                    Hid();
                    //Orion.UseType('0x0E86', '0xFFFF');	//Kirilovskie stremnie kirki
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
    while(Player.X()!=4228 && Player.Y()!=638 ){
        Orion.Wait(300);
	    Orion.WalkTo(4228, 638, 0);
    }
    Orion.Print(Player.X())
    Orion.Print(Player.Y())
    
	for(i=0;i<15;i++){
	var findItems0 = Orion.FindType('0x19B9|0x19B7|0x19BA|0x19B8', '0xFFFF', 'backpack', 'item|fast');
	if (findItems0[0])
	{
		Orion.DragItem(findItems0[0]);
		Orion.Wait('300');
	}
	else
	break
	Orion.DropDraggedItem('0x40370BE1');
	Orion.Wait('500');
	}
	
	Orion.WalkTo(4208, 606, 0);
	return 2;
}

// Orion.ClearBadLocations();
// Orion.SetBadLocation(4206, 602, -1);
// Orion.SetBadLocation(4205, 602, -1);
// Orion.SetBadLocation(4204, 602, -1);
function Walk(Direction){
    Mining();
	if(Player.X()<3929) //esli ushol na verh ostrova
		return sbrosrudi();
    if((Player.X()==4206||Player.X()==4205||Player.X()==4204)&Player.Y()==602){
        Orion.WalkTo(4181	,582,0);                  //Esli k ETTINAM ushol
        Dir=2;
    }
    var moved = Orion.Step(Direction,walk);
    Orion.Wait(440); //~440wlk  //~215rn
    if(!moved)
        say("Шаг неудачен") //Ubrat'
    return moved;
}




    //         7               -1                  -1      
    //      6  |  0         -1     0            0     -1         
    //    5----+----1     -1    X     1       1    Y    -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
     
     var xx=[0,1,1,1,0,-1,-1,-1]; //NEVERMNo
var yy=[-1,-1,0,1,1,1,0,-1]; /// NE{RTAVO:NP}


function main(){
   // while(!exit){

        Pdir=Player.Direction();
       // Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);


// void Orion.Resend();
// Synchronisation with the server. Can be used every few seconds.


    while( Cwalk(Pdir) ){
       // say("<:"+Cwalk(Pdir-1)+'\t'+Cwalk(Pdir+1)+':>');
        if(Pdir%2==1&&!(Cwalk(Pdir-1)*Cwalk(Pdir+1))){   
            Pdir=(Pdir+1)%8;    //<<29>>>29;    
            Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);     
            
            if(Cwalk(Pdir)){                                //    X
            say('.МОГУ. пойти ваерёд после нармализации');  //  ==>-->
            Walk(Pdir)                                      //          Break;
            }
            else{                                           //     x
                say('.НЕ МОГУ. пойти ваерёд')               //  ==>X
                Pdir+=2;    
                Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);                                //    |x
            }                                               //          Break;
            break;
        }else{                                              //   x
            Walk(Pdir);                                     //  ==>-->-....-X
            
        }   
        Orion.Resend();                                                //  x   x
    }
    
    
        say("Nachalo bezkonechnogo cikla");
    while(!exit){   //Kazhdaja iiteracija - noviy koordinat
        
        var PdirLft=Pdir-2<<29>>>29;
        var diagLeft= Orion.CanWalk(Pdir-4<<29>>>29,Player.X()+xx[PdirLft],Player.Y()[PdirLft],Player.Z());        

        Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);
        if(Cwalk(PdirLft)){   //Proverka esli sleva pustoy tile
            if(!diagLeft){
                Pdir=PdirLft;
                Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);
                Walk(Pdir);
                say('Proverka esli sleva pustoy tile[uspeshno]')
            }
        }

        //esli idesh v dol'
        while(!Cwalk(Pdir)){  //Poka nemozhet idti v storonu Pdir
            Pdir=Pdir+2<<29>>>29;
            Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);
            say('Poka nemozhet idti v storonu Pdir[uspeshno]')
        }
        if((Player.Weight()/Player.MaxWeight())>0.95)
        	Pdir=sbrosrudi();
        	 Orion.SetTrack(true, Player.X()+xx[Pdir]*2, Player.Y()+yy[Pdir]*2);
        Walk(Pdir);
       if(Player.Mana()==100)
       	Magery();
     
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