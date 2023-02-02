(function () {
  "use strict";

  const $con4 = document.querySelector(".main_con4");

  const $articleArea = document.querySelector(".main_blog-header-container");
  const $articleEach = document.querySelectorAll(".main_blog-header-container > .main_blog-header");


  const $pageNum = document.querySelector(".main_page-number");

  let scrollTimer = null;

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
        else if ($articleAreaTop > articleTopDistant[1]) {
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

