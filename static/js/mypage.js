(function () {

    'use strict';

    // Fullcalendar render ***

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


    // Todo List ***

    const $todoPlusBtn = document.querySelector('.mypage_Todolist_plus'); // plus button
    const $todoIcon = $todoPlusBtn.querySelector('.mypage_Todolist_plus_icon'); // plus button icon

    const $todo = document.querySelector('.mypage_Todolist_middle'); // middle parentElem
    const $todoInput = $todo.querySelector('.mypage_Todolist_middle_input'); // input

    const $todoUl = document.querySelector('.mypage_Todolist_contents'); // ul
    const $todoAddBtn = $todo.querySelector('.mypage_Todolist_middle_btn'); // add button

    $todoPlusBtn.addEventListener('click', () => {
        $todoIcon.classList.toggle('mypage_Todolist_plus_icon_active');
        $todo.classList.toggle('mypage_Todolist_middle_active');
    });

    
    function addTodoItem() {
        const val = $todoInput.value;
        if(val === '') { return; }

        const $todoLi = document.createElement('li');
        $todoLi.className = 'mypage_Todolist_detail';
        let todoNum = 0;

        $todoLi.innerHTML = `
            <div class="mypage_Todolist_detail_check_box">
                <input type="checkbox" id="mypage_Todolist_check">
                <label for="mypage_Todolist_check" class="mypage_Todolist_detail_check"></label>
            </div>
            <p>
                ${val + ' '}
            </p>
        `;
        $todoUl.append($todoLi);
        $todoInput.value = '';

    }

    $todoInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            addTodoItem();
        }
    });

})();