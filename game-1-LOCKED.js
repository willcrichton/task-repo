class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r; 
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        ctx.fill();
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}