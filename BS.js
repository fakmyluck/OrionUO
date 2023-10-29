var skillvalue_magery=Orion.SkillValue('magery');
Orion.Print(skillvalue_magery);
var skillvalue_blacksmithy=Orion.SkillValue('blacksmithy');
Orion.Print(skillvalue_blacksmithy);
var skillvalue_meditation=Orion.SkillValue('meditation');
Orion.Print(skillvalue_meditation);
var skillvalue_eval=Orion.SkillValue('16');
Orion.Print(skillvalue_eval);
var skillvalue_resist=Orion.SkillValue('22');//22?? //26 //46 //35
Orion.Print(skillvalue_resist)


function debg(men){
Orion.Print(men);
			Orion.Print('Name: '+men.Name());
			for(i=0;i<men.ItemsCount();i++)
			Orion.Print(men.ItemName(i));
}

//var spell='agility';
function Magery(){
		while(Player.Mana()==100){//>15
	
		Orion.Cast('poison');
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject('self');
		Orion.Wait(3000);
		}


		Orion.UseSkill('meditation');
		Orion.Wait(3000);
	
	}

	
function BS()
{
Orion.UseType('0x13E3', '0xFFFF');
if(Orion.WaitForTarget(1000))
Orion.CancelTarget();
	var counter=0;
	var iron=Orion.FindType('0x1BEF', '0x0000');
Orion.Print(Orion.FindObject(iron).Count()+' Iron');
while(Orion.FindObject(iron)){
if(Orion.FindObject(iron).Count()<3)
	break;
	//Orion.UseType('0x13E3', '0xFFFF');		//molotok
	//Orion.Wait(300);
	//if (Orion.WaitForTarget(1000))
	//	Orion.TargetType('0x1BEF', '0x0000');	//IRON ignot
Orion.UseType('0x1BEF', '0x0000');
	//Zhjdem menu BS
	if (Orion.WaitForMenu(1000))
	{
		var menu0 = Orion.GetMenu('last');
		if (menu0 !== null)
		{
			if (menu0.Name() === "Blacksmithing")
				menu0.Select("Weapons");//menu0.Select("Weapons");
			else
				Orion.Print('1:'+menu0.Name());
			
		}
	}
	
	//Zhdem menu Oruzhija
	if (Orion.WaitForMenu(1000))
	{
		var menu1 = Orion.GetMenu('last');

		if (menu1 !== null)
				menu1.Select("Swords & Blades");

	}

	if (Orion.WaitForMenu(1000))
	{
		var menu2 = Orion.GetMenu('last');
	
		if (menu2 !== null)
			menu2.Select("dagger");
	}
	
	 // if(Orion.WaitJournal('There is no ore', Orion.Now(), Orion.Now()+500))
    //                    break;  //NADEJUS' VQBJET IZ for cikla
   //                 else
   			
                  Orion.WaitJournal('You have failed || You put', Orion.Now()+2000, Orion.Now()+8050);
				  if(Player.Mana()==100)
				  Magery();

				  if(counter%6==0){
					Orion.Print('Magery '+(Orion.SkillValue('magery')-skillvalue_magery));
					Orion.Print('Blacksmithy '+(Orion.SkillValue('blacksmithy')-skillvalue_blacksmithy));
					Orion.Print('Meditation '+(Orion.SkillValue('meditation')-skillvalue_meditation));
					Orion.Print('Eval '+(Orion.SkillValue('16')-skillvalue_eval));
					Orion.Print('Resistingspells '+(Orion.SkillValue('22')-skillvalue_resist));
				
				}

}
while(1)
Magery();

if(counter%6==0){
	Orion.Print('  Magery'+(Orion.SkillValue('magery')-skillvalue_magery));
	Orion.Print('  Blacksmithy'+(Orion.SkillValue('blacksmithy')-skillvalue_blacksmithy));
	Orion.Print('  Meditation'+(Orion.SkillValue('meditation')-skillvalue_meditation));
	Orion.Print(' Eval '+(Orion.SkillValue('16')-skillvalue_eval));
	Orion.Print(' Resistingspells'+(Orion.SkillValue('22')-skillvalue_resist));

}

}


