// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// Get voices and populate dropdown
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

  speak();
}

// Speak / Stop
function speak() {
  if (!msg.text.trim()) return;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function stop() {
  speechSynthesis.cancel();
}

// Update text, pitch, rate
function setOption() {
  msg[this.name] = this.value;

  if (speechSynthesis.speaking) {
    speak();
  }
}

// Events
speechSynthesis.addEventListener(
  "voiceschanged",
  populateVoices
);

voicesDropdown.addEventListener(
  "change",
  setVoice
);

speakButton.addEventListener(
  "click",
  speak
);

stopButton.addEventListener(
  "click",
  stop
);

options.forEach(option =>
  option.addEventListener(
    "change",
    setOption
  )
);