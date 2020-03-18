// "use strict";

$(function(){

	//lazyload
	var bLazy = new Blazy({
		// options
	});
	
	//popup
	$('.popup').on('click', function(e){
		e.preventDefault();
		$('.popup__overlay').show();
		$('body').css('overflow', 'hidden');
	});

	$('.popup__close').on('click', function(e){
		$('.popup__overlay').hide();
		$('body').css('overflow', 'initial');
	});

	// https://github.com/digitalBush/jquery.maskedinput
	$('input[type="tel"]').mask("+7 (999) 999-9999");


	//header-menu
    $('.header__menu a').on('click', function(e){
		e.preventDefault();

	 	$('.header__menu a').removeClass('active').filter(this).addClass('active');

		var selector = $(this).attr('href');
		var h = $(selector);

		$('html, body').animate({
			scrollTop: h.offset().top - 40
		}, 400);
		
	}); 

	//animate header
	var fixNav = 300;
	$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if ( scroll >= fixNav ) {
		$('.header').addClass('header--sticky');
		}
		else {
			$('.header').removeClass('header--sticky');
		}
	});

	//on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
	$('.burger').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('burger--close');
		$('.header__menu').toggleClass('header__menu--open');
	});
	
    //foto
    $('a[data-imagelightbox="c"]').imageLightbox({button: true, overlay: true, quitOnDocClick: true, quitOnImgClick: true});

	//works-section
	$('a[data-imagelightbox="w1"]').imageLightbox({button: true, overlay: true,  quitOnDocClick: true, navigation: true, arrows: true});
	$('a[data-imagelightbox="w2"]').imageLightbox({button: true, overlay: true,  quitOnDocClick: true, navigation: true, arrows: true});
	$('a[data-imagelightbox="w3"]').imageLightbox({button: true, overlay: true,  quitOnDocClick: true, navigation: true, arrows: true});
	$('a[data-imagelightbox="w4"]').imageLightbox({button: true, overlay: true,  quitOnDocClick: true, navigation: true, arrows: true});
	$('a[data-imagelightbox="w5"]').imageLightbox({button: true, overlay: true,  quitOnDocClick: true, navigation: true, arrows: true});

	//map
	let map_container = document.querySelector('#map_container');
	let options_map = {
		once: true,
		passive: true,
		capture: true
	};
	map_container.addEventListener('click', start_lazy_map, options_map);
	map_container.addEventListener('mouseover', start_lazy_map, options_map);
	map_container.addEventListener('touchstart', start_lazy_map, options_map);
	map_container.addEventListener('touchmove', start_lazy_map, options_map);
	let map_loaded = false;
	function start_lazy_map() {
		if(!map_loaded){
			let map_block = document.querySelector('#ymap_lazy');
			map_loaded = true;
			map_block.setAttribute('src', map_block.getAttribute('data-src'));
			map_block.removeAttribute('data_src');
		}
	}


	//footer-arrow-up
	$('.footer_up').on('click', function(){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 400);
	});

	//body arrow up - see btn.less for customizing
	$('<div>').addClass('arrowUpBtn').appendTo('body');


});