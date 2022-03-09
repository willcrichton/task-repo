let play = false;
const W = 640, H = 640;
const t = document.getElementById('t');
console.log('c', t)
t.height = W;
t.width = H;
const gt = t.getContext('2d');
const enumC = {
    GREEN: 0,
    RED: 1,
    PURPLE: 2,
    YELLOW: 3
}
const sh = {
    'z': [[0, -1], [0, 0], [-1, 0], [-1, 1]],
    's': [[0, -1], [0, 0], [1, 0], [1, 1]],
    'i': [[0, -1], [0, 0], [0, 1], [0, 2]],
    't': [[-1, 0], [0, 0], [1, 0], [0, 1]],
    'sq': [[0, 0], [1, 0], [0, 1], [1, 1]],
    'l': [[-1, -1], [0, -1], [0, 0], [0, 1]],
    'j': [[1, -1], [0, -1], [0, 0], [0, 1]] 
};
const ds = {
    'left': [-1, 0],
    'right': [1, 0],
    'down': [0, 1]
}
var fallingShape; 
var fallingShapeRow;
var fallingShapeCol;
let falling = false;
let col = 0;
var keyDown = false;
var fastDown = false;
let grid = new Grid();
let cd = 'down';

const draw = () => {
    gt.clearRect(0, 0, W, H);
    if(!play) {
        gt.font = '30px Arial';
        gt.fillStyle = 'purple';
        gt.textAlign = 'center';
        gt.fillText('Play Tetris - press Enter to Start', 320, 320);
    }
    else {
        animate();
    }
}

const getRandomShape = () => {
    const k = Object.keys(enumC)
    return enumC[k[Math.floor(Math.random() * k.length)]];
}

const getRandomColor = () => {
    const k = Object.keys(sh)
    return sh[k[Math.floor(Math.random() * k.length)]];
}

const moveShape = () => {
    fallingShape = getRandomShape();
    col = getRandomColor();
    while(falling) {
        fallingShape.forEach(f => new Square(fallingShapeCol + f[0], fallingShapeRow + f[1], 30).draw(gt, col));
        if(checkBlockCollision()) {
            fallingShape.forEach(f => new Square(fallingShapeCol + cd[0], fallingShapeRow + cd[1], 30).draw(gt, col))
            fallingShapeCol += cd[0];
            fallingShapeRow += cd[1];
        }
    }
}

const checkBlockCollision = () => {
    return fallingShape.every(s => {
        let c = fallingShapeCol + ds[cd][0] + s[0]
        let r = fallingShapeRow + ds[cd][1] + s[1]
        return grid[r][c] !== -1;
    });
}

const clear = () => {
    gt.fillStyle = 'white';
    gt.clearRect(0, 0, 640, 640);
    new Square(0, 0, 640, 640);
}

const animate = () => {
    let req = window.requestAnimationFrame(animate);
    if(play) {
        moveShape();
    }
}

const init = () => {
    clear();
    grid = new Grid();
    draw();
}


const sg = () => {
    init();
}

t.addEventListener('keydown', (e) => {
    const { key } = e;
    console.log('e', e);
    switch(key) {
        case 'Enter':
            if(!play) {
                play = true;
                sg();
            }
            break;
        case 's':
        case 'ArrowDown':
            cd = ds['down'];
            break;
        case 'w':
        case 'ArrowUp':
            rotate();
            break;
        case 'a':
        case 'ArrowLeft':
            cd = ds['left'];
            break;
        case 'd':
        case 'ArrowRight':
            cd = ds['right']
            break;
        }
});

init();