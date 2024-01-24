

function float getIngameBalance(int raw_balance){
    if(raw_balance>90){
        return 0,9
    }
    return float(raw_balance)/100
}

function int getBalanceOver90(int raw_balance,float IngameBalance){
    return raw_balance-int(IngameBalance*100)
}

function float getAnimationSpeed(int Speed){
    return 1/((200+float(Speed))/200)
}

function float returnCritDmgWithES(float CritDmg_old,int extra_bal){    //only for ES
    return (CritDmg_old-1)+(1+(extra_bal/3)/100)
}

function float getCritDmgMult(int CritRate, float CritDmg){
    return ((B5)*(B6-1))/100+1
}

function float getTotalMult(float CritDmg, float anim_spd){
    return CritDmg/anim_spd
}

function float getBal_DMG(float actual_ball){
    return (actual_ball+1)/2*100
}

function float getAdd_DMG(float add_dmg_stat, float dmg_const){
    return add_dmg_stat*dmg_const*100
}

function float getBallAndAdd_DMG(float addit_DMG, float bal_DMG){
    return addit_DMG+bal_DMG
}

function int final_damage(float ball_add__DMG, float getTotalMult){
    return int(ball_add__DMG*getTotalMult)
}

function main(){
    
int ES_ATT_SPD,
    ES_balance,
    ES_addit_dmg_stat,
    ES_Crit_Rate;
    
int noES_ATT_SPD,
    noES_balance,
    noES_addit_dmg_stat,
    noES_Crit_Rate;

int fromScrolls_ATT_SPD,
    fromScrolls_balance,
    fromScrolls_addit_dmg_stat,
    fromScrolls_Crit_Rate;

int Crit_Damage[2],
    actual_ball[2],
    bal_surplus[2],
    bal_DMG[2],
    Add__DMG[2],
    ball_add__DMG[2],
    anim_speed[2],
    dmg_speed[2],
    Crit_Dmg_Mult[2],
    Final_Damage[2];

}