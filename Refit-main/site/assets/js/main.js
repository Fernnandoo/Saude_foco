var wScreen = $(document).width();
var hScreen = $(window).height();
var firstContent = $('section').first().height();
var nome, email, telefone = false;
var step1, step2;
var aside = false;

$(function () {

	// Menu Header
	$(".nav-link, .navbar-brand, .btn-footer, .btn-buy").on('click', function (e) {
		if (this.hash !== "") {
			e.preventDefault();

			$('.navbar-collapse').removeClass('show');

			var hash = this.hash;
			var percent = hScreen * 0.5
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 1000, function () {
				window.location.hash = hash;
			});
		}
	});

	$(window).enllax();

	if ($('.swiper-container').length > 0) {
		var imagesCompareElement = $('.js-img-compare').imagesCompare();
		var imagesCompare = imagesCompareElement.data('imagesCompare');
		var events = imagesCompare.events();

		var swiper = new Swiper('.swiper-container', {
			mousewheel: {
				invert: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
		});

		var swiperMedia = new Swiper('.swiper-container-media, .swiper-container-information', {
			mousewheel: {
				invert: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				360: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 0,
				},
			}
		});
	}

	if ($('.box-form').length > 0) {

		$('.phone').inputmask('(99) 99999-9999');

		$('#content-1').each(function (index) {
			$('input[type="text"]').blur(function () {
				console.log($(this)[0].name + '---' + $(this)[0].value);
				if (($(this)[0].name == 'nome' && $(this)[0].value != '')) nome = true;
				if (($(this)[0].name == 'email' && $(this)[0].value != '')) email = true;
				if (($(this)[0].name == 'telefone' && $(this)[0].value != '')) telefone = true;

				if (nome && email && telefone) {
					$('.btn-1').removeClass('disabled');
					$('.btn-1').addClass('btn-next');
				} else {
					$('.btn-1').addClass('disabled');
				}
			});
		});

		$('.btn-1').click(function (e) {
			e.preventDefault();
			stepForm1();
		});

		/*
		$('.btn-2').click(function(e){
			e.preventDefault();
			stepForm2();
		});
		*/

		$('.btn-amostra').click(function () {
			$('.content-info').fadeOut(function () {
				$('.box-form').fadeIn();
			});
		});
	}

	// Cria elemntos para o Mobile Section Beneficios
	if ($('.floating').length > 0) {
		$(".elements > .floating").each(function (index) {
			var count = index + 1;
			$('.floating-' + count).clone().appendTo('#slider-' + count);
		});
	}

	// Acordion Section Duvidas
	if ($('.toggle').length > 0) {
		$('.toggle').click(function (e) {
			e.preventDefault();
			var $this = $(this);
			$('.toggle').parent().removeClass('active');
			$this.parent().addClass('active');

			if ($this.next().hasClass('show')) {
				$('.toggle').parent().removeClass('active');
				$this.next().removeClass('show');
				$this.next().slideUp(350);
			} else {
				$this.parent().parent().find('li .inner').removeClass('show');
				$this.parent().parent().find('li .inner').slideUp(350);
				$this.next().toggleClass('show');
				$this.next().slideToggle(350);
			}
		});
	}

	$('.btn--newsletter').click(function (e) {
		e.preventDefault();
		$('#input').removeClass('d-lg-none');
	});

	$('.btn-refuse').click(function () {
		Swal.fire({
			title: 'Você tem certeza?',
			text: "Ao recursar essa oferta ela pode não aparecer novamente para você.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Recusar a oferta',
			cancelButtonText: 'Voltar'
		}).then((result) => {
			if (result.value) {
				let timerInterval
				let segundos
				var url = "downsell.html";
				Swal.fire({
					icon: 'success',
					title: 'Aguarde um instante',
					html: 'Estamos separando uma Última oferta <br> para você em <b class="destaque"></b> segundos.',
					timer: 7000,
					timerProgressBar: true,
					onBeforeOpen: () => {
						Swal.showLoading()
						timerInterval = setInterval(() => {
							const content = Swal.getContent()
							if (content) {
								const b = content.querySelector('b');
								if (b) {
									segundos = Swal.getTimerLeft() / 1000
									b.textContent = Math.trunc(segundos)
								}
							}
						}, 100)
					},
					onClose: () => {
						clearInterval(timerInterval)
					}
				}).then((result) => {
					/* Read more about handling dismissals below */
					if (result.dismiss === Swal.DismissReason.timer) {
						console.log('I was closed by the timer')
						$(location).attr('href', url);
					}
				})
			}
		})
	});


	if (wScreen < 768) {
		$('.aside-menu li').click(function () {
			$('li').each(function (index) {
				var count = index + 1;
				$(this).addClass('order-' + count);
			});
			$(this).removeClass();
			$('.aside-menu').css('height', '60px');
			$('.btn-aside').removeClass('open').addClass('close');
		});
	}

	$('.btn-aside').click(function () {
		if (aside === true) {
			$('.aside-menu').css('height', '60px');
			$('.btn-aside').removeClass('open').addClass('close');
			aside = false;
		} else if (aside === false) {
			$('.aside-menu').css('height', 'auto');
			$('.btn-aside').removeClass('close').addClass('open');
			aside = true;
		}
	});

});

$(window).scroll(function () {
	if (wScreen > 992) {
		if (($(document).scrollTop() + 1) > firstContent) {
			$('.navbar').addClass('navbar-show');
		} else {
			$('.navbar').removeClass('navbar-show');
		}
	}
});

function stepForm1() {

	step1 = true;

	$('#content-1 .valid').each(function () {
		if ($(this).val() == '' || $(this).val() == null) {
			$(this).attr({
				'data-trigger': "manual", 'data-placement': 'top', 'title':
					$(this).attr('data-validation')
			}).tooltip('show').on('change', function () {
				$(this).tooltip('hide');
			});
			step1 = false;
			return;
		} else if ($(this).attr('name') == 'email') {
			email = $(this).val();
			//Valida o email
			er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
			if (!er.exec(email) && email != "") {
				$(this).attr({ 'data-trigger': "manual", 'data-placement': 'top', 'title': $(this).attr('data-invalido') }).tooltip('show').keyup(function () {
					$(this).tooltip('hide');
				});

				step1 = false;
				return;
			}
		}
	});


	if (step1) $('#content-1').fadeOut(function () {
		$('#content-2').fadeIn();
	})


}

function stepForm2() {

	step2 = true;

	$('#content-2 .valid').each(function () {
		if ($(this).val() == '' || $(this).val() == null) {
			$(this).attr({
				'data-trigger': "manual", 'data-placement': 'top', 'title':
					$(this).attr('data-validation')
			}).tooltip('show').on('change', function () {
				$(this).tooltip('hide');
			});
			step2 = false;
			return;
		}
	});

	/*
	if (step2) $('#content-2').fadeOut(function(){
		$('#message').fadeIn();
	});      
	*/

}
var video = document.querySelector('.video')
var juice = document.querySelector('.orange-juice')
var btn = document.getElementById('play-pause')

function togglePlayPause() {
	if (video.paused) {
		btn.className = "pause";
		video.play();
		// document.body.style.overflow = 'hidden';
	}
	else {
		btn.className = "play"
		video.pause();
		// document.body.style.overflow = 'hidden';
	}
}

btn.onclick = function () {
	togglePlayPause()
}

video.addEventListener('timeupdate', function () {
	var juicePos = video.currentTime / video.duration;
	juice.style.width = juicePos * 100 + "%"
	if (video.ended) {
		btn.className = "play";
	}
})

  function terminarVideo() {
	document.body.style.overflow = 'auto';
  }

  // função para calcular gasto calórico diário
  function calc_diario () {
	var sexo = document.getElementById('sexo');
	var idade = document.getElementById('idade');
	var peso = document.getElementById('peso');
	var altura = document.getElementById('altura');
	var atividade_semanal = document.getElementById('semanal');
	var atividade_trabalho = document.getElementById('trabalho');
	var tbm = 0;
	var result = 0;

	if (sexo = 'masculino') {
		tbm = 88.36 + (13.4 * peso) + (4.8 * altura * 100) - (5.7 * idade);
	}
	else if (sexo = 'feminino') {
		tbm = 447.6 + (9.2 * peso) + (3.1 * altura * 100) - (4.3 * idade);
	}
	else {
		alert('Sexo inválido')
	}

	switch(atividade_semanal) {
		case 'sedentario':
			var fatorAtividade = 1.2;
			break;
		case 'leve':
			var fatorAtividade = 1.375;
			break;
		case 'moderado':
			var fatorAtividade = 1.55;
			break;
		case 'ativo':
			var fatorAtividade = 1.725;
			break;
		case 'muito ativo':
			var fatorAtividade = 1.9;
			break;
		default:
			return 'erro'
	}

	switch(atividade_trabalho) {
		case 'sedentario':
			var fatorTrabalho = 1.2;
			break;
		case 'leve':
			var fatorTrabalho = 1.375;
			break;
		case 'moderado':
			var fatorTrabalho = 1.55;
			break;
		case 'ativo':
			var fatorTrabalho = 1.725;
			break;
		case 'muito ativo':
			var fatorTrabalho = 1.9;
			break;
		default:
			return 'erro'
	}

	result = tbm * fatorAtividade * fatorTrabalho;
	console.log('Seu gasto calórico diário é: ' + result);
  }