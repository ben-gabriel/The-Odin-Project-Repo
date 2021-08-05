
// Gameboard Object
const gameboard = (
    () =>{
        // Get reference to DOM Element
        let boardDOM = document.getElementsByClassName('board')[0].children;
        
        // Create Map Array of cells state in board
        let boardArray = 
        [
            false, false, false,
            false, false, false,
            false, false, false
        ]; 

        // Variable to keep track of current player
        let currentPlayer = 1;
        
        // Loop through DOM cells and add click event listener 
        for (let index = 0; index < boardDOM.length; index++) {
            let element = boardDOM[index];
            
            element.addEventListener('click', ()=>{    
                if(boardArray[index] === false){
                    
                    // mark in boardArray current player id
                    boardArray[index] = currentPlayer;
                    
                    if(currentPlayer === 1){
                        boardDOM[index].classList.add(`player${currentPlayer}`);
                        currentPlayer = 2                        
                    }
                    else{
                        boardDOM[index].classList.add(`player${currentPlayer}`);
                        currentPlayer = 1
                    }

                }

            });
        }

        // fuction to get() current board
        function getCurrent(){
            let publicBoard = boardArray;
            return publicBoard;
        };

        // function to reset board
        function reset(){
            for (let index = 0; index < boardArray.length; index++) {
                boardArray[index] = false;
                boardDOM[index].classList.remove('player1', 'player2')
            }
        };

        return{getCurrent, reset};
    }
)();


// PLAYERS MUST CLICK A CELL IN GAMEBOARD OBJ VIA FUNCTION