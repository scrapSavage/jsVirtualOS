let canvas
let context
let image
let x_resolution=512
let y_resolution=384
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
"060c0c0c0c0c0600"+ // (
"6030303030306000"+ // )
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
"183c660000000000"+ // ^
"00000000000000FF"+ // _
"0804000000000000"+ // `

"00003c063e663e00"+ // a
"0060607c66667c00"+ // b
"00003c6060603c00"+ // c
"0006063e66663e00"+ // d
"00003c667e603c00"+ // e
"001e307c30303000"+ // f
"00003e66663e067c"+ // g
"0060607c66666600"+ // h
"0018003818183c00"+ // i
"000600060606061c"+ // j
"0060606c786c6600"+ // k
"0038181818183c00"+ // l
"0000667f7f6b6300"+ // m
"00007c6666666600"+ // n
"00003c6666663c00"+ // o
"00007c66667c6060"+ // p
"00003e66663e0606"+ // q
"00007c6660606000"+ // r
"00003e603c067c00"+ // s
"00187e1818180e00"+ // t
"0000666666663e00"+ // u
"00006666663c1800"+ // v
"0000636b7f3e3600"+ // w
"0000663c183c6600"+ // x
"00006666663e0c78"+ // y
"00007e0c18307e00"+ // z

"060c0c180c0c0600"+ // {
"1818181818181800"+ // |
"6030301830306000"+ // }
"727e5c0000000000"+ // ~

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

function line(x1, y1, x2, y2,col) {
    let x, y, xe, ye
    let dx = x2 - x1
    let dy = y2 - y1
    let dx1 = Math.abs(dx)
    let dy1 = Math.abs(dy)
    let px = 2 * dy1 - dx1
    let py = 2 * dx1 - dy1
    if (dy1 <= dx1) {
        if (dx >= 0) {
            x = x1; y = y1; xe = x2;
        } else {
            x = x2; y = y2; xe = x1;
        }
        pset(x, y, col)
        for (let i = 0; x < xe; i++) {
            x+=1;
            if (px < 0) {
                px = px + 2 * dy1;
            } else {
                if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                    y+=1
                } else {
                    y-=1
                }
                px = px + 2 * (dy1 - dx1)
            }
            pset(x, y, col)
        }
    } else {
        if (dy >= 0) {
            x = x1
            y = y1
            ye = y2
        } else {
            x = x2
            y = y2
            ye = y1
        }
        pset(x, y, col)
        for (i = 0; y < ye; i++) {
            y+=1
            if (py <= 0) {
                py+=2 * dx1
            } else {
                if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                    x+=1
                } else {
                    x-=1
                }
                py+=2*(dx1 - dy1)
            }
            pset(x, y, col);
        }
    }
 }

function render_screen() {
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
    context.drawImage(image, canvas.width, canvas.height)
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
printString("Due to web broswer autoplay policies you must click".toUpperCase(),8,8,1,0)
printString("the display to finish the initialization process".toUpperCase(),8,16,1,0)
printString("potential volume warning!!!".toUpperCase(),8,64,10,2)
render_screen()
init_audio()
}

function get_canvas_data() {
    return {canvas:canvas, context:context, x_resolution:x_resolution, y_resolution:y_resolution}
}