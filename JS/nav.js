//nav.js

console.log("Nav is working");

// May be changed
const stock_option_ui_limit = 1;
const stock_option_limit = 5;

function getNavAttributes() {
    var settings = document.getElementsByClassName("setting"); 
    var stocks = document.getElementsByClassName("stock");
}

function getSelected() {
    const selected = localStorage.getItem("Selected");
    if (!selected) {
        localStorage.setItem("Selected", JSON.stringify([]));
        return [];
    }
    return JSON.parse(selected);
}

function getSelectedUI(){
    const selected = localStorage.getItem("SelectedUI");
    if (!selected) {
        localStorage.setItem("SelectedUI", JSON.stringify([])); // changed null to []
        return [];
    }
    return JSON.parse(selected);
}

function addSelected(id) {
    const selected = getSelected();
    if (!selected.includes(id)) {
        selected.push(id);
        localStorage.setItem("Selected", JSON.stringify(selected));
    }
}

function setUISelected(id) {
    localStorage.setItem("SelectedUI", JSON.stringify([id])); // changed from just id to [id]
}

function removeSelected(id) {
    const selected = getSelected();
    const index = selected.indexOf(id);
    if (index !== -1) {
        selected.splice(index, 1);
        localStorage.setItem("Selected", JSON.stringify(selected));
    }
}

function clearUISelection() {
    const selectedUI = getSelectedUI();
    if (selectedUI.length > 0) {
        selectedUI.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.backgroundColor = "transparent";
                el.style.fontWeight = "normal";
            }
        });
        localStorage.setItem("SelectedUI", JSON.stringify([])); // changed null to []
    }
}

//Toggle gray selection
function toggleSelection(el) {
    const id = el.id;
    const selected = getSelected();
    console.log("Selected " + id);
    if (!selected.includes(id)) {
        addSelected(id);
        el.style.backgroundColor = "gray";
        el.style.fontWeight = "bold";
    } else {
        removeSelected(id);
        el.style.backgroundColor = "transparent";
        el.style.fontWeight = "normal";
    }
}

// Toggle selection of the stock to be displayed in UI
function toggleUISelection(el){
    const id = el.id;
    const selectedUI = getSelectedUI();

    if (selectedUI.length > 0 && selectedUI[0] === id) {
        clearUISelection();
        return;
    }

    clearUISelection(); 
    el.style.backgroundColor = "red";
    el.style.fontWeight = "bold";
    setUISelected(id);
}

// Handle stocks with a limit, only one stock selected at a time
document.querySelectorAll(".stock").forEach((el, index) => {
    if (index < stock_option_limit) {
        el.addEventListener("click", (event) => {
            const selected = getSelected();
            if (!selected.includes(el.id) && selected.length >= stock_option_limit) {
                console.log("Stock option limit reached!");
                return;
            }
            toggleSelection(el);
        });
        el.addEventListener("dblclick", (event) => {
            toggleUISelection(el);
        });
    }
});

// Handle settings (no limit)
document.querySelectorAll(".setting").forEach(el => {
    el.addEventListener("click", () => {
        toggleSelection(el);
    });
});

// Load selected items visually
function loadSelectedItems() {
    const ids = getSelected();
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.backgroundColor = "gray";
            el.style.fontWeight = "bold";
        }
    });

    const selectedUI = getSelectedUI();
    if (selectedUI.length > 0) {
        const el = document.getElementById(selectedUI[0]);
        if (el) {
            el.style.backgroundColor = "red";
            el.style.fontWeight = "bold";
        }
    }
}

// Clear selected items visually (optional, you may call this when needed)
function removeSelectedItems() {
    const ids = getSelected();
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.backgroundColor = "transparent";
            el.style.fontWeight = "normal";
        }
    });
}

function removeSelectedUI(){
    clearUISelection(); // Use new method
}

// Handle Ctrl+C to clear selected (unfinished)
document.addEventListener('keydown', function(event) {
    console.log('Key pressed: ' + event.key);
    if (event.ctrlKey && event.key === 'c') {
        localStorage.setItem("Selected", JSON.stringify([]));
        localStorage.setItem("SelectedUI", JSON.stringify([]));
        document.querySelectorAll(".stock, .setting").forEach(el => {
            el.style.backgroundColor = "transparent";
            el.style.fontWeight = "normal";
        });
        console.log("Selection cleared!");
    }
});

//Get the stock names from selected elements
function getSettingIndex() {
    const selected = getSelected();
    const names = [];
    selected.forEach(id => {
        const el = document.getElementById(id);
        if (el !== null) {
            names.push(el.textContent.trim());
        }
    });

    return names;
}

function getCurrentStockUI(){  
    const selectedUI = getSelectedUI();
    if (selectedUI.length > 0) {
        const el = document.getElementById(selectedUI[0]);
        if (el) {
            return el.textContent.trim();
        }
    }
    return null;
}

function getCurrentStocks(){
    const selected = getSelected();
    const redSelected = getSelectedUI()[0]; 
    const names = [];

    selected.forEach(id => {
        if (id !== redSelected) {
            const el = document.getElementById(id);
            if (el) {
                names.push(el.textContent.trim());
            }
        }
    });
    return names;
}

//Update cycle for how fast the nav stocks update
function updateCycle(){

}

getNavAttributes();
loadSelectedItems();
updateCycle(); //Test update cycle
