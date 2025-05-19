//settings.js

console.log("Settings is working");

const settings = JSON.parse(localStorage.getItem("Settings")) || [];

const setting_names = ["Darkmode", "Socials", "Colorblindness", "Language"];
const setting_id_names = ["Darkmode, Socials, Colorblindness", "Language"];

function isSettingActive(setting){
    if(setting.includes(setting_id_names)){
        const selected = getSelected(); //nav.js
        return selected.includes(setting);
    }
    else if(document.getElementById(setting).includes(setting_id_names)){
        const selected = getSelected(); //nav.js
        return selected.includes(setting);
    }
    else{
        return false;
    }
}

//Apply settings
function applySettings(){
    if(isSettingActive("Darkmode")){
        applyDarkMode();
    }
    else{
        applyLightMode();
    }

    if(isSettingActive("Socials")){
        loadSocialMedia();
    }

    if(isSettingActive("Colorblindness")){
        applyColorblindness();
    }
    if(isSettingActive("Language")){
        applyLanguage();
    }
}

//3 social medias are required
const socialReq = 3;
const social_default = ["Twitter", "Reddit", "4Chan"];
const applied_socials = [];

//Load in the proper socials
function loadSocialMedia(){
    const socials = getSettingAttribute("Socials");
    if(socials.length < socialReq && applied_socials.length == socialReq){
       forEach(el => {
           loadSocialInGraph(el);
       }) 
    }
    else {

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
document.getElementById("Darkmode").addEventListener("click", function(event) {
    if(is_colorblind){
        warning_slider("Colorblindness");
        return;
    }
    is_darkmode = !is_darkmode;
    if(is_darkmode){
        applyDarkMode();
    }
    else{
        applyLightMode();
    }
});

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
var is_colorblind = false;
document.getElementById("Colorblindness").addEventListener("click", function(event) {  
    if(is_darkmode){
        warning_slider("Colorblindness");
        return;
    }
    if(is_colorblind){
        is_colorblind = false;
        applyNormal();
    }
    else{
        is_colorblind = true;
        applyColorblindness();
    }
});

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
