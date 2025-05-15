console.log("Settings is working");

const settings = JSON.parse(localStorage.getItem("Settings")) || [];

//Get setting attribute name
function getSettingAttribute(name){
   settings.forEach(el => {
        if(el[name] != undefined){
            return el[name];
        }
   }); 
   console.error("Setting not found");
   return null;
}

//See if setting is active
function isSettingActive(name){
    const el = getSettingAttribute(name);
    if(!el){
        console.error("ELement not found: ", name);
        return false;
    } 

    const color = window.getComputedStyle(el).backgroundColor;
    if (color === "rgb(128, 128, 128)" || color === "gray") {
        return true;
    } else if (color === "transparent" || color === "rgba(0, 0, 0, 0)") {
        return false;
    }
    return false; 
}

//Apply settings
function applySettings(){
    if(isSettingActive("Darkmode")){
        applyDarkMode();
    }
    else{
        applyLightMode();
    }
}


function applyLightMode(){
    document.body.style.filter = "invert(0)";
}

function applyDarkMode(){
    document.body.style.filter = "invert(1)";
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
    plingSound();

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
