function gotomines(){
var co=[
    [2547,2547,  2553,   2566,    2580,   2581,   2581,   2558,    2520],
    [831	,795,   766,    737,    695,    665,    633,    599,    558]];


 var coMinnoc=Math.abs(Player.X()-co[0][co[0].length-1])+Math.abs(Player.Y()-co[1][co[1].length-1]);
 var coMines=Math.abs(Player.X()-co[0][0])+Math.abs(Player.Y()-co[1][0]);
 
	if(coMines<coMinnoc)
        for(i=0;i<=co[0].length-1;i++)	// SHAHTA -> minoc
	        Orion.Print(Orion.WalkTo(co[0][i],  co[1][i]));
	else
	    for(i=co[0].length-1;i>=0;i--)  // MINNOC -> shahta
	        Orion.Print(Orion.WalkTo(co[0][i],  co[1][i]));
	
	Orion.Turn(4);
}



   