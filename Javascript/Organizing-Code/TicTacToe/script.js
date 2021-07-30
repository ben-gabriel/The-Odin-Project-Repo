
function logger(){
    console.log('test')
}

// Gameboard Object
const gameboard = (
    () =>{
        let boardArray = 
        [
            false, false, false,
            false, false, false,
            false, false, false
        ]; 

        // function to mark cell in board
        // when a user clicks in the cell, the array must 
        // tick the respective cell as 1 or -1 depending
        // on wich player moved.
        
        let boardDOM = document.getElementsByClassName('board')[0].children;
        let currentPlayer = 1;
        
        for (let index = 0; index < boardDOM.length; index++) {
            let element = boardDOM[index];
            element.addEventListener('click', ()=>{
                if(boardArray[index] === false){
                    boardArray[index] = currentPlayer;
                    if(currentPlayer === 1){
                        boardDOM[index].classList.add(`player${currentPlayer}`);
                        currentPlayer = 2                        
                        boardDOM[index].classList.remove(`player${currentPlayer}`);
                    }
                    else{
                        boardDOM[index].classList.add(`player${currentPlayer}`);
                        currentPlayer = 1
                        boardDOM[index].classList.remove(`player${currentPlayer}`);
                    }
                    console.log(gameboard.boardArray)
                }

            });
        }

        // fuction to get() current board
        function getCurrent(){
            let publicBoard = boardArray;
            return publicBoard;
        };

        // function to reset board
        // all cells must go back to false


        return{boardArray, getCurrent}
    }
)();
