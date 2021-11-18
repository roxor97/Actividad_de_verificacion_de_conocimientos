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
    self.Ball = function (x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.dx = 0;
        this.dy = 0;
        board.ball =this;
        this.kind = "circle";
    }
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
        this.speed = 10;

        self.Bar.prototype = {
            down: function () {
                this.y += this.speed;
            },
            up: function () {
                this.y -= this.speed;
            },
            toString: function () {
                return "x: " + this.x + " y: " + this.y;
            },
        };
    };
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
        clean: function () {
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        },
        draw: function () {
            for (var i = this.board.element.length - 1; i >= 0; i--) {
                var el = this.board.element[i];
                draw(this.ctx, el);
            }
        },
        play: function () {
            this.clean();
            this.draw();
        }
    };

    function draw(ctx, element) {
        switch (element.kind) {
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
        }
    }
})();
var board = new Board(800, 400);
var bar_1 = new Bar(0, 0, 0, 0, board);
var bar_2 = new Bar(740, 100, 40, 100, board);
var bar_3 = new Bar(20, 100, 40, 100, board);
var canvas = document.getElementById("canvas");
var Board_view = new BoardView(canvas, board);
var ball = new Ball(400, 100, 10, board);

window.requestAnimationFrame(controller);

document.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
    e.preventDefault();
    if (e.keyCode == 87) {
        bar_3.up();
    } else if (e.keyCode == 83) {
        bar_3.down();
    } else if (e.keyCode == 38) {
        bar_2.up();
    } else if (e.keyCode == 40) {
        bar_2.down();
    }
    console.log(bar_2.toString());
    console.log(bar_3.toString());
});

//iniciamos nuestra funcion main cuando carge la pagina

//definimos la funcion main que inicia el juego
function controller() {
    Board_view.play();
    window.requestAnimationFrame(controller);
}