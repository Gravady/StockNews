// hacked.js

// Hackerman javascript popup
var hacked_seconds = 0;
let is_hacking = false;  // Declare explicitly

// Create hacker window
function hackerWindow() {
    const gifUrl = "/Images/hacking.webp";
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    const hackerBackground = document.createElement("div");
    hackerBackground.id = "hacker_background";
    hackerBackground.style.position = "fixed";
    hackerBackground.style.top = "0";
    hackerBackground.style.left = "0";
    hackerBackground.style.width = "100vw";
    hackerBackground.style.height = "100vh";
    hackerBackground.style.backgroundImage = `url(${gifUrl})`;
    hackerBackground.style.backgroundSize = "cover";
    hackerBackground.style.backgroundPosition = "center";
    hackerBackground.style.display = "flex";
    hackerBackground.style.flexDirection = "column";
    hackerBackground.style.alignItems = "center";
    hackerBackground.style.justifyContent = "center";
    hackerBackground.style.zIndex = "9999";

    const hackerBlackBackground = document.createElement("div");
    hackerBlackBackground.style.position = "absolute";
    hackerBlackBackground.style.top = "0";
    hackerBlackBackground.style.left = "0";
    hackerBlackBackground.style.width = "100%";
    hackerBlackBackground.style.height = "100%";
    hackerBlackBackground.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    hackerBlackBackground.style.zIndex = "1";

    const hackerTitle = document.createElement("h1");
    hackerTitle.id = "hacker_title";
    hackerTitle.textContent = "You got hacked!";
    hackerTitle.style.color = "lime";
    hackerTitle.style.fontFamily = "monospace";
    hackerTitle.style.fontSize = "48px";
    hackerTitle.style.marginBottom = "30px";
    hackerTitle.style.zIndex = "2";

    const hackerWindowDiv = document.createElement("div");  
    hackerWindowDiv.id = "hacker_window";
    hackerWindowDiv.style.width = "60%";
    hackerWindowDiv.style.backgroundColor = "rgba(0,0,0,0.8)";
    hackerWindowDiv.style.padding = "30px";
    hackerWindowDiv.style.border = "2px solid lime";
    hackerWindowDiv.style.display = "flex";
    hackerWindowDiv.style.flexDirection = "column";
    hackerWindowDiv.style.alignItems = "center";
    hackerWindowDiv.style.zIndex = "2";
    hackerWindowDiv.style.color = "lime";
    hackerWindowDiv.style.fontFamily = "monospace";
    hackerWindowDiv.style.gap = "20px";

    const hackerTerminal = document.createElement("div");
    hackerTerminal.id = "hacker_terminal";
    hackerTerminal.textContent = "Hacking progress";
    hackerTerminal.style.fontSize = "24px";

    const hackerBar = document.createElement("div");
    hackerBar.id = "hacker_bar";
    hackerBar.style.fontSize = "28px";
    hackerBar.style.fontWeight = "bold";

    hackerWindowDiv.appendChild(hackerTerminal);
    hackerWindowDiv.appendChild(hackerBar);
    hackerBackground.appendChild(hackerBlackBackground);
    hackerBackground.appendChild(hackerTitle);
    hackerBackground.appendChild(hackerWindowDiv);
    document.body.appendChild(hackerBackground);

    loadHackerBar(hackerBar);
}

// Progress bar loader
function loadHackerBar(barElement) {    
    let progress = 0;
    const max = 100;

    function updateBar() {
        const filled = "=".repeat(Math.floor(progress / 5)); 
        const empty = " ".repeat(20 - Math.floor(progress / 5));
        barElement.textContent = `[${filled}${empty}] ${progress}%`;
        progress++;

        if (progress > max) {
            scaryAnonymus();
            return;
        }
        const timeProgress = Math.random() * 500 + 100;
        setTimeout(updateBar, timeProgress);
    }
    updateBar();
}

// Scary anonymus 3am
function scaryAnonymus(){
    const nonumus = document.createElement("img");
    nonumus.src = "/Images/nonumus.png";
    nonumus.style.position = "fixed";
    nonumus.style.top = "50%";
    nonumus.style.left = "50%";

    nonumus.style.width = "100px";
    nonumus.style.height = "100px";

    nonumus.style.transform = "translate(-50%, -50%) scale(0)";
    nonumus.style.transition = "transform 0.5s ease-in-out";
    nonumus.style.zIndex = "9999";

    document.body.appendChild(nonumus);

    requestAnimationFrame(() => {
        nonumus.style.transform = "translate(-50%, -50%) scale(3)";
    });

    setTimeout(() => {
        nonumus.style.opacity = "0";
    }, 3000);

    setTimeout(() => {
        nonumus.remove();
        destroyWindow();
        stopSound("hacker_man"); //sound.js
        is_hacking = false;
        location.reload();
    }, 4000);

    console.log("Scary anonymus 3am");
    playSound("fnaf_scream");
}

// Trolling purposes
function hackUser(){
    console.log("HACKING USER");
    is_hacking = true;
    hackerWindow();
    playSound("hacker_man");
}

// Remove hacker window
function destroyWindow(){
    const hackerBackground = document.getElementById("hacker_background");
    if(hackerBackground && hackerBackground.parentNode) {
        hackerBackground.parentNode.removeChild(hackerBackground);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 's') {
        if(is_hacking){
            is_hacking = false;
            destroyWindow();
            stopSound("hacker_man"); //sound.js
            location.reload();
        }
    }
});
