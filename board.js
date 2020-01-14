class Board{
    
    constructor(){

        this._turn = true;
        this._board = [[...new Array(3)], [...new Array(3)], [...new Array(3)]];
        this._turnCount = 0;
        this._hasStarted = false;
    }
    
    get board(){
        return this._board;
    }

    get player1(){
        return this._player1;
    }

    get player2(){
        return this._player2;
    }

    get turnCount(){
        return this._turnCount;
    }

    get hasStarted(){
        return this._hasStarted;
    }

    get turn(){
        return this._turn;
    }

    set board(board){
        this._board = board;
    }

    set player1(player1){
        this._player1 = player1;
    }

    set player2(player2){
        this._player2 = player2;
    }

    set turnCount(turnCount){
        this._turnCount = turnCount;
    }

    set hasStarted(hasStarted){
        this._hasStarted = hasStarted;
    }

    set turn(turn){
        this._turn = turn;
    }

    nextTurn(){
        this._turnCount++;
        this._turn = !this._turn;
    }

    isAvailable(row, col){
        return this._board[row][col] != false && this._board[row][col] != true;
    }

    placeAt(row, col){
            this._board[row][col] = this._turn;
    }

    restart(){
        this._board = [[...new Array(3)], [...new Array(3)], [...new Array(3)]];
    }

    isWin(){
        const instance = this._board;

        if(
            instance[0].every(n => n == true)||
            instance[1].every(n => n == true)||
            instance[2].every(n => n == true)||
            [instance[0][0], instance[1][0], instance[2][0]].every(n => n == true)||
            [instance[1][0], instance[1][1], instance[1][2]].every(n => n == true)||
            [instance[2][0], instance[2][1], instance[2][2]].every(n => n == true)||
            [instance[0][0], instance[1][1], instance[2][2]].every(n => n == true)||
            [instance[2][0], instance[1][1], instance[0][2]].every(n => n == true)
        ){
            return "Player 1 Wins!";
            
        }else if(
            instance[0].every(n => n == false)||
            instance[1].every(n => n == false)||
            instance[2].every(n => n == false)||
            [instance[0][0], instance[1][0], instance[2][0]].every(n=>n == false)||
            [instance[1][0], instance[1][1], instance[1][2]].every(n=>n == false)||
            [instance[2][0], instance[2][1], instance[2][2]].every(n=>n == false)||
            [instance[0][0], instance[1][1], instance[2][2]].every(n=>n == false)||
            [instance[2][0], instance[1][1], instance[0][2]].every(n=>n == false)   
        ){
            return "Player 2 Wins!";
        }
    }
}

module.exports = Board;