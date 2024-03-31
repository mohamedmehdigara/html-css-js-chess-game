document.addEventListener("DOMContentLoaded", function() {
    const chessboard = document.getElementById('chessboard');

    function createChessboard() {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (let row = 8; row >= 1; row--) {
            for (let col = 1; col <= 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                const letter = letters[col - 1];
                const position = letter + row;
                square.dataset.position = position;
                square.dataset.piece = '';
                square.dataset.row = row;
                square.dataset.col = col;
                if ((col + row) % 2 === 0) {
                    square.classList.add('black');
                } else {
                    square.classList.add('white');
                }
                square.addEventListener('click', movePiece);
                chessboard.appendChild(square);
            }
        }
    }

    function initializePieces() {
        const piecesInitialPosition = {
            'a1': '♜', 'b1': '♞', 'c1': '♝', 'd1': '♛', 'e1': '♚', 'f1': '♝', 'g1': '♞', 'h1': '♜',
            'a2': '♟', 'b2': '♟', 'c2': '♟', 'd2': '♟', 'e2': '♟', 'f2': '♟', 'g2': '♟', 'h2': '♟',
            'a7': '♙', 'b7': '♙', 'c7': '♙', 'd7': '♙', 'e7': '♙', 'f7': '♙', 'g7': '♙', 'h7': '♙',
            'a8': '♖', 'b8': '♘', 'c8': '♗', 'd8': '♕', 'e8': '♔', 'f8': '♗', 'g8': '♘', 'h8': '♖',
        };

        for (let position in piecesInitialPosition) {
            const square = chessboard.querySelector(`[data-position='${position}']`);
            square.dataset.piece = piecesInitialPosition[position];
            square.innerHTML = piecesInitialPosition[position];
        }
    }

    function movePiece(event) {
        const clickedSquare = event.target;
        const selectedPiece = clickedSquare.dataset.piece;

        if (!selectedPiece) {
            return;
        }

        const highlightedSquares = document.querySelectorAll('.highlight');

        if (highlightedSquares.length > 0) {
            highlightedSquares.forEach(square => square.classList.remove('highlight'));
        }

        const currentPosition = clickedSquare.dataset.position;
        const currentRow = parseInt(clickedSquare.dataset.row);
        const currentCol = parseInt(clickedSquare.dataset.col);

        // Highlight possible moves
        highlightValidMoves(currentRow, currentCol, selectedPiece);

        function highlightValidMoves(fromRow, fromCol, piece) {
            for (let row = 1; row <= 8; row++) {
                for (let col = 1; col <= 8; col++) {
                    if (isValidMove(piece, fromRow, fromCol, row, col)) {
                        const position = `${String.fromCharCode(96 + col)}${row}`;
                        const square = chessboard.querySelector(`[data-position='${position}']`);
                        square.classList.add('highlight');
                    }
                }
            }
        }

        // Move piece
        function movePieceTo(targetRow, targetCol) {
            if (isValidMove(selectedPiece, currentRow, currentCol, targetRow, targetCol)) {
                const newPosition = `${String.fromCharCode(96 + targetCol)}${targetRow}`;
                const newSquare = chessboard.querySelector(`[data-position='${newPosition}']`);
                newSquare.dataset.piece = selectedPiece;
                newSquare.innerHTML = selectedPiece;
                clickedSquare.dataset.piece = '';
                clickedSquare.innerHTML = '';
            }
        }

        chessboard.querySelectorAll('.highlight').forEach(highlightedSquare => {
            highlightedSquare.addEventListener('click', function() {
                const targetRow = parseInt(highlightedSquare.dataset.row);
                const targetCol = parseInt(highlightedSquare.dataset.col);
                movePieceTo(targetRow, targetCol);
            });
        });
    }

    function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
        switch (piece) {
            case '♟': // Black pawn
                return isValidBlackPawnMove(fromRow, fromCol, toRow, toCol);
            case '♙': // White pawn
                return isValidWhitePawnMove(fromRow, fromCol, toRow, toCol);
            case '♝': // Bishop
            case '♗': // Bishop
                return isValidBishopMove(fromRow, fromCol, toRow, toCol);
            case '♞': // Knight
            case '♘': // Knight
                return isValidKnightMove(fromRow, fromCol, toRow, toCol);
            case '♜': // Rook
            case '♖': // Rook
                return isValidRookMove(fromRow, fromCol, toRow, toCol);
            case '♛': // Queen
            case '♕': // Queen
                return isValidQueenMove(fromRow, fromCol, toRow, toCol);
            case '♚': // King
            case '♔': // King
                return isValidKingMove(fromRow, fromCol, toRow, toCol);
            default:
                return false; // Invalid piece
        }
    }

    // Implement the rest of the validation functions (isValidBlackPawnMove, isValidWhitePawnMove, etc.) here

    createChessboard();
    initializePieces();
});
