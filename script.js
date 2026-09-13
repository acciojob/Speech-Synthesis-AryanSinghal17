const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

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

function speak() {
  if (!msg.text.trim()) return;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function stop() {
  speechSynthesis.cancel();
}

function setVoice() {
  msg.voice = voices.find(
    voice => voice.name === this.value
  );

  speak();
}

function setOption() {
  msg[this.name] = this.value;

  // Restart speech with new settings
  speak();
}

// Initial load
populateVoices();

// Some browsers load voices asynchronously
speechSynthesis.addEventListener(
  "voiceschanged",
  populateVoices
);

voicesDropdown.addEventListener(
  "change",
  setVoice
);

options.forEach(option =>
  option.addEventListener(
    "change",
    setOption
  )
);

speakButton.addEventListener(
  "click",
  speak
);

stopButton.addEventListener(
  "click",
  stop
);