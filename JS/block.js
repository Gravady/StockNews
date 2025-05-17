//block.js

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
    console.log("Spawning stocks");
    var used_stocks = []; 
    var stock_block_template = "stock_block";

    let selected_stocks = getCurrentStocks(); //nav.js
    console.log("Selected stocks:" + selected_stocks);


    const stock_blocks = document.getElementsByClassName("stock_blocks");
    const index_stock_blocks = document.getElementsByClassName("stock_block");

    selected_stocks.forEach(element => { 
        for(let i=0; i<stock_blocks.length; i++){
            for(let j=0; j<index_stock_blocks.length; j++){
                const row_block = `${stock_block_template}_${i}_${j}`;
                if (!used_stocks.has(symbol)) {
                    applyStockData(symbol, row_block);
                    used_stocks.add(symbol);
                    return; 
                }
            }
        }
    });
}   

const updateInterval = 30 * 60 * 60 * 60;
function updateStocks(){

}

spawnStocks();