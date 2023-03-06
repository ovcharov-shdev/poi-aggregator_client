//= swiper.js
//= autosizer.js

var main_slider = new Swiper('#main_slider', {
	navigation: {
		nextEl: '.swiper__button_next',
		prevEl: '.swiper__button_prev',
	},
	pagination: {
		el: '.swiper__pagination',
		bulletClass: 'swiper__bullet',
		bulletActiveClass: 'swiper__bullet_active'
	},
	containerModifierClass: 'swiper',
	slideClass: 'swiper__slide',
	wrapperClass: 'swiper__box',
});

var relation_activities = new Swiper('#relation_activities', {
	slidesPerView: 3,
	spaceBetween: 30,
	navigation: {
		nextEl: '.swiper__button_next',
		prevEl: '.swiper__button_prev',
	},
	containerModifierClass: 'swiper',
	slideClass: 'swiper__slide',
	wrapperClass: 'swiper__box',
	breakpoints: {
		1200: {
			spaceBetween: 15
		},
		767: {
			slidesPerView: 2
		},
		590: {
			slidesPerView: 1
		}
	}
});



var footer_owner_close = document.getElementById('js_footer_collapser');
var footer_owner_open = document.querySelector('.footer-links__link_greating');

footer_owner_close && footer_owner_close.addEventListener('click', function() {
	document.querySelector('.footer').classList.toggle('footer_collapsed');
});

footer_owner_open && footer_owner_open.addEventListener('click', function() {
	document.querySelector('.footer').classList.toggle('footer_collapsed');
});


autosize(document.querySelectorAll('.form-control__textarea'));


var activityCards = document.querySelectorAll('.activity-card');
var minimizeButtons = document.querySelectorAll('[data-role="minimize-card"]');
var addressesLinks = document.querySelectorAll('.activity-card__map-link');
var sheduleLinks = document.querySelectorAll('.activity-card__footer-link');
var flipButtons = document.querySelectorAll('[data-role="flip-card"]');

for (var i = 0; i < activityCards.length; i++){
    activityCards[i].addEventListener('click', function(e) {
    e.stopPropagation();

    if (document.querySelector('.activity-card-wrapper__inner_flipped')){
      document.querySelector('.activity-card-wrapper__inner_flipped').classList.remove('activity-card-wrapper__inner_flipped');
    }

    if (document.querySelector('.activity-card_active')){
      document.querySelector('.activity-card_active').classList.remove('activity-card_active');
    }

    this.classList.add('activity-card_active');
  })

  minimizeButtons[i].addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelector('.activity-card_active').classList.remove('activity-card_active');
  })

  addressesLinks[i].addEventListener('click', function (e) {
    if (document.querySelector('.activity-card_active')){
      setTimeout(() => {var inner = document.querySelector('.activity-card_active').closest('.activity-card-wrapper__inner');
      inner.classList.add('activity-card-wrapper__inner_flipped');

      setTimeout(addSpinner, 500)
      setTimeout(hideSpinner, 3000)}, 150)

    }
  })

  sheduleLinks[i].addEventListener('click', function (e) {
    if (document.querySelector('.activity-card_active')){
      var inner = document.querySelector('.activity-card_active').closest('.activity-card-wrapper__inner');
      inner.classList.add('activity-card-wrapper__inner_flipped');
      setTimeout(addSpinner, 500)
      setTimeout(hideSpinner, 3000)

    }
  })

  flipButtons[i].addEventListener('click', function(e) {
     document.querySelector('.activity-card-wrapper__inner_flipped').classList.remove('activity-card-wrapper__inner_flipped');
  })

}

function hideSpinner(){
  var inner = document.querySelector('.activity-card_active').closest('.activity-card-wrapper__inner');
  document.querySelector('.activity-card-wrapper__inner_flipped').classList.remove('activity-card-wrapper__inner_loading');
}

function addSpinner() {
  var inner = document.querySelector('.activity-card_active').closest('.activity-card-wrapper__inner');
  inner.classList.add('activity-card-wrapper__inner_loading');
  document.querySelector('.activity-card-wrapper__inner_flipped').classList.add('activity-card-wrapper__inner_loading');
}

//mobile menu js-code
var mobile_menu = document.querySelector('.mobile-menu');
var filterSummary = document.querySelector('.filter-summary');
var mobileMenuClosers = document.querySelectorAll("[data-role='mobile-menu-close']");

filterSummary && filterSummary.addEventListener('click', function(){
  mobile_menu && mobile_menu.classList.toggle('mobile-menu_visible');
  document.body.classList.toggle('modal-open');
});

Array.from(mobileMenuClosers).forEach(item => {
  item.addEventListener('click', function(){
    mobile_menu && mobile_menu.classList.remove('mobile-menu_visible');
    document.body.classList.remove('modal-open');
  })
})

var hamburger_menu = document.querySelector('.hamburger-menu');
hamburger_menu && hamburger_menu.addEventListener('click', function() {
  console.log('close');
  this.classList.remove('hamburger-menu_active');
  setTimeout(function() {
    hamburger_menu.classList.remove('hamburger-menu_shown');
  }, 250);
  document.body.classList.remove('modal-open');
});

var hamburger = document.querySelector('.header__mobile-menu');
hamburger && hamburger.addEventListener('click', function() {
  console.log('open');
  hamburger_menu && hamburger_menu.classList.add('hamburger-menu_shown');
  document.body.classList.add('modal-open');
  setTimeout(function() {
    hamburger_menu && hamburger_menu.classList.add('hamburger-menu_active');
  }, 50);
});

var weather = document.querySelector('.weather');
var weather_box = document.querySelector('.map-box__weather');
weather_box && weather_box.addEventListener('click', function() {
  weather && weather.classList.add('weather_loading');

  setTimeout(function() {
      weather && weather.classList.remove('weather_loading');
  }, 3000);
});