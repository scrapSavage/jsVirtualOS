let audio_context

function init_audio() {
    canvas.addEventListener("click", () => { init_filesystem() }, {once: true});
}