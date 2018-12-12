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
        .map(
            voice =>
                `<option value="${voice.name}">${voice.name} (${
                    voice.lang
                })</option>`
        )
        .join(""); // append all available voices in dropdown menu
    voicesDropdown.innerHTML = voiceOptions;
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
