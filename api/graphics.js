let canvas
let context
let x_resolution=256
let y_resolution=192
let clip_rect={x:0,y:0,w:x_resolution,h:y_resolution}
const font =
"0000000000000000"+ // <space>
"183c3c3c18001800"+ // !
"6666440000000000"+ // "
"6666ff66ff666600"+ // #
"183e603c067c1800"+ // $
"62660c1830664600"+ // %
"3c663c3867663f00"+ // &
"1818100000000000"+ // '
"060c1818180c0600"+ // (
"6030181818306000"+ // )
"00663cff3c660000"+ // *
"0018187e18180000"+ // +
"0000000000181810"+ // ,
"0000007e00000000"+ // -
"0000000000181800"+ // .
"00060c1830600000"+ // /

"3c666e7666663c00"+ // 0
"1818381818187e00"+ // 1
"3c66060c18307e00"+ // 2
"3c66061c06663c00"+ // 3
"0c1c3cccfe0c0c00"+ // 4
"7e607c0606663c00"+ // 5
"3c66607c66663c00"+ // 6
"7e660c1818181800"+ // 7
"3c66663c66663c00"+ // 8
"3c66663e06663c00"+ // 9

"0018180018180000"+ // :
"0018180018181000"+ // ;
"0e18306030180e00"+ // <
"00007e007e000000"+ // =
"70180c060c187000"+ // >
"3c66060c18001800"+ // ?

"3c666e6e60663c00"+ // @
"183c667e66666600"+ // A
"7c66667c66667c00"+ // B
"3c66606060663c00"+ // C
"7c66666666667c00"+ // D
"7e60607860607e00"+ // E
"7e60607860606000"+ // F
"3c66606e66663c00"+ // G
"6666667e66666600"+ // H
"3c18181818183c00"+ // I
"3c18181818d87000"+ // J
"666c7870786c6600"+ // K
"6060606060607c00"+ // L
"c6eefed6c6c6c600"+ // M
"66767e7e6e666600"+ // N
"3c66666666663c00"+ // O
"7c66667c60606000"+ // P
"3c666666663c0e00"+ // Q
"7c66667c786c6600"+ // R
"3c66603c06663c00"+ // S
"7e18181818181800"+ // T
"6666666666663c00"+ // U
"66666666663c1800"+ // V
"c6c6c6d6feeec600"+ // M
"66663c183c666600"+ // X
"6666663c18181800"+ // Y
"7e060c1830607e00"+ // Z

"1e18181818181e00"+ // [
"006030180c060000"+ // \
"7818181818187800"+ // ]
""

const palette = [
 {red:0,green:0,blue:0}, // black 0
 {red:255,green:255,blue:255}, // white 1
 {red:136,green:0,blue:0}, // dark red 2 
 {red:170,green:255,blue:238}, // cyan 3
 {red:204,green:68,blue:204}, // pink 4
 {red:0,green:204,blue:85}, // dark green 5
 {red:0,green:0,blue:170}, // dark blue 6 
 {red:238,green:238,blue:119}, // yellow 7
 {red:221,green:136,blue:85}, // orange 8
 {red:102,green:64,blue:0}, // brown 9
 {red:255,green:119,blue:119}, // salmon 10
 {red:51,green:51,blue:51}, // dark gray 11
 {red:119,green:119,blue:119}, // dim gray 12
 {red:170,green:255,blue:102}, // lime 13
 {red:0,green:136,blue:255}, // blue 14
 {red:187,green:187,blue:187}, // light gray 15
]
const screen = []

function pset(x,y,col) {
	if (~~x>=clip_rect.x+clip_rect.w|~~y>=clip_rect.y+clip_rect.h|~~x<clip_rect.x|~~y<clip_rect.y|col>palette.length) { return }
	screen[~~x][~~y]=~~col
}

function printChar(char,x,y,col,bg) {
	let charcode = char.charCodeAt(0)-32
	let chardata = font.substring(charcode*16,(charcode+1)*16)
	for (let _y=0;_y<16;_y+=2) {
		let row_data = String(hex_to_bin(chardata.substring(_y,_y+2)))
		for (let _x=0;_x<8;_x+=1) {
			pset(x+_x,y+_y/2,(row_data.substring(_x,_x+1)==1)?col:bg)
		}
	}
}
function rectfill(x1,y1,x2,y2,col) {
	for (let x=0;x<x2-x1;++x) {
		for (let y=0;y<y2-y1;++y) {
			pset(x+x1,y+y1,col)
		}
	}

}
function printString(string,x,y,col,bg) {
	for (let i=0;i<string.length;++i) {
		printChar(string.substring(i,i+1),x+i*8,y,col,bg)
	}
}

function render_screen(image, canvas, context) {
	let image_data = context.getImageData(0,0,x_resolution,y_resolution)
	let data = image_data.data
	for (let x=0; x<screen.length;  ++x) {
  		for (let y=0;y<screen[0].length; ++y) {
			let color = palette[screen[x][y]]
			if (color!=null) {
			data[(x+y*x_resolution)*4]=color.red;
			data[(x+y*x_resolution)*4+1]=color.green;
			data[(x+y*x_resolution)*4+2]=color.blue;
			}
		}
  	}
  	context.putImageData(image_data, 0, 0)
}

function clip(x,y,w,h) {
	if (x==null) {
		clip_rect.x=0
		clip_rect.y=0
		clip_rect.w=x_resolution
		clip_rect.h=y_resolution
	} else {
		clip_rect.x=x
		clip_rect.y=y
		clip_rect.w=w
		clip_rect.h=h
	}
}

function init_graphics() {
canvas = document.getElementById('gfx');
canvas.width = x_resolution
canvas.height = y_resolution
context = canvas.getContext("2d", { alpha: false });
image = new Image(x_resolution, y_resolution);
for (let x=0; x<x_resolution;  ++x) {
    let column = []
    for (let y=0;y<y_resolution; ++y) {
        column[y] = 0
    }
    screen[x]=column
}
init()
}

function get_canvas_data() {
    return {canvas:canvas, context:context, x_resolution:x_resolution, y_resolution:y_resolution}
}