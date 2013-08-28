// ==UserScript==
// @name		Better Envato browsing experience [thumbs mode]
// @namespace	voidstd
// @description	
// @include		http://themeforest.net/*
// @include		http://*.themeforest.net/*
// @include		http://graphicriver.net/*
// @include		http://*.graphicriver.net/*
// @include		http://activeden.net/*
// @include		http://*.activeden.net/*
// @include		http://videohive.net/*
// @include		http://*.videohive.net/*
// @include		http://3docean.net/*
// @include		http://*.3docean.net/*
// @include		http://marketplace.tutplus.com/*
// @include		http://codecanyon.net/*
// @include		http://*.codecanyon.net/*
// @include		http://photodune.net/*
// @include		http://*.photodune.net/*
// @grant		none
// @version		2
// ==/UserScript==

jQuery(function($) {
	
	var $body = $('body'),
	$document = $(document),
	$layoutgrid = $('.layout-grid'),
	$content_l = $('.content-l'),
	$mag = $('#landscape-image-magnifier'),
	fshref;
	
	// always make sure to select the grid layout
	$layoutgrid.click();
	// stop maginifier
	$mag.remove();

	// actual replacement magic
	$content_l
		.on('reload', function(){
			$content_l
				.find('ul.item-list li')
					// delete all but thumbnails
					.find('.item-info, .meta, .sale-info').addClass('otherstuff').end()
					// add bg and preview link
					// preview click function
					// change link to go directly to full screen preview
					.find('.thumbnail a').each(function(){
						this.href = fshref = this.href.split("?")[0].replace(/item\/([^\/]*)/, "item/$1/full_screen_preview")
						this.target = '_blank';
					})
						// change thumbnail to the preview image
						.find('img').each(function(){
							this.src = $(this).data('preview-url');
						}).end()
					.append('<div class="bg otherstuff"><h3><a href="'+fshref+'" target=_blank>Fullscreen preview</a></h3></div>').end()
		})
		.trigger('reload')
	
	// redo replacement on page reload
	$document.ajaxComplete(function() {
		$content_l.trigger('reload');
	});

	// custom styling
	var style = '\
<style>\
.content-l ul li:hover .otherstuff { display:block !important; }\
.content-l ul li .thumbnail { width: 100%; height: auto; display: block; margin-bottom: 10px; }\
.content-l ul li .thumbnail img { width: 590px; height: 300px; max-width: none; margin: 0 auto; border: 8px solid white }\
.content-l ul li .item-info { margin-left: 75px; }\
.content-l ul li .meta { margin-left: 75px; margin-top: -117px; }\
.content-l ul li .sale-info { margin-right: 70px; margin-top: -115px; }\
.otherstuff { margin-top: -315px; z-index: 2; position: relative; display: none; }\
.bg { background: #ccc; opacity: 0.9; position: absolute; width: 590px; height: 300px; top: 28px; left: 87px; z-index: 1;margin-top: 0; cursor: pointer;  }\
.bg a { position: relative; float: right; margin: 10px; }\
</style>';
	$body.append(style);
});
