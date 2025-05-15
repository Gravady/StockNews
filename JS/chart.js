var chart_selected = getCurrentStockUI(); //nav.js
let ctx = document.getElementById("stock_canvas");
const chartParent = document.getElementById("stock_map_wrapper");
let chart = document.getElementById("stock_map_ui");

//Register settings about chart that user inputs 
async function registerChartSettings(){
    
}

//Range is last 7 days
const date_range = 7;
//Create map for month to nummerical date
const month_to_date = {"Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12};
function getCurrentDate(chart_date){
    const date = new Date();
    console.log("Current date:", date);
    if(chart_date){
        filtered_date = chart.date.substring(4, 15);
        month_to_date.forEach(element => {
            if(element == month_to_date(filtered_date.substring(0, 3))){
                filtered_date.replace(element, month_to_date(filtered_date.substring(0, 3)));
            }
        });
        return filtered_date;
    }
    return date.getFullYear();
}

//Source:ChatGPT
function createChart(stock_id, data) {

    //Get the last 7 days of stock data
    const valid_dates = []; //data with date in range

    const current_date = getCurrentDate();

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
