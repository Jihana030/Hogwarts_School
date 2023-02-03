// ================================
// START YOUR APP HERE
// ================================
const init = {
  monList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num) => (num < 10 ? "0" + num : num),
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
      index++;
    }
    return index;
  }
};

const $calBody = document.querySelector(".main_cal-body");

const $btnNext = document.querySelector(".main_btn-cal.next");
const $btnPrev = document.querySelector(".main_btn-cal.prev");

/**
 * @param {number} date
 * @param {number} dayIn
 */

/**
 * @param {date} fullDate
 */
function loadYYMM(fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = init.getFirstDay(yy, mm);
  let lastDay = init.getLastDay(yy, mm);
  let markToday; // for marking today date

  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  document.querySelector(".main_cal-month").textContent = init.monList[mm];
  document.querySelector(".main_cal-year").textContent = yy;

  let trtd = "";
  let startCount;
  let countDay = 0;

  for (let i = 0; i < 6; i++) {
    trtd += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
        trtd += "<td>";
      } else {
        let fullDate = yy + "." + init.addZero(mm + 1) + "." + init.addZero(countDay + 1);
        trtd += '<td class="day';
        trtd += markToday && markToday === countDay + 1 ? ' today"' : '"';
        trtd += `data-date="${countDay + 1}" data-fdate="${fullDate}">`;
      }
      trtd += startCount ? `<p class="dayElem">${++countDay}</p>` : "";
      if (countDay === lastDay.getDate()) {
        startCount = 0;
      }
      trtd += "</td>";
    }
    trtd += "</tr>";
  }
  $calBody.innerHTML = trtd;
}

/**
 * @param {string} val
 */
function createNewList(val) {
  let id = new Date().getTime() + "";
  let yy = init.activeDate.getFullYear();
  let mm = init.activeDate.getMonth() + 1;
  let dd = init.activeDate.getDate();
  const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

  let date = yy + "." + init.addZero(mm) + "." + init.addZero(dd);

  let eventData = {};
  eventData["date"] = date;
  eventData["memo"] = val;
  eventData["complete"] = false;
  eventData["id"] = id;
  init.event.push(eventData);
  $todoList.appendChild(createLi(id, val, date));
}

loadYYMM(init.today);

$btnNext.addEventListener("click", () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener("click", () => loadYYMM(init.prevMonth()));

$calBody.addEventListener("mousemove", (e) => {
  if (e.target.classList.contains("day")) {
    if (init.activeDTag) {
      init.activeDTag.classList.remove("day-active");
    }
    let day = Number(e.target.textContent);
    e.target.classList.add("day-active");
    init.activeDTag = e.target;
    init.activeDate.setDate(day);
  }
  if (e.target.classList.contains("dayElem")) {
    // console.log(e.target.parentNode);
    if (init.activeDTag) {
      init.activeDTag.classList.remove("day-active");
    }
    init.activeDTag = e.target.parentElement;
    init.activeDTag.classList.add("day-active");
  }
});

// main_nav-menu-date
// 현재 날짜 출력 ex.2023-01-19
const $navDate = document.querySelector("#main_nav-menu-date");
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1; //0부터 시작하므로 1을 더한다.
let day = date.getDate();

if (("" + month).length === 1) {
  month = "0" + month;
}
if (("" + day).length === 1) {
  day = "0" + day;
}

const $today = `${year} - ${month} - ${day}`;
$navDate.innerHTML = $today;

// con1 - 달력 퀴디치 일정
let $match = `${month} / ${day} : 퀴디치 (그리핀도르 vs 후플푸프)`;
const $matchDate = document.querySelector("#main_match");
$matchDate.innerHTML = $match;

// con1 - 달력 일정 바꾸기
const $calbodyTr = document.querySelectorAll(".main_cal-body tr");
const $calbodyTd = document.querySelectorAll(".main_cal-body tr td");
const $month = document.querySelector(".main_cal-month");

// 순간이동 특강 날짜
const $teleportClass = document.querySelectorAll(".main_cal-body td:nth-child(7) p");

// console.log($teleportClass);
// console.log($calbodyTd[7].innerText);
// console.log($calbodyTd.length);

// 발렌타인 데이 행사 표시
for (let i = 0; i < $calbodyTd.length; i++) {
  if (i === 16) {
    let $dayElem = $calbodyTd[i].children;
    $dayElem[0].style.color = "var(--point-color)";
    $dayElem[0].addEventListener("click", function (e) {
      let eventDay = e.target.innerText;
      $match = `${month} / ${eventDay < 10 ? "0" + eventDay : eventDay} : 성 발렌타인 데이 행사`;

      console.log(`${eventDay} - e.target.innerText`);
      console.log($matchDate.innerHTML);

      $matchDate.innerHTML = $match;
    });
  }
}

// con1 - 달력 : 순간이동 시험 대비 특강
for (let i = 0; i < $teleportClass.length; i++) {
  let $teleportElem = $teleportClass[i];
  $teleportElem.style.color = "var(--point-color)";
  $teleportElem.addEventListener("click", function (e) {
    let eventDay = e.target.innerText;
    $match = `${month} / ${eventDay < 10 ? "0" + eventDay : eventDay} : 순간이동 시험 대비 특강 (${[i + 1]}주차)`;

    console.log(`${eventDay} - e.target.innerText`);
    console.log($matchDate.innerHTML);

    $matchDate.innerHTML = $match;
  });
}
