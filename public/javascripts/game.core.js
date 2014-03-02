DECK_NUM = 2;
SUIT_NUM = 4;
VALUE_NUM = 13;
JOKER_NUM =2;
ALL_SUIT =['spades','hearts','diamonds','clubs','jokers'];
function Card(my_suit,my_value){
    this.suit = my_suit;
    this.value = my_value;

}

function This_round(){

}
function playerProperty(players){
    for(var i = 0 ;i < players.length; i++){
        players[i].cards = [];
        players[i].points = 0;  //point is for this game
        players[i].score = 0;   //score is for the whole game
        players[i].declarer = -1;  // 0 is false, 1 is true, -1 is undefined.
    }
}
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function Deck(){
    var deck = [];

    for(var i = 0; i <DECK_NUM; i++ ){
        for ( var j = 0 ; j< SUIT_NUM; j++){
            for( var k =0 ; k < VALUE_NUM ; k++){
                deck.push(new Card(ALL_SUIT[j],k+1))
            }
        }
        for( var j =0; j < JOKER_NUM ; j ++){
            deck.push(new Card(ALL_SUIT[4],j+1))
        }
    }
    shuffle(deck);
    return deck;
}

function GameInfo(){
    this.dominantSuit = 'unknown';
    this.dominantRank = 2;
    this.starter = -1; //should be one of player 0 to 3

}

function Dealing(players, gameInfo){
    var deck= Deck();
    //console.log(deck);
    //console.log(deck.length);
    var n = deck.length;
    var i = gameInfo.starter;

    var de = setInterval(function(){

        n -= 1;
        i = i%4;
        players[i].cards.push(deck[n]);
        players[i].emit('newcard', deck[n]);
        //TODO: determining the dominant suit and rank
        i = i +1;
        if (n === 0){
            clearInterval(de);
            for(var j = 0 ; j<4; j++){
                console.log(players[j].cards.length)
                //players[j].emit('mycards', players[j].cards);
            }
        }
    },30)
}


function do_trick(player, gameInfo, callback){
    player.on('usecard', function(m) {
        setTimeout(function() { callback(m); }, 1000);

    })
}

function find(cards,target){
    for(var i = 0;i<cards.length;i++){
        if(cards[i].suit === target.suit){
            if(cards[i].value === target.value){
                return i;
            }
        }
    }
    return -1;
}
function deleteHand(player,result){
    console.log(result);
    console.log(player.cards);
    var index = find(player.cards,result);
    //delete player.cards[index];
    player.cards.splice(index,1);
    console.log(index);
    console.log(player.cards.length);

}
function updateHand(player){
    player.emit('updateHand', player.cards);
}
function one_round(players,gameInfo){
    players.forEach(function(player){
        do_trick(player,gameInfo,function(result){
            if(result){
                var oneCard = new Card(result.suit,parseInt(result.value));
                console.log('gamecore:: ' + player.userid + ' used card ' + result.suit + ' ' + result.value);
                deleteHand(player,oneCard);
                updateHand(player);
            }
            else{
                console.log('no imput');
            }
        })
    })
    // do something

    //to next round
    //one_round(players,gameInfo);
}

function playing(players,gameInfo){
    console.log('OK. please start your trick');
    var done = false;

    one_round(players,gameInfo);



}

function updateScore(players){

}


function One_game(players,gameInfo){
    Dealing(players,gameInfo);
    // updateScore(players);
    playing(players,gameInfo);
}


var game_core= function (game_instance) {
    //Store the instance, if any
    this.instance = game_instance;
    //console.log(game_instance.id)
    //console.log(game_instance);
    //Store a flag if we are the server
    this.server = this.instance !== undefined;
    var players = [];
    for(var i = 0 ; i< 3; i++){
        players[i] = game_instance.player_client[i];
    }
    players[3]=game_instance.player_host;
    playerProperty(players);
    //console.log(players)
    var gameInfo = new GameInfo();
    gameInfo.starter = 1;
    One_game(players,gameInfo);

};


//server side we set the 'game_core' class to a global type, so that it can use it anywhere.
if( 'undefined' != typeof global ) {
    module.exports = global.game_core = game_core;
}
