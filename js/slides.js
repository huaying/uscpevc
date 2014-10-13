$(function(){
    var  index = 0
        ,idx
        ,$this = $('.slide')
        ,$pager = $('.slide-indicators a')
        ,$slide = $this.children('li')
        ,length = $slide.size()
        ,waitTime = 5000
        ,fadeTime = 600
        ,rotate
        ,visibleClass = "slides_on"
        
        ,visible = {"float": "left", "position": "relative", "opacity": 1, "zIndex": 2}
        ,hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1}
    
        ,startCycle = function(){
            rotate = setInterval(function(){
                idx = (index + 1 < length) ? (index + 1) : 0; 
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
                    $pager.hide();
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
                    pagerTo(idx);
                    $pager.show();
                })

            
        }
        ,pagerTo = function(idx){
            $pager.removeClass('current');
            $($pager[idx]).addClass('current');
        
        }
        ,imgScale = function(img){
            var $this = $(img),
                ori_h = img.ori_height,
                ori_w = img.ori_width,
                ori_aspect_ratio = img.ori_aspect_ratio,

                h = $this.height(),
                w = $this.width(),
                aspect_ratio = h / w
                    ;

            if(aspect_ratio > ori_aspect_ratio){
                $this.css('width', h / ori_aspect_ratio);
            }else{
                $this.css('height', w * ori_aspect_ratio);
            }

            $this.css({
                left : (w - $this.width())/2 ,
                top :  (h - $this.height() )/2
            });

        }

        
        $(window).resize(function(){
            setTimeout(function(){
            
            var $container = $(".slide"),
                $img = $(".slide .slide-img img"),
                est_pic_h = window.innerHeight-120,
                est_pic_w = window.innerWidth,
                init = true
                ;

           $container.css({
                position: 'relative',
                width:'100%',
                overflow:'hidden',
                height:est_pic_h
           });

           $img.css({
                width: est_pic_w,
                height: est_pic_h,
           });
           
           $img.each(function(){
                var that = this;
                if(!$.data(this,'loaded')){
                    var img = new Image();
                    img.onload = function(){
                        that.ori_width = this.width;
                        that.ori_height = this.height;
                        that.ori_aspect_ratio = that.ori_height / that.ori_width; 
                        imgScale(that);
                        $.data(that,'loaded',true);
                    };
                    img.src = this.src;
                }else{
                    imgScale(this);
                }
           });
           if(init) init = false;
            
           },10);
        });

        $pager.click(function(e){
            e.preventDefault();
            var idx = parseInt($(this).text());
            stopCycle();
            slideTo(idx);
            startCycle();

        });

            startCycle();
            $(window).trigger('resize');
});
