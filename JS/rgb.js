//rbg.js

//RGB logic
//https://stackoverflow.com/questions/68267937/trying-to-change-rgb-colors-in-javascript
const kelvin_table = [
  { r: 255, g: 0, b: 0 },  
  { r: 0, g: 255, b: 0 },    
  { r: 0, g: 0, b: 255 },   
  { r: 255, g: 255, b: 0 },
  { r: 255, g: 0, b: 255 }   
];

function rgbToCss(rgb) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

let currentIndex = 0;

//Click
title = document.getElementById('nav_title');
function onClick(element, callback) {
  element.addEventListener('click', function (event) {
    callback(event);
  });
}

var clicked = false;
onClick(title, () => {
    clicked = !clicked;rbgLoop();
});

async function rbgLoop(){
    while (clicked) {
        title.style.color = rgbToCss(kelvin_table[currentIndex]);
        currentIndex = (currentIndex + 1) % kelvin_table.length;
        await sleep(100); //timer.js
        hacked_seconds++;
        //Hack user ;)
        if(hacked_seconds == 10){
            hackUser(); 
        }
    }
    if(!clicked){
        title.style.color = "black";
        hacked_seconds = 0;
    }
}