(function () {

    'use strict';

    const $calendar = document.querySelector('#calendar');
    document.addEventListener('DOMContentLoaded', function () {
        const calendar = new FullCalendar.Calendar($calendar, {
            expandRows: true,
            initialView: 'dayGridMonth',
        })
        calendar.render();

        const $calendarMonth = $calendar.querySelector('#fc-dom-1');
        $calendarMonth.style.textTransform = 'uppercase';
        console.log($calendarMonth)
    });



})();