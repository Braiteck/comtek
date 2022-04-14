$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.gallery .swiper').length) {
		new Swiper('.gallery .swiper', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			lazy: {
				enabled: true,
				checkInView: true,
				loadPrevNext: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Карусель картинок
	const gallerySliderSliders = []

	$('.gallery_slider .swiper').each(function (i) {
		$(this).addClass('gallery_slider_s' + i)

		let slides = $(this).find('.swiper-slide').length,
			options = {
				loop: true,
				speed: 500,
				spaceBetween: 0,
				watchSlidesProgress: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				preloadImages: false,
				lazy: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					768: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1280: {
						slidesPerView: 4
					},
					1600: {
						slidesPerView: 5
					}
				}
			}

		gallerySliderSliders.push(new Swiper('.gallery_slider_s' + i, options))
	})


	// Отрасли
	$('.solutions .item').mouseenter(function () {
		let itemIndex = $(this).index()

		$('.solutions .item').removeClass('hover')
		$(this).addClass('hover')

		$('.solutions .images img').removeClass('show')
		$('.solutions .images img').eq(itemIndex).addClass('show')
	})


	// Моб. меню
	$('header .menu_btn').click((e) => {
		e.preventDefault()

		!$('header .menu_btn').hasClass('active')
			? $('#menu').fadeIn(300)
			: $('#menu').fadeOut(200)

		$('header .menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')


	// Фиксация блока
	$('.sticky').stick_in_parent({
		offset_top: 36
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})

	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Плавная прокрутка к якорю
	$('.scroll_btn').click(function (e) {
		e.preventDefault()

		let href = $(this).data('anchor'),
			addOffset = 0

		if ($(this).data('offset')) addOffset = $(this).data('offset')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)
	})


	// Боковая колонка - Моб. ссылки
	if ($(window).width() < 1279) {
		$('aside .links .title').click(function (e) {
			e.preventDefault()

			$('aside .links').removeClass('open')
			$('aside .links .title').removeClass('active')

			$(this).closest('.links').addClass('open')
			$(this).addClass('active')

			$('aside .links .items').hide()
			$(this).next().fadeIn(300)

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		})


		$(document).click((e) => {
			if ($(e.target).closest('.links').length === 0) {
				$('aside .links').removeClass('open')
				$('aside .links .title').removeClass('active')
				$('aside .links .items').hide()

				if (is_touch_device()) $('body').css('cursor', 'default')
			}
		})
	}


	// Подсветка якоря при видении блока
	inView.offset($(window).innerHeight() * 0.2)

	if ($('.tracking').length) {
		inView('.tracking')
			.on('enter', function (el) {
				let id = '#' + $(el).attr('id')

				id == '#about_block' || id == '#advantages' || id == '#technology' || id == '#articles'
					? $('.fixed_left_menu').addClass('dark')
					: $('.fixed_left_menu').removeClass('dark')

				$('.scroll_btn').removeClass('hover')
				$('.scroll_btn[data-anchor="' + id + '"]').addClass('hover')
			})
			.on('exit', function (el) {
				let id = '#' + $(el).attr('id')

				$('.scroll_btn[data-anchor="' + id + '"]').removeClass('hover')
			})
	}
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



// Подсветка якоря при видении блока
function fixedLeftMenu(id) {
	$('.fixed_left_menu').removeClass('dark')
	$('.fixed_left_menu .btn').removeClass('hover')

	if (id.length) { $('.fixed_left_menu .btn[data-anchor="#' + id + '"]').addClass('hover') }


	if (id == 'about_block' || id == 'advantages' || id == 'technology' || id == 'articles') {
		$('.fixed_left_menu').addClass('dark')
	}
}