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
        send_msg ('input', $('#input1').val());
        $('#input1').val('')
    })
    $('#input1').keypress(function(k) {
        if (k.which === 13)
        {
             send_msg ('input', $('#input1').val());
            $('#input1').val('')
        }
        
    })

})