$(function(){ 
    $.fn.scrollAnimate = function(options){
        var settings = $.extend({
            offset : 0
        },options);

        this.click(function(){
            $('html,body').animate({
                scrollTop: $($(this).attr('href')).offset().top + settings.offset
            },500);
        });          
    };
}());
