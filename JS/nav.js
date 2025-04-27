console.log("Nav is working");

// May be changed
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

function addSelected(id) {
    const selected = getSelected();
    if (!selected.includes(id)) { // Prevent duplicates
        selected.push(id);
        localStorage.setItem("Selected", JSON.stringify(selected));
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

function toggleSelection(el) {
    const id = el.id;
    const selected = getSelected();

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

// Handle stocks with a limit
document.querySelectorAll(".stock").forEach((el, index) => {
    if (index < stock_option_limit) {
        el.addEventListener("click", (event) => {
            const selected = getSelected();
            if (!selected.includes(el.id) && selected.length >= stock_option_limit) {
                console.log("Stock option limit reached!");
                return; // Prevent selecting more than limit
            }
            toggleSelection(el);
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
}

// Clear selected items visually (optional, you may call this when needed)
function clearSelectedItems() {
    const ids = getSelected();
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

getNavAttributes();
loadSelectedItems();
