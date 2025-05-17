//api.js

console.log("API frontend is working");

window.stockChartData = {};

//Get all valid attributes of the 
function getJsonUIStock(){

}

//symbol is the current stock selected and apply the stock to the id
function applyStockData(symbol, stock_block_id) {
    //Call only once per day
    if(dayPassed()){ //time.js
        console.log("Day passed:" + dayPassed());
        console.log("Applying stock data for symbol:", symbol);
        fetch(`https://stocknewsbackend.onrender.com/stocks/${symbol.toUpperCase()}`)
            .then(response => {
                if (!response.ok) throw new Error(`Network response was not ok for ${symbol}`);
                return response.json();
            })
            .then(data => {
                console.log("Fetching data from API");
                console.log(data);
                const timeSeries = data["Time Series (Daily)"];
                const sortedDates = Object.keys(timeSeries).sort();

                // Store parsed data under window.stockChartData[symbol]
                window.stockChartData[symbol] = {
                    labels: sortedDates,
                    prices: sortedDates.map(date => parseFloat(timeSeries[date]["3. low"]))
                };

                // Update UI block if exists
                const latestDate = sortedDates[sortedDates.length - 1];
                const latestData = timeSeries[latestDate];
                const stockBlock = document.getElementById(stock_block_id);
                
                stockBlock.querySelector('h3').textContent = symbol.toUpperCase();
                    stockBlock.querySelector('span').textContent = `Close: $${latestData["4. close"]}`;

                // Dispatch a custom event that includes the stock symbol
                document.dispatchEvent(new CustomEvent('stockDataReady', {
                    detail: { symbol }
                }));
            })
            .catch(error => {
                console.error(`Failed to fetch data for ${symbol}:`, error);
            });
    }
}

//Does a http request to log/ip to get ip adress
function getIPAdressInfo(ip){

}

applyStockData("AAPL", "stock_block_1_1");
applyStockData("NVDA", "stock_block_1_2");
applyStockData("GOOGL", "stock_block_1_3");