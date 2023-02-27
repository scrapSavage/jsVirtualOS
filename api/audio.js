let audio_context



let a = false

function init_audio() {
    canvas.addEventListener("click", () => { if (a==false) { foo() }});
}

function foo() {
    a = true

    init()
}