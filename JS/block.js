
const stock_block_template = "stock_block"; //The default string representing the value, stock_block_1_2 for example, lim=3x3
function spawnStocks(){
    var stocks = getCurrentStocks();
    var used_stocks = []; //fill stocks when applied

    var stock_blocks = document.getElementsByClassName("stock_blocks");
    var index_stock_blocks = document.getElementsById(stock_blocks); //get all id elements in index_stock_block
    for(let i=0; i<stock_blocks.length; i++){
        for(let j=0; j<index_stock_blocks; j++){
            //Check if element such as stock_block_1_2 exists
            var row_block = stock_block_template  + "_" + i + "_" + j;
            if(document.getElementById(row_block)){
                var stock_data = getBlockStockData(row_block); //get an array of relevant stock data
            } 
        }
    }
}   

//ms
const updateInterval = 30 * 60 * 60 * 60;
function updateStocks(){

}