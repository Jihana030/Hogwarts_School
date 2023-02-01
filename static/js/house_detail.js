(function () {
    'use strict';

    // 스크롤 애니메이션 라이브러리 렌더링
    AOS.init();


    // section1 - 창립자 일러스트 그리기 효과 ***

    const $svgDraw = document.querySelector('.house_detail_s1_illust svg');
    const myVivus = new Vivus(
        $svgDraw,
        {
            type: 'delayed',
            duration: 200,
            start: 'autostart',
            // animTimingFunction: Vivus.EASE
        },
    );

    // section2 - symbol 설명 드러나는 효과

    const $symbolTitle = document.querySelectorAll('.house_detail_s2_symbol_title');

    $symbolTitle.forEach(title => {
        title.addEventListener('mouseover', e => {
            const $symbolAbout = e.target.nextElementSibling;
            $symbolAbout.classList.add('house_detail_s2_text_active');
        });

        title.addEventListener('mouseout', e => {
            const $symbolAbout = e.target.nextElementSibling;
            $symbolAbout.classList.remove('house_detail_s2_text_active');
        });
    });

    // section2 - 기숙사 인물 소개 swiper ***
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

    // @media screen max-width 480 : More 버튼 누를 때 내용 나오는 효과 ***

    const $aboutText = document.querySelector('.house_detail_s2_central_char_middle');
    const $moreBtn = document.querySelector('.house_detail_s2_central_char1-2');
    $moreBtn.addEventListener('click', () => {
        $aboutText.classList.add('house_detail_s2_central_active');
        $moreBtn.classList.toggle('comm_dp_none');
    });


    // section3 - 편지 확대버전 창 띄우고 끄기 ***

    const $letter = document.querySelector('.house_detail_s3_letter');
    const $letterExpand = document.querySelector('.house_detail_letter_expand');
    const $letterExClosebtn = document.querySelector('.house_detail_letter_expand_closeBtn');

    $letter.addEventListener('click', () => {
        $letterExpand.classList.add('house_detail_letter_expand_active');
    });

    $letterExClosebtn.addEventListener('click', () => {
        $letterExpand.classList.remove('house_detail_letter_expand_active');
    });


    // section4 - housecup 아코디언 메뉴

    const $houseMenuBtn = document.querySelector('.house_detail_s4_main_select_choice_box');
    const $houseMenuLi = document.querySelector('.house_detail_s4_main_select_list');

    $houseMenuBtn.addEventListener('click', () => {
        $houseMenuLi.classList.toggle('house_detail_s4_active_accordion');
    });






})();