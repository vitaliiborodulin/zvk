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
	$('input[type="tel"]').mask("+7(999) 999-9999");


	//header-menu
    $('.header__menu a').on('click', function(e){
		e.preventDefault();

		// $('.header__menu a').removeClass('active').filter(this).addClass('active');

		var selector = $(this).attr('href');
		var h = $(selector);

		$('html, body').animate({
			scrollTop: h.offset().top - 190
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



	//footer-arrow-up
	$('.footer_up').on('click', function(){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 400);
	});

});