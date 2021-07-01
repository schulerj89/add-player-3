const express = require('express');
const path = require('path');
const app = express();
const mustacheExpress = require('mustache-express');
const players = require('./models/player.js');
const bodyParser = require('body-parser');
const e = require('express');
const { PlayerPositions, PlayerPositionIndex } = require('./models/player.js');
const port = 3000;
const playersStore = new players.PlayerStore();

// Register '.mustache' extension with The Mustache Express
app.engine('html', mustacheExpress());

// Register body parsing
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

async function viewPlayer(req, res, next) {
    try {
        const player = await playersStore.read(req.params.id);
        res.render('View', {
            playerName: player.getName(),
            playerPosition: player.getPosition(),
            playerId: player.getKey()
        });
    } catch(err) {
        res.render('Error');
    }
}

app.get('/', async (req, res, next) => {
    res.render('Home');
});

app.get('/player/add', async (req, res, next) => {
    res.render('Add');
});

app.get('/player/edit/:id', async (req, res, next) => {
    try {
        const player = await playersStore.read(req.params.id);
        let playerPositions = PlayerPositions;
        let playerPositionIndex = PlayerPositionIndex[player.getPosition()];
        playerPositions[playerPositionIndex].selected = true;

        res.render('Edit', {
            playerName: player.getName(),
            playerPosition: player.getPosition(),
            playerId: player.getKey(),
            options: playerPositions
        });
    } catch (err) {
        res.render('Error');
    }
});

app.get('/player/view/:id', viewPlayer);

app.post('/player/save', async (req, res, next) => {
    let playerId = await playersStore.count();
    
    if(req.body.type == 'update') {
        playerId = req.body.player_id;
    }

    let newPlayer = await playersStore.update(playerId, req.body.player_name, req.body.position);

    res.redirect(301, '/player/view/' + playerId);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


