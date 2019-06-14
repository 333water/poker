$(function () {
    let poker=[];
    let colorArr=['s','c','h','d'];
    let flag=[];
    let box=$('.box');

    for (let i=0;i<52;i++){
        let index=Math.floor(Math.random()*colorArr.length);
        let color=colorArr[index];
        let number=Math.round(Math.random()*12 + 1);

        while (flag[color+'_'+number]){
             index=Math.floor(Math.random()*colorArr.length);
             color=colorArr[index];
             number=Math.round(Math.random()*12 + 1);
        }

        poker.push({color,number});
        flag[color+'_'+number]=true;
    }


    let index=-1;
    for (let i=0;i<7;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj=poker[index];
            let lefts=350-50*i+100*j,tops=50*i;
            $('<div>')
                .addClass('poker')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .attr('id',i+'_'+j)
                .appendTo('.box')
                .data('number',obj.number)
                .delay(index*100)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    ////////////////////发牌////////////////////////////
    for (;index<52;index++){
        let obj=poker[index];
        $('<div>')
            .addClass('poker')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .attr('id','-2_-2')
            .appendTo('.box')
            .data('number',obj.number)
            .delay(index*80)
            .animate({left:0,top:480,opacity:1})
    }

    //////////////////看是否被压住//////////////////////
    let first=null;
    $('.box').on('click','.poker',function() {
        let _this=$(this);
        let [i,j]= _this.attr('id').split('_');
        let id1=i*1 + 1 + '_' + j*1;
        let id2=i*1 + 1 + '_' + (j*1 + 1);
        if ($('#'+id1).length||$('#'+id2).length){
            return ;
        }

        ///////////////////////////////点一下上去 再点一下下来//////////////////////////////////////
        if (_this.hasClass('active')){
            _this.removeClass('active').animate({top:'+=20px'})
        }else {
            _this.addClass('active').animate({top:'-=20px'});
        }

  //////////////////////////////判断点数////////////////////////////////////////////////////////
        if (!first){
            first=_this;
        } else {
            let num1=first.data('number'),num2=_this.data('number');
            if (num1===num2){
                $('.active').animate({top:0,left:710,opacity:0},function () {
                    $('.active').remove();
                })
            } else {
                $('.active').animate({top:'+=20px'},function () {
                    $(this).removeClass('active');
                })
            }
            first=null;
        }
    })


    let n=0;
    $('.rightBtn').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:710},function () {
            $(this).removeClass('left').addClass('right')
        })
    })

    $('.leftBtn').on('click',function () {
        $('.right').last().css('zIndex',n++).animate({left:0},function () {
            $(this).removeClass('right').addClass('left')
        })
    })

})