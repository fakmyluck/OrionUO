var exit=false;
//var Pdir=Player.Direction();
const run=true;
const walk=false;
const walkdelay=415;
var debw=3000;
var tmp=false;
const turn_delay=50;    //proverit'

//VAr iz TEST.js
const direction=['/','-','\\','|'];
const left=-1; 
const right=1;
const _=undefined;
var turnside=1;

//var Compas=['NE','E','SE','S','SW','W','NW']
// var TrnL=function(){return (Rpid-2>>>0)%8};
// var TrnR=function(){return (Rpid+2>>>0)%8};

function say(text){
    Orion.Print(text);
    //Orion.Wait(500)
}

const Bad_loc=[   [4206,4205,4204],//X
                [602,602,602]]   //Y
const Good_loc=[  [4181],[582]];
		//PRAVELN'no JA ZAPUTALSA EPT 
    //         7               -1                  -1      
    //      6  |  0         -1     0            0     -1         
    //    5----+----1     -1    X     1       1    Y    -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
    const xx=[0,1,1,1,0,-1,-1,-1];//otstup po X  
    const yy=[-1,-1,0,1,1,1,0,-1];//Otstup po Y
    //  var xx=[-1,-1,0,1,1,1,0,-1]; /// NE{RTAVO:NP}!!!!!!!!!!!
    //  var yy=[0,1,1,1,0,-1,-1,-1]; //NEVERMNo!!!!!!!!!!!!
     
//      7   0   1      -1    0    1         -1   -1   -1 
//          |                    
//      6---+---2      -1    X    1          0    Y    0       
//          |              
//      5   4   3      -1    0    1          1    1    1     
function CwalkOrdinal(Dir){ //!!NB!! esli ordinal'no upersa v pramuju poverhnost', to personazh povernetsa
    var lDir=(Dir+left)<<29>>>29;   // <-   C
    var rDir=(Dir+right)<<29>>>29;  //      C   ->
    var X=  Player.X()
    var Y=  Player.Y()      // 00111
    var Z=  Player.Z()     //  <<
    var rX=X+xx[rDir]               //coordinat sprava
    var rY=Y+yy[rDir]               
    var L=  Orion.CanWalk(lDir,X,Y,Z);//Left prepatstvie
    var C=  Orion.CanWalk(lDir,rX,rY,Z);//Dagonal(center)
    var R=  Orion.CanWalk(rDir,X,Y,Z);//Right prepatstvie
   
    if(L&C&R)
        return 1
    return 0
}

function Cwalk(Dir){    //complete
    Dir=Dir<<29>>>29;
    
    Point(Dir);

    if(Dir%2){  //Diagonalniy variant
        return CwalkOrdinal(Dir);  
    }
    return Orion.CanWalk(Dir,Player.X(),Player.Y(),Player.Z())
}

function panic(tDist){
    hp=Player.Hits();
    if(hp<70){
        if(Threat!=3)
            say("Threat=3")

        Orion.UseSkill('Hiding');
        Threat=3
        return
    }
    if(tDist<3){
        if(Player.Hidden()){
            if(Threat!=3)
                say("Threat=3")
            Threat=3
            while(Player.Stam!=Player.MaxStam){
                if(!Player.Hidden()){
                    if(Threat!=3)
                        say("Threat=3")
                    Threat=3
                    return
                }
                Orion.Wait(200)
            }
            return
        }
        if(Threat!=4)
                say("Threat=4")
            Threat=4
        Orion.UseSkill('Hiding');
        return
    }
    if(tDist<=10){
        if(Player.Hidden()){
            if(Threat!=1)
                say("Threat=1")
            Threat=1
            return
        }
        if(Threat!=3)
            say("Threat=3")
        Threat=3
        Orion.UseSkill('Hiding');
        return
    }
    if(tDist>10){
        if(Threat!=1)
            say("Threat=1")
        Threat=1
        return
    }
    return
}

var threats_arr=[];
function add_threats(mobs){
    var newmob_found=true
    const Now=new Date()
    const time_to_delete_old=(1000*60)*30 //(ms*sec)*30min =30min

    if(threats_arr.length>=99){
        say("Overflow v threats_arr")
        return
    }
    for(m=0;m<mobs.length;m++){
        for(t=0;t<threats_arr.length;t++){
            if(mobs[m].Serial()===threats_arr[t].Serial){
                newmob_found=false
                threats_arr[t].lastSeen=Now
            }
        }
        if(newmob_found){  // Line 145 Result of expression thrers_arr[threats_arr,length] [undefined]
            var change_index=threats_arr.length
            for(t=0;t<threats_arr.length;t++){
                if(time_to_delete_old<Now-threats_arr[t].lastSeen){
                    change_index=t
                    break
                }
            }
            // threats_arr.push({
            //     Name: mobs[m].Name(),
            //     Serial: mobs[m].Serial(),
            //     Exists: mobs[m].Exists(),
            //     lastSeen: new Date()
            // })
            threats_arr[change_index]={
                "Name": mobs[m].Name(),
                "Serial": mobs[m].Serial(),
                "Exists": mobs[m].Exists(),
                "lastSeen": Now             //Date
            }
            TextWindow.Print(threats_arr[change_index].Name)
            TextWindow.Print(threats_arr[change_index].Serial)
            TextWindow.Print(threats_arr[change_index].Exists)
            TextWindow.Print(threats_arr[change_index].lastSeen+"\n")
            return
        }
        newmob_found=true
    } 
}

function TxtWdw(){  //function TxtWdw(msg){  
    //for(i=0;i<threats_arr.length;i++)
    //    TextWindow.Print(threats_arr[i])
    if(!TextWindow.IsOpened()){
        TextWindow.Open();
    }
}

var Threat=0
var kirilka_timer=new Date();
function findmobs(){
    var mobs= Orion.FindTypeEx('any', 'any', 'ground','nothuman', 13).sort(function(a,b){return a-b});
    
    if(mobs[0]){
    	Orion.Print("uvidel "+ mobs[0].Name()+" ("+mobs[0].Distance()+")")
        add_threats(mobs)
        //sbrosrudi()
        panic(mobs[0].Distance())
    }else{
        if(Threat!=0){
            say("Threat=0")
            Threat=0
        }
    }
    
    if(new Date()-kirilka_timer>10000){
        kirilka_timer=new Date()
        var kirilka= Orion.FindType('any', 'any', 'ground','human', 13);
        if(kirilka[1])
        {
            Orion.Say("kirilka.Name()=="+kirilka[1].Name())
            Orion.Wait(3000)
            Hid()
        }
    }
}

function sbrosrudi(){
    var X=Player.X()
    var Y=Player.Y()
    while(!(X >=4227 && X <=4229 ) || !(Y >=636 && Y <=638)){
        // if(Player.X()!=??? && Player.Y()!=???){
        //     Otkrqt' dver'
        // }
        Orion.WalkTo(4228, 637, 0);
        Orion.Wait(300);
        Y=Player.Y()
        X=Player.X()
         findmobs()
    }
    
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
	findmobs()
	Orion.WalkTo(4208, 606, 0);
	return 2;
}

function Hid(){
	if(!Player.Hidden()){
        Orion.WarMode(1);
        Orion.WarMode(0);
        Orion.UseSkill('Hiding');
        Orion.Wait(3000);    //(3000)
	}
}

function Magery(){
    return
    findmobs()
    if(Threat!=0)
        return
    if(Player.Mana()!=100)
        return
    while(Player.Mana()==100){//>15
   
        Orion.Cast('poison');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('self');
        Orion.Wait(3000);
    }
    Orion.UseSkill('meditation');
    Orion.Wait(250);   //2500 
}
	
function Mining(){
    if(Threat>1){
        return
    }
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
                    findmobs()
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

function Walk(Direction){
    findmobs()
    var moved = Orion.Step(Direction,walk);
    Orion.Wait(walkdelay); //~440wlk  //~215rn
    if(Player.X()<3929||Player.X()>4259) //esli ushol na verh ostrova
		return sbrosrudi();
    if((Player.X()==4206||Player.X()==4205||Player.X()==4204)&Player.Y()==602){
        Orion.WalkTo(4181	,582,0);                  //Esli k ETTINAM ushol
        Dir=2;
    }
    if(!moved)
        say("Шаг неудачен") //Ubrat'
    // else
    //     Orion.Print("shagnul")
    Orion.SetTrack(false);
    return moved;
}
    
function Obbegalka(Dir){    //vozvrashaet Direction

    if((Player.Weight()/Player.MaxWeight())>0.95)
        return sbrosrudi()
	if(Player.X()<3929) //esli ushol na verh ostrova
		return sbrosrudi();
    if((Player.X()==4206||Player.X()==4205||Player.X()==4204)&Player.Y()==602){
        Orion.WalkTo(4181	,582,0);                  //Esli k ETTINAM ushol
        Dir=2;
    }

    var DirCheck=Dir-(2*turnside)<<29>>>29;        //kosyak1!!!11!!>>>>> (esli nachalo bqlo s cardinal direction)
    var Reverse=Dir-4<<29>>>29;
    
    /**Proveraem na obbeganie */
    if(Cwalk(DirCheck)){  
        Orion.SetTrack(true, Player.X()+xx[DirCheck]+xx[Reverse], Player.Y()+yy[DirCheck]+yy[Reverse]);
        //say("proveraem prepatstvije ... ->")
        if(!Orion.CanWalk(Reverse,Player.X()+xx[DirCheck],Player.Y()+yy[DirCheck],Player.Z())){
            Dir=DirCheck; // Proverit;
        }else
    
        findmobs();
        Walk(Dir);
        return Dir  // <<<<< DOBAVIL SUDA RETURN???? POCHEMU NEBQLO SDES" RETURN ???
        //PS
        //Esli ne budet rabotat' pravel'no obbegalka
        //na <<<---- LEVO
    }   // UDAlit' etot RETURN

    /**Uzhe znaem shto mi chegoto obbegaem, proveraem, mozhem li mi idti vpered */
    while(!Cwalk(Dir)){  //Poka nemozhet idti v storonu Dir
        Dir=Dir+2*turnside<<29>>>29;
    }
    findmobs();
    Walk(Dir);
    return Dir
}

function Point(Dir){
    var X=Player.X()+xx[Dir]*2;
    var Y=Player.Y()+yy[Dir]*2;
    Orion.SetTrack(true,X,Y);
    //Orion.Wait(1000);
    //Orion.SetTrack(false);
    return
}

/**function newPrewalk
 * Idet vpered poka ne kosnetsa stenq (peredom)
 * return 1 / -1?*/
function Prewalk(Dir){
    Dir=Dir<<29>>>29;
    if(Dir%2){
        while(CwalkOrdinal(Dir)){    // v CwalkOrdinal izmenit' Return val !!!!
            Walk(Dir)

            if(Player.Direction()!=Dir){  //err handler
                say('error!?\nPlayer.Direction()!=Dir')
                Orion.Wait(3000);
                //return -1
            }void Orion.Resend();
        }
        Dir=(Dir+turnside)<<29>>>29;
        if(Cwalk(Dir)){
            Walk(Dir)
        }else{
            Dir=(Dir+2*turnside)<<29>>>29;
        }
        say(Dir)
        return Dir
    }

    while (Cwalk(Dir)){ // Esli Cardinal Dir +
        Walk(Dir)
        if(Player.Direction()!=Dir){  //err handler
            say('error!?')
            return -1
        }
        void Orion.Resend();
    }
    return Dir+2*turnside<<29>>>29
}

function main(){
    var Dir=Prewalk(Player.Direction());     //Idti vpered poka ne stuknewsa v prepatstvie

    say("Nachalo bezkonechnogo cikla Dir="+Dir);
    while(!exit){
        Magery();
        Mining();
        var olDir=Dir
        Dir=Obbegalka(Dir);
        if(Dir==olDir)
            Dir=Obbegalka(Dir);
        if(Dir==olDir)
            Dir=Obbegalka(Dir);
    }
}
