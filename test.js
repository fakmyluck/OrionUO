    //         7               -1                 -1      
    //      6  |  0         -1     0            0    -1         
    //    5----+----1     -1    X     1       1    Y   -1       
    //      4  |  2          0     1            1     0         
    //         3                1                  1      
var xx=[0,1,1,1,0,-1,-1,-1]; /// NE{RTAVO:NP}
var yy=[-1,-1,0,1,1,1,0,-1]; //N

    //     7   0   1      -1    0    1         -1   -1   -1 
    //         |                    
    //     6---+---2      -1    X    1          0    Y    0       
    //         |              
    //     5   4   3      -1    0    1          1    1    1     

var world=[
    [1,1,1,1,1,1,1,1,1,1,1,1],  //0
    [1,0,0,1,1,1,1,0,1,1,0,1],  //1
    [1,1,0,1,1,0,0,0,1,0,0,1],  //2
    [1,0,0,0,1,0,1,0,0,0,0,1],  //3
    [1,1,0,0,0,0,0,0,1,1,0,1],  //4 <<
    [1,0,0,0,0,0,0,0,0,0,1,1],  //5
    [1,1,1,0,0,1,0,0,0,1,0,1],  //6
    [1,1,1,1,1,1,1,1,1,1,1,1]]; //7
//   0,1,2,3,4,5,6,7,8,9,A,B
//             *
var worldPOS=[5,4]

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function Walk(Dir){
    Dir=Dir<<29>>>29;
    var L=world[worldPOS[0]+xx[(Dir-1)<<29>>>29]][worldPOS[1]+yy[(Dir-1)<<29>>>29]];//Left
    var C=world[worldPOS[0]+xx[(Dir)<<29>>>29]][worldPOS[1]+yy[(Dir)<<29>>>29]];//Dagonal(center)
    var R=world[worldPOS[0]+xx[(Dir+1)<<29>>>29]][worldPOS[1]+yy[(Dir+1)<<29>>>29]];//Right

    if(Dir%2)  //Diagonalniy variant
        if(L&&R)
            return false;
        else if()
            return ?
    else
        if(C)
            return ?
        else
            return ?

    worldPOS[0]=worldPOS[0]+xx[Dir];
    worldPOS[1]=worldPOS[1]+yy[Dir];
}

function Cwalk(Dir){
    Dir=Dir<<29>>>29;
        var L=world[worldPOS[0]+xx[(Dir-1)<<29>>>29]][worldPOS[1]+yy[(Dir-1)<<29>>>29]];//Left
        var C=world[worldPOS[0]+xx[(Dir)<<29>>>29]][worldPOS[1]+yy[(Dir)<<29>>>29]];//Dagonal(center)
        var R=world[worldPOS[0]+xx[(Dir+1)<<29>>>29]][worldPOS[1]+yy[(Dir+1)<<29>>>29]];//Right
        
    if(Dir%2)  //Diagonalniy variant
        if(L&&R)
            return false;
        else
            return true;
    else
        if(C)
            return false;
        else
            return true;
}

function main(){
        Pdir=0;

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
    }   
}