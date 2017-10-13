// AI技术hover效果
(function () {
    // var $aContentShow = $('.ai-teck .context-show');
    var $aServerItem = $('.ai-teck .sever-item');
    $aServerItem.hover(function () {
        $(this).find('.detail-wrap').stop().animate({
            'top': '-300px'
        });
        $(this).find('.context-show').stop().animate({
            'top': '-20px'
        });
    },function () {
        $(this).find('.detail-wrap').stop().animate({
            'top': '18px'
        });
        $(this).find('.context-show').stop().animate({
            'top': '300px'
        });
    })
})();

// AI生态平台动画
(function () {
    var $oIntroduce = $('.ai-ecol-platform .introduce');
    var $oNephogram = $('.ai-ecol-platform .nephogram');
    $oIntroduce.hover(function(){
        $(this).find('.list-wrap').stop().slideDown(500);
        $(this).find('.info-main').stop().slideUp(500);
        $(this).parent().find('.nephogram').stop().animate({
            'width': '370px'
        },500).find('.cover-wrap').stop().animate({
            'width': '262px'
        },500).find('.list-wrap').stop().slideUp(500).parent().find('.info-main').stop().slideDown(500);
        $(this).stop().animate({
            'width': '820px'
        },500).find('.cover-wrap').stop().animate({
            'width': '712px'
        },500);
    },function(){});
    $oNephogram.hover(function(){
        $(this).find('.list-wrap').stop().slideDown(500);
        $(this).find('.info-main').stop().slideUp(500);
        $(this).parent().find('.introduce').stop().animate({
            'width': '370px'
        },500).find('.cover-wrap').stop().animate({
            'width': '262px'
        },500).find('.list-wrap').stop().slideUp(500).parent().find('.info-main').stop().slideDown(500);
        $(this).stop().animate({
            'width': '820px'
        },500).find('.cover-wrap').stop().animate({
            'width': '712px'
        },500);
    },function(){});
})();

// // 技术优势动画
// (function(){
//     var $aFeature = $('.teck-advantage .feature');
//     $aFeature.hover(function(){
//         $(this).find('.ball').stop().animate({
//             'opacity': 1,
//             'right': '0px'
//         },300,function(){
//             $(this).css({
//                 'opacity':0,
//                 'right': '111px'
//             });
//         });
//     },function(){
//         $(this).find('.ball').stop().css({
//             'opacity':0,
//             'right': '111px'
//         });
//     });
// })();

// 合作伙伴
(function(){
    var $aPartners = $('.partners .name');
    $aPartners.hover(function(){
        var y = parseInt($(this).css('background-position-y'));
        // console.log(y);
        $(this).css({
            'background-position-y': (y-163)+'px'
        })
    },function(){
        var y = parseInt($(this).css('background-position-y'));
        // console.log(y);
        $(this).css({
            'background-position-y': (y+163)+'px'
        })
    })
})();

// 返回顶部
(function(){
    var $backTop = $('.back-top');
    $(window).scroll(function(){
        // console.log($(window).scrollTop())
        if($(window).scrollTop()>200){
            $backTop.stop().fadeIn(200);
        } else {
            $backTop.stop().fadeOut(200);
        }
    });
    $backTop.click(function(){
        $('body,html').animate({'scrollTop':0},500);
        return false;
    })
})();