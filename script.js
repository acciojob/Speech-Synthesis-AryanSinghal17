const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// Load voices
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

// Speak
function speak() {
  if (!msg.text.trim()) return;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

// Stop
function stop() {
  speechSynthesis.cancel();
}

// Change voice
function setVoice() {
  msg.voice = voices.find(
    voice => voice.name === this.value
  );

  speak();
}

// Change rate, pitch, text
function setOption() {
  msg[this.name] = this.value;

  // Apply changes immediately
  if (speechSynthesis.speaking) {
    speak();
  }
}

// Initial voice load
populateVoices();

// Some browsers load voices asynchronously
speechSynthesis.onvoiceschanged = populateVoices;

// Events
voicesDropdown.addEventListener('change', setVoice);

options.forEach(option =>
  option.addEventListener('input', setOption)
);

speakButton.addEventListener('click', speak);

stopButton.addEventListener('click', stop);