
function connect_to_server ()
{
    socket = io.connect();
    socket.on('connect', function(){
        this.state = 'connecting';
    }.bind(this));
    socket.on('uid', function(data){
        $('#gametitle').fadeOut();
        $('#input1').fadeOut();
        $('#inputbutton').fadeOut();
        console.log(data);
    });
    socket.on('msg', function(data) {
        //$('#servermsg').text('server got ' + data);
    })
    socket.on('nickname', function(data){
        $('#welcomemsg').append('<p>Hello, ' + data + '</p>');
        $('#welcomemsg').show();
        $('#tractor').show();
        $('#tractor').animate({left:'+=50px'});
    })
};


function send_msg(type, msg)
{
    socket.emit(type, msg);
}
