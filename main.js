let mouse = {x:0,y:0}

const _time = Date.now()

function init() {
	let canvas_data = get_canvas_data()
	const canvas = canvas_data.canvas
	const context = canvas_data.context
	const x_resolution = canvas_data.x_resolution
	const y_resolution = canvas_data.y_resolution
  canvas.addEventListener("mousemove",(e) => {
	let rect = canvas.getBoundingClientRect()
	mouse.x = (e.clientX-rect.left)/canvas.offsetWidth*x_resolution
	mouse.y = (e.clientY-rect.top)/canvas.offsetHeight*y_resolution
  })
  draw()
}

function hex_to_bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(8, "0");
}

function draw() {
let time = Date.now()-_time
clip()
for (let i=0;i<x_resolution;++i) {
	for	(let b=0;b<y_resolution;++b) {
		pset(i,b,0)
	}
}
for (let i=0;i<palette.length;++i) {
	let x = x_resolution/2-Math.sin(i/palette.length*4+time/512)*Math.cos(time/512)*64
	let y = y_resolution/2-Math.cos(i/palette.length*4+time/512)*64
	rectfill(x,y,x+8,y+8,i)
}

	pset(mouse.x,mouse.y,1)
	pset(mouse.x+1,mouse.y,1)
	pset(mouse.x,mouse.y+1,1)
	pset(mouse.x+2,mouse.y,1)
	pset(mouse.x,mouse.y+2,1)
	pset(mouse.x+1,mouse.y+1,1)
	pset(mouse.x+2,mouse.y+2,15)

for (let i=0;i<32;++i) {
printChar(String.fromCharCode(64+Math.random()*32),i*8,Math.sin((time+i*32)/512)*8+16,1, 0)
render_screen(image,canvas,context)
context.drawImage(image, canvas.width, canvas.height)
}
requestAnimationFrame(draw)
}

window.addEventListener('load', init_graphics);