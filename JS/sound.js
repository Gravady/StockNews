//sound.js

console.log("Sound is working");
//Load all sound effects 
function loadSounds(){

}

function playSound(sound_name){
    const sound = new Audio("Sound/" + sound_name + ".mp3");
    sound.play();
}