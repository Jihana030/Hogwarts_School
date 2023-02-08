(function () {
    'use strict';

    // *** Common const ***
    const $body = document.querySelector('body');
    // -----------------------------------------/

    // ========================================================== *** Header & menu control *** ==================================== //


    // Header music bar control ♬ ***

    const $musicbarContainer = document.querySelector('#comm_musicbar_container');
    const $musicbarSpanList = $musicbarContainer.querySelectorAll('.comm_bar');
    const $audio = document.querySelector('audio');

    // $audio.volume = 0.2; // volume control
    $audio.volume = 0; // volume control

    $musicbarContainer.addEventListener('click', e => {
        const state = parseInt($musicbarContainer.dataset.state);
        $musicbarContainer.dataset.state = 1 - state;

        $musicbarSpanList.forEach(item => {
            if (state) {
                item.classList.add('comm_animation_play_pause');
            } else {
                item.classList.remove('comm_animation_play_pause');
            }
        });

        if ($audio.paused) {
            $audio.play();
        }
        else {
            $audio.pause();
        }
    });


    // Header ***

    const $headerBtn = document.querySelector('.comm_menu_btn');
    const $header = document.querySelector('#comm_header');

    // Header search (max-width 1920) **
    const $searchBtn = document.querySelector('.comm_search_btn');
    const $searchText = document.querySelector('.comm_search_text');


    // - Header hamberger Btn 🍔 **
    $headerBtn.addEventListener('click', e => {
        const btn = +($headerBtn.dataset.btn);
        $headerBtn.dataset.btn = 1 - btn;
        if (btn) {
            $headerBtn.classList.add('comm_active_header_btn'); // button
            $header.classList.add('comm_white_Bg');
            $searchText.classList.remove('comm_active_input');
        }
        else {
            $headerBtn.classList.remove('comm_active_header_btn');
            $header.classList.remove('comm_white_Bg');
            // $searchText.classList.remove('comm_active_input');
        }
    });

    // - Search box control **
    $searchBtn.addEventListener('click', e => {
        const btn = +($searchBtn.dataset.btn);
        $searchBtn.dataset.btn = 1 - btn;
        if (btn) { // 1
            $searchText.classList.add('comm_active_input');
            $header.classList.add('comm_white_Bg');
            $searchText.focus();
        }
        else {
            $searchText.classList.remove('comm_active_input');
            console.log($headerBtn.dataset.btn)
            if (!$headerBtn.dataset.btn) {
                $header.classList.remove('comm_white_Bg');
            }
        }
    });

    // - Header flag mouseover **

    const $flagIcon = document.querySelector('.comm_login_flag_box');
    const $flagIconMenu = document.querySelector('.comm_login_flag_menu');
    $flagIcon.addEventListener('click', () => {
        $searchText.classList.remove('comm_active_input');
        $flagIconMenu.classList.toggle('comm_dp_none');
    });


    // max-width 768px ***

    // - Menu search (max-width 768) **
    const $searchMenuBtn = document.querySelector('.comm_header_menu_max768 .comm_menu_search_btn');
    const $searchMenuBox = document.querySelector('.comm_header_menu_max768 .comm_header_menu_bottom');
    const $searchMenuTextbox = document.querySelector('.comm_header_menu_max768 #comm_menu_search_text');

    $searchMenuBtn.addEventListener('click', e => {
        $searchMenuBox.classList.toggle('comm_active_menu_input');
        $searchMenuTextbox.focus();
        $searchMenuTextbox.value = '';

        $menuFlagList.classList.remove('comm_menu_login_flag_menu_accordion');
        $submenuItem.forEach(item => {
            item.classList.remove('comm_active_accordion');
        });
    });


    // Menu accordion animation ***

    const $submenuTitle = document.querySelectorAll('.comm_menu_title');
    const $submenuItem = document.querySelectorAll('.comm_header_submenu');

    // Menu flag const
    const $menuFlag = document.querySelector('.comm_menu_login_flag');
    const $menuFlagList = document.querySelector('.comm_menu_login_flag_menu');

    $submenuTitle.forEach((title, index) => {
        title.addEventListener('mouseover', e => {
            e.preventDefault();
            $menuFlagList.classList.remove('comm_menu_login_flag_menu_accordion');
            $searchText.classList.remove('comm_active_input');
            $submenuItem.forEach((item, index2) => {
                item.classList.add('comm_active_accordion');
                if (index !== index2) {
                    item.classList.remove('comm_active_accordion');
                }
            });
        });
    });

    $submenuItem.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('comm_active_accordion');
        });
    });
    $submenuItem.forEach(item => {
        item.addEventListener('mouseout', () => {
            item.classList.remove('comm_active_accordion');
        });
    });

    $submenuTitle[2].addEventListener('click', () => {
        window.location.href = 'house_list.html';
    });

    // Flag icon accordion menu **
    $menuFlag.addEventListener('click', () => {
        $menuFlagList.classList.toggle('comm_menu_login_flag_menu_accordion');
        $submenuItem.forEach(item => {
            item.classList.remove('comm_active_accordion');
        });
        $searchText.classList.remove('comm_active_input');
    });


    // - Menu opner Click ***

    const rightSideMenu = new Drawer(document.querySelector('.comm_header_menu_max768'));
    const topSideMenu = new Drawer(document.querySelector('.comm_header_menu_max1920'),
        function () {
            this.isOpen = true;
            this.el.style.transform = 'translateY(0)';
            this.el.style.zIndex = '99';
            this.el.style.opacity = '1';
        },
        function () {
            this.isOpen = false;
            this.el.style.transform = 'translateY(-100%)';
            this.el.style.zIndex = '-1';
            this.el.style.opacity = '0';
        }
    );

    const $menuOpner = document.querySelector('.comm_menu_btn');
    $menuOpner.addEventListener('click', e => {

        if (window.innerWidth <= 768) {
            if (rightSideMenu.isOpen) {
                rightSideMenu.close();
                $submenuItem.forEach(item => {
                    item.classList.remove('comm_active_accordion');
                });
                $searchMenuBox.classList.remove('is_active_menu_input');
            }
            else {
                rightSideMenu.open();
            }

            $body.addEventListener('click', e => {
                if (e.target === $body) {
                    if (rightSideMenu.isOpen) {
                        rightSideMenu.close();
                    }
                }
            });
        }
        else {
            if (topSideMenu.isOpen) {
                topSideMenu.close();
                $submenuItem.forEach(item => {
                    item.classList.remove('comm_active_accordion');
                })
                $searchMenuBox.classList.remove('is_active_menu_input');
            }
            else {
                topSideMenu.open();
            }
        }

    });


    // Menu X Button (max-width 768) **

    const $closeBtn = document.querySelector('.comm_header_menu_max768 .comm_closeBtn');

    $closeBtn.addEventListener('click', () => {
        rightSideMenu.close();

        $header.classList.toggle('comm_white_Bg');
        $headerBtn.classList.toggle('comm_active_header_btn');
        $searchMenuBox.classList.remove('comm_active_menu_input');
        $menuFlagList.classList.remove('comm_menu_login_flag_menu_accordion');
        $submenuItem.forEach(item => {
            item.classList.remove('comm_active_accordion');
        })
    });



    // Header menu animation (top & right) **

    function Drawer(el, cbOpen, cbClose, open = false) {

        this.el = el;
        this.isOpen = open;

        this.open = cbOpen ? cbOpen : defaultOpen;
        this.close = cbClose ? cbClose : defaultClose;

        function defaultOpen() {
            this.isOpen = true;
            this.el.style.transform = 'translate(0)';
        }

        function defaultClose() {
            this.isOpen = false;
            this.el.style.transform = 'translate(100%)';
        }

        (this.isOpen) ? this.open() : this.close();
    }

})();