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
    var random_number = Math.floor(Math.random() * stock_array.length);
    return stock_array[random_number];
}

//FIX:spawnStocks logic not working correctly 
function spawnStocks(){
    console.log("Spawning stocks");
    var used_stocks = []; 
    var stock_block_template = "stock_block";

    let selected_stocks = getCurrentStocks(); //nav.js
    console.log("Selected stocks:" + selected_stocks);

    const stock_blocks = document.getElementsByClassName("stock_blocks");
    const index_stock_blocks = document.getElementsByClassName("stock_block");

    selected_stocks.forEach(element => { 
        console.log("Parsing element:" + element);
        for(let i=1; i<3; i++){
            for(let j=1; j<3; j++){
                const row_block = `stock_block_${i}_${j}`;
                if (!used_stocks.includes(element)) {
                    applyStockData(element, row_block); //api.js
                    used_stocks.push(element);
                }
            }
        }
    });
    return;
}

const updateInterval = 30 * 60 * 60 * 60;
function updateStocks(){

}


document.addEventListener("DOMContentLoaded", () => {
    spawnStocks();
});