(function () {

    'use strict';

    // Fullcalendar render ***

    const $calendar = document.querySelector('#calendar');
    document.addEventListener('DOMContentLoaded', function () {
        const calendar = new FullCalendar.Calendar($calendar, {
            expandRows: true,
            initialView: 'dayGridMonth',
            fixedWeekCount: false,

            events: [
                {
                    start: '2023-02-06',
                    end: '2023-02-07'
                },
                {
                    start: '2023-02-10'
                },
                {
                    start: '2023-02-17'
                },
                {
                    start: '2023-02-23'
                }
            ]
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

    let todoNum = 2;

    function addTodoItem() {
        const inputText = $todoInput.value;
        if (inputText === '') { return; }

        const $todoLi = document.createElement('li');
        $todoLi.className = 'mypage_Todolist_detail';

        todoNum++;

        $todoLi.innerHTML = `
            <div class="mypage_Todolist_detail_check_box">
                <input type="checkbox" id="mypage_Todolist_check${todoNum}">
                <label for="mypage_Todolist_check${todoNum}" class="mypage_Todolist_detail_check"></label>
            </div>
            <p>
                ${inputText}
            </p>
            <div class="mypage_Todolist_detail_dltBtn">
                <div class="mypage_Todolist_detail_dltBtn_icon"></div>
            </div>
        `;
        $todoUl.append($todoLi);
        $todoInput.value = '';

        // Todolist 삭제 **
        const $todoDltBtn = document.querySelectorAll('.mypage_Todolist_detail_dltBtn');
        $todoDltBtn.forEach(X => {
            X.addEventListener('click', e => {
                e.target.parentNode.parentNode.remove();
                console.log(e.target.parentNode.parentNode)
            });
        });
    }

    // Todolist 등록 **
    $todoAddBtn.addEventListener('click', addTodoItem); // 추가버튼 클릭 시
    $todoInput.addEventListener('keyup', e => { // Enter 누를 시
        if (e.key === 'Enter') {
            addTodoItem();
        }
    });



})();