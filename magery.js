function Magery(){
    while(1){
//        while(Player.Mana()!=100){//>15
        
        
            
        	if(Player.Mana()==Player.MaxMana()){
            Orion.Wait(2000);
            Orion.Cast('poison');
            }
            
            if (Orion.WaitForTarget(1000))
                Orion.TargetObject('self');
            Orion.Wait(3000);
            
//        }
    
        for(i=0;i<12;i++){
        Orion.UseSkill('meditation');
        if(!Orion.WaitJournal('You lose', Orion.Now()+1000, Orion.Now()+3050)){
            Orion.Wait(2500);
            break;	
			}
		}
		 Orion.WaitJournal('You are at peace', Orion.Now(), Orion.Now()+20050)
	}
	
}