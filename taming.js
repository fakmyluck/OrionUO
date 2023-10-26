function Taming()
{
//Orion.Follow(lasttarget);
while(1){
//Orion.Say('Ravid stable');
// (Orion.WaitForTarget(500))
//Orion.TargetObject(lasttarget);
	//Orion.Say('all release');
Orion.UseObject('0x40530170');
	if (Orion.WaitForTarget(1000))
	
Orion.TargetObject(lasttarget);
Orion.Wait(500);
	Orion.WaitJournal('You fail to', Orion.Now(), Orion.Now()+10000);
                                
}
}
