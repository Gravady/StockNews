console.log("Nav is working");

//May be changed
const stock_option_limit = 5;

function getNavAttributes(){
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

function addSelected(id){
    const selected = getSelected();
    selected.push(id);
    localStorage.setItem("Selected", JSON.stringify(selected));
}

//Add selected id on click, remove if click again
document.querySelectorAll(".stock").forEach((el, index) =>{
    if(index < stock_option_limit){
        el.addEventListener("click", () => {
            const clicked = event.target;
            if(clicked.style.backgroundColor != "gray"){
                console.log("ID:", clicked.id);
                addSelected(clicked.id);
            }
            else{
                removeSelected(clicked.id);
            }
        })
    } 
})

document.querySelectorAll(".setting").forEach(el => {
    el.addEventListener("click", () => {
        const clicked = event.target;
        console.log("ID:", clicked.id);
        addSelected(clicked.id);
    });
})

//Function to load and disband selected items
function loadSelectedItems(){
    ids = getSelected();
    ids.forEach(el => {
        document.getElementById(el).style.backgroundColor = "gray";
        document.createAttribute(el).style.font_weight = "bold";
    })
}

function clearSelectedItems(){
    ids = getSelected();
    ids.forEach(el => {
        document.getElementById(el).style.backgroundColor = "transparent";
        document.createAttribute(el).style.font_weight = "normal";
    })
}

//Clear items with Ctrl+C, fix this
document.addEventListener('keydown', function(event) {
    console.log('Key pressed: ' + event.key);
});

function removeSelected(id){
    const selected = getSelected();
    const index = selected.indexOf(id);
    selected.splice(index, 1);
    localStorage.setItem("Selected", JSON.stringify(selected));
}

getNavAttributes();
loadSelectedItems();