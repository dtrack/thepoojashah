(function() { "use strict";


    /***********************************/
	/*Swiper Slider*/
	/**********************************/

    var swipers = [];
    var winW = $(window).width();
    var winH  =  $(window).height();
	var xsPoint = 700, smPoint = 991, mdPoint = 1199;
	var initIterator = 0;

    function swiperInit(){
		var _this,
			spanwipers = $('.swiper-container');

		for (var i = spanwipers.length - 1; i >= 0; i--) {

			_this = spanwipers[i];

			var $th = $(_this);
			var index = $th.attr('id');
				$th.addClass('swiper-'+index + ' initialized').attr('init-attr', 'swiper-'+index);
				$th.find('.pagination').addClass('pagination-'+index);

				var autoPlayVar = parseInt($th.attr('data-autoplay'),10);
				var slidesPerViewVar = $th.attr('data-slides-per-view');
			    var loopVar = parseInt($th.attr('data-loop'),10);
			    var mouseVar = parseInt($th.attr('data-mouse'),10);
			    var sliderSpeed = parseInt($th.attr('data-speed'),10);
			    var touchVar = parseInt($th.attr('data-touch'),10);
			    var xsValue, smValue, mdValue, lgValue;
			    var slideMode =  $th.attr('data-mode');
			    if(slidesPerViewVar == 'responsive'){
					xsValue = parseInt($th.attr('data-xs-slides'),10);
					smValue = parseInt($th.attr('data-sm-slides'),10);
					mdValue = parseInt($th.attr('data-md-slides'),10);
					lgValue = parseInt($th.attr('data-lg-slides'),10);
					slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
                } else slidesPerViewVar = parseInt(slidesPerViewVar,10);

				swipers ['swiper-'+index] = new Swiper('.swiper-'+index,{
					speed: sliderSpeed,
					loop: loopVar,
					mode: slideMode,
					grabCursor: true,
					pagination: '.pagination-'+index,
					paginationClickable: true,
					autoplay: autoPlayVar,
					autoplayDisableOnInteraction: true,
					slidesPerView: slidesPerViewVar,
					keyboardControl: true,
					simulateTouch: touchVar,
					calculateHeight: true,
					mousewheelControl: mouseVar,
					onInit: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($th.closest('#slider').length) {
                     	$('.points').on('click', function(){
                        	var eqIndex = $('.points').index(_this);
                            $('.points').removeClass('act');
							$('.absolut-point').css({'left': $th.offset().left -$th.parent().offset().left});
                            $th.addClass('act');
                            swiper.swipeTo(eqIndex);
                            swiper.stopAutoplay();
                            return false;
                        });
					}
					if($th.closest('.main-slider').length){
						$th.closest('.slider-wrap').find('.main-slider .swiper-slide').removeClass('active');
						$th.closest('.slider-wrap').find('.main-slider .swiper-slide').eq(activeIndex).addClass('active');
					}
					},
					onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($th.closest('.testi-slider-app').length){
						$th.closest('.client-app').find('.clients-slider .logotype-clients').removeClass('active');
						$th.closest('.client-app').find('.clients-slider .logotype-clients').eq(activeIndex).addClass('active');
					}
				    if($th.closest('.menu-slider').length){
					    $th.closest('.rest-menu').find('.res-point').removeClass('active');
						$th.closest('.rest-menu').find('.res-point').eq(activeIndex).addClass('active');
					}

				    },
					onSlideChangeEnd: function(swiper){
						var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
						if($th.closest('.career-slider').length){
						   $th.closest('.car-home').find('.career-point').removeClass('active');
							$th.closest('.car-home').find('.career-point').eq(activeIndex).addClass('active');
						}
					    if($th.closest('.main-slider').length){
							$th.closest('.slider-wrap').find('.main-slider .swiper-slide').removeClass('active');
							$th.closest('.slider-wrap').find('.main-slider .swiper-slide').eq(activeIndex).addClass('active');
						}
					}
				});

			swipers['swiper-'+index].reInit();
		    initIterator++;

	    };

	 }

	$('.slide-prev').on('click', function(){
    	swipers['swiper-'+$(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipePrev();

    	return false;
    });

    $('.slide-next').on('click', function(){
    	swipers['swiper-'+$(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipeNext();

    	return false;
    });

	function updateSlidesPerView(xsValue, smValue, mdValue, lgValue){
        if(winW > mdPoint) return lgValue;
        else if(winW>smPoint) return mdValue;
        else if(winW>xsPoint) return smValue;
        else return xsValue;
    }


	/***********************************/
	/*TABS FAQ*/
	/**********************************/

	var tabFinish = 0;
	$('.nav-tab-item').on('click',  function(){
	    var $t = $(this);
	    if(tabFinish || $t.hasClass('active')) return false;
	    tabFinish = 1;
	    $t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
	    $t.addClass('active');
	    var index = $t.parent().parent().find('.nav-tab-item').index(this);
	    $t.closest('.tab-wrapper').find('.tab-info:visible').fadeOut(500, function(){
	        $t.closest('.tab-wrapper').find('.tab-info').eq(index).fadeIn(500, function() {
	            tabFinish = 0;
	        });
	    });

	    return false;
	});

	/***********************************/
	/*MOBILE MENU*/
	/**********************************/

	$('.nav-menu-icon a').on('click', function() {
	    if ($('nav').hasClass('slide-menu')){
			$('nav').removeClass('slide-menu');
		    $(this).removeClass('active');
	    }else {
			$('nav').addClass('slide-menu');
		    $(this).addClass('active');
	    }

		return false;
	 });

	if ($(window).width()<992){
		$('.menu > ul > li > a > .fa').on('click', function(){
		    if ($(this).parent().parent().find('.dropmenu').hasClass('slidemenu')) {
				$(this).parent().parent().find('.dropmenu').removeClass('slidemenu');
		    }else{
			    $('.menu > ul > li > a').parent().parent().find('.dropmenu').removeClass('slidemenu');
			    $(this).parent().parent().find('.dropmenu').addClass('slidemenu');
		    }

			return false;
		});

		$('.submenu').on('click', function(){
			if($(this).parent().find('ul').hasClass('slidemenu')){
				$(this).parent().find('ul').removeClass('slidemenu');
			}else{
				$('.submenu').parent().find('ul').removeClass('slidemenu');
			    $(this).parent().find('ul').addClass('slidemenu');
			}

			return false;
		});
	}

    $('.second-menu').on('click' , function(){
	    $('.right-menu').addClass('slides');
		$('.close-menu').addClass('active');
	    $('body').addClass('act');

		return false;
	});

	$('.close-menu, .layer-dark').on('click' , function(){
		$('.right-menu').removeClass('slides');
	    $('.close-menu').removeClass('active');
	    $('body').removeClass('act');

		return false;
	});


    $('.intro-scroll-down').on('click', function(){
		$('body, html').animate({'scrollTop':$('.full-width').offset().top});
	});

	/***********************************/
	/*GOOGLE MAP*/
	/**********************************/

	function initialize(obj) {
		var stylesArray = {
			'style-1' : {
	    		'style': [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
			}
		}

		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = $('#'+obj).attr("data-marker");
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"),10);
		var styles = stylesArray[$('#map-canvas-contact').attr("data-style")]['style'];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}

		map = new google.maps.Map(document.getElementById(obj), mapOptions);

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');

		infowindow = new google.maps.InfoWindow({
			content: contentString
		});


        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

	}

	/***********************************/
	/*DROPDOWN LIST*/
	/**********************************/

	$('.drop').on( "click", function() {
		if($('.drop-list').hasClass('act')){
			$(this).find('.drop-list').removeClass('act');
			$(this).find('span').slideUp(300);
		}else{
           $('.drop span').slideUp(300);
			$(this).find('.drop-list').addClass('act');

			$(this).find('span').slideDown(300);
		}

		return false;
	});

    $('.filter-drop .but').on( "click", function() {
		$(this).parent().parent().find('.change').text($(this).text());
		$('.drop').find('span').slideUp(300);
	});

	/***********************************/
	/*BOOTSTRAP SLIDER*/
	/**********************************/

	if($('.h-slider').length){
		$('.h-slider').slider({
			range: true,
			values: [50, 67]
		});
	}

	/***********************************/
	/*ACCORDIONS*/
	/**********************************/

	var allPanels = $(".accordion > dd").hide();
    allPanels.first().slideDown("easeOutExpo");
    $(".accordion > dt > a").first().addClass("active");

    $(".accordion > dt > a").on('click', function(){

		var current = $(this).parent().next("dd");
	    $(".accordion > dt > a").removeClass("active");
	    $(this).addClass("active");
	    allPanels.not(current).slideUp("easeInExpo");
	    $(this).parent().next().slideDown("easeOutExpo");

	    return false;

    });

	var allToggles = $(".toggle > dd").hide();

    $(".toggle > dt > a").on('click', function(){

        if ($(this).hasClass("active")) {

            $(this).parent().next().slideUp("easeOutExpo");
            $(this).removeClass("active");

        }
        else {
            var current = $(this).parent().next("dd");
            $(this).addClass("active");
            $(this).parent().next().slideDown("easeOutExpo");
        }

        return false;
	});

	$('.s-icon').on('click', function(){
		if ($('.s-field').hasClass('slide')){
	    	$('.s-field').removeClass('slide');
	    }else{
	    	$('.s-field').addClass('slide');
	    }

	  	return false;
	});

	/***********************************/
	/*WINDOW SCROLL*/
	/**********************************/

	$(window).scroll(function() {

	    if ($(this).scrollTop() >= 80) {
			$('header').addClass('scrol');
		}else{
			$('header').removeClass('scrol');
		}
	    if ($('.time-line').length) {

			var time_line = $('.time-line').not('.animated');

		   	for (var i = time_line.length - 1; i >= 0; i--) {

		   		if($(window).scrollTop() >= $(time_line[i]).offset().top-$(window).height()*0.5)
		   		{$(time_line[i]).addClass('animated').find('.timer').countTo();}
		   	}

		}

		if ($('.start-line').length){
			if($(window).scrollTop() >= $('.start-line').offset().top - $('.start-line').height()){

				var skill_line = $('.skill-line div');

				for (var i = skill_line.length - 1; i >= 0; i--) {

				 	var objel = $(skill_line[i]);
				 	var pb_width = objel.attr('data-width-pb');
				 	objel.css({'width':pb_width});

				}
			}
		}

		if ($(window).scrollTop() >= 100){
			$('header').addClass('fix');
		}else {
			$('header').removeClass('fix');
		}

		var margRight = ($(window).width()-$('.container').innerWidth())/2;
		var margTop =  $('header').height();

		if ($(window).width() > 992){
			if ($(window).scrollTop() >= $('.top-baner.half-height').height()){
				$('.fixed-detail-panel').addClass('fix').css({"right": margRight , "margin-top": margTop});
			}else{
				$('.fixed-detail-panel').removeClass('fix').css({"right":"0","margin-top":"auto"});
			}
		}

	});

	/***********************************/
	/*WINDOW RESIZE*/
	/**********************************/

	function resizeCall() {
		winW = $(window).width();
   		winH = $(window).height();

   		var swiper_container = $('.swiper-container[data-slides-per-view="responsive"]');

   		for (var i = swiper_container.length - 1; i >= 0; i--) {

			var $th = $(swiper_container[i]);
			var xsValue = parseInt($th.attr('data-xs-slides'),10);
			var smValue = parseInt($th.attr('data-sm-slides'),10);
			var mdValue = parseInt($th.attr('data-md-slides'),10);
			var lgValue = parseInt($th.attr('data-lg-slides'),10);
			var currentSwiper = swipers[$th.attr('init-attr')];
			var newSlideNumber = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
			currentSwiper.params.slidesPerView = newSlideNumber;
			currentSwiper.reInit();

   		}

    }

    $(window).resize(function(){
        resizeCall();
    });

	window.addEventListener("orientationchange", function() {
        resizeCall();
    }, false);

	/***********************************/
	/*WOW PLUGIN*/
	/**********************************/

	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
		});

	if ($(window).width()>992){
		wow.init();
	}

	/***********************************/
	/*MULTI SCROLL PLUGIN*/
	/**********************************/

	if ($('.multiscroll').length){
		$(function(){
			$('.multiscroll').multiscroll({
				navigation: true,
				loopBottom: true,
				loopTop: true,
				scrollingSpeed: 700,
				easing: 'easeInQuart'
			});

		});
	}

	/***********************************/
	/*POPUP*/
	/**********************************/

	if ($('.popup-gallery').length) {
		$('.popup-gallery').magnificPopup({
			delegate: '.view-item',
			type: 'image',
			removalDelay: 100,
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-fade',
			closeBtnInside: false,
			gallery: {
				enabled: true,
			},
			callbacks: {
              	beforeOpen: function() {
                	this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
            	}
            }

		});
	}


	/***********************************/
	/*TEXT ROTATOR*/
	/**********************************/

	if ($('.rotator').length){
		$('.rotator').textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});
	}

	/***********************************/
	/*WINDOW LOAD*/
	/**********************************/

    $(window).load(function() {
		swiperInit();
	    if ($('.izotope-container').length) {
			var $container = $('.izotope-container');
            $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                	columnWidth: '.grid-sizer'
                }
            });
			// setup original filter value
			var filterValue = $('#filters .activbut').attr('data-filter');
			$container.isotope({filter: filterValue});

			$('#filters').on('click', '.but', function() {

			 	var izotope_container = $('.izotope-container');

			 	for (var i = izotope_container.length - 1; i >= 0; i--) {
			 		$(izotope_container[i]).find('.item').removeClass('animated');
				}

				$('#filters .but').removeClass('activbut');
				$(this).addClass('activbut');
				var filterValue = $(this).attr('data-filter');
				$container.isotope({filter: filterValue});

				return false;
			});
        }

	   	if($('#map-canvas-contact').length==1){
	    	initialize('map-canvas-contact');
	    }

	});

	/***********************************/
	/*ANIMSITION PLUGIN FOR PAGE TRANSITION*/
	/**********************************/

	if($(".animsition").length){
	    $(".animsition").animsition({
			inClass               :   'fade-in',
			outClass              :   'fade-out',
			inDuration            :    1000,
			outDuration           :    1000,
			linkElement           :   '.animsition-link',
			   // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
			loading               :    false,
			loadingParentElement  :   'body',
			loadingClass          :   'animsition-loading',
			unSupportCss          : [ 'animation-duration',
									  '-webkit-animation-duration',
									  '-o-animation-duration'
									]
	    });
	}

	$('.submit span').on('click', function(){
		$('.search-form').toggleClass('act');

		return false;
	});
	$('.submit-button').on('click' , function(){
		if ($(this).closest('.search-form').find('.text-input').val() == ''){
			$('.search-form').removeClass('act');
		}

		return false;
	});



})(jQuery);
