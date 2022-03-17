const COLORS = ["red", "green", "purple", "yellow"];

class Square {
  constructor(x, y, s) {
    // console.log('x', x, 'y', y, 's', s);
    this.x = x;
    this.y = y;
    this.w = s;
    this.h = s;
  }

  draw(ctx, color = undefined) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.closePath();
    ctx.fillStyle = color ? COLORS[color] : "black";
    ctx.fill();
  }
}

function fill(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = value;
  }
}

class Grid {
  constructor(nRows, nCols) {
    let temp = [];
    for (var r = 0; r < nRows; r++) {
      temp[r] = new Array(nCols);
      fill(temp[r], -1);
      for (var c = 0; c < nCols; c++) {
        if (c === 0 || c === nCols - 1 || r === nRows - 1) temp[r][c] = -2;
      }
    }
    this.squares = temp;
  }

  draw(ctx) {
    this.squares.forEach((r, i) => {
      r.forEach((c, j) => {
        if (c === -1) return;
        if (c === -2) {
          new Square(j * 30, i * 30, 30).draw(ctx);
        }
        new Square(j * 30, i * 30, 30).draw(ctx, this.squares[i][j]);
      });
    });
  }
}
