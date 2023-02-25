let mouse = {x:0,y:0}

const _time = Date.now()
let last_time=new Date()
function init() {
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
let this_time = new Date()
let fps = 1000 / (this_time - last_time);
let time = Date.now()-_time
clip()

//clear screen
for (let i=0;i<x_resolution;++i) {
	for	(let b=0;b<y_resolution;++b) {
		pset(i,b,0)
	}
}

printString("FPS: "+Math.floor(fps),0,y_resolution-8,1, 0)

let segments = 16
let speed = 0.005
for (let i=0;i<segments;++i) {
	let amount = Math.sin(time*speed+i/segments*4)
	let amount2 = Math.sin(time*speed+i/segments*4+3)
	let x = amount*64
	let x2 = amount2*64
	let y = Math.cos(time*speed+i/segments*4)*4
	let y2 = Math.cos(time*speed+i/segments*4)*4+3
	let dist = ~~Math.abs(x2-x)/8
	printString("-".repeat(Math.abs(dist-1)),x_resolution/2+4-dist*4,i*16+segments*4+y,7,0)
	printChar("+",x_resolution/2-4+x,i*16+segments*4+y,(amount>amount2)?10:2,0)
	printChar("+",x_resolution/2-4+x2,i*16+segments*4+y2,(amount<amount2)?10:2,0)
}

	pset(mouse.x,mouse.y,1)
	pset(mouse.x+1,mouse.y,1)
	pset(mouse.x,mouse.y+1,1)
	pset(mouse.x+2,mouse.y,1)
	pset(mouse.x,mouse.y+2,1)
	pset(mouse.x+1,mouse.y+1,1)
	pset(mouse.x+2,mouse.y+2,15)

last_time = this_time;
render_screen()
requestAnimationFrame(draw)
}

window.addEventListener('load', init_graphics);