//Get current stock selected from nav.js

//Get valid stocks avaliable that are in the html
function getValidStocks(){
    const subStockMenu = document.getElementById("sub_stock_block");
    return Array.from(subStockMenu.children);
}

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

//Get an arrray of relevant information for block structure
function getBlockStock(stock){
    var raw_json = fetchStockData(stock);
}

//Get back relevant data in array for stock UI
function getUIStock(stock){
    var raw_json = fetchStockData(stock);
}