console.log("Block is working");

//Default array of valid arrays, length=9
const stock_array = [
    "AAPL", 
    "MSFT",
    "GOOG",
    "TSLA",
    "AMZN",
    "META",
    "AAPL",
    "GOOGL",
    "TSLA"
];

//Test

//Gets random stock from stock array
function getRandomStock(){
    var random_number = Math.floor(Math.random() * 10);
    return stock_array[random_number];
}

function spawnStocks(){
    console.log("Spawning stocks");
    var used_stocks = []; 
    var stock_block_template = "stock_block";
    var selected_stocks = getCurrentStocks(); //nav.js
    console.log("Selected stocks:" + selected_stocks);
    if(selected_stocks.length =! 9 && selected_stocks.length < 9){
        for(selected_stocks.length; selected_stocks.length < 9; selected_stocks.push(getRandomStock()));
    }
    else if(selected_stocks.length > 9){
        while(selected_stocks.length > 9){selected_stocks.pop();};
    }
    var valid_stocks = [];
    selected_stocks.forEach(element => { 
        var stock_blocks = document.getElementsByClassName("stock_blocks");
        var index_stock_blocks = document.getElementsByClassName("stock_block");
        for(let i=0; i<stock_blocks.length; i++){
            for(let j=0; j<index_stock_blocks.length; j++){
                var row_block = stock_block_template  + "_" + i + "_" + j;
                if(!used_stocks.includes(element) && !valid_stocks.includes(element)){
                    applyStockData(element, row_block); 
                    used_stocks.push(element);  
                }
            }
        }
    });
}   

//Logs the valid stock blocks to default to in localhost
function logValidStockBlocks(arr_block){

}

//Return array with valid stock blocks from localhost
function getValidStockBlocks(){

}

//Conditional to check if item exists in known valid stock blocks
function inValidStockBlocks(){

}

//ms
const updateInterval = 30 * 60 * 60 * 60;
function updateStocks(){

}

spawnStocks();