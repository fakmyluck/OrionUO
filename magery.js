var spell='16';

function Magery(){
		var spell='agility';
    while(1){
        while(Player.Mana()>15){//>15
            if(spell=='agility')
                spell='harm';
            else
                spell='agility';
            Orion.Cast(spell);
            if (Orion.WaitForTarget(1000))
                Orion.TargetObject('self');
            Orion.Wait(3000);
        }
    
        for(i=0;i<12;i++){
        Orion.UseSkill('meditation');
        if(!Orion.WaitJournal('You are at peace || You lose', Orion.Now()+1000, Orion.Now()+3050)){
            while(Player.Mana()<73)
            Orion.Wait(2500);
            break;
				
			}
		}
	}
}