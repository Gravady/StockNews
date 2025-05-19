//time.js

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


//Register date to localhost
function registerDate(){
    const now = new Date();
    const utc = now.toUTCString();
    localStorage.setItem("Time",utc);
}

//return decltype(bool)
function dayPassed(){
    const date = localStorage.getItem("Time");
    const now = new Date().toUTCString();
    if(date == now){
        return false;
    }
    return true;
}

//Timer
//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}