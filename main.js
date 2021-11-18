//definimos la clase Board que contiene los objetos y elementos del tablero
(function () {
  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  };

  self.Board.prototype = {
    get element() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    },
  };
})();

(function () {
  self.Bar = function (x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
    

    self.Bar.prototype = {
      down: function () {},
      up: function () {}
    }
  }
})();

// definimos la clase Boardview que contiene los objetos de la vista
(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.board = board;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.ctx = canvas.getContext("2d");
  };
  self.BoardView.prototype = {
    draw: function () {
        var ctx = this.ctx;
        var board = this.board;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, board.width, board.height);
        for (var i = 0; i < board.element.length; i++) {
            var element = board.element[i];
            ctx.fillStyle = "black";
            ctx.fillRect(element.x, element.y, element.width, element.height);
        }
    }
  };
  function draw(ctx, element) {
    console.log("hola mundo");
    if (element !== null && element.hasOwnProperty("kind")) {
      switch (element.kind) {
        case "rectangle":
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
      }
    }
  }
})();

//iniciamos nuestra funcion main cuando carge la pagina
window.addEventListener("load", main);

//definimos la funcion main que inicia el juego
function main() {
  var board = new Board(800, 400);
  var bar = new Bar(20, 100, 40, 100, board);
  var bar2 = new Bar(740, 100, 40, 100, board);
  var canvas = document.getElementById("canvas");
  var Board_view = new BoardView(canvas, board);
  Board_view.draw();
}
