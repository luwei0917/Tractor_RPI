//This is the baby of Wei Lu

DECK_NUM = 2;
SUIT_NUM = 4;
VALUE_NUM = 13;
JOKER_NUM =2;
ALL_SUIT =['jokers','spades','hearts','diamonds','clubs'];
function Card(my_suit,my_value){
    this.suit = my_suit;
    this.value = my_value;

}

function playerProperty(players){
    for(var i = 0 ;i < players.length; i++){
        players[i].cards = [];
        players[i].suit = new Array(4);
        for(var j =0 ;j<ALL_SUIT.length ; j++){
            players[i].suit[j] = [];
        }
        players[i].points = 0;  //point is for this game
        players[i].score = 2;   //score is for the whole game
        players[i].declarer = -1;  // 0 is false, 1 is true, -1 is undefined.
        //players[i].mynum = -1;
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
        for ( var j = 1 ; j<= SUIT_NUM; j++){
            for( var k =0 ; k < VALUE_NUM ; k++){
                deck.push(new Card(ALL_SUIT[j],k+1))
            }
        }
        for( var j =0; j < JOKER_NUM ; j ++){
            deck.push(new Card(ALL_SUIT[0],j+1))
        }
    }
    shuffle(deck);
    return deck;
}

function GameInfo(){
    this.dominantSuit = 'unknown';
    this.dominantRank = 2;
    //this.starter = -1; //should be one of player 0 to 3
    this.tempPos = -1;
    this.count = -1;
    this.cardsLeft = -1;
    this.firstgame = false;  //should initial as true
    this.dealer = -1;
    this.leader = -1;
    this.currentPlayer = -1;
    this.kitty = [];

}

function Dealing(players,gameInfo){
    debug('Start Dealing');
    var deck = Deck();
    debug('deck length is ' + deck.length);
    var i = gameInfo.dealer;
    for(var j = 0;j < 4; j++){
        players[j].on('DominantSuitIn',function(card){
            //TODO: some checking
            gameInfo.dominantSuit = card.suit;
            debug('dominantSuit now is ' + gameInfo.dominantSuit);
        })
    }
    next(deck,i,players,gameInfo);

}


function next(deck,i,players,gameInfo){
    //debug(deck.length);
    if(deck.length>8){
        var card = deck.shift();
        sendCard(card,players[i], gameInfo.dominantRank,function(result){
            i++;
            i = i%4;
            next(deck,i,players,gameInfo);
        })
    }
    else{
        //all give to the dealer
        var j = gameInfo.dealer;
        //check
        if(j != i){
            debug('1bad');
            debug('j is ' +j + ' i is ' + i);
        }

        for(var i =0;i<deck.length;i++){
            addCard(players[j],deck[i]);
        }

        for(var i =0 ;i<4 ;i++){
            updateHand(players[i]);
        }
        //updateHand(players[j]);
        //sortCards(players);
        debug('Dealing Done');
        kitty(players[gameInfo.dealer],gameInfo);



    }
}

function addCard(player,card,callback){
    var num = 0;
    var done = false;
    for(var i =0 ;i< ALL_SUIT.length;i++){
        if(ALL_SUIT[i] === card.suit){
            player.suit[i].push(card);
            player.suit[i].sort(function(a,b){
                if(a.suit === 'jokers'){
                    return b.value - a.value
                }
                if (a.value === 1){
                    return false;
                }
                else if (b.value === 1){
                    return true;
                }
                else{
                    return b.value - a.value
                }
            });
            var temp = find(player,card);
            num += temp[1];
            done = true;

        }
        else{
            if(done === false){
                num += player.suit[i].length;
            }
        }
    }
    callback(num);

}

function sendCard(card,player,dominantRank,callback){
    addCard(player,card,function(result){
        player.emit('newcard',card,result);
        debug('now '+result);
    });

    //debug(card.suit + ' '+ card.value);
    //player.cards.push(card);
<<<<<<< HEAD
    updateHand(player);
    //player.emit('newcard',card);
    var time = 0.1*1000;
    //var time = 0.01*1000;  // 0.01s
=======
    //updateHand(player);

    var time = 0.25*1000;  // 0.01s
>>>>>>> kitsune
    var IsDominantSuit = false;
    if(card.value === dominantRank && card.suit != 'jokers'){
        player.emit('declaration');
        //player.broadcast.to(player.game).emit('declarationOff');
        //time = 0.5*1000 //10s;
        IsDominantSuit = true;
    }
    else{
        //player.emit('declarationOff');
    }

    setTimeout(function() {
        callback(IsDominantSuit); }, time);
}


function find(player,target){
    for(var i = 0; i< 5; i++){
        if(ALL_SUIT[i] === target.suit){
            for(var j =0 ;j< player.suit[i].length ; j++){
                if(target.value === player.suit[i][j].value){
                    return [i,j];
                }
            }
        }
    }
    return [-1,-1];
}

function debug(message){
    console.log(message +'---------------------------------');
}


function nextPlayer(i){
    return (i+1)%4;
}

function playing(players,gameInfo){
    console.log('OK. please start your trick');
    var done = false;

    gameInfo.count = 0;

    var pos = gameInfo.dealer;
    gameInfo.currentPlayer = gameInfo.dealer;
    var player = players[pos];
    player.emit('go');
    player.broadcast.to(player.game).emit('stop');
    var n = 0;
    while( n < 4){
        n++;
        var player = players[pos];

        pos = nextPlayer(pos);
        player.on('usecard', function(result) {
            var player = players[gameInfo.currentPlayer];
            debug('gamecore:: ' + player.userid );
            var cardsCombination = [];
            for(var i = 0; i< result.length ; i++){
                var temp = new Card(result[i].suit, result[i].value);
                cardsCombination.push(temp);
                console.log( ' used card ' + temp.suit + ' ' + temp.value);
            }
            //cardsCombination.push(oneCard);
            var isLegal = deleteHand(player , cardsCombination);  // -1 means not legal
            // if want he want to play is not legal. Tell him.
            if (isLegal === -1){
                players[i].emit('DoAgain');
            }
            else{
                //debug(5);
                updateHand(player);
                player.broadcast.to(player.game).emit('otherTricks',result,gameInfo.currentPlayer);
                player.emit('otherTricks',result,gameInfo.currentPlayer);

                player.emit('stop');
                //next
                gameInfo.count++;
                if(gameInfo.count === 4){
                    // new
                    gameInfo.count = 0;
                    gameInfo.currentPlayer = gameInfo.leader;
                }
                else if(gameInfo.count < 4){
                    gameInfo.currentPlayer =nextPlayer(gameInfo.currentPlayer);
                }
                var myPos = gameInfo.currentPlayer;
                players[myPos].emit('go');

            }
        })
    }
}


function deleteHand(player,cardsCombination){
    console.log(cardsCombination);
    //console.log(player.cards);

    // first make sure you have the cards you want to play
    var cardsPosition = [];  // store the position of the cards in my hands
    for(var i = 0; i<cardsCombination.length; i++){
        var index = find(player,cardsCombination[i]);
        if(index[0] === -1){
            return -1;  // card not exists
        }
        cardsPosition.push(index);
    }

    //check all the rules, make sure it's legal


    //it's legal, so delete the cards in my hands.
    for(var i =0;i<cardsCombination.length;i++){
        var index = find(player,cardsCombination[i]);
        player.suit[index[0]].splice(index[1],1);
        //console.log(player.cards);
        //console.log(index);
        //console.log('length '+ player.cards.length);
        debug('deletedone');

    }
    return 1;  //means good
}




function updateHand(player){
    player.cards = [];
    for(var i = 0; i< ALL_SUIT.length; i++){
        for(var j =0 ; j< player.suit[i].length; j++){
            player.cards.push(player.suit[i][j])
        }
    }
    //console.log(player.cards);
    //console.log(player.suit[0]);
    player.emit('updateHand', player.cards);
}



function updateScore(players){

}


function kitty(player,gameInfo){
    player.emit('kitty');
    //TODO: kitty




}

function One_game(players,gameInfo){
    if(gameInfo.firstgame === false){
        debug('three');
        var i = gameInfo.dealer;
        gameInfo.dominantRank = players[i].score;
        players[i].emit('dealer');
        players[(i+2)%4].emit('defender');
        players[(i+1)%4].emit('attacker');
        players[(i+3)%4].emit('attacker');
        players[i].declarer = 1;
        players[(i+2)%4].declarer = 0;
        players[(i+1)%4].declarer = 1;
        players[(i+3)%4].declarer = 0;
    }

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
        players[i].emit('initial');
    }
    players[3]=game_instance.player_host;
    players[3].emit('initial');
    playerProperty(players);
    //console.log(players)
    var gameInfo = new GameInfo();
    gameInfo.dealer = 0;  // 0 ,1, 2, 3
    gameInfo.leader = gameInfo.dealer;
    One_game(players,gameInfo);

};


//server side we set the 'game_core' class to a global type, so that it can use it anywhere.
if( 'undefined' != typeof global ) {
    module.exports = global.game_core = game_core;
}




//
//function Dealing(players, gameInfo){
//    console.log('Start dealing');
//    var deck= Deck();
//    //console.log(deck);
//    //console.log(deck.length);
//    var n = deck.length;
//    var i = gameInfo.dealer;
//    debug('two');
//    var rank = gameInfo.dominantRank;
//    var de = setInterval(function(){
//        n -= 1;
//        i = i%4;
//        players[i].cards.push(deck[n]);
//        players[i].emit('newcard', deck[n]);
//        //TODO: determining the dominant suit and rank
//        if(gameInfo.firstgame){
//            if(deck[n].value === 2){
//                debug('one');
//                players[i].emit('dealer');
//                players[(i+2)%4].emit('defender');
//                players[(i+1)%4].emit('attacker');
//                players[(i+3)%4].emit('attacker');
//                players[i].declarer = 1;
//                players[(i+2)%4].declarer = 0;
//                players[(i+1)%4].declarer = 1;
//                players[(i+3)%4].declarer = 0;
//
//                gameInfo.dealer = i;
//                gameInfo.firstgame = false;
//                gameInfo.dominantSuit = deck[n].suit;
//                gameInfo.dominantRank = players[i].score;
//            }
//        }
//        else{
//            if(rank === deck[n].value){
//                debug('four');
//                players[i].emit('declaration');
//            }
//        }
//        i = i +1;
//        if (n === 8){
//            // last 8 cards will go to dealer
//            while(n>0){
//                n -= 1;
//                players[gameInfo.dealer].cards.push(deck[n]);
//            }
//            clearInterval(de);
//            sortCards(players);
//        }
//    },30)
//}


//
//function do_trick(player, gameInfo, callback){
//
//    player.on('usecard', function(result) {
//        debug('gamecore:: ' + player.userid );
//        var cardsCombination = [];
//        for(var i = 0; i< result.length ; i++){
//            var temp = new Card(result[i].suit, result[i].value);
//            cardsCombination.push(temp);
//            console.log( ' used card ' + temp.suit + ' ' + temp.value);
//        }
//        //var oneCard = new Card(result.suit,parseInt(result.value));
//
//
//        // Now I just made one value array;
//
//        //cardsCombination.push(oneCard);
//        var isLegal = deleteHand(player , cardsCombination);  // -1 means not legal
//        // if want he want to play is not legal. Tell him.
//        if (isLegal === -1){
//            callback(-1);
//        }
//        else{
//            //debug(5);
//            updateHand(player);
//            player.broadcast.to(player.game).emit('otherTricks',result,gameInfo.dealer);
//            player.emit('otherTricks',result,gameInfo.dealer);
//            //next
//            gameInfo.dealer = ((gameInfo.dealer + 1)%4);
//            player.emit('stop');
//            player.broadcast.to(player.game).emit('stop');
//            callback(1);
//        }
//    })
//}
//
//
//function countCardsinHand(player){
//    var num =0;
//    for(var i =0;i<5;i++){
//        num += player.suit[i].length;
//    }
//    return num;
//}
//
//
//function one_round(players,gameInfo, callBack){
//    // set them all not able to submit information.
//    console.log('one_round');
//    if(gameInfo.count < 4){
//        var i = gameInfo.dealer;
//        //debug(9);
//        do_trick(players[i],gameInfo,function(result){
//            //debug(88);
//            if(result === 1){
//                //debug(3);
//                gameInfo.count++;
//                i = gameInfo.dealer;
//                players[i].emit('go');
//                players[i].broadcast.to(players[i].game).emit('stop');
//                one_round(players,gameInfo ,callBack);
//            }
//            else if(result === -1){
//                debug(11)
//                players[i].emit('DoAgain');
//                //players[i].broadcast.to(players[i].game).emit('stop');
//                //one_round(players,gameInfo ,callBack);
//            }
//            else{
//                debug(result);
//                debug(99);
//
//            }
//        })
//    }
//    else{
//        console.log('One loop done');
//        gameInfo.cardsLeft = countCardsinHand(players[0]); //everyone has same number of cards
//        callBack(gameInfo.cardsLeft);
//    }
//
//}
//
//function playing(players,gameInfo){
//    console.log('OK. please start your trick');
//    var done = false;
//
//    gameInfo.count = 0;
//    var i = gameInfo.dealer;
//    players[i].emit('go');
//    players[i].broadcast.to(players[i].game).emit('stop');
//    //player.broadcast.to(player.game).emit('otherTricks',result);
//    one_round(players,gameInfo,function(result){
//        if(result === 104 ){
//            //this game is done
//
//        }
//        else{
//            // go to next round
//            debug('next round');
//            playing(players,gameInfo);
//        }
//    });
//}



//function sortCards(players){
//
//    //ALL_SUIT 'spades','hearts','diamonds','clubs','jokers'
//    for(var k = 0 ; k <4 ;k++){
//        for(var i=0 ; i< players[k].cards.length ; i++){
//            for(var j =0 ; j < ALL_SUIT.length ; j++){
//                if(ALL_SUIT[j] === players[k].cards[i].suit){
//                    players[k].suit[j].push(players[k].cards[i]);
//                }
//            }
//        }
//        for(var i =0 ;i<ALL_SUIT.length; i++){
//            players[k].suit[i].sort(function(a,b){return b.value - a.value });
//        }
//        //console.log('Hi, I am here gg');
//        updateHand(players[k]);
//    }
//
//}
