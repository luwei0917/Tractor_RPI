function connect_to_server ()
{
    socket = io.connect();
    socket.on('connect', function(){
        this.state = 'connecting';
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
}


function send_msg(type, msg)
{
    socket.emit(type, msg);
}

