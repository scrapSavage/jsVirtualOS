let mouse = {x:0,y:0}
function init() {
  canvas.addEventListener("mousemove",(e) => {
	let rect = canvas.getBoundingClientRect()
	mouse.x = (e.clientX-rect.left)/canvas.offsetWidth*x_resolution
	mouse.y = (e.clientY-rect.top)/canvas.offsetHeight*y_resolution
  })
  draw()
}
function draw() {
clip()
//clear screen
for (let i=0;i<x_resolution;++i) {
	for	(let b=0;b<y_resolution;++b) {
		pset(i,b,0)
	}
}

printString("\n The boot sequence has completed.\n\n Soon you'll be able to use this as a kernal and file viewer\n but right now the front end is just this.",0,0,1,0)

if (Object.keys(filesystem.get_all_files()).length != 0) {
	printString("\n\n\n\n\n\n You currently have "+Object.keys(filesystem.get_all_files()).length+" files\n How'd you manage that?",0,0,4,0)
	for (let i=0; i<Object.keys(filesystem.get_all_files()).length; ++i) {
		printString(Object.keys(filesystem.get_all_files())[i],8,72+i*8,14,0)
	}
}

line(mouse.x,mouse.y,mouse.x+8,mouse.y+8,1)
line(mouse.x,mouse.y,mouse.x+4,mouse.y,1)
line(mouse.x,mouse.y,mouse.x,mouse.y+4,1)

render_screen()
requestAnimationFrame(draw)
}

window.addEventListener('load', init_graphics);