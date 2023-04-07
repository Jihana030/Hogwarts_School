(function () {

    'use strict';

    // 스크롤 애니메이션 라이브러리 렌더링 ***
    AOS.init();

    // TopBtn
    const $top = document.querySelector('#comm_container #TopBtn');

    $top.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const $item = document.querySelectorAll('.house_list_item');
    const $itemTitle = document.querySelectorAll('.house_list_item_title');

    $item.forEach((house, idx) => {
        house.addEventListener('mouseover', e=>{
            house.classList.add('house_list_item_animation');
            $itemTitle[idx].classList.add('house_list_item_title_animation');
        });
        house.addEventListener('mouseout', e=>{
            house.classList.remove('house_list_item_animation');
            $itemTitle[idx].classList.remove('house_list_item_title_animation');
        });
    });

    $item[0].addEventListener('click', () => {
        window.location.href = 'house_detail.html';
    });

})();