//     var Y=Player.Y();
//     var X=Player.X();
//     var Z=Player.Z();
//                                      var y=-30;
//                         var x=0;

// Orion.SetTrack(true, X+x, Y+y);
 //Orion.Print('X: '+Player.X()+ '\nY: '+Player.Y() +'\nZ: '+Player.Z());

 
 //var proverka=Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
 //while(!proverka){
 //	Orion.Print('eshenedoshol');
// 	wait 5000;
 //	}
 //	Orion.Print('DOSHOL!!');
    //         7                    -1                   -1      
    //      6  |  0            -1     0             0      -1         
    //    5----+----1     -1    X     1       1     Y     -1       
    //      4  |  2             0     1              1      0         
    //         3                     1                     1      
    
    
    
 //     1      2       3       4       5       6       7       8

function gotomines(){
var co=[
    [2547,2547,  2553,   2566,    2580,   2581,   2581,   2558,    2520],
    [831	,795,   766,    737,    695,    665,    633,    599,    558]];
 
// var Minnoc =
// var Shahta=Player.X()-

// Orion.Print(Math.abs(Player.X()+' - '+co[0][0])+' + ' +Math.abs(Player.Y()+' - '+co[1][0]));



 var coMinnoc=Math.abs(Player.X()-co[0][co[0].length-1])+Math.abs(Player.Y()-co[1][co[1].length-1]);
 var coMines=Math.abs(Player.X()-co[0][0])+Math.abs(Player.Y()-co[1][0]);
// Orion.Print('Shagov do shahti: '+v1.StepsCount()+'\nShagov do kuzni: '+v2.StepsCount())
 //var countsteps
 
	if(coMines<coMinnoc)
        for(i=0;i<=co[0].length-1;i++)	// SHAHTA -> minoc
	        Orion.Print(Orion.WalkTo(co[0][i],  co[1][i]));
	else
	    for(i=co[0].length-1;i>=0;i--)  // MINNOC -> shahta
	        Orion.Print(Orion.WalkTo(co[0][i],  co[1][i]));
	
	Orion.Turn(4);
}




//Orion.Print(co[0][7]);
//Orion.Print(co[1][7]);

			//		(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
//Orion.Print(Orion.WalkTo(co[0][7],  co[1][7],0,0,0,0,1,5000));
 //   Orion.Print(Orion.WalkTo(co[0][7], co[1][7], 0, 60));
   

   