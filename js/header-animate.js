$(function(){
    var prev = 0,scroll_pos;
    $(window).scroll(function(){
        scroll_pos = $(window).scrollTop()
        if(scroll_pos > 0){
            if(prev == 0){
                $('header').animate({height:"60px"},'100');
                $('#logo-pic').animate({height:"50px",margin:"-4px"},'100');
                $('header .main-nav ul').animate({margin:"20px"});
                $('#header-cf').removeClass("clearfix");
            }
        }else{
            $('header').stop().css("height","120px");
            $('#logo-pic').stop().css({"height":"103","margin":"0"});
            $('header .main-nav ul').stop().css("margin","");
            $('#header-cf').addClass("clearfix");
        }    
        prev = scroll_pos;
    });
});
