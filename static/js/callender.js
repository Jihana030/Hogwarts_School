// ================================
// START YOUR APP HERE
// ================================
const init = {
    monList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
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
    addZero: (num) => (num < 10) ? '0' + num : num,
    activeDTag: null,
    getIndex: function (node) {
      let index = 0;
      while (node = node.previousElementSibling) {
        index++;
      }
      return index;
    }
  };
  
  const $calBody = document.querySelector('.main_cal-body');
  const $btnNext = document.querySelector('.main_btn-cal.next');
  const $btnPrev = document.querySelector('.main_btn-cal.prev');
  
  /**
   * @param {number} date
   * @param {number} dayIn
  */

  
  /**
   * @param {date} fullDate
   */
  function loadYYMM (fullDate) {
    let yy = fullDate.getFullYear();
    let mm = fullDate.getMonth();
    let firstDay = init.getFirstDay(yy, mm);
    let lastDay = init.getLastDay(yy, mm);
    let markToday;  // for marking today date
    
    if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
      markToday = init.today.getDate();
    }
  
    document.querySelector('.main_cal-month').textContent = init.monList[mm];
    document.querySelector('.main_cal-year').textContent = yy;
  
    let trtd = '';
    let startCount;
    let countDay = 0;
    for (let i = 0; i < 6; i++) {
      trtd += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && !startCount && j === firstDay.getDay()) {
          startCount = 1;
        }
        if (!startCount) {
          trtd += '<td>'
        } else {
          let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
          trtd += '<td class="day';
          trtd += (markToday && markToday === countDay + 1) ? ' today"' : '"';
          trtd += `data-date="${countDay + 1}" data-fdate="${fullDate}">`;
        }
        trtd += (startCount) ? `<p class="dayElem">${++countDay}</p>` : '';
        if (countDay === lastDay.getDate()) { 
          startCount = 0; 
        }
        trtd += '</td>';
      }
      trtd += '</tr>';
      
    }
    $calBody.innerHTML = trtd;

  }
  
  /**
   * @param {string} val
   */
  function createNewList (val) {
    let id = new Date().getTime() + '';
    let yy = init.activeDate.getFullYear();
    let mm = init.activeDate.getMonth() + 1;
    let dd = init.activeDate.getDate();
    const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);
    
    let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);
    
    let eventData = {};
    eventData['date'] = date;
    eventData['memo'] = val;
    eventData['complete'] = false;
    eventData['id'] = id;
    init.event.push(eventData);
    $todoList.appendChild(createLi(id, val, date));
  }
  
  loadYYMM(init.today);
  
  $btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
  $btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));
  
  $calBody.addEventListener('mousemove', (e) => {
    if (e.target.classList.contains('day')) {
      if (init.activeDTag) {
        init.activeDTag.classList.remove('day-active');
      }
      let day = Number(e.target.textContent); 
      e.target.classList.add('day-active');
      init.activeDTag = e.target;
      init.activeDate.setDate(day);
    }
    if (e.target.classList.contains('dayElem')) {
      if (init.activeDTag) {
        init.activeDTag.classList.remove('day-active');
      }
      init.activeDTag = e.target.parentElement;
      init.activeDTag.classList.add('day-active')
      console.log(e.target.parentNode)
    }
  });
  