// qualities for this code to include:
// - confusing/hard to parse variable names
// - separate code fragments
// - ambiguous error codes that they cannot easily figure out
// - uneditable files that they need to understand
// - unhelpful or nonexistant comments
let f = false
let start;
const c = document.getElementById('c');
c.width = 640;
c.height = 640;
let point = 0;
const g = c.getContext('2d');
let d = 'up';
let dx = 10, dy = 10;
let food = { x: getRandomArbitrary(1, 640), y: getRandomArbitrary(1, 640) };
let s = [{ x: 320, y: 320 }];

const MOVE = { 
    'up': (pos) => { return { x: pos.x, y: pos.y - dy } }, 
    'down': (pos) => { return { x: pos.x, y: pos.y + dy } },
    'left': (pos) => { return { x: pos.x - dx, y: pos.y } },
    'right': (pos) => { return { x: pos.x + dx, y: pos.y } }
}


const generateFood = () => {
    const { x, y } = drawFood();
    food = { x, y };
}

const drawFood = () => {
    const pos = { x: Math.floor(getRandomArbitrary(10, 640)), y: Math.floor(getRandomArbitrary(10, 640)) };
    new Circle(pos.x, pos.y, 10).draw(g);
    return pos;
}

const drawSnake = () => {
    s.forEach(r => new Rectangle(r.x, r.y, 10, 10).draw(g));
}

const checkIfLegalMove = (s) => {
    return s.every(pos => pos.x > 0 && pos.x < 640 && pos.y > 0 && pos.y < 640);
}

const moveSnake = (timestamp) => {
    if(!f) {
        return;
    }
    if(!start) {
        start = timestamp;
    }
    clearScreen();
    const oldS = s;
    s = s.map((p, i) => {
        return i === 0 ? MOVE[d](p) : oldS[i - 1];
    });
    const legal = checkIfLegalMove(s);
    const id = legal && f && window.requestAnimationFrame(moveSnake);
    new Circle(food.x, food.y, 10).draw(g);
    if(!legal) {
        drawSnake();
        gameOver();
        return;
    }
    if(checkFoodCollision()) {
        generateFood();
        const endOfSnake = s[s.length - 1];
        switch(d) {
            case 'up':
                s.push({ x: endOfSnake.x, y: endOfSnake.y - dy });
                break;
            case 'down':
                s.push({ x: endOfSnake.x, y: endOfSnake.y + dy });
                break;
            case 'left':
                s.push({ x: endOfSnake.x + dx, y: endOfSnake.y });
                break;
            case 'right':
                s.push({ x: endOfSnake.x - dx, y: endOfSnake.y });
                break;
        }
        point += 50;
    }
    drawSnake();
    
}

const clearScreen = () => {
    g.fillStyle = 'white';
    g.clearRect(0, 0, 640, 640);
    new Rectangle(0, 0, 640, 640);
}

const intro = () => {
    clearScreen();
    g.font = '30px Arial';
    g.fillStyle = 'purple';
    g.textAlign = 'center';
    g.fillText('Play Snake - press Space to Start', 320, 320);
}

const startGame = () => {
    if(f) {
        s = [{ x: 320, y: 320 }];
        d = 'up';
        clearScreen();
        generateFood();
        moveSnake();
    }
}

const gameOver = () => {
    clearScreen();
    f = false;
    g.font = '30px Arial';
    g.fillStyle = 'purple';
    g.textAlign = 'center';
    g.fillText(`Game over! You earned ${point} points.`, 320, 320);
    g.fillText(`Press Space to play again.`, 320, 360);
    setTimeout(() => { 
        if(!f) {
            clearScreen();
            intro();
        }
    }, 10000);
}

const checkFoodCollision = () => {
    return ((food.x - Math.floor( 5 * Math.PI) < s[0].x ) && (food.x + Math.floor( 5 * Math.PI)) > s[0].x) && 
    ((food.y - Math.floor( 5 * Math.PI) < s[0].y ) && (food.y + Math.floor( 5 * Math.PI)) > s[0].y)
}

window.addEventListener('keydown', (e) => {
    const { key } = e;
    switch(key) {
        case ' ':
            e.preventDefault();
            if(!f) {
                f = true;
                startGame();
            }
            break;
        case 's':
        case 'ArrowDown':
            if(d === 'up' && s.length > 1) {
                gameOver();
                return;
            }
            d = 'down';
            break;
        case 'w':
        case 'ArrowUp':
            if(d === 'down' && s.length > 1) {
                gameOver();
                return;
            }
            d = 'up';
            break;
        case 'a':
        case 'ArrowLeft':
            if(d === 'right' && s.length > 1) {
                gameOver();
                return;
            }
            d = 'left';
            break;
        case 'd':
        case 'ArrowRight':
            if(d === 'left' && s.length > 1) {
                gameOver();
                return;
            }
            d = 'right';
            break;
    }
});

intro();