const msg = new SpeechSynthesisUtterance();

const voicesDropdown = document.querySelector("#voices");
const options = document.querySelectorAll('[type="range"]');
const text = document.querySelector("textarea");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

let voices = [];

function populateVoices() {
  voices = this.getVoices();

  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">
          ${voice.name} (${voice.lang})
        </option>`
    )
    .join("");
}

function setVoice() {
  msg.voice = voices.find(
    (voice) => voice.name === this.value
  );

  // restart speech with new voice
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();

  if (startOver) {
    // read current textarea value
    msg.text = text.value;
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  msg[this.name] = this.value;

  // restart speech with updated rate/pitch
  toggle();
}

// Initial call
populateVoices();

speechSynthesis.addEventListener(
  "voiceschanged",
  populateVoices
);

voicesDropdown.addEventListener(
  "change",
  setVoice
);

options.forEach((option) =>
  option.addEventListener("change", setOption)
);

speakButton.addEventListener("click", () =>
  toggle()
);

stopButton.addEventListener("click", () =>
  toggle(false)
);