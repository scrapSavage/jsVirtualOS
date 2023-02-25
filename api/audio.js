let audio_context



let a = false

function init_audio() {
    canvas.addEventListener("click", () => { if (a==false) { foo() }});
}

function foo() {
    a = true
    audio_context = new AudioContext()

    let osc = audio_context.createOscillator();
    let gain = audio_context.createGain();
    osc.type = "triangle"
    gain.gain.value = 0.02
    osc.frequency.value = 50;
    osc.connect(audio_context.destination)
    osc.connect(gain)
    gain.connect(audio_context.destination)
    osc.start(0)

    init()
}