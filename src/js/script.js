$(document).ready(function(){

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

	//input-mask
	$('input[type="tel"]').inputmask({"mask": "+9 (999) 999-9999"});

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
	
    //foto
    $('a[data-imagelightbox="c"]')
        .imageLightbox({button: true, overlay: true, activity: true, quitOnDocClick: true, quitOnImgClick: true});

	//footer-arrow-up
	$('.footer_up').on('click', function(){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 400);
	});

});