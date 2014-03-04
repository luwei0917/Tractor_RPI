$(document).ready(function(){
    var convert = ['1','2','3','4','5','6','7','8','9','10','j','q','k'];
    //-------------------------
    //IMPORTANT
    //I will give you a free lunch if you capture this sentence and send to me.
    //If you don't do it by March 3rd. You have to give me a free dinner (I choose where to eat).
    //This contract takes effect when it is uploaded online.
    //Who do not abey this, is a lazy person.(I mean you ZNY).

    (function( $ ){
        $.fn.myfunction = function(context,ccc) {
            //alert('hello world');
            $('#servermsg').text(ccc);

            //alert(value);
            //alert(suit);
            var suit = 'nothing';
            var value = -1;
            var divarray = [];
            for(var i =0 ;i<context.length;i++){
                var $temp = $('<div>',{id:"card"+i,class:"cards"});
                //$($temp).attr('left','0');
                //document.getElementById("card"+i).style.left = parseString((-50)*i)+"px";
                $($temp).css('left',(i*15).toString()+"px");
                //$($temp).attr('position','absolute');

                divarray.push($temp);
                suit = context[i].suit;
                value = context[i].value;
                $temp.append(Poker.getCardImage(100,suit,convert[value]));
                $('#overlay').append($temp);
            }
            return this;
        };
    })( jQuery );




    connect_to_server();
    var $div1 = $('<div>',{id:"card1"});
    var $div2 = $('<div>',{id:"card2"});


    $("div").click(function(){
        alert('ID:'+this.id);
    });

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

    $div1.append(Poker.getCardImage(100,'hearts','q'));
    $div2.append(Poker.getCardImage(100,'d','k'));

//    $('#overlay').append($div1);
//    $('#overlay').append($div2);

    $('#canvas').click(function(){
        $div1.removeClass('select');
        $div1.css('top',0);
        $div1.remove();
    })
    $('#showcard').click(function(){
        $('#overlay').append($div1);
    })

})