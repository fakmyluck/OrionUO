
var threats_arr=[];
function add_threats(mobs){
    const Now=new Date()
    var newmob_found=true    
    if(threats_arr.length>=99){
        say("Overflow v threats_arr")
        return
    }
    for(m=0;m<mobs.length;m++){
        for(t=0;t<threats_arr.length;t++){
            if(mobs[m].Serial()===threats_arr[t].Serial){
                newmob_found=false
                threats_arr[t].Date=Now
            }   //Teoreticheski esli vse freymi budut imet' tol'ko novih mobov
        }       //to starie mobi s poslednimi indexami ne budut obnavlat' .Date 
        if(newmob_found){  // Line 145 Result of expression thrers_arr[threats_arr,length] [undefined]
            var len= threats_arr.length
            threats_arr[threats_arr.length]={
                "Name": mobs[m].Name(),
                "Serial": mobs[m].Serial(),
                "Exists": mobs[m].Exists(),
                "Date": Now
            }
            return    
        };
    }     
}