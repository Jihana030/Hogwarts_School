(function () {
  "use strict";

  const $articleArea = document.querySelector(".main_blog-header-container");
  const $articleEach = document.querySelectorAll(".main_blog-header-container > .main_blog-header");


  const $pageNum = document.querySelector(".main_page-number");

  let scrollTimer = null;

  // 스크롤 거리 값을 이용해서 No.1 ← 숫자 바꾸기
  $articleArea.addEventListener("scroll", function () {
    if (!scrollTimer) {
      scrollTimer = setTimeout(function () {
        let $articleAreaTop = $articleArea.getBoundingClientRect().top;
        let articleTopDistant = [];
        for (let i = 0; i < $articleEach.length; i++) {
          articleTopDistant[i] = $articleEach[i].getBoundingClientRect().top;
        }
        if ($articleAreaTop + 1 > articleTopDistant[2]) {
            $pageNum.innerHTML = `NO.3`;
            console.log(`${articleTopDistant[2]} - 3`);
        } 
        else if ($articleAreaTop + 1 > articleTopDistant[1]) {
          $pageNum.innerHTML = `NO.2`;
          console.log(`${articleTopDistant[1]} - 2`);
        } 
        else {
          $pageNum.innerHTML = `NO.1`;
        }
        scrollTimer = null;
        // console.log(`${$articleAreaTop} - 기사 전체 거리`);
        // console.log(`${articleTopDistant} - 실시간 거리 값`);
      }, 100);
    }
  });
})();

