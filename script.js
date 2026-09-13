const synth = window.speechSynthesis;

const voiceSelect = document.getElementById("voices");
const text = document.getElementById("text");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");

let voices = [];
let utterance = new SpeechSynthesisUtterance();

function populateVoices() {
  voices = synth.getVoices();

  voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No voices available";
    voiceSelect.appendChild(option);
    return;
  }

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

function speak() {
  if (text.value.trim() === "") return;

  synth.cancel();

  utterance.text = text.value;
  utterance.rate = rate.value;
  utterance.pitch = pitch.value;
  utterance.voice = voices[voiceSelect.value];

  synth.speak(utterance);
}

function stopSpeech() {
  synth.cancel();
}

voiceSelect.addEventListener("change", () => {
  if (synth.speaking) {
    speak();
  }
});

rate.addEventListener("input", () => {
  if (synth.speaking) {
    speak();
  }
});

pitch.addEventListener("input", () => {
  if (synth.speaking) {
    speak();
  }
});

speakBtn.addEventListener("click", speak);
stopBtn.addEventListener("click", stopSpeech);

// Important for tests
populateVoices();
speechSynthesis.addEventListener("voiceschanged", populateVoices);