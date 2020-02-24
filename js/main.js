function replace_config_values(scope) {
  var parentElement = '';
  if (scope) parentElement = scope + ' ';

  var selector1 = parentElement + '.config_key';

  $(selector1).each(function() {
    var str = $(this).html();
    for (let p in config_params) {
      var word = '%(' + p + ')s';
      word = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      var sign = new RegExp(word, 'g');
      str = str.replace(sign, config_params[p]);
    }
    $(this).html(str);
  });

  if (!scope) {
    $('meta').each(function() {
      var str = $(this).attr('content');
      for (let p in config_params) {
        var word = '%(' + p + ')s';
        word = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var sign = new RegExp(word, 'g');
        str = str.replace(sign, config_params[p]);
      }
      $(this).attr('content', str);
    });
  }
}

function get_config_parameter(key, strReturn = false) {
  if (!strReturn) document.write(config_params[key]);
  else return config_params[key];
}

jQuery(function($) {'use strict';
	var main_currency_code = get_config_parameter('main_currency_code', true);
	var company_name = get_config_parameter('company_name', true);
	document.title = main_currency_code + ' Paperwallet - Universal Paper wallet generator for ' + company_name;
	replace_config_values();
	
	$('a.navbar-brand').on('click', function(){
		var domain = window.location.origin;
		if (domain == 'http://localhost') {
			domain = domain + '/paperwallet';
		}
		window.location.href = domain;
	});

	$('.nav ul li a').hover(function() {
		$('.sub-menu').removeClass('submenuhide');
	});
	$('.parrent_li a').on('click', function(){
		$('.sub-menu').removeClass('submenuhide');
	});
	$('.sub-menu a').on('click', function(){
		$('.sub-menu').addClass('submenuhide');
	});
	$('.nav ul li a').on('click', function() {
		var currenturl = document.URL;
		var pagename = currenturl.substr(currenturl.lastIndexOf('/') + 1);
		var hashtag = $(this).attr('data-hash');
		if (pagename.indexOf('.html') > -1) {
			sessionStorage.setItem("pageelement", hashtag);
			var domain = window.location.origin;
			if (domain == 'http://localhost') {
				domain = domain + '/paperwallet/';
			}
			window.location.href = domain+'#'+hashtag;
		} else {
			var headerh = $('header.header').height();
			$('html, body').animate({scrollTop: $('#'+hashtag).offset().top - headerh }, 1000);
		}
	});

	$('a.pagelink').on('click', function() {
		var hashtag = $(this).attr('data-hash');
		sessionStorage.setItem("pageelement", hashtag);
	});

	// AOS.init({
	// 		easing: 'ease-out-back',
	// 		duration: 1000
	// });

	//Initiat WOW JS
	// new WOW().init();

});

$(document).ready(function() {
	var pageelement = sessionStorage.getItem("pageelement");
	sessionStorage.removeItem("pageelement");
	if (pageelement != null) {
		var headerh = $('header.header').height();
		$('html, body').animate({scrollTop: $('#'+pageelement).offset().top - headerh}, 1000);
	}
	var currenturl = document.URL;
	var pagename = currenturl.substr(currenturl.lastIndexOf('/') + 1);
	var hashtag = $(this).attr('data-hash');
	if (pagename.indexOf('.html') > -1) {
		$('header.header').addClass('our-team-header');
	}
});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $("header").addClass("darkHeader");
    } else {
        $("header").removeClass("darkHeader");
    }
});

$(document).on("click", ".notext", function(event) {
        $("body").toggleClass("header-expanded");
})
