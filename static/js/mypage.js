(function () {

    'use strict';

    const $calendar = document.querySelector('#calendar');
    document.addEventListener('DOMContentLoaded', function () {
        const calendar = new FullCalendar.Calendar($calendar, {
            expandRows: true,
            initialView: 'dayGridMonth',
            fixedWeekCount: false,
        });
        calendar.render();

        const $calendarMonth = $calendar.querySelector('#fc-dom-1');
        $calendarMonth.style.textTransform = 'uppercase';

        const $calendarDay = $calendar.querySelectorAll('.fc-col-header-cell-cushion');
        $calendarDay.forEach(day => {
            day.textContent = day.textContent.substring(0, 1);
        })
    });



})();