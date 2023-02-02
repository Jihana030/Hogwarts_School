(function () {
  "use strict";

  // con3
  // con3 기숙사 점수 카운팅
  const counters = document.querySelectorAll(".main_con3_cnt");
  const speed = 700;

  let countMotion = function () {
    counters.forEach((counter) => {
      const value = +counter.getAttribute("value"); // 선택한 요소의 특정 속성값 가져오기
      const time = value / speed;
     
      const animate = () => {        
        const data = +(counter.innerText).replace(',', '');
        
        if (data < value) {               
          counter.innerText = Math.ceil(data + time).toLocaleString("ko-KR");
          setTimeout(animate, 1);
        } else {
          counter.innerText = value.toLocaleString("ko-KR");
        }
      };
      animate();
    });
  };

  // con3 영역 감지하기
  let con3 = document.querySelector(".main_con3");
  let targetCon3 = window.pageYOffset + con3.getBoundingClientRect().top;

  window.addEventListener("scroll", () => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    let windowHeight = window.innerHeight; // 스크린 창
    let con3Height = document.querySelector(".main_con3").offsetHeight;

    if (targetCon3 + con3Height < scrollLocation + windowHeight) {
      countMotion();
      // console.log("끝");
    }
  });
})();
