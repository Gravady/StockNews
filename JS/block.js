//block.js

console.log("Block is working");

//Default array of valid arrays, length=9
//CHATGPT
const stock_array = [
    "AAPL",  // Apple
    "MSFT",  // Microsoft
    "GOOG",  // Alphabet Class C
    "TSLA",  // Tesla
    "AMZN",  // Amazon
    "META",  // Meta Platforms
    "NVDA",  // NVIDIA
    "NFLX",  // Netflix
    "AMD",   // AMD
    "INTC",  // Intel
    "BABA",  // Alibaba
    "CRM",   // Salesforce
    "ADBE",  // Adobe
    "ORCL",  // Oracle
    "PYPL",  // PayPal
    "SHOP",  // Shopify
    "UBER",  // Uber
    "SQ",    // Block Inc (formerly Square)
    "BA",    // Boeing
    "DIS"    // Disney
];


//Gets random stock from stock array
function getRandomStock(){
    var random_number = Math.floor(Math.random() * stock_array.length);
    return stock_array[random_number];
}

//CHATGPT fix algorithm problem 
function spawnStocks() {
    console.log("Spawning stocks");

    const usedStocks = new Set();
    const localStockPool = [...stock_array]; 

    let selected_stocks = getCurrentStocks(); // nav.js
    if (selected_stocks.includes(document.getElementById("Socials").id)) {
        selected_stocks.pop();
    }
    console.log("Selected stocks:", selected_stocks);

    const block_ids = [];
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            block_ids.push(`stock_block_${i}_${j}`);
        }
    }

    // Add selected stocks to used list
    selected_stocks.forEach(s => usedStocks.add(s));

    for (let k = 0; k < block_ids.length; k++) {
        let stock;
        if (k < selected_stocks.length) {
            stock = selected_stocks[k];
        } else {
            // Remove used stocks from the local pool
            const available = localStockPool.filter(s => !usedStocks.has(s));
            stock = available[Math.floor(Math.random() * available.length)] || "AAPL"; // fallback
        }

        usedStocks.add(stock);
        applyStockData(stock, block_ids[k]);
    }
}


const updateInterval = 30 * 60 * 60 * 60;
function updateStocks(){

}


document.addEventListener("DOMContentLoaded", () => {
    spawnStocks();
});