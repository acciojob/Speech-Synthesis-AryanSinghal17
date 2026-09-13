const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// Populate voice dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voicesDropdown.innerHTML = voices
    .map(
      voice =>
        `<option value="${voice.name}">
          ${voice.name} (${voice.lang})
        </option>`
    )
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(
    voice => voice.name === this.value
  );
}

// Update rate, pitch, text
function setOption() {
  msg[this.name] = this.value;
}

// Speak text
function speak() {
  if (!msg.text.trim()) return;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

// Stop speech
function stop() {
  speechSynthesis.cancel();
}

// Load voices
populateVoices();
speechSynthesis.onvoiceschanged = populateVoices;

// Events
voicesDropdown.addEventListener('change', setVoice);

options.forEach(option =>
  option.addEventListener('change', setOption)
);

speakButton.addEventListener('click', speak);

stopButton.addEventListener('click', stop);