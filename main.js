let mouse = {x:x_resolution/2,y:y_resolution/2}
let lines = ["HELIX-16 Kernel","Type \"help\" for help."]
let current_entry = ""
let cwd = ""
let debug_current_directory
let line_colors = [1,7]
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
		lines[lines.length]=cwd.substring(0,cwd.length-1)+"> "+current_entry
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
			line_colors[line_colors.length]=(debug_current_directory.content[i].type=="folder")?14:5
		}
	} else if (command.startsWith("cd ")) {
		if (command.substring(3).trim().split("/").length!=1) {
			for (let i=0; i<command.substring(3).trim().split("/").length; ++i) {
				exec("cd "+command.substring(3).trim().split("/")[i])
			}
			return
		}
		if (command.substring(3).trim() == "..") {
			if (cwd=="") {
				lines[lines.length]="Illegal operation."
				line_colors[line_colors.length]=2
				return
			}
			let directories = cwd.split("/")
			directories.pop()
			directories.pop()
			cwd = ""
			debug_current_directory = filesystem.files
			for (let i=0; i<directories.length; ++i) {
				exec("cd "+directories[i])
			}
			return
		}
		if (command=="cd ~") {
			cwd = ""
			debug_current_directory = filesystem.files
			return
		}
		let match
		for (let i=0; i<debug_current_directory.content.length; ++i) {
			if ((debug_current_directory.content[i].name == command.substring(3).trim()) && debug_current_directory.content[i].type == "folder") {
				match = debug_current_directory.content[i]
			}
		}
		if (match) {
			cwd=cwd+match.name+"/"
			debug_current_directory = match
		} else {
			lines[lines.length]="Directory "+command.substring(3).trim()+" does not exist."
			line_colors[line_colors.length]=2
		}
	} else if (command=="clear") {
		lines = []
		line_colors = []
	} else if (command.startsWith("cat ")) {
		let file = command.substring(4).trim()
		if (filesystem.get_file_content(cwd+file)!=null) {
			lines[lines.length]="\""+filesystem.get_file_content(cwd+file)+"\""
			line_colors[line_colors.length]=12
		} else {
			lines[lines.length]="File "+command.substring(3).trim()+" does not exist."
			line_colors[line_colors.length]=2
		}
	} else if (command=="help") {
		let help = "ls\nlist items in current directory\ncd <directory name>\nchange current directory\nclear\nclear terminal entries\ncat <file name>\nread contents of file\nrm <file name>\ndeletes specified file\ntouch <file name>\ncreate a file with specified name\nwrite <file name> <new content>\noverwrite content of existing file"
		for (let i=0;i<help.split("\n").length;++i) {
			lines[lines.length]=help.split("\n")[i]
			line_colors[line_colors.length]=(i%2==0)?1:12
		}
		lines[lines.length]="Hover over the top or bottom of the screen to scroll"
		line_colors[line_colors.length]=7
	} else if (command.startsWith("rm ")) {
		let file = command.substring(3).trim()
		if (filesystem.get_file_content(cwd+file)!=null) {
			lines[lines.length]="File "+command.substring(3).trim()+" was deleted"
			line_colors[line_colors.length]=13
			filesystem.delete_file(cwd+file)
			filesystem.construct_filesystem()
			let dir = cwd
			debug_current_directory = filesystem.files
			if (dir!="") {
				exec("cd ~/"+dir)
			}
		} else {
			lines[lines.length]="File "+command.substring(3).trim()+" does not exist."
			line_colors[line_colors.length]=2
		}
	} else if (command.startsWith("echo ")) {
	
		lines[lines.length]=command.substring(5).trim()
		line_colors[line_colors.length]=1
	
	} else if (command.startsWith("touch ")) {
	
		filesystem.create_file(cwd+command.substring(6).trim(),"Type \"write "+command.substring(6).trim()+" [content]\" to edit me.")
	
		filesystem.construct_filesystem()
		let dir = cwd
		debug_current_directory = filesystem.files
		if (dir!="") {
			exec("cd ~/"+dir)
		}
	} else if (command.startsWith("write ")) {
		
		let file = command.substring(6).trim().split(" ")[0]
		let content = command.substring(6+command.substring(6).trim().split(" ")[0].length+1)
		filesystem.create_file(cwd+file,content)
		
	} else {
		lines[lines.length]="Command \""+command.trim()+"\" does not exist or was used incorrectly."
		line_colors[line_colors.length]=2
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
	scroll_v+=-1
} else {
	if (mouse.y<32) {
		scroll_v+=1
	}
}
scroll+=scroll_v
scroll_v=scroll_v*0.85

for (let i=0; i<lines.length; ++i) {
	printString(lines[i],0,i*8+scroll,line_colors[i],0)
}
printString(cwd.substring(0,cwd.length-1)+"> "+current_entry+((Math.sin(frames/8)>0)?"_":""),0,lines.length*8+scroll,1,0)

line(mouse.x,mouse.y,mouse.x+8,mouse.y+8,1)
line(mouse.x,mouse.y,mouse.x+4,mouse.y,1)
line(mouse.x,mouse.y,mouse.x,mouse.y+4,1)

render_screen()
frames+=1
requestAnimationFrame(draw)
}

window.addEventListener('load', init_graphics);