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
        localStorage.setItem("SelectedUI", JSON.stringify([]));
        return [];
    }
    return JSON.parse(selected);}

function addSelected(id) {
    const selected = getSelected();
    if (!selected.includes(id)) {
        selected.push(id);
        localStorage.setItem("Selected", JSON.stringify(selected));
    }
}

function addUISelected(id){
    const selected = getSelectedUI();
    if (!selected.includes(id)) {
        selected.push(id);
        localStorage.setItem("SelectedUI", JSON.stringify(selected));
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
 function removeUISelected(id){
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

    // Mark the clicked element
    el.style.backgroundColor = "red";
    el.style.fontWeight = "bold";
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
    console.log("Loading selected items:", ids);

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            console.log("Styling element:", id, el);
            el.style.backgroundColor = "gray";
            el.style.fontWeight = "bold";
        } else {
            console.warn("Element not found for id:", id);
        }
    });
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
    const ids = getSelectedUI();
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.backgroundColor = "transparent";
            el.style.fontWeight = "normal";
        }
    });
}

// Handle Ctrl+C to clear selected (unfinished)
document.addEventListener('keydown', function(event) {
    console.log('Key pressed: ' + event.key);
    if (event.ctrlKey && event.key === 'c') {
        localStorage.setItem("Selected", JSON.stringify([]));
        document.querySelectorAll(".stock, .setting").forEach(el => {
            el.style.backgroundColor = "transparent";
            el.style.fontWeight = "normal";
        });
        console.log("Selection cleared!");
    }
});

//Get the stock that is being selected from the element
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


//Fix this function, the id css should have red
function getCurrentStockUI() {
    const selected = getSelected();
    const uiStocks = [];

    selected.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.style.backgroundColor === "red") {
            uiStocks.push(el.textContent.trim());
        }
    });

    return uiStocks;
}

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

//Update cycle for how fast the nav stocks update
function updateCycle(){

}

getNavAttributes();
loadSelectedItems();
updateCycle(); //Test update cycle
