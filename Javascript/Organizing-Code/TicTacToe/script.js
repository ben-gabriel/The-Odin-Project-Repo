
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
        // tick the respective cell as 1 or 2 depending
        // on wich player moved.

        // function to reset board
        // all cells must go back to false

        return{boardArray}
    }
)();

console.log(gameboard.boardArray)