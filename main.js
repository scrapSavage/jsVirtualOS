let mouse = {x:x_resolution/2,y:y_resolution/2}
let lines = [" This commit is not finished,"," I need sleep",""," Feel free to play with the buggy commands though"]
let current_entry = ""
let cwd = ""
let debug_current_directory
let line_colors = [7,7,1,8]
let scroll = 0
let scroll_v = 0
function init() {
	debug_current_directory = filesystem.files
  canvas.addEventListener("mousemove",(e) => {
	let rect = canvas.getBoundingClientRect()
	mouse.x = (e.clientX-rect.left)/canvas.offsetWidth*x_resolution
	mouse.y = (e.clientY-rect.top)/canvas.offsetHeight*y_resolution
  })
  canvas.addEventListener("keydown", (e) => {
	if (e.key.length == 1) {
	current_entry=current_entry+e.key
	} if (e.key == "Backspace") {
		current_entry=current_entry.substring(0,current_entry.length-1)
	} if (e.key == "Enter") {
		lines[lines.length]=current_entry
		line_colors[line_colors.length]=1
		lines[lines.length]=""
		line_colors[line_colors.length]=1
		exec(current_entry.trim())
		current_entry=""
	}
  })
  draw()
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function exec(command) {
	if (command=="ls") {
		for (let i=0; i<debug_current_directory.content.length; ++i) {
			lines[lines.length]=debug_current_directory.content[i].name
			line_colors[line_colors.length]=5
		}
	} else if (command.startsWith("cd ")) {
		let match
		for (let i=0; i<debug_current_directory.content.length; ++i) {
			if ((debug_current_directory.content[i].name != command.substring(3).trim()) && debug_current_directory.content[i].type == "folder") {
				match = debug_current_directory.content[i]
				console.log(debug_current_directory.content[i].name)
			}
		}
		if (match) {
			lines[lines.length]="Directory "+command.substring(3).trim()+" does not exist."
			line_colors[line_colors.length]=2
		} else {
			debug_current_directory = match
		}
	} else if (command=="clear") {
		lines = []
		line_colors = []
	}
}


let frames = 0
function draw() {
clip()
//clear screen
for (let i=0;i<x_resolution;++i) {
	for	(let b=0;b<y_resolution;++b) {
		pset(i,b,0)
	}
}
if (mouse.y>y_resolution-32) {
	scroll_v = -4
} else {
	if (mouse.y<32) {
		scroll_v = 4
	}
}
scroll+=scroll_v
scroll_v=scroll_v*0.85

for (let i=0; i<lines.length; ++i) {
	printString(lines[i],0,i*8+scroll,line_colors[i],0)
}
printString(cwd+"> "+current_entry+((Math.sin(frames/8)>0)?"_":""),0,(lines.length+1)*8+scroll,1,0)

line(mouse.x,mouse.y,mouse.x+8,mouse.y+8,1)
line(mouse.x,mouse.y,mouse.x+4,mouse.y,1)
line(mouse.x,mouse.y,mouse.x,mouse.y+4,1)

render_screen()
frames+=1
requestAnimationFrame(draw)
}

window.addEventListener('load', init_graphics);