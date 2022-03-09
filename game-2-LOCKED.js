const COLORS = ['red', 'green', 'purple', 'yellow'];

class Square {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.w = s;
        this.h = s;
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        ctx.fill(COLORS[color]);
    }
}

class Grid {
    constructor(numRows, numCols) {
        let temp = Array(numRows);
        for(let i = 0; i < numRows; i++) {
            temp[i] = Array(numCols).fill(-1);
        }
        this.squares = temp;
    }

    draw(ctx) {
        this.squares.forEach(r => {
            if(r === -1) return;
            new Square(r.x, r.y, 30).draw(ctx, r.color)
        });
    }
}