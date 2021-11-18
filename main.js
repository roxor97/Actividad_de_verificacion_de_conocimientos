//definimos la clase Board que contiene los objetos y elementos del tablero
(function (){
    self.Board = function (width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get element(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();
// definimos la clase Boardview que contiene los objetos de la vista 
(function (){
    self.Boardview = function (canvas,board){
        this.canvas = canvas;
        this.board = board;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.ctx = canvas.getContext('2d');
    }
})();

//iniciamos nuestra funcion main cuando carge la pagina
window.addEventListener('load', main);

//definimos la funcion main que inicia el juego
function main (){
    var board = new Board(800,400);
    var canvas = document.getElementById('canvas');
    var Board_view = new Boardview(canvas,board);
    
}