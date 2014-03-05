var chosen = [];
$(document).ready(function(){

    $(".cards").empty();
    var convert = ['X','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
//
//    function send(){
//        var list = [];
//        if(mycards.length != chosen.length){
//            alert("A oh");
//        }
//        for(var i =0 ; i<chosen.length ; i++){
//            if(chosen[i]){
//                list.push(mycards[i]);
//            }
//        }
//        send_msg ('usecard', list);
//    }

    $.fn.myfunction = function(context,ccc) {
        //alert('hello world');
        $('#servermsg').text(ccc);
        mycards = context;
        //alert(value);
        //alert(suit);
        chosen = [];
        var suit = 'nothing';
        var value = -1;

        for(var i =0 ;i<context.length;i++){
            var $temp = $('<div>',{id:i.toString(), class:"cards"});
            //$($temp).attr('left','0');
            //document.getElementById("card"+i).style.left = parseString((-50)*i)+"px";
            $($temp).css('left',(i*20).toString()+"px");
            //$($temp).attr('position','absolute');

            //divarray.push($temp);
            //ALL_SUIT =['spades','hearts','diamonds','clubs','jokers'];
            if(context[i].suit === "jokers"){
                if(context[i].value === 1){
                    suit = 's' //little joker
                    value = 'JOKER';
                }
                else{
                    suit = 'h'; //big joker
                    value= 'JOKER';
                }
            }
            else{
                suit = context[i].suit;
                value = convert[context[i].value];
            }
            chosen.push(0);
            $temp.append(Poker.getCardImage(100,suit,value));
            $('#overlay').append($temp);
        }
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
        return this;
    };


    connect_to_server();


//    $(".cards").each(function(){
//        this.click(function(){
//            alert("ID: "+this.id);
//        });
//    });
    //$('#showcard').text('got a Heart Queen!');
    //if (this.hasClass('select')){
    //    this.animate({top:'+=20px'},'fast');
    //    this.removeClass('select')
    //}else{
    //    this.animate({top:'-=20px'},'fast');
    //    this.addClass('select')
    //}
//
//    });
//
//    $($div2).each(function(){
//        this.click(function(){
//            $('#showcard').text('got a Diamond King!');
//            if ($div2.hasClass('select')){
//                $div2.animate({top:'+=20px'},'fast');
//                $div2.removeClass('select')
//            }else{
//                $div2.animate({top:'-=20px'},'fast');
//                $div2.addClass('select')
//            }
//        });
//    });

    //document.body.appendChild(Poker.getCardImage(100,'hearts','q').attr('id', 'hqq'));
//
//    document.body.appendChild(Poker.getCardImage(100,'clubs','4'));
//    document.body.appendChild(Poker.getBackCanvas(100, '#7A7BB8', '#2E319C'));
//    var canvas =document.getElementById('canvas').getContext('2d');
//    canvas.drawPokerCard(0,0,100,'hearts','6');
//    canvas.drawPokerCard(20,0,100);


//    $('#overlay').append($div1);
//    $('#overlay').append($div2);
//
//    $('#canvas').click(function(){
//        $div1.removeClass('select');
//        $div1.css('top',0);
//        $div1.remove();
//    })
//
//    $('#showcard').click(function(){
//        $('#overlay').append($div1);
//    })

})