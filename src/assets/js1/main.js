

  $(window).on('load', function () {
    $(".ct_loader_main").hide();
    });

    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
         //>=, not <=
        if (scroll >= 300) {
            //clearHeader, not clearheader - caps H
            $("header").addClass("ct_sticky_header");
        }
        else{
            $("header").removeClass("ct_sticky_header");
 
        }
    }); //missing );


$(document).ready(function(){
    $(".ct_nav_menu li a").click(function(){
        $('.ct_nav_menu li a').removeClass('active')
        $(this).addClass('active');
    })

    $('.ct_menu_bar').click(function(){
        $('.ct_nav_menu ul').addClass('ct_show_menu')
    })
    $('.ct_close_menu').click(function(){
        $('.ct_nav_menu ul').removeClass('ct_show_menu')
    })

    $('.ct_home_slider').owlCarousel({
        loop:true,
        nav:false,
        autoplay:true,
        autoplayTimeout:5000,
        animateOut: 'fadeOut',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
    AOS?.init();

})