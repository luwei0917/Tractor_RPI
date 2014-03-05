$(document).ready(function(){


    var convert = ['X','A','2','3','4','5','6','7','8','9','10','J','Q','K'];

//
//    (function( $ ){
//        $.fn.myfunction = function(context,ccc) {
//            //alert('hello world');
//            $('#servermsg').text(ccc);
//
//            //alert(value);
//            //alert(suit);
//            var suit = 'nothing';
//            var value = -1;
//            //var divarray = [];
//            for(var i =0 ;i<context.length;i++){
//                var $temp = $('<div>',{id:i.toString(), class:"cards"});
//                //$($temp).attr('left','0');
//                //document.getElementById("card"+i).style.left = parseString((-50)*i)+"px";
//                $($temp).css('left',(i*15).toString()+"px");
//                //$($temp).attr('position','absolute');
//
//                //divarray.push($temp);
//                //ALL_SUIT =['spades','hearts','diamonds','clubs','jokers'];
//                if(context[i].suit === "jokers"){
//                    if(context[i].value === 1){
//                        suit = 's' //little joker
//                        value = 'JOKER';
//                    }
//                    else{
//                        suit = 'h'; //big joker
//                        value= 'JOKER';
//                    }
//                }
//                else{
//                    suit = context[i].suit;
//                    value = convert[context[i].value];
//                }
//
//                $temp.append(Poker.getCardImage(100,suit,value));
//                $('#overlay').append($temp);
//            }
//            $('.cards').click(function(){
//                //alert(this.id);
//                if ($(this).hasClass('select')){
//                    $(this).animate({top:'+=20px'},1);
//                    $(this).removeClass('select')
//                }else{
//                    $(this).animate({top:'-=20px'},1);
//                    $(this).addClass('select')
//                }
//            });
//            return this;
//        };
//    })( jQuery );
//

    $.fn.myfunction = function(context,ccc) {
        //alert('hello world');
        $('#servermsg').text(ccc);

        //alert(value);
        //alert(suit);
        var suit = 'nothing';
        var value = -1;
        //var divarray = [];
        for(var i =0 ;i<context.length;i++){
            var $temp = $('<div>',{id:i.toString(), class:"cards"});
            //$($temp).attr('left','0');
            //document.getElementById("card"+i).style.left = parseString((-50)*i)+"px";
            $($temp).css('left',(i*15).toString()+"px");
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

            $temp.append(Poker.getCardImage(100,suit,value));
            $('#overlay').append($temp);
        }
        $('.cards').click(function(){
            //alert(this.id);
            if ($(this).hasClass('select')){
                $(this).animate({top:'+=20px'},1);
                $(this).removeClass('select')
            }else{
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