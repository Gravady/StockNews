//api.js

console.log("API frontend is working");

window.stockChartData = {};

//Get all valid attributes of the 

//symbol is the current stock selected and apply the stock to the id
//stock_block_id = id of current element
function applyStockData(symbol, stock_block_id){
    console.log("Applying stock data for symbol:", symbol);
    console.log("stock_block_id:", stock_block_id);

    const stockBlock = document.getElementById(stock_block_id); //stock_block_id;
    console.log("stockBlock:", stockBlock);

    const h3Element = stockBlock.querySelector('h3');
    console.log("h3Element:", h3Element);

    const spanElement = stockBlock.querySelector('span');
    console.log("spanElement:", spanElement);

    const daypassed = dayPassed(); //time.js
    if(daypassed) {
        console.log("Day passed:" + dayPassed());
        console.log("Applying stock data for symbol:", symbol);

        fetch(`https://stocknewsbackend.onrender.com/stocks/${symbol.toUpperCase()}`)
            .then(response => {
                if (!response.ok) throw new Error(`Network response was not ok for ${symbol}`);
                return response.json();
            })
            .then(data => {
                //if element being parsed is for the ui
                if(is_ui){
                    return data;
                } 

                //if element being parsed is for the api
                console.log("Fetching data from API for:", symbol);
                console.log(data);

                if (data.Information && data.Information.includes("premium endpoint")) {
                    stockBlock.querySelector('h3').textContent = symbol.toUpperCase(); 
                    stockBlock.querySelector('span').textContent = "API call was invalid (premium required)";
                }

                const timeSeries = data["Time Series (Daily)"];

                if (!timeSeries || Object.keys(timeSeries).length === 0) {
                    stockBlock.querySelector('span').textContent = "API call failed (empty data)";
                    return;
                }

                const sortedDates = Object.keys(timeSeries).sort();
                //later log prices and see if price went up or down
                const prices = sortedDates.map(date => parseFloat(timeSeries[date]["3. low"])).filter(p => !isNaN(p));

                if (prices.length === 0) {
                    stockBlock.querySelector('span').textContent = "API call failed (no valid prices)";
                    return;
                }

                // Store parsed data
                window.stockChartData[symbol] = {
                    labels: sortedDates,
                    prices: prices
                };

                const latestDate = sortedDates[sortedDates.length - 1];
                const latestData = timeSeries[latestDate];
                stockBlock.querySelector('span').textContent = `Close: $${latestData["4. close"]}`;

                // Notify listeners
                document.dispatchEvent(new CustomEvent('stockDataReady', {
                    detail: { symbol }
                }));
            })
            .catch(error => {
                console.error("Failed to fetch API data");
                if(stockBlock){
                    stockBlock.querySelector('h3').textContent = symbol.toUpperCase(); 
                    stockBlock.querySelector('span').textContent = "API call failed(console log)";
                    console.log(error.message);
                }
            });
    }
}

//Does a http request to log/ip to get ip adress
function getIPAdressInfo(ip){

}