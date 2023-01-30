(function () {
    'use strict';

    AOS.init();

    var swiper = new Swiper(".house_detail_slide_pic", {
        // slidesPerView: 'auto',
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        allowTouchMove: false,
        // loop: true,
        // loopedSlides: 'auto',
        navigation: {
            nextEl: ".house_detail_slide_btn",
        },
    });

    var swiper = new Swiper(".house_detail_slide_title_name", {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        allowTouchMove: false,
        navigation: {
            nextEl: ".house_detail_slide_btn",
        },
    });

    var swiper = new Swiper(".house_detail_slide_about", {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        allowTouchMove: false,
        navigation: {
            nextEl: ".house_detail_slide_btn",
        },
    });
})();