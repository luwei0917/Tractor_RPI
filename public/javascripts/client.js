var mycards = [];
var myturn = false;
function connect_to_server ()
{
    socket = io.connect();
    socket.on('connect', function(){
        this.state = 'connecting';
        mycards = new Array();
    });


    socket.on('uid', function(data){
        console.log(data);
        $('#welcomemsg').append('<p>hello user ' + data['hello'] + '</p>');
        $('#welcomemsg').show();
    });

    socket.on('msg', function(data) {
        $('#servermsg').text('server got ' + data);
    })

    socket.on('message', function(message) {
        $('#servermsg').text('server said ' + message);
    })

    socket.on('newcard', function(message) {
        mycards.push(message);
        $('#servermsg').text('I got card ' + message.suit+' ' + message.value);
        //console.log(message.value);
        console.log(mycards.length);

//        if (mycards.length === 27){
//            // $('#servermsg').text(mycards.valu);
//            var ccc = '';
//            for (var i = 0; i < 27; i++){
//                ccc += (mycards[i].suit + ' '+ mycards[i].value + ' , ' )
//            }
//            $('#servermsg').text(ccc);
//
//        }
    })


    socket.on('updateHand', function(message) {
        console.log(message.length);
        console.log(message);
        var ccc = 'This Round  ';
        for(var i=0;i<message.length; i++){
            ccc += (message[i].suit + ' '+ message[i].value + ' , ' )
        }
        //$('#servermsg').text(ccc);
        $('#servermsg').myfunction(message,ccc);
        //socket.removeListener('updateHand');
    })

    socket.on('otherTricks', function(message,num) {
        $('#trick').append('<p>' +'player '+num +' plays '+ '</p>');
        for(var i=0;i<message.length; i++){
            $('#trick').append(message[i].suit+' '+ message[i].value + '\t');
        }
        $('#trick').append('<p> </p>')
        //$('#servermsg').
        //
        //text(ccc);
        display_used_cards(message, num);
    })

    socket.on('initial', function() {
        $('#welcomemsg').text(' ');
        $('#trick').text(' ');
    })
    socket.on('DoAgain', function() {
        $('#gogogo').text('Not legal, try again');
        //$('trick').text('hahahaha');
    })

    socket.on('stop',function(){
        myturn = false;
        $('#gogogo').text('Not your turn');
    })

    socket.on('go',function(){
        myturn = true;
        $('#gogogo').text('you can go');
    })

    socket.on('dealer',function(){
        $('#position').text('you are dealer');
    })
    socket.on('defender',function(){
        $('#position').text('you are defender');
    })
    socket.on('attacker',function(){
        $('#position').text('you are attacker');
    })
    socket.on('declaration',function(){
        $('#position').append('<p>' + '    You can choose the dominant suit'  +'</p>');
    })


}



function send_msg(type, msg)
{
    socket.emit(type, msg);
}

