function GeneratedScript_230744()
{
	while(1){
		var tmp=0;
		var z=Player.Z();
		for(x=-1;x<2;x++){
			for(y=-1;y<2;y++){
				Hid();
				if(Orion.ValidateTargetTileRelative('mine', x, y)){
					Orion.UseType('0x0E85', '0xFFFF');
					if (Orion.WaitForTarget(1000))
						Orion.TargetTileRelative('mine', x, y,z);
						
					if(!Orion.WaitJournal('There is no ore || Try mining', Orion.Now(), Orion.Now()+1200))
						Orion.WaitJournal('You loosen || You put', Orion.Now(), Orion.Now()+6050);//Orion.Wait(5800);
					
				}
			}
		}
	}
}

function Hid(){
	if(!Player.Hidden()){
		Orion.WarMode(1);
		Orion.WarMode(0);
		Orion.UseSkill('Hiding');
		Orion.Wait(3000);
	}
}