//hacked.js

//Hackerman javascript popup
var hacked_seconds = 0;

//https://stackoverflow.com/questions/53256789/how-to-play-a-gif-only-on-onclick-in-javascript
function hackerGIF(){
    
}

//Create hacker window
function hackerWindow() {
    const gifUrl = "/Images/hacking.webp";

    const hackerBackground = document.createElement("div");
    hackerBackground.style.position = "fixed";
    hackerBackground.style.top = "0";
    hackerBackground.style.left = "0";
    hackerBackground.style.width = "100%";
    hackerBackground.style.height = "100%";
    hackerBackground.style.backgroundImage = `url(${gifUrl})`;
    hackerBackground.style.backgroundSize = "cover";
    hackerBackground.style.backgroundPosition = "center";
    hackerBackground.style.zIndex = "9998";
    hackerBackground.style.display = "flex";
    hackerBackground.style.flexDirection = "column";
    hackerBackground.style.alignItems = "center";
    hackerBackground.style.justifyContent = "center";
    hackerBackground.style.color = "lime";
    hackerBackground.style.fontFamily = "monospace";

    //Black low opacity background ontop of of hackerBackground
    const hackerBlackBackground = document.createElement("div");
    hackerBlackBackground.style.position = "absolute";
    hackerBlackBackground.style.top = "0";
    hackerBlackBackground.style.left = "0";
    hackerBlackBackground.style.width = "100%";
    hackerBlackBackground.style.height = "100%";
    hackerBlackBackground.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    hackerBlackBackground.style.zIndex = "9999";
    hackerBlackBackground.style.opacity = "50%";

    const hackerTitle = document.createElement("h2");
    hackerTitle.id = "hacker_title";
    hackerTitle.textContent = "Hacker say: You got hacked!";

    const hackerWindow = document.createElement("div");
    hackerWindow.id = "hacker_window";
    hackerWindow.width = "80%";
    hackerWindow.height = "80%";
    hackerWindow.title = "Hacker window";
    hackerWindow.style.display = "block";
    hackerWindow.style.backgroundColor = "rgba(0,0,0,0.7)";
    hackerWindow.style.padding = "20px";
    hackerWindow.style.border = "2px solid lime";
    hackerWindow.style.marginTop = "20px";

    const hackerTerminal = document.createElement("div");
    hackerTerminal.id = "hacker_terminal";
    hackerTerminal.title = "Hacker terminal";
    hackerTerminal.textContent = "Connecting to Russian enemy...";

    const hackerBar = document.createElement("div");
    hackerBar.id = "hacker_bar";
    hackerBar.title = "Hacker bar";
    hackerBar.textContent = "[======          ] 40%";

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
