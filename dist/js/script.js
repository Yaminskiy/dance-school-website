$(document).ready(function () {
    const iconSearch = document.querySelector('.icons__search');
    const body = document.querySelector('body');
  
    iconSearch.addEventListener('click', function (event) {
      event.stopPropagation();
      this.classList.add('icons__search--active');
    });
  
    body.addEventListener('click', function (event) {
      iconSearch.classList.remove('icons__search--active');
    });

    $('.carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:false,
      dots: false,
      navText: [],
      autoplay: true,
      responsive:{
        0:{
          items: 1
        },
        480:{
          items: 2
        },
        680: {
          items: 3
        }
      }
    });

    let show = true;
    let countbox = ".counts__element";
    $(window).on("scroll load resize", function () {
        if (!show) return false;
        let w_top = $(window).scrollTop();
        let e_top = $(countbox).offset().top;
        let w_height = $(window).height();
        let d_height = $(document).height();
        let e_height = $(countbox).outerHeight();
        if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $('.counts__number').css('opacity', '1');
            $('.counts__number').spincrement({
                thousandSeparator: "",
                duration: 6000
            });
             
            show = false;
        }
    });
});