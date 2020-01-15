//Imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const Board = require('./board.js');
const Player = require('./player.js');
const uuidv1 = require('uuid/v1');
const socket = require('socket.io');
const dotenv = require('dotenv');

//Globals
const app = express();
const port = process.env.port | 3000;
const html = fs.readFileSync(path.resolve(__dirname, 'page.html'), 'utf8');
const game = new Board();
const server = app.listen(port, ()=>{console.log('started');});
const io = socket(server);

//Code

//Initializes the game session
app.get('/', (_, res) => res.send(html));


io.on('connection', socket => {

    let id;

    //If the user does not have an id, assign one to them, otherwise, get their id
    if(!/id/.test(socket.handshake.headers.cookie)){
        id = uuidv1();
        socket.emit('assignment', id);
        id = `id=${id}`;
    }else{
        const temp = socket.handshake.headers.cookie;
        id = temp.split`;`.map(n => n.replace(' ', '')).filter(i => i.substring(0,2) =='id')[0];
    }

    //Wait until 2 connections (differentiated by their id) are present, then start the game
    if(id && !game.player1){

        game.player1 = new Player(id, true);
    }else if(id && !game.player2 && id != game.player1.name){

        game.player2 = new Player(id, false);
        game.hasStarted = true;
    }

    socket.on('move', ({uuid, move}) => {

        //Do nothing if game has not started or the wanted position is unavailable (is occupied)
        if(!game.hasStarted || !game.isAvailable(move[0], move[1])) return;

        if(uuid == game.player1.name && game.turn){

            game.placeAt(move[0], move[1]);
            game.nextTurn();
        }else if(uuid == game.player2.name && !game.turn){

            game.placeAt(move[0], move[1]);
            game.nextTurn();
        }

        //After every move, check if it a player has won, and if so restart the game and log the winner. If after 9 moves there is no winner, declare it a draw and restart
        if(game.isWin()){
            console.log(game.isWin());
            game.restart();
        }else if(game.turnCount >= 9 && !game.isWin()){
            console.log(`It's a draw :(`);
            game.restart();
        }

        //After every valid move, update the board
        io.sockets.emit('update', game.board);
    });

});