const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices(); // populate voices array with pre-defined voices from the speech API
    const voiceOptions = voices
        .filter(voice => voice.lang.includes("en"))
        .map(
            voice =>
                `<option value="${voice.name}">${voice.name} (${
                    voice.lang
                })</option>`
        )
        .join(""); // append all available voices in dropdown menu
    voicesDropdown.innerHTML = voiceOptions;
}

function setVoice() {
    console.log(this.value);
    msg.voice = voices.find(voice => voice.name === this.value); //loops over the voices array and finds the corresponding object value with the voice
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    console.log(this.name, this.value); //what property will change and what has it changed into
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach(option => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false)); // run toggle function with the false argument to stop the speech
