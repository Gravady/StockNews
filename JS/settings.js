const settings = JSON.parse(localStorage.getItem("Settings")) || [];

//Get setting attribute name
function getSettingAttribute(name){
   settings.forEach(el => {
        if(el[name] != undefined){
            return el[name];
        }
   }); 
   console.error("Setting not found");
   return null;
}

//See if setting is active
function isSettingActive(name){
    const el = getSettingAttribute(name);
    if(!el){
        console.error("ELement not found: ", name);
        return false;
    } 

    const color = window.getComputedStyle(el).backgroundColor;
    if (color === "rgb(128, 128, 128)" || color === "gray") {
        return true;
    } else if (color === "transparent" || color === "rgba(0, 0, 0, 0)") {
        return false;
    }
    return false; 
}

//Apply settings
function applySettings(){
    if(isSettingActive("Darkmode")){
        applyDarkMode();
    }
    else{
        applyLightMode();
    }
}


function applyLightMode(){
    document.body.style.filter = "invert(0)";
}

function applyDarkMode(){
    document.body.style.filter = "invert(1)";
}

//3 social medias are required
const socialReq = 3;
const social_default = ["Twitter", "Reddit", "4Chan"];
const applied_socials = [];

//Load in the proper socials
function loadSocialMedia(){
    const socials = getSettingAttribute("Socials");
    if(socials.length < socialReq && applied_socials.length == socialReq){
       forEach(el => {
           loadSocialInGraph(el);
       }) 
    }
    else {

    }
}

loadSocialInGraph(element){

}

loadSocialMedia();