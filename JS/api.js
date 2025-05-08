// JS/stock.js

// Global object to store multiple stock chart data sets
window.stockChartData = {};

//symbol is the current stock selected
function fetchStockData(symbol) {
    var validStocks = getValidStocks();
    validStocks.forEach(el => {
        if(el.includes(symbol)){
            return;
        }
    });
    fetch(`https://stocknewsfrontend.onrender.com/stocks/${symbol.toUpperCase()}`)
        .then(response => {
            if (!response.ok) throw new Error(`Network response was not ok for ${symbol}`);
            return response.json();
        })
        .then(data => {
            const timeSeries = data["Time Series (Daily)"];
            const sortedDates = Object.keys(timeSeries).sort();

            // Store parsed data under window.stockChartData[symbol]
            window.stockChartData[symbol] = {
                labels: sortedDates,
                prices: sortedDates.map(date => parseFloat(timeSeries[date]["4. close"]))
            };

            // Update UI block if exists
            const latestDate = sortedDates[sortedDates.length - 1];
            const latestData = timeSeries[latestDate];
            const stockBlock = document.getElementById(`stock_block_${symbol}`);
            if (stockBlock) {
                stockBlock.querySelector('h3').textContent = symbol.toUpperCase();
                stockBlock.querySelector('span').textContent = `Close: $${latestData["4. close"]}`;
                stockBlock.style.backgroundColor = parseFloat(latestData["4. close"]) >= parseFloat(latestData["1. open"])
                    ? 'lightgreen' : 'salmon';
            }

            // Dispatch a custom event that includes the stock symbol
            document.dispatchEvent(new CustomEvent('stockDataReady', {
                detail: { symbol }
            }));
        })
        .catch(error => {
            console.error(`Failed to fetch data for ${symbol}:`, error);
        });
}

//Does a http request to log/ip to get ip adress
function getIPAdressInfo(ip){

}