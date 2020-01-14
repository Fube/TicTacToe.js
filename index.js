//Imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const Board = require('./board.js');
const Player = require('./player.js');
const uuidv1 = require('uuid/v1');

//Globals
const app = express();
const port = process.env.port | 3000;
const html = fs.readFileSync(path.resolve(__dirname, 'page.html'), 'utf8');
const game = new Board();

//Code
app.get('/', (req, res) => res.send(html));

app.post('/uuid',(req,res) => res.send(uuidv1()));

app.post('/game', (req, res) => res.send(game));

app.use(express.json()); // json parser

app.post('/send', (req, res) => {

    const request = req.body.data;

    //Game start logic
    if(!game.player1 && request.uuid){
        game.player1 = new Player(request.uuid, true);
    }else if(!game.player2 && request.uuid && request.uuid != game.player1.name){
        game.player2 = new Player(request.uuid, false);
        game.hasStarted = true;
    }
    /*Move logic*/
    if(game.hasStarted){

        if(request.uuid == game.player1.name && game.turn && game.isAvailable(request.move[0], request.move[1])){
            game.placeAt(request.move[0], request.move[1]);
            if(game.isWin()){
                console.log(game.isWin());
                game.restart();
            }else
                game.nextTurn();
            
            console.log(game.turn);
        }else if(request.uuid == game.player2.name && !game.turn && game.isAvailable(request.move[0], request.move[1])){
            game.placeAt(request.move[0], request.move[1]);
            if(game.isWin()){
                console.log(game.isWin());
                game.restart();
            }else
                game.nextTurn();
            
            console.log(game.turn);
        }

        if(game.turnCount >= 9 && !game.isWin()){
            console.log("It's a draw :( ");
            game.restart();
        }
    }

});

app.listen(port, ()=>{console.log('started');});