//hacked.js

//Hackerman javascript popup
var hacked_seconds = 0;

//https://stackoverflow.com/questions/53256789/how-to-play-a-gif-only-on-onclick-in-javascript
function hackerGIF(){
    
}

//Create hacker window
function hackerWindow(){
    const gifUrl = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGlsa2R6MjFnb3I2eXl6bjJmMXQ3Zjh5ZXBmbmNwdjNwOGZpNzY1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V4NSR1NG2p0KeJJyr5/giphy.gif";
    const hackerBackground = document.createElement("img");
    hackerBackground.src = gifUrl;
    hackerBackground.style.width = "100%";
    hackerBackground.style.height = "100%";
    hackerBackground.style.position = "fixed";

    const hackerSay = document.createTextNode("Hacker say: ");
    const hackerTitle = document.createElement("h2");
    hackerTitle.appendChild(hackerSay);
    hackerTitle.id = "hacker_title";
    hackerTitle.textContent = "Hacker";

    const hackerWindow = document.createElement("div");
    hackerWindow.id = "hacker_window";
    hackerWindow.title = "Hacker window";
    hackerWindow.style.display = "block";

    const hackerTerminal = document.createElement("div");
    hackerTerminal.id = "hacker_terminal";
    hackerTerminal.title = "Hacker terminal";

    const hackerBar = document.createElement("div");
    hackerBar.id = "hacker_bar";
    hackerBar.title = "Hacker bar";

    hackerWindow.appendChild(hackerTerminal);
    hackerWindow.appendChild(hackerBar);
    hackerBackground.appendChild(hackerTitle);
    hackerBackground.appendChild(hackerWindow);
    document.body.appendChild(hackerBackground);
}

var is_hacking = false;
//need mutlitthreading
async function hackerRequests(){
    const russian_enemy = ""; //august hemsida 
    while(is_hacking){
        fetch(russian_enemy)
            //If russian enemy responds send it to the termianl
            .then(reponse => {
                //hackerTerminal.                
            });  
    }
}

//Trolling purposes
function hackUser(){
    is_hacking = true;
    console.log("HACKING USER");
    hackerWindow();
    playSound("hacker_man");
}

document.addEventListener('keydown', function(event) {
    console.log('Key pressed: ' + event.key);
    if (event.ctrlKey && event.key === 'h') {
        is_hacking = false;
    }
});
