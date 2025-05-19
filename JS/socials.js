//Read scroll in comment box to swtich to comment box 

function loadSocial(){
    const socials_id = document.getElementById("Socials").id;
    const selected = getSelected();
    if(!selected.includes(socials_id)){
        document.getElementById("media_items").style.display = "none";
        document.getElementById("stock_map_ui").style.width = "100%";
    }
    else{
        document.getElementById("media_items").style.display = "flex";
    }
}

document.getElementById("Socials").addEventListener("click", loadSocial);

loadSocial();