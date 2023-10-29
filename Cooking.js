function GoToTavern(){
Orion.Say('all stay');
Orion.WalkTo(2461,402,15);
Orion.Say('sell');
Orion.WalkTo(2442,464,15);
Orion.Say('all guard me');
}

function Cooking()
{
for(i=0;i<150;i++){
Orion.UseType('0x09F1', '0xFFFF');
	if (Orion.WaitForTarget(1000))
Orion.TargetGround('0x0DE3', '0x0000');
Orion.TargetGround('0x0DE9', '0x0000');


Orion.WaitJournal('You put || You burn', Orion.Now()+500, Orion.Now()+90000);
}
GoToTavern();
}
