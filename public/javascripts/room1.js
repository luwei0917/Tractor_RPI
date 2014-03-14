var chosen = [];
$(document).ready(function () {

    $("#overlay").empty();

    var convert = ['X', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    $.fn.myfunction = function (context, ccc) {
        $(".cards").empty();
        $('#servermsg').text(ccc);
        mycards = context;
        //alert(value);
        //alert(suit);
        chosen = [];
        var suit = 'nothing';
        var value = -1;

        display_my_cards(context);
    };

    function parse_cards(context) {
        res = [];
        for (var i = 0; i < context.length; i++) {
            var $temp = $('<div>', {id: i.toString(), class: "cards"});
            //$($temp).css('left', (i * 20).toString() + "px");
            //$($temp).css('margin-left', -55 + "px");

            if (context[i].suit === "jokers") {
                if (context[i].value === 1) {
                    suit = 's' //little joker
                    value = 'JOKER';
                }
                else {
                    suit = 'h'; //big joker
                    value = 'JOKER';
                }
            }
            else {
                suit = context[i].suit;
                value = convert[context[i].value];
            }
            chosen.push(0);
            $temp.append(Poker.getCardImage(100, suit, value));
            res.push($temp);
        }
        return res;
    }

    function display_my_cards(context) {
        var parsed = parse_cards(context);
        parsed.forEach(function(e){
            $('#overlay').append(e);
            });

        $('.cards').click(function(){
            //alert(this.id);
            if ($(this).hasClass('select')){
                chosen[this.id] = 0;
                $(this).animate({top:'+=20px'},1);
                $(this).removeClass('select')
            }else{
                chosen[this.id] = 1;
                $(this).animate({top:'-=20px'},1);
                $(this).addClass('select')
            }
        });
    }

    function display_used_cards() {

    }

    connect_to_server();
});