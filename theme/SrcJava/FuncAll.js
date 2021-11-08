/*prevent a tag if dragging*/
$('a').off('click').on('click', function (e) {
	if ($('body').hasClass('drag')) { e.preventDefault(); }
});


function checkdrag() {
    var checkdrag = false, baseX = 0, baseY = 0, deltaX = 0, deltaY = 0, lastX = 0, lastY = 0, state = true;
    $(document)
    .mousedown(function (e) {
        checkdrag = true; baseX = e.pageX; baseY = e.pageY;
        console.log('Start drag');
    })/*mobile*/.bind('touchstart', function (e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        checkdrag = true; baseX = touch.pageX; baseY = touch.pageY;
    })
    .mousemove(function (e) {
        if (checkdrag) {
            deltaX = e.pageX - baseX; deltaY = e.pageY - baseY;
            if ( deltaX != 0 ) { console.log('dragging X'); $('body').addClass('drag'); };
			if ( deltaY != 0 ) { console.log('dragging Y'); };
            if (state) {
                state = false;
                var delta_abs = Math.abs(deltaX) - Math.abs(deltaY);
                if (delta_abs > 0) { $('body').addClass('horizone'); }
                else { $('body').addClass('verticle'); };
            };
        };
    })/*mobile*/.bind('touchmove', function (e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        if (checkdrag) {
            deltaX = touch.pageX - baseX; deltaY = touch.pageY - baseY;
            if (deltaX != 0) { $('body').addClass('drag'); };
            if (state) {
                state = false;
                var delta_abs = Math.abs(deltaX) - Math.abs(deltaY);
                if (delta_abs > 0) { $('body').addClass('horizone'); }
                else { $('body').addClass('verticle'); };
            };
        };
    })
    .mouseup(function (e) {
        state = true;
        checkdrag = false;
        lastX = deltaX; lastY = deltaY;
        setTimeout(function () { $('body').removeClass('drag horizone verticle'); }, 200);
    })/*mobile*/.bind('touchend', function (e) {
        state = true;
        checkdrag = false;
        lastX = deltaX; lastY = deltaY;
        setTimeout(function () { $('body').removeClass('drag horizone verticle'); }, 200);
    });
};checkdrag();


function noti(m,a){
	$('.notification').prepend('<div class="popnoti type'+m+'"><div class="popclose"></div>'+a+'</div>');	
	var thispop = $('.popnoti').first();
	setTimeout(function () { thispop.fadeOut('fast'); }, 3000);
	setTimeout(function () { thispop.remove(); }, 3400);
	$('.popclose').off('click').on('click', function (e) { e.stopPropagation(); e.preventDefault();
		$(this).closest('.popnoti').fadeOut('fast'); });
};
var popupconf = true; var reconf = true;
function conf(ntxt,nfunc,ytxt,yfunc,a){
	if(popupconf==true){
		popupconf = false;
		$('.notification').prepend('<div class="popnoti conf">'+a+'<div class="popbtn"><button class="popbtn_n">Hủy</button><button class="popbtn_y">Xác nhận</button></div></div>');
		$('.notification .popbtn_n').html(ntxt);
		$('.notification .popbtn_y').html(ytxt);
		var thispop = $('.popnoti').first();
		$('.popbtn_n').off('click').on('click', function (e) {
		e.stopPropagation(); e.preventDefault();
		if(reconf){
			reconf = false; setTimeout(function(){ reconf = true; },500);
			nfunc = nfunc.replace(/\@/g,"\"");
			$(this).closest('.popnoti').fadeOut('1200ms'); popupconf = true; 
			if(nfunc!='0'){eval(nfunc);}
		}; });
		$('.popbtn_y').off('click').on('click', function (e) {
		e.stopPropagation(); e.preventDefault();
		if(reconf){
			reconf = false; setTimeout(function(){ reconf = true; },500);
			yfunc = yfunc.replace(/\@/g,"\"");
			$(this).closest('.popnoti').fadeOut('1200ms'); popupconf = true; 
			if(yfunc!='0'){eval(yfunc);} 
		}; });	
	};	
};

$(document).ready(function(){
	$('body').prepend('<div class="notification"></div>');
});
/* END READY */
/*--------------------------------------------------*/


$(window).bind('load', function(){
	var ww = window.Width || document.documentElement.clientWidth || document.body.clientWidth		
	,wh = window.Height || document.documentElement.clientHeight || document.body.clientHeight;
	
	kxlider();
	
	$('.rcct_each').off('click').on('click',function(e){
		var thispa = $(this).closest('.rcct_head')
		,thisnode = thispa.find($('.rcct_each'))
		;
		thisnode.not($(this)).removeClass('active');
		$(this).addClass('active');
	});
	
	var reslide = true;
	
	$('.rcct_slide').each(function(){
		var thisnode = $(this).find('.each_slide').length;
		if (thisnode>3){
			$(this).find('.slide_left').addClass('active');
			$(this).find('.slide_right').addClass('active');
		};
	});
	
	$('.slide_right').off('click').on('click',function(e){
		if(reslide && $(this).hasClass('active') ){
			reslide = false;
			var thisslide = $(this).closest('.fullslide'),
			thisct = thisslide.find('.slide_ct'),
			this_o = thisslide.find('.each_slide').eq(0),
			this_w = this_o.outerWidth()
			;
			this_o.clone().appendTo(thisct);
			thisct.addClass('ani-fast').css({
				'transform':'translate(-'+(this_w+10)+'px,0)',	
			});
			setTimeout(function(){
				reslide = true;
				thisct.removeClass('ani-fast').css({
					'transform':'translate(0,0)',	
				});
				this_o.remove();
			},600);
		}
	});
	$('.slide_left').off('click').on('click',function(e){
		if(reslide && $(this).hasClass('active') ){
			reslide = false;
			var thisslide = $(this).closest('.fullslide'),
			thisct = thisslide.find('.slide_ct'),
			thiscount = thisct.children().length,
			this_o = thisslide.find('.each_slide').eq(thiscount-1),
			this_w = this_o.outerWidth()
			;
			this_o.clone().prependTo(thisct);
			thisct.css({
				'transform':'translate(-'+(this_w+10)+'px,0)',	
			});
			setTimeout(function(){
				thisct.addClass('ani-fast').css({ 'transform':'translate(0,0)',	});
			},10);
			setTimeout(function(){
				reslide = true;
				this_o.remove();
				thisct.removeClass('ani-fast');
			},600);
		}
	});
	
	
	
	$('.container').addClass('ready');
	$('.fixzone').addClass('active');
	$('.min_fz').off('click').on('click',function(e){
		$('.fixzone').toggleClass('active');
	});
	$('.close_fz').off('click').on('click',function(e){
		$('.fixzone').fadeOut();
	});
	
	
	var rextra = true;
	
	$('.lcn_extra').off('click').on('click',function(e){
		e.stopPropagation(); e.preventDefault();
		if(rextra){
			rextra = false;
			var thist = $(this).closest('.lcn_each').find('.lcn_ct');
			$('.lcn_ct').not(thist).slideUp('400','easeOutExpo');
			thist.slideToggle('400','easeOutExpo');
			setTimeout(function(){ rextra = true; },450);
			$('.lcn_each').removeClass('active');
			$(this).closest('.lcn_each').addClass('active');
		};
	});
	

	
	/* click outside */
	$(document).off('click').on('click', function (e) {
		var container = $('.su_frame');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$('.media_showup').fadeOut('fast');
			setTimeout(function(){
				$('.su_append').html('');
			},200);
			$('.each_slide').removeClass('active');
		};
	});
	
	$('.each_slide').off('click').on('click',function(e){
		e.stopPropagation(); e.preventDefault();
		$('.each_slide').not( $(this) ).removeClass('active');
		$(this).addClass('active');
		var this_src = $('.each_slide.active').attr('data')
		,thish = $('.media_showup').height() - 180
		;		
		$('.su_append').append(this_src);
		var thisc = $('.su_append').children();
		thisc.css({
			'height':thish+'px',	
		});
		$('.media_showup').fadeIn('fast');
	});
	
	$('.prev_i').off('click').on('click',function(e){
		e.stopPropagation(); e.preventDefault();
		var thisac = $('.each_slide.active')
		,thisind = thisac.index()
		,thispa = thisac.closest('.slide_ct')
		,thiscount = thispa.children().length
		;
		$('.each_slide').removeClass('active');
		if(thisind>0){	
			thisac.prev().addClass('active');
		}else{
			thispa.find( $('.each_slide') ).eq(thiscount-1).addClass('active');
		};
		
		$('.su_append').html('');
		var this_src = $('.each_slide.active').attr('data')
		,thish = $('.media_showup').height() - 180
		;		
		$('.su_append').append(this_src);
		var thisc = $('.su_append').children();
		thisc.css({
			'height':thish+'px',	
		});
	});
	
	$('.next_i').off('click').on('click',function(e){
		e.stopPropagation(); e.preventDefault();
		var thisac = $('.each_slide.active')
		,thisind = thisac.index()
		,thispa = thisac.closest('.slide_ct')
		,thiscount = thispa.children().length
		;
		$('.each_slide').removeClass('active');
		if(thisind<(thiscount-1)){	
			thisac.next().addClass('active');
		}else{
			thispa.find( $('.each_slide') ).eq(0).addClass('active');
		};
		
		$('.su_append').html('');
		var this_src = $('.each_slide.active').attr('data')
		,thish = $('.media_showup').height() - 180
		;		
		$('.su_append').append(this_src);
		var thisc = $('.su_append').children();
		thisc.css({
			'height':thish+'px',	
		});
		
	});
	
	

});
/* END BIND */
/*--------------------------------------------------*/	


function kxlider() {
	$('.wrap_kx').each(function () {
		var ani = 'ani-med';
		var kdrag = $(this).find('.kx_wrap'), klim = $(this).find('.kx_lim'), keach = klim.children(), kcount = klim.children().length,
		kwide = kdrag.width()
		;
		keach.removeClass('prev active next')
		if (kcount > 1) {
			keach.last().clone().prependTo(klim);
			keach.first().clone().appendTo(klim);
			keach.first().addClass('active');
			klim.find('.active').prev().addClass('prev');
			klim.find('.active').next().addClass('next');
			$('a').on('click', function (e) {
				if ($('body').hasClass('drag')) { e.preventDefault(); }
			});
		};
		var kcheck = false, kre = true, kbX = 0, kbY = 0, kdX = 0, kdY = 0, klastX = 0, klastY = 0;
		klim.mousedown(function (e) { kcheck = true; clearInterval(kloop); })/*mobile*/.bind('touchstart', function () { kcheck = true; clearInterval(kloop); });
		/*dragging*/
		$(document)
			.mousedown(function (e) {
				kbX = e.pageX; kbY = e.pageY;
			})/*mobile*/.bind('touchstart', function (e) {
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				kbX = touch.pageX; kbY = touch.pageY;
			})
			.mousemove(function (e) {
				if ((kcheck) && (kre)) {
					klim.removeClass(ani).css({
						'-webkit-transform': 'translate3d(' + (e.pageX - kbX) + 'px,0px,0px)',
						'-moz-transform': 'translate3d(' + (e.pageX - kbX) + 'px,0px,0px)',
						'-ms-transform': 'translate3d(' + (e.pageX - kbX) + 'px,0px,0px)',
					});
				};
			})/*mobile*/.bind('touchmove', function (e) {
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				if ((kcheck) && (kre)) {
					klim.removeClass(ani).css({
						'-webkit-transform': 'translate3d(' + (touch.pageX - kbX) + 'px,0px,0px)',
						'-moz-transform': 'translate3d(' + (touch.pageX - kbX) + 'px,0px,0px)',
						'-ms-transform': 'translate3d(' + (touch.pageX - kbX) + 'px,0px,0px)',
					});
				};
			})
			.mouseup(function (e) {
				klastX = e.pageX - kbX;
				if ((kcheck) && (kre)) {
					kloop = setInterval(function () { knext(); }, 5500);
					kcheck = false;
					kre = false;
					if (kcount <= 1) {
						klim.addClass(ani).css({
							'-webkit-transform': 'translate3d(0px,0px,0px)',
							'-moz-transform': 'translate3d(0px,0px,0px)',
							'-ms-transform': 'translate3d(0px,0px,0px)',
						});
						setTimeout(function () {
							klim.removeClass(ani).css({
								'-webkit-transform': 'translate3d(0px,0px,0px)',
								'-moz-transform': 'translate3d(0px,0px,0px)',
								'-ms-transform': 'translate3d(0px,0px,0px)',
							});
							kre = true;
						}, 300);
					} else {
						/*to left*/
						if (klastX > 50) { kprev(); }
						else{
							/*to right*/
							if (klastX < -50) { knext();
							}else{
								klim.addClass(ani).css({
									'-webkit-transform': 'translate3d(0px,0px,0px)',
									'-moz-transform': 'translate3d(0px,0px,0px)',
									'-ms-transform': 'translate3d(0px,0px,0px)',
								});
								setTimeout(function () {
									klim.removeClass(ani);
									kre = true;
								}, 500);
							};
						};
					};
				};
			})/*mobile*/.bind('touchend', function (e) {
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				klastX = touch.pageX - kbX;
				if ((kcheck) && (kre)) {
					kloop = setInterval(function () { knext(); }, 5500);
					kcheck = false;
					kre = false;
					if (kcount <= 1) {
						klim.addClass(ani).css({
							'-webkit-transform': 'translate3d(0px,0px,0px)',
							'-moz-transform': 'translate3d(0px,0px,0px)',
							'-ms-transform': 'translate3d(0px,0px,0px)',
						});
						setTimeout(function () {
							klim.removeClass(ani).css({
								'-webkit-transform': 'translate3d(0px,0px,0px)',
								'-moz-transform': 'translate3d(0px,0px,0px)',
								'-ms-transform': 'translate3d(0px,0px,0px)',
							});
							kre = true;
						}, 300);
					} else {
						/*to left*/
						if (klastX > 50) { kprev(); }
						else{
							/*to right*/
							if (klastX < -50) { knext();
							}else{
								klim.addClass(ani).css({
									'-webkit-transform': 'translate3d(0px,0px,0px)',
									'-moz-transform': 'translate3d(0px,0px,0px)',
									'-ms-transform': 'translate3d(0px,0px,0px)',
								});
								setTimeout(function () {
									klim.removeClass(ani);
									kre = true;
								}, 500);
							};
						};
					};
				};
			});/*end dragging*/
		function kprev() {
			kwide = kdrag.width();
			klim.addClass(ani).css({
				'-webkit-transform': 'translate3d(' + (kwide) + 'px,0px,0px)',
				'-moz-transform': 'translate3d(' + (kwide) + 'px,0px,0px)',
				'-ms-transform': 'translate3d(' + (kwide) + 'px,0px,0px)',
			});
			setTimeout(function () {
				klim.removeClass(ani).css({
					'-webkit-transform': 'translate3d(0px,0px,0px)',
					'-moz-transform': 'translate3d(0px,0px,0px)',
					'-ms-transform': 'translate3d(0px,0px,0px)',
				});
				kre = true;
				klim.children().last().remove();
				klim.children().removeClass('prev active next');
				klim.children().first().addClass('active');
				klim.find('.active').next().addClass('next');
				klim.children().last().prev().clone().prependTo(klim);
				klim.find('.active').prev().addClass('prev');
				$('a').on('click', function (e) {
					if ($('body').hasClass('drag')) { e.preventDefault(); }
				});
			}, 600);

		};
		function knext() {
			kwide = kdrag.width();
			klim.addClass(ani).css({
				'-webkit-transform': 'translate3d(' + (kwide * (-1)) + 'px,0px,0px)',
				'-moz-transform': 'translate3d(' + (kwide * (-1)) + 'px,0px,0px)',
				'-ms-transform': 'translate3d(' + (kwide * (-1)) + 'px,0px,0px)',
			});
			setTimeout(function () {
				klim.removeClass(ani).css({
					'-webkit-transform': 'translate3d(0px,0px,0px)',
					'-moz-transform': 'translate3d(0px,0px,0px)',
					'-ms-transform': 'translate3d(0px,0px,0px)',
				});
				kre = true;
				klim.children().first().remove();
				klim.children().removeClass('prev active next');
				klim.children().first().addClass('prev');
				klim.find('.prev').next().addClass('active');
				klim.find('.active').clone().appendTo(klim);
				klim.find('.active').next().addClass('next');
				klim.children().last().removeClass('active');
				$('a').on('click', function (e) {
					if ($('body').hasClass('drag')) { e.preventDefault(); }
				});
			}, 600);
		};
		$('.ema_left').on('click', function (e) {
			if (kre) {
				clearInterval(kloop);
				kloop = setInterval(function () { knext(); }, 5500);
				kprev();
			};
		});
		$('.ema_right').on('click', function (e) {
			if (kre) {
				clearInterval(kloop);
				kloop = setInterval(function () { knext(); }, 5500);
				knext();
			};
		});

		var kloop;
		kloop = setInterval(function () { knext(); }, 3500);


	});/*end k_wrap*/

};/*func kxlider*/