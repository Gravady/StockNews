//chart.js

var chart_selected = getCurrentStockUI(); //nav.js
let ctx = document.getElementById("stock_canvas");
const chartParent = document.getElementById("stock_map_wrapper");
let chart = document.getElementById("stock_map_ui");

//Register settings about chart that user inputs 
async function registerChartSettings(){
    
}

function createChart() {

    const stock_ui_id = "stock_map_ui";
    const stock_settings_id = "stock_map_settings";
    const selected_stock = getCurrentStockUI(); //nav.js
    const data = applyStockData(selected_stock, stock_ui_id); //api.js

    current_date = data["Meta Data"]["3. Last Refreshed"];
    valid_dates = [];

    for(let i = 0; i < current_date.substring(0, 1); i++){
        valid_dates.push(current_date - i + current_date.substring(1, 3));
    }

    console.log(valid_dates);

    //----------------

    const dates = Object.keys(data["Time Series (Daily)"]);    

    const timeSeries = data["Time Series (Daily)"];
    const sortedDates = Object.keys(timeSeries).sort();

    console.log("Creating chart")

    const closingPrices = dates.map(date => parseFloat(timeSeries[date]["4. close"]));

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${data["Meta Data"]["2. Symbol"]} Closing Price`,
                data: closingPrices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.2,
                pointRadius: 2,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        maxTicksLimit: 10,
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Stock Prices for ${data["Meta Data"]["2. Symbol"]}`
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}
