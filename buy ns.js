// Paste your code here :)
var vendor=["Theodosia", "Evander", "Eyota"];
var cord=[	[1495,1546,30],	//theo
					[1490,1554,30],
					[1493,1556,70]	];	//cen

function buy(){
while(1){
Orion.WalkTo(1484,1545,50);
Orion.WalkTo(1489,1544,67);
	Orion.WalkTo(1491,1547,70);
Orion.WalkTo(1488,1554,70);
Orion.Say('Evander buy');
Orion.Wait(33000);

Orion.WalkTo(1491,1547,70);
Orion.WalkTo(1484,1545,50);
Orion.WalkTo(1490,1553,30);
Orion.Say('Eyota buy');
Orion.Wait(33000);

Orion.WalkTo(1495,1546,30);
Orion.Say('Theodosia buy');
Orion.Wait(33000);

}}