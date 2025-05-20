//sound.js

console.log("Sound is working");
//Load all sound effects 

const soundMap = {};

function playSound(sound_name){
    const sound = new Audio("Sound/" + sound_name + ".mp3");
    soundMap[sound_name] = sound;
    sound.play();
}
//https://stackoverflow.com/questions/53987982/why-does-audio-not-play-in-javascript
function stopSound(sound_name){
    const sound = soundMap[sound_name];
    if(sound){
        sound.pause();
        sound.currentTime = 0;
        delete soundMap[sound_name];
    }
}

//CHATGPT
function killAudio(){
    for (const key in soundMap) {
        const sound = soundMap[key];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
        delete soundMap[key];
    }
}