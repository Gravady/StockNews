//nav.js

console.log("Nav is working");

const stock_option_ui_limit = 1;
const stock_option_limit = 9;

function getNavAttributes() {
    var settings = document.getElementsByClassName("setting"); 
    var stocks = document.getElementsByClassName("stock");
}

function getSelected() {
    const selected = localStorage.getItem("Selected");
    console.log("Selected items:" + selected); 
    if (!selected) {
        localStorage.setItem("Selected", JSON.stringify([]));
        console.log("No items selected");
        return [];
    }
    console.log("Getting sellected items");
    return JSON.parse(selected);
}

function getSelectedUI() {
    const selected = localStorage.getItem("SelectedUI");
    if (!selected) {
        localStorage.setItem("SelectedUI", JSON.stringify([]));
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
    else{
        return;
    }
}

function addUISelected(id) {
    const selected = getSelectedUI();
    if (!selected.includes(id)) {
        selected.push(id);
        localStorage.setItem("SelectedUI", JSON.stringify(selected));
    }
    else {
        return;
    }
}

function removeSelected(id) {
    const selected = getSelected();
    const index = selected.indexOf(id);
    if (index !== -1) {
        selected.splice(index, 1);
        localStorage.setItem("Selected", JSON.stringify(selected));
    }
}

function removeUISelected(id) {
    const selected = getSelectedUI();
    const index = selected.indexOf(id);
    if (index !== -1) {
        selected.splice(index, 1);
        localStorage.setItem("SelectedUI", JSON.stringify(selected));
    }
}

function toggleSelection(el) {
    const id = el.id;
    const selected = getSelected();
    console.log("Selected" + el);
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

//Toggle selection of the stock to be displayed in UI
function toggleUISelection(el) {
    const id = el.id;
    const selected = getSelectedUI();

    if (selected.includes(id)) {
        removeUISelected(id);
        el.style.backgroundColor = "transparent";
        el.style.fontWeight = "normal";
        return;
    }

    document.querySelectorAll(".stock").forEach(stockEl => {
        stockEl.style.backgroundColor = "transparent";
        stockEl.style.fontWeight = "normal";
    });

    localStorage.setItem("SelectedUI", JSON.stringify([id]));

    el.style.backgroundColor = "red";
    el.style.fontWeight = "bold";
}

document.querySelectorAll(".stock").forEach((el, index) => {
    if (index < stock_option_limit) {
        el.addEventListener("click", (event) => {
            console.log("Clicked");
            const selected = getSelected();
            if (!selected.includes(el.id) && selected.length -3 >= stock_option_limit) {
                console.log("Stock option limit reached!");
                return;
            }
            toggleSelection(el);
            //FIX: Fix this so that it works correctly so that if a seelcted item is clicked again and there is no UI selected
            const computedStyle = window.getComputedStyle(el);
            if(computerdStyle.backgroundColor == "gray" && (getSelectedUI().length == 0 || getSelectedUI == null)){
                console.log("Selected UI");
                toggleUISelection(el);
            }
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

function loadSelectedItems() {
    console.log("Loading selected items");
    const ids = getSelected();
    const uiSelected = getSelectedUI();

    console.log("Loading selected items:", ids);

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.backgroundColor = "gray";
            el.style.fontWeight = "bold";
        } else {
            console.warn("Element not found for id:", id);
        }
    });

    //load UI item in red
    if(uiSelected && uiSelected.length > 0){
        const el = document.getElementById(uiSelected[0]);
        el.style.backgroundColor = "red";
        el.style.fontWeight = "bold";
    }
}

// Clear selected items visually
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

function removeSelectedUI() {
    const ids = getSelectedUI();
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.backgroundColor = "transparent";
            el.style.fontWeight = "normal";
        }
    });
}

// Handle Ctrl+C to clear selected
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

// Get the text of selected elements
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

// Get the stock displayed in UI (red)
function getCurrentStockUI() {
    const selected = getSelectedUI();
    const uiStocks = [];

    selected.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.style.backgroundColor === "red") {
            uiStocks.push(el.textContent.trim());
        }
    });

    return uiStocks;
}

// Get currently selected (non-UI) stocks
function getCurrentStocks() {
    const selectedIds = getSelected();
    const stockNames = [];

    selectedIds.forEach(id => {
        const element = document.getElementById(id);
        if (element && element.style.backgroundColor !== "red") {
            stockNames.push(element.textContent.trim());
        }
    });
    return stockNames;
}

// Update cycle placeholder
function updateCycle() {

}

getNavAttributes();
loadSelectedItems();
updateCycle(); 
