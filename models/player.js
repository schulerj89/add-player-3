const players = [];
const positionArrayIdx = {'PG': 0, 'SG': 1, 'SF': 2, 'PF': 3, 'C': 4};
const playerPositions = [{value: 'PG', text: 'PG', selected: false},
                         {value: 'SG', text: 'SG', selected: false},
                         {value: 'SF', text: 'SF', selected: false},
                         {value: 'PF', text: 'PF', selected: false},
                         {value: 'C', text: 'C', selected: false}];

function Player(key, name, position) {
    this._player_key = key;
    this._player_name = name;
    this._player_position = position;
    this.getKey = () => { return this._player_key; }
    this.getName = () => { return this._player_name; }
    this.getPosition = () => { return this._player_position; }
    this.setName = (playerName) => { this._player_name = playerName; }
    this.setPosition = (playerPosition) => { this._player_position = playerPosition; }
}

function PlayerStore() {
    this.close = async () => {}
    this.players = [];
    this.update = async (key, name, position) => {
        this.players[key] = new Player(key, name, position);
        return this.players[key];
    }
    this.create = async (key, name, position) => {
        this.players[key] = new Player(key, name, position);
        return this.players[key];
    }
    this.read = async (key) => {
        if(this.players[key]) { return this.players[key]; }
        else throw new Error(`Error ${key} does not exist`);
    }
    this.destory = async () => {
        if(this.players[key]) { delete this.players[key]; }
        else throw new Error(`Error ${key} does not exist`);
    }
    this.playerList = async () => { return this.players; }
    this.count = async () => { return this.players.length; } 
}

module.exports = {
    Player: Player,
    PlayerStore: PlayerStore,
    PlayerPositions: playerPositions,
    PlayerPositionIndex: positionArrayIdx
}