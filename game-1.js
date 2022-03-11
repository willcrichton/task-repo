// qualities for this code to include:
// - confusing/hard to parse variable names
// - separate code fragments
// - ambiguous error codes that they cannot easily figure out
// - uneditable files that they need to understand
// - unhelpful or nonexistant comments
let f = false
let start;
// TODO: finish timing code???
const c = document.getElementById('c');
c.width = 640;
c.height = 640;
let point = 0;
const g = c.getContext('2d');
let d = 'up';
let dx = 20, dy = 20;
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

// TODO : implement Scoreboard? 
function Scoreboard() {
    this.MAXLEVEL = 9;

    var level = 0;
    var lines = 0;
    var score = 0;
    var topscore = 0;
    var gameOver = true;

    this.reset = function () {
        this.setTopscore();
        level = lines = score = 0;
        gameOver = false;
    }

    this.setGameOver = function () {
        gameOver = true;
    }

    this.isGameOver = function () {
        return gameOver;
    }

    this.setTopscore = function () {
        if (score > topscore) {
            topscore = score;
        }
    }

    this.getTopscore = function () {
        return topscore;
    }

    this.getSpeed = function () {

        switch (level) {
            case 0: return 700;
            case 1: return 600;
            case 2: return 500;
            case 3: return 400;
            case 4: return 350;
            case 5: return 300;
            case 6: return 250;
            case 7: return 200;
            case 8: return 150;
            case 9: return 100;
            default: return 100;
        }
    }

    this.addScore = function (sc) {
        score += sc;
    }

    this.addLines = function (line) {

        switch (line) {
            case 1:
                this.addScore(10);
                break;
            case 2:
                this.addScore(20);
                break;
            case 3:
                this.addScore(30);
                break;
            case 4:
                this.addScore(40);
                break;
            default:
                return;
        }

        lines += line;
        if (lines > 10) {
            this.addLevel();
        }
    }

    this.addLevel = function () {
        lines %= 10;
        if (level < this.MAXLEVEL) {
            level++;
        }
    }

    this.getLevel = function () {
        return level;
    }

    this.getLines = function () {
        return lines;
    }

    this.getScore = function () {
        return score;
    }
}


const clearScreen = () => {
    g.fillStyle = 'white';
    g.clearRect(0, 0, 640, 640);
    new Rectangle(0, 0, 640, 640);
    g.rect(0, 0, 640, 640);
    g.closePath();
    g.fill();
}

const intro = () => {
    clearScreen();
    g.font = '30px Arial';
    g.fillStyle = 'black';
    g.textAlign = 'center';
    g.fillText('Play Snake - press Enter to Start', 320, 320);
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
    g.fillStyle = 'black';
    g.textAlign = 'center';
    g.fillText(`Game over! You earned ${point} points.`, 320, 320);
    g.fillText(`Press Enter to play again.`, 320, 360);
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
        case 'Enter':
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

