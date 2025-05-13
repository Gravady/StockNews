
const stock_block_template = "stock_block"; //The default string representing the value, stock_block_1_2 for example, lim=3x3

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

//Gets random stock from stock array
function getRandomStock(){
    var random_number = Math.floor(Math.random() * 10);
    return stock_array[random_number];
}

function spawnStocks(){
    var used_stocks = []; 
    var stock_block_template = "stock_block";
    var selected_stocks = getCurrentStocks(); //stock.js
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

//ms
const updateInterval = 30 * 60 * 60 * 60;
function updateStocks(){

}

spawnStocks();