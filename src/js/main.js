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
                    rowDiv.className = 'flex';
                    for (const cell of row) {
                        const cellElement = document.createElement('a');
                        cellElement.className = 'boardCell';
                        cellElement.href = '#';
                        cellElement.innerHTML = cell;
                        rowDiv.appendChild(cellElement);
                    }
                    boardDiv.appendChild(rowDiv);
                }
            },
        }
    }
)
();


const GameController = (function CreateController(GameBoard) {
    return {
        players: [],
        playersInit: function (name1, name2, symbol1, symbol2) {
            const player1 = {name: name1, symbol: symbol1};
            this.players.push(player1);
            const player2 = {name: name2, symbol: symbol2}
            this.players.push(player2);
        },
        gameInit: function () {
            GameBoard.boardInit();
            GameBoard.renderBoard();
        },
        updateBoard: function (row, col, symbol) {
            GameBoard.board[row][col] = symbol;
            console.log(GameBoard.board);
        },
        // playerMove: function (position, symbol) {
        //     let row = Math.floor((position - 1) / 3);
        //     let col = (position - 1) % 3;
        //     if (this.GameBoard.board[row][col] === '')
        //         this.GameBoard.board[row][col] = symbol;
        //     else
        //         console.log('Move not allowed');
        // },
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
    return {
        registerForm: document.getElementById('registerForm'),
        gameBoard: document.getElementById('gameBoard'),
        p1Name: document.getElementById('p1'),
        p1Input: document.getElementById('p1-input'),
        score1: document.getElementById('s1'),
        p2Name: document.getElementById('p2'),
        p2Input: document.getElementById('p2-input'),
        score2: document.getElementById('s2'),
        startBtn: document.getElementById('start-btn'),
        addPageEvents: function () {
            this.startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.p1Name.textContent = this.p1Input.value;
                this.p2Name.textContent = this.p2Input.value;
                this.score1.textContent = '0';
                this.score2.textContent = '0';
                this.registerForm.style.display = 'none';
                this.gameBoard.style.display = 'flex';
                GameController.playersInit(this.p1Input.value, this.p2Input.value, 'X', 'O')
                GameController.gameInit();
                this.addCellEvents();
            })
        },
        addCellEvents: function () {
            const cells = document.getElementsByClassName('boardCell');
            let currentSymbol = 'X';
            const gridSize = 3;
            const toggleSymbol = () => currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener('click', () => {
                    if (cells[i].textContent === '') {
                        cells[i].textContent = currentSymbol;
                        const row = Math.floor(i / gridSize);
                        const col = i % gridSize;
                        GameController.updateBoard(row, col, currentSymbol);
                        toggleSymbol();
                    }
                })
            }
        }
    }
})(GameController);

PageController.addPageEvents();
