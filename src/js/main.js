const GameBoard = (function CreateGameBoard() {
        return {
            board: [],
            boardInit: function () {
                let row = 0
                while (row < 3) {
                    this.board.push(['', '', '']);
                    row++;
                }
            },
            renderBoard: function () {
                const boardDiv = document.getElementById('board');
                boardDiv.innerHTML = '';
                for (const row of this.board) {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'boardRow';
                    for (const cell of row) {
                        const cellElement = document.createElement('a');
                        cellElement.className = 'boardCell';
                        cellElement.href = '#';
                        cellElement.innerHTML = cell;
                        rowDiv.appendChild(cellElement);
                    }
                    boardDiv.appendChild(rowDiv);
                }
            }
        }
    }
)
();

const GameController = (function CreateController(GameBoard) {
    return {
        GameBoard: GameBoard,
        players: [],
        playersInit: function () {
            const player1 = CreatePlayer('John', 'X');
            this.players.push(player1);
            const player2 = CreatePlayer('Eve', 'O');
            this.players.push(player2);
        },
        playerMove: function (position, symbol) {
            let row = Math.floor((position - 1) / 3);
            let col = (position - 1) % 3;
            if (this.GameBoard.board[row][col] === '')
                this.GameBoard.board[row][col] = symbol;
            else
                console.log('Move not allowed');
        },
        checkWin: function (board, symbol) {
            let rowWin, colWin;
            let diagWin = 0;
            let antidiagWin = 0;
            for (let r = 0; r < 3; r++) {
                rowWin = colWin = 0;
                for (let c = 0; c < 3; c++) {
                    //check rows
                    board[r][c] === symbol ? rowWin++ : rowWin = 0;
                    if (rowWin === 3) return true;
                    //check columns
                    board[c][r] === symbol ? colWin++ : colWin = 0;
                    if (colWin === 3) return true;
                }
            }
            for (let d = 0; d < 3; d++) {
                let a = 0;
                //check diagonal
                board[d][d] === symbol ? diagWin++ : diagWin = 0;
                if (diagWin === 3) return true;
                //check antidiag
                board[a + d][3 - 1 - d] === symbol ? antidiagWin++ : antidiagWin = 0;
                if (antidiagWin === 3) return true;
            }
            return false;
        },
    }
})(GameBoard);

const PageController = (function () {
    return {}

})();

function CreatePlayer(name, symbol, id) {
    return {
        name: name,
        symbol: symbol,
        renderName: function () {
           const playerEm = document.getElementById(id);
           playerEm.innerHTML = this.name;
        }
    }
}

GameBoard.boardInit();
GameBoard.renderBoard();