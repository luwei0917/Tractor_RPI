
function connect_to_server ()
{
    socket = io.connect();
    socket.on('connect', function(){
        this.state = 'connecting';
    }.bind(this));
    socket.on('uid', function(data){
        console.log(data);
        $('#welcomemsg').append('<p>hello user ' + data['hello'] + '</p>');
        $('#welcomemsg').show();
    });
    socket.on('msg', function(data) {
        $('#servermsg').text('server got ' + data);
    })
};


function send_msg(type, msg)
{
    socket.emit(type, msg);
}
