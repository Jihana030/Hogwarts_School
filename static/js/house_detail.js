(function () {
    'use strict';

    // 스크롤 애니메이션 라이브러리 렌더링 ***
    AOS.init();


    // section1 - 창립자 일러스트 그리기 효과 ***

    const $svgDraw = document.querySelector('.house_detail_s1_illust svg');
    const myVivus = new Vivus(
        $svgDraw,
        {
            type: 'delayed',
            duration: 600,
            start: 'autostart',
            // animTimingFunction: Vivus.EASE
        },
    );


    // section2 ***

    // symbol 설명 드러나는 효과
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


    // 기숙사 인물 소개 swiper **
    var swiper = new Swiper(".house_detail_slide_pic", {
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        navigation: {
            nextEl: ".house_detail_slide_btn",
        },
    });
    console.log(swiper)

    var swiper2 = new Swiper(".house_detail_slide_title_name", {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        allowTouchMove: false,
        navigation: {
            nextEl: ".house_detail_slide_btn",
        },
    });
    console.log(swiper2)

    var swiper3 = new Swiper(".house_detail_slide_about", {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        allowTouchMove: false,
        navigation: {
            nextEl: ".house_detail_slide_btn",
        },
    });

    // @media screen max-width 480 : More 버튼 누를 때 내용 나오는 효과 **
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


    // section4 ***

    // houseDetail_houseCup.json fetch **
    // https://www.hogwartsishere.com/great-hall/?year=school 자료 참고 링크

    let studentDataList = null;

    fetch('../static/json/houseDetail_houseCup.json')
        .then(res => res.json())
        .then(json => {
            studentDataList = json;

            // 내림차순 정렬 **
            studentDataList.sort((a, b) => {
                let leftVal = a.points;
                let rightVal = b.points;

                return rightVal - leftVal;
            });
            studentList();
        });

    const $houseMenuBtn = document.querySelector('.house_detail_s4_main_select_choice_box');
    const $houseMenuLi = document.querySelector('.house_detail_s4_main_select_list');

    // housecup 아코디언 메뉴**
    $houseMenuBtn.addEventListener('click', () => {
        $houseMenuLi.classList.toggle('house_detail_s4_active_accordion');
    });

    const $houseSelect = document.querySelector('.house_detail_s4_main_select_one');
    const $houseMenuItem = document.querySelectorAll('.house_detail_s4_main_select_item');
    const $s4Ul = document.querySelector('.house_detail_s4_main_list_contents');


    // housecup 선택 반영 및 랭킹 순 리스트 배치 **
    $houseMenuItem.forEach(item => {
        item.addEventListener('click', e => {

            studentList(+e.target.dataset.year);

            $houseSelect.textContent = e.target.textContent;
            $houseMenuLi.classList.remove('house_detail_s4_active_accordion');

        });
    });

    function studentList(year) {
        $s4Ul.innerHTML = null;
        let list = studentDataList.slice(0, 10);
        if (year) {
            list = studentDataList.filter(item => item.data[0] === year);
        }

        list.forEach(student => {
            makeLi(student);
        });

    }

    // 목록 내용
    function makeLi(student) {

        const $s4Li = document.createElement('li');
        $s4Li.className = 'house_detail_s4_main_list_item';

        $s4Li.innerHTML = `
            
                <div class="house_detail_s4_main_list_item_pic">
                    <img src="${student.pic}"
                        alt="그리핀도르 기숙사생 프로필 사진">
                </div>
                <div class="house_detail_s4_main_list_item_name">
                    <p>${student.name}</p>
                </div>
                <div class="house_detail_s4_main_list_item_year">
                    <p>${student.year}</p>
                </div>
                <div class="house_detail_s4_main_list_item_points">
                    <p>${student.points.toLocaleString('ko-KR')} Points</p>
                </div>
            
            `;

        $s4Ul.append($s4Li);
    }

})();