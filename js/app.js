


"use strict"

// возврат к началу

function backToTop(){
    let button = $('.back-to-top'); 
    button.on('click', (e) =>{
        e.preventDefault();
        $('html').animate({scrollTop : 0},1000);
    });
}
backToTop();



// burger menu
$("#nav--toggle").on("click",function(){

    $(this).toggleClass("active");
    $("#nav").toggleClass("active");
 });


// smooth scroll


function smoothScroll(){
    $("[data-scroll]").on("click",function(event){

        event.preventDefault();
        let $this=$(this),
        blockId = $(this).data("scroll"),
        blockOffSet=$(blockId).offset().top;
        $("html,body").animate({
            scrollTop: blockOffSet
        },500);
    });

}
smoothScroll();



// fixedHeader

function fixedHeader(){
  let introH = $("#intro").innerHeight();
  let header = $("#header");
  let scrollOffSet = $(window).scrollTop();

  checkScroll(scrollOffSet);

  $(window).on("scroll" , function(){
    scrollOffSet=$(this).scrollTop();
    checkScroll(scrollOffSet);
  });

function checkScroll(){
    if(scrollOffSet >introH){
      header.addClass("fixed");
    }else{
      header.removeClass("fixed");
    }
  }
}
fixedHeader();


//  send form
document.addEventListener('DOMContentLoaded', function(){
    
    const form = document.getElementById('form');
    form.addEventListener('submit' , formSend);
   
    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);
        
        let formData = new FormData(form);
        if(error === 0){
            form.classList.add('_sending');
            let response = await fetch('sendmail.php',{
                method :'POST',
                body:formData
            });
            if(response.ok){
                $('.js-overlay-thank-you').fadeIn();
                form.reset();
                form.classList.remove('_sending');
            }else{
                
                form.classList.remove('_sending');
            }
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
       return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});


// close popup
$('.js-close-thank-you').click(function() { // по клику на крестик
	$('.js-overlay-thank-you').fadeOut();
});

$(document).mouseup(function (e) { // по клику вне попапа
	var popup = $('.popup');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-thank-you').fadeOut();
	}
});