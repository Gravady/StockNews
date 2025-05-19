//settings.js

//NOTE setting.js does not work correctly

console.log("Settings is working");

const settings = JSON.parse(localStorage.getItem("Settings")) || [];

function isSettingActive(setting){
    const selected = getSelected(); //nav.js
    return selected.includes(setting); 
}

//3 social medias are required
const socialReq = 3;
const social_default = ["Twitter", "Reddit", "4Chan"];
const applied_socials = [];

//Load in the proper socials
function loadSocialMedia(){
    const socials = getSettingAttribute("Socials");
    if(socials.length < socialReq && applied_socials.length == socialReq){
       socials.forEach(el => {
           loadSocialInGraph(el);
           applied_socials.push(el);
       }) 
    }
}

//------------------
//Darkmode

function applyLightMode(){
    document.body.style.filter = "invert(0)";
}

function applyDarkMode(){
    document.body.style.filter = "invert(1)";
}

var is_darkmode = false;
const darkMode = document.getElementById("DarkMode");
document.getElementById("DarkMode").addEventListener("click", function(event) {
    console.log("Darkmode button pressed");

    if(isSettingActive("Colorblindness")){
        is_darkmode = false;
        darkMode.style.backgroundColor = "transparent";
        darkMode.style.font = "normal";
        applyLightMode();
        warning_slider("Colorblindness");
        return;
    }

    is_darkmode = !is_darkmode;
    if(is_darkmode){
        darkMode.style.backgroundColor = "gray";
        darkMode.style.font = "bold";
        applyDarkMode();
    }
    else{
        darkMode.style.backgroundColor = "transparent";
        darkMode.style.font = "normal";
        applyLightMode();
    }
});

//Bad code done quickly 
if(isSettingActive("DarkMode")){
    is_darkmode = true;
    darkMode.style.backgroundColor = "gray";
    applyDarkMode();
}
else{
    darkMode.style.backgroundColor = "transparent";
    is_darkmode = false;
    applyLightMode();
}

//-------------------

//--------------------

function cacheOriginalStyles() {
    document.querySelectorAll("*").forEach(el => {
        if (!el.hasAttribute("data-orig-color")) {
            el.setAttribute("data-orig-color", el.style.color || "");
            el.setAttribute("data-orig-bg", el.style.backgroundColor || "");
            el.setAttribute("data-orig-border", el.style.border || "");
        }
    });
}

function applyColorblindness(){
    cacheOriginalStyles();
    document.querySelectorAll("*").forEach(el => {
        el.style.color = "lime";
        el.style.backgroundColor = "black";
        el.style.border = "1px solid green";
    });
}

function applyNormal() {
    document.querySelectorAll("*").forEach(el => {
        el.style.color = el.getAttribute("data-orig-color") || "";
        el.style.backgroundColor = el.getAttribute("data-orig-bg") || "";
        el.style.border = el.getAttribute("data-orig-border") || "";
    });
}


//Lazy solution
const colorBlind = document.getElementById("Colorblindness");
var is_colorblind = false;
document.getElementById("Colorblindness").addEventListener("click", function(event) {
    console.log("Darkmode button pressed");

    if(isSettingActive("DarkMode")){
        is_colorblind = false;
        colorBlind.style.backgroundColor = "transparent";
        colorBlind.style.font = "normal";
        applyNormal();
        warning_slider("DarkMode");
        return;
    }

    is_colorblind = !is_colorblind;
    if(is_colorblind){
        colorBlind.style.backgroundColor = "transparent";
        colorBlind.style.font = "bold";
        applyColorblindness();
    }
    else{
        colorBlind.style.backgroundColor = "transparent";
        colorBlind.style.font = "normal";
        applyNormal();
    }
});

//Bad code done quickly 
if(isSettingActive("Colorblindness")){
    is_darkmode = true;
    colorBlind.style.backgroundColor = "gray";
    applyDarkMode();
}
else{
    colorBlind.style.backgroundColor = "transparent";
    is_darkmode = false;
    applyLightMode();
}


//----------------

function createWarningWindow() {
    if (document.getElementById("warning_window")) return;

    const warningWindow = document.createElement("div");
    warningWindow.id = "warning_window";
    warningWindow.title = "Warning window";
    warningWindow.style.display = "none";

    const title = document.createElement("h2");
    title.id = "warning_title";
    title.textContent = "Title";

    const description = document.createElement("p");
    description.id = "warning_description";
    description.textContent = "Description...";

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttons";

    const closeButton = document.createElement("button");
    closeButton.id = "close_button";
    closeButton.textContent = "Close";
    closeButton.onclick = () => {
        warningWindow.style.display = "none";
    };

    const acceptButton = document.createElement("button");
    acceptButton.id = "accept_button";
    acceptButton.textContent = "Accept";
    acceptButton.onclick = () => {
        applySettings();
        automaticSettings();
        warningWindow.style.display = "none";
    };

    buttonContainer.appendChild(closeButton);
    buttonContainer.appendChild(acceptButton);

    warningWindow.appendChild(title);
    warningWindow.appendChild(description);
    warningWindow.appendChild(buttonContainer);

    document.body.prepend(warningWindow);
}

// Animate warning box and display reason
function warning_slider(arg) {
    createWarningWindow();
    playSound("pling");

    const elem = document.getElementById("warning_window");
    switch (arg) {
        case "Setting limit":
            document.getElementById("warning_title").innerHTML = "Setting limit reached!";
            document.getElementById("warning_description").innerHTML = "You have reached the maximum amount of settings you may have.";
            break;
        case "Internal error":
            document.getElementById("warning_title").innerHTML = "Internal error";
            document.getElementById("warning_description").innerHTML = "An internal error has occurred, please try again.";
            break;
        case "Social limit":
            document.getElementById("warning_title").innerHTML = "Social limit reached!";
            document.getElementById("warning_description").innerHTML = "You have reached the maximum amount of social media you may have.";
            break;
        case "Stock limit":
            document.getElementById("warning_title").innerHTML = "Stock limit reached!";
            document.getElementById("warning_description").innerHTML = "You have reached the maximum amount of stocks you may have.";
            break;
        case "Colorblindness":
            document.getElementById("warning_title").innerHTML = "Colorblindness/DarkMode conflict";
            document.getElementById("warning_description").innerHTML = "Cant enable DarkMode and Colorblindness at the same time.";
            break;
        default:
            document.getElementById("warning_title").innerHTML = "Unknown warning";
            document.getElementById("warning_description").innerHTML = "Something unexpected occurred.";
    }

    let pos = -200;
    elem.style.top = pos + "px";
    elem.style.display = "grid";

    const id = setInterval(() => {
        if (pos >= 0) {
            clearInterval(id);
        } else {
            pos += 10;
            elem.style.top = pos + "px";
        }
    }, 10);
    //Scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Test use
document.addEventListener("keydown", function(event) {
    if (event.key === "t") {
        console.log("Test button pressed");
        warning_slider("Setting limit");
    }
})

// automatic setting
function automaticSettings() {
    if (isSettingActive("DarkMode")) {
        is_darkmode = true;
        darkMode.style.backgroundColor = "gray";
        applyDarkMode();
    } else {
        is_darkmode = false;
        darkMode.style.backgroundColor = "transparent";
        applyLightMode();
    }

    if (isSettingActive("Colorblindness") && !is_darkmode) {
        is_colorblind = true;
        applyColorblindness();
    } else {
        is_colorblind = false;
        applyNormal();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, applying automatic settings");
    automaticSettings();
});