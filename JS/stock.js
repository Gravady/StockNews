//Get current stock selected from nav.js

var stock = getCurrentStockUI();

function getSettingAttribute(name){
    stocks.forEach(el => {
         if(el[name] != undefined){
             return el[name];
         }
    }); 
    console.error("Stock not found");
    return null;
 }

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

function generateStock(){
    stocks.forEach(el => {
        var trim_el = trimString(el);
    });
}