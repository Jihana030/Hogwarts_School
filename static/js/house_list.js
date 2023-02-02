(function () {

    'use strict';

    // 스크롤 애니메이션 라이브러리 렌더링 ***
    AOS.init();

    const $item = document.querySelectorAll('.house_list_item');
    const $itemUp = document.querySelectorAll('.house_list_item_box');
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

})();