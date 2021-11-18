//definimos la clase Board que contiene los objetos y elementos del tablero
(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    };

    self.Board.prototype = {
        get element() {
            var elements = this.bars.map(function (bar) {
                return bar;
            });
            elements.push(this.ball);
            return elements;
        },
    };
})();
//se define el constructor para la clase Ball para la pelota
(function () {
    self.Ball = function (x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.dx = 3;
        this.dy = 3;
        board.ball = this;
        this.kind = "circle";
        this.direction = 1;
    };
    self.Ball.prototype = {
        move: function () {
            this.x += this.dx * this.direction;
            this.y += this.dy * this.direction;
        },
    };
})();
//se define el constructor de la clase Bar para las barras
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
            if (this.board.playing) {
                this.clean();
                this.draw();
                this.board.ball.move();
            }
        },
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

Board_view.draw();
window.requestAnimationFrame(controller);

document.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
    //tecla w
    if (e.keyCode == 87) {
        e.preventDefault();
        bar_3.up();
    }
    //tecla s 
    else if (e.keyCode == 83) {
        e.preventDefault();
        bar_3.down();
    }
    //tecla up 
    else if (e.keyCode == 38) {
        e.preventDefault();
        bar_2.up();
    }
    //tecla down 
    else if (e.keyCode == 40) {
        e.preventDefault();
        bar_2.down();
    }
    //tecla espacio 
    else if (e.keyCode === 32) {
        e.preventDefault();
        board.playing = !board.playing;
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