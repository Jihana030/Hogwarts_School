(function () {
  "use strict";

  //현재 위치를 기억하여 새로고침시 그자리를 유지한다.
  history.scrollRestoration = "auto";

  // Header music bar control ♬ ***
  const $musicbarContainer = document.querySelector("#comm_musicbar_container");
  const $musicbarSpanList = $musicbarContainer.querySelectorAll(".comm_bar");
  const $audio = document.querySelector("audio");

  // $audio.volume = 0.2; // volume control
  $audio.volume = 0; // volume control(작업용)

  $musicbarContainer.addEventListener("click", (e) => {
    const state = parseInt($musicbarContainer.dataset.state);
    $musicbarContainer.dataset.state = 1 - state;

    $musicbarSpanList.forEach((item) => {
      if (state) {
        item.classList.add("comm_animation_play_pause");
      } else {
        item.classList.remove("comm_animation_play_pause");
      }
    });

    if ($audio.paused) {
      $audio.play();
    } else {
      $audio.pause();
    }
  });

  // header
  // 스크롤 시, header 높이 축소
  const $navMenu = document.querySelector("#main_nav-menu-wrap");
  var headerMoving = function (direction) {
    if (direction === "up") {
      $navMenu.classList.add("sticky-top");
      $navMenu.classList.remove("scrollDown");
    } else if (navMenuTop + $navMenu.offsetHeight < window.scrollY && direction === "down") {
      $navMenu.classList.add("scrollDown");
    }
  };

  var prevScrollTop = 0;
  let navMenuTop = null;

  function setNavMenuTop() {
    navMenuTop = $navMenu.getBoundingClientRect().top + window.pageYOffset;
  }
  setNavMenuTop();

  let scrollTimer = null;
  document.addEventListener("scroll", function () {
    if (!scrollTimer) {
      scrollTimer = setTimeout(function () {
        if (navMenuTop < window.scrollY) {
          const direction = prevScrollTop > window.scrollY ? "up" : "down";
          headerMoving(direction);
        } else {
          $navMenu.classList.remove("sticky-top");
          $navMenu.classList.remove("scrollDown");
        }
        prevScrollTop = window.scrollY;
        scrollTimer = null;
      }, 100);
    }
  });

  // main_search-container 검색창 input 연결
  const $searchFront = document.querySelector("#search-front > input");
  const $searchBack = document.querySelector("#search-back > input");

  $searchBack.addEventListener("input", handleChange);

  function handleChange(e) {
    const value = e.target.value;
    $searchFront.value = value;
  }

  // ??
  const $searchAll = document.querySelector('.main_search-container > input')
  const $body = document.querySelector('body')
  console.log($searchAll)
  $searchBack.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      if (e.target.value === 'LUMOS'
        || e.target.value === 'Lumos'
        || e.target.value === '루모스'
        || e.target.value === 'lumos') {
          $body.classList.add('start-lumos');
        
        function update(e) {
          var x = e.clientX || e.touches[0].clientX
          var y = e.clientY || e.touches[0].clientY
      
          $body.style.setProperty('--cursorX', x + 'px')
          $body.style.setProperty('--cursorY', y + 'px')
        }
      
        $body.addEventListener('mousemove', update)
        $body.addEventListener('touchmove', update)

      }
      if(e.target.value === '녹스' || e.target.value === 'Nox' || e.target.value === 'NOX' || e.target.value === 'npx'){
        $body.classList.remove('start-lumos');
      }
      
    }
  })



  // main_wide-menu 메뉴 펼치기
  const $meneWideBtn = document.querySelector("#main_nav-menu-wrap");
  const $WideTap = document.querySelector("#main_menu-toggle-wrap");

  $meneWideBtn.addEventListener("mouseover", function () {
    $WideTap.classList.toggle("wide-toggle-active", true);
  });
  
  $meneWideBtn.addEventListener("mouseout", function () {
    $WideTap.classList.toggle("wide-toggle-active", false);
  });


  // Header hamberger Btn 🍔 **
  const $headerBtn = document.querySelector("#main_mobile-menu");

  $headerBtn.addEventListener("click", () => {
    $headerBtn.classList.toggle("comm_active_header_btn"); // button
  });

  // main_mobile-menu 모바일 메뉴 펼치기
  const $mobileTap = document.querySelector("#main_mobile-toggle");

  $headerBtn.addEventListener("click", function () {
    $mobileTap.classList.toggle("mobile-toggle-active");
  });

  // main_mobile-toggle 버티컬 탭
  const tabParent = document.querySelectorAll(".main_mobile-parent li");
  const tapChild = document.querySelectorAll("#main_mobile-child-wrap ul");
  let activeCont = ""; // 현재 활성화 된 컨텐츠

  for (let i = 0; i < tabParent.length; i++) {
    tabParent[i].addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target);
      for (var j = 0; j < tabParent.length; j++) {
        // 나머지 컨텐츠 display:none 처리
        tapChild[j].style.display = "none";

        // 나머지 버튼 클래스 제거
        tabParent[j].classList.remove("is_on");
      }
      // 버튼 관련 이벤트
      this.parentNode.classList.add("is_on");

      // 버튼 클릭시 컨텐츠 전환
      activeCont = this.querySelector("a").getAttribute("href");
      document.querySelector(activeCont).style.display = "flex";
    });
  }

  // mainCon - h1 호버 효과
  document
    .querySelectorAll(".mainCon-hover")
    .forEach((button) => (button.innerHTML = "<div><span>" + button.textContent.trim().split("").join("</span><span>") + "</span></div>"));

  // con6
  // con6 card list 가져오기
  const $cardWrapper = document.querySelector(".main_con6_card-wrapper");
  let cardList = null;
  function getData() {
    fetch("../static/json/mainProfessor.json")
      .then((res) => res.json())
      .then((result) => {
        cardList = result;
        makeList(result);
      });
  }

  function makeList(items) {
    $cardWrapper.innerHTML = null;
    items.forEach((item) => {
      const result = makeItem(item);
      $cardWrapper.appendChild(result);
    });
  }

  function makeItem(item) {
    const div = document.createElement("div");
    div.classList.add("main_con6_card");

    div.innerHTML = `
    <div class="main_con6_cardIn">
      <div class="main_con6_card-front">
      <div class="main_con6_card-border">
          <p>${item.front_num}</p>
          <img src="${item.front_icon}" alt="">
          <p>${item.front_subject}</p>
      </div>
      </div>
      <div class="main_con6_card-back" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 46.78%, rgba(0, 0, 0, 0.8) 100%), url('${item.back_img}'); background-size: cover; background-position: center;" >
          <div>
              <span>${item.back_subject}</span>
              <span>${item.back_professor}</span>
          </div>
      </div>
    </div>
        `;
    return div;
  }

  getData();

  // 모우닝 머틀 effect
  const moaning = document.querySelector("#main_moaning-myrtle");
  moaning.innerHTML = moaning.textContent.replace(/\S/g, "<span>$&</span>");
  // document.querySelectorAll("#main_moaning-myrtle span").forEach((letter) => {
  //   letter.addEventListener("mouseover", () => { letter.classList.add("active");});
  // });
})();
