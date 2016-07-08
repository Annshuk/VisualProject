// JavaScript Document
$(function () {   
   windowResize()  
});
//on resize to load function
function windowResize(){
	dataSoruce.getHeight();
		$(window).resize(function(){
			dataSoruce.getHeight();
	   });
}
var dataSoruce = {} || dataSoruce;
//namespacing datasoruce
	dataSoruce = {
		getHeight : function(){
			var winHeight= $(window).height(),
			header= $('.navigation').outerHeight(true)
			$('.contentContainer').css('height', winHeight - 69-header);
				obj = {
					headerBlock : $('.header-top').outerHeight(true),
					containerHeight : $('.contentContainer').height(),
					marginTop : 9,
					siteDescription : $('.siteDescription').outerHeight(true),
					subFooter : 33,
					innerfoot : $('.inner_foot').outerHeight(true),
					notes : $('.notesWrapper').outerHeight(true),
					footerBlock : $('#footer').outerHeight(true),

					}
					//assign the height to specific div
					 var calHeight = obj.containerHeight - obj.marginTop - obj.headerBlock;
					 var doubleSide = calHeight - obj.siteDescription;
					 var tHeight =  calHeight-obj.footerBlock-obj.marginTop;

					 $('.innerContainer').css({ 'height': calHeight - obj.siteDescription - $('.nav-top-wrap').height() });
					 $('.grid-table').css({ 'height': calHeight - obj.siteDescription - 20 -$('.nav-top-wrap').height() });						 
					}
        };
