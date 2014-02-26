$(document).ready(function(){

    $('#gamestart').click(function(){
        $('#gamestart').fadeOut('fast');
        connect_to_server();
    });

    $('#button1').click(function() {
        send_msg ('button', 'button1');
    });

    $('#gamestart p').mouseenter(function() {
        $('#gamestart p').css('color','yellow');
        //$('this').fadeOut('slow')
    }).mouseleave(function() {
            $('#gamestart p').css('color','violet');
            //$('this').fadeOut('slow')
        });

    $('#inputbutton').click(function() {
        if(myturn){
            var res = $('#input1').val().split(' ');
            var cd = {suit: res[0], value: res[1]};
            send_msg ('usecard', cd);
            $('#input1').val('')
        }
        else{
            $('#gogogo').text('Not your turn yet, Do not panic');
        }
    })
    $('#input1').keypress(function(k) {

        if (k.which === 13)
        {
            if (myturn){
                var res = $('#input1').val().split(' ');
                var cd = {suit: res[0], value: res[1]};
                send_msg ('usecard', cd);
                $('#input1').val('')
            }
            else{
                $('#gogogo').text('Not your turn yet, Do not panic');
            }
        }
    })

})