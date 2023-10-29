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

	Orion.Follow(lasttarget);
	Orion.Wait(1000);
	
//	Orion.Say('All kill');
//	if (Orion.WaitForTarget(1000))
//Orion.TargetObject(lasttarget);
//Orion.TargetType('0x00E8', '0xFFFF');

if(Orion.WaitJournal('is already tame.', Orion.Now(), Orion.Now()+1000)){
	Orion.RenameMount(lasttarget, 'a');
	return;
	}

	if(!Orion.WaitJournal('You fail to', Orion.Now(), Orion.Now()+10000)){
	Orion.RenameMount(lasttarget, 'a');
		return
	}
	
                                
}
}

function Campfire()
{
	var findItems0 = Orion.FindType('0x0DE1', '0xFFFF', 'backpack', 'item|fast');
	if (findItems0.length)
	{
		Orion.DragItem(findItems0[0], 1);
		Orion.Wait('300');
	}
	Orion.DropDraggedItemRelative(0, 0, 0);
	Orion.Wait('500');
	
	while(	Orion.UseFromGround('0x0DE1', '0xFFFF'))
	Orion.Wait(100);
	
Cooking();
}

function GoToTavern(){
Orion.Say('all stay');
Orion.WalkTo(2461,400,15);
Orion.Say('sell');
Orion.Wait(1000);
Orion.WalkTo(2442,464,15);
Orion.Say('all guard me');
}

function Cooking()
{
while(Orion.UseType('0x09F1', '0xFFFF')){
	if (Orion.WaitForTarget(1000))
Orion.TargetGround('0x0DE3', '0x0000');
Orion.TargetGround('0x0DE9', '0x0000');
Orion.WaitJournal('You put || You burn', Orion.Now()+1000, Orion.Now()+90000);
}

GoToTavern();
}


