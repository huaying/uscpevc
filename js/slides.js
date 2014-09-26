$(function(){
    var  index = 0
        ,$this = $('.slide')
        ,$btn_prev = $('.slide-prev')
        ,$btn_next = $('.slide-next')
        ,$slide = $this.children('li')
        ,length = $slide.size()
        ,waitTime = 5000
        ,fadeTime = 600
        ,rotate
        ,visibleClass = "slides_on"
        
        ,visible = {"float": "left", "position": "absolute", "opacity": 1, "zIndex": 2}
        ,hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1}
    
        ,startCycle = function(){
            rotate = setInterval(function(){
                var idx = (index + 1 < length) ? (index + 1) : 0; 
                slideTo(idx);
        
            },waitTime);
        }    
        ,stopCycle = function(){
            clearInterval(rotate);
        }
        
        ,slideTo = function(idx){


            $slide
                .stop()
                .fadeOut(fadeTime, function(){
                    $btn_prev.hide();
                    $btn_next.hide();
                    $this
                        .removeClass(visibleClass)
                        .css(hidden)
                        .css("opacity",1)
                })
                .eq(idx)
                .fadeIn(fadeTime,function(){
                    $this
                        .addClass(visibleClass)
                        .css(visible);
                    index = idx;
                    $btn_prev.show();
                    $btn_next.show();
                })
            
        }
        

        $btn_prev.click(function(e){
            e.preventDefault();
            
            var idx = (index < 1) ? (length - 1) : (index - 1); 
            stopCycle();
            slideTo(idx);
            startCycle();
            
        });
        
        $btn_next.click(function(e){
            e.preventDefault();

            var idx = (index + 1 < length) ? (index + 1) : 0; 
            stopCycle();
            slideTo(idx);
            startCycle();
        });
        
        
        $('html').css({'overflow':'hidden'});
        startCycle();
});
