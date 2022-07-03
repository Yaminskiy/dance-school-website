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
});