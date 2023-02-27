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

let segments = 32
let speed = 0.001
let size = 4
for (let i=0;i<segments;++i) {
	let offset = {x:x_resolution/2,y:y_resolution/2.5}
	let p1 = {
		x:offset.x+Math.sin(time*speed+i/segments*4)*x_resolution/16,
		y:i*8+offset.y/2+Math.cos(time*speed+i/segments*4)*y_resolution/32
	}
	let p2 = {
		x:offset.x+Math.sin(time*speed+i/segments*4+3)*x_resolution/16,
		y:i*8+offset.y/2+Math.cos(time*speed+i/segments*4+3)*y_resolution/32
	}
	line(p1.x,p1.y,p2.x,p2.y,7)
	rectfill(p1.x-size/2,p1.y-size/2,p1.x+size/2,p1.y+size/2,2)
	rectfill(p2.x-size/2,p2.y-size/2,p2.x+size/2,p2.y+size/2,14)
}
printString(" !\"#$%\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`",0,0,1,12)
printString("abcdefghijklmnopqrstuvwxyz{|}~",0,8,1,12)

line(mouse.x,mouse.y,mouse.x+8,mouse.y+8,1)
line(mouse.x,mouse.y,mouse.x+4,mouse.y,1)
line(mouse.x,mouse.y,mouse.x,mouse.y+4,1)

last_time = this_time;
render_screen()
requestAnimationFrame(draw)
}

window.addEventListener('load', init_graphics);