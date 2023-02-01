(function(){
    'use strict'

    // *** Common const ***
    const $body = document.querySelector('body');
    // -----------------------------------------/

    // ========================================================== *** Header & menu control *** ==================================== //

    // Header hamberger Btn 🍔 **
    const $headerBtn = document.querySelector('.comm_menu_btn');
    const $headerBg = document.querySelector('#comm_header');

    $headerBtn.addEventListener('click', () => {
        $headerBtn.classList.toggle('comm_active_header_btn'); // button
        $headerBg.classList.toggle('comm_white_Bg'); // background
    });

    // Header music bar control ♬ ***
    const $musicbarContainer = document.querySelector('#comm_musicbar_container');
    const $musicbarSpanList = $musicbarContainer.querySelectorAll('.comm_bar');
    const $audio = document.querySelector('audio');

    // $audio.volume = 0.2; // volume control
    $audio.volume = 0; // volume control(작업용)

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

    // Menu accordion animation ***
    const $submenuTitle = document.querySelectorAll('.comm_menu_title');
    const $submenuItem = document.querySelectorAll('.comm_header_submenu');

    // Flag menu const
    const $menuFlag = document.querySelector('.comm_menu_login_flag');
    const $menuFlagList = document.querySelector('.comm_menu_login_flag_menu');

    $submenuTitle.forEach((title, index) => {
        title.addEventListener('click', e => {
            e.preventDefault();
            $menuFlagList.classList.remove('comm_menu_login_flag_menu_accordion');
            $searchText.classList.remove('comm_active_input');
            $submenuItem.forEach((item, index2) => {
                item.classList.toggle('comm_active_accordion');
                if (index !== index2) {
                    item.classList.remove('comm_active_accordion');
                }
            });
        })
    })

    // Flag icon accordion menu **
    $menuFlag.addEventListener('click', () => {
        $menuFlagList.classList.toggle('comm_menu_login_flag_menu_accordion');
        $submenuItem.forEach(item => {
            item.classList.remove('comm_active_accordion');
        });
        $searchText.classList.remove('comm_active_input');
    })

    // Search box control **

    // - Header search (max-width 1920)
    const $searchBtn = document.querySelector('.comm_search_btn');
    const $searchText = document.querySelector('.comm_search_text');

    $searchBtn.addEventListener('click', e => {
        $searchText.classList.toggle('comm_active_input');
        $headerBg.classList.toggle('comm_white_Bg'); // background
        $searchText.focus();

        $body.addEventListener('click', e => {
            if (e.target.parentNode.className !== 'comm_search_textbox') {
                $searchText.classList.remove('comm_active_input');
                $headerBg.classList.remove('comm_white_Bg'); // background
                $searchText.value = '';
            }
        });

    });

    // - Menu search (max-width 768)
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

    const rightSideMenu = new Drawer(document.querySelector('.comm_header_menu_max768'));
    const topSideMenu = new Drawer(document.querySelector('.comm_header_menu_max1920'),
        function () {
            this.isOpen = true;
            this.el.style.transform = 'translateY(0)';
            this.el.style.zIndex = '1';
            this.el.style.opacity = '1';
        },
        function () {
            this.isOpen = false;
            this.el.style.transform = 'translateY(-100%)';
            this.el.style.zIndex = '-1';
            this.el.style.opacity = '0';
        }
    );

    // - Menu opner Click
    const $menuOpner = document.querySelector('.comm_menu_btn');
    $menuOpner.addEventListener('click', e => {
        if (window.innerWidth <= 768) {
            if (rightSideMenu.isOpen) {
                rightSideMenu.close();
                $submenuItem.forEach(item => {
                    item.classList.remove('comm_active_accordion');
                })
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
            })
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

        $headerBg.classList.toggle('comm_white_Bg');
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

    const his_cnt = document.querySelector('.his_cnt')
    //미디어쿼리
    let windowWidth = window.matchMedia('screen and (max-width: 850px)');
    
    const hisStart = document.querySelector('.his_infoTitleCnt'); //our history
    const hisNav = document.querySelector('.his_navCnt') //nav

    // json 가져오기
    function loadItems(){
        return fetch("../static/json/history.json")
        .then((response)=>response.json())
        .then((json)=>json.items);
    }
    const his_yearCnt = document.querySelector('.his_yearCnt');
    const his_yearFlex = document.querySelectorAll('.his_yearFlex')
    
    // json 뿌리기
    loadItems().then((items)=>{
        items.forEach((ele, index) => {
            for(let i=0; i<his_yearFlex.length; i++){
                if(his_yearFlex[i].classList[0] === ele.century){
                    if(!(index%2)){
                        const hisDown = document.createElement('div');
                        hisDown.classList.add('his_down');
                        // 내용을 담을 부모, 이미지
                        const downDiv = document.createElement('div');
                        downDiv.classList.add('his_downCnt');
                        const downImg = document.createElement('img');
                        // 사이 가름선
                        const lineM = document.createElement('img');
                        lineM.src = '../static/img/jiwon/LineM.svg'
                        lineM.classList.add('his_lineM', 'his_lineMdown');
                        // 에피소드별 이미지
                        downImg.src=`${ele.image}`
                        downImg.classList.add('his_yearImg', 'his_downImg');
                        
                        downDiv.innerHTML = `
                            <div class="his_detailY">
                                ${ele.years}
                                <img src='../static/img/jiwon/paper.jpg' class="his_border"></img>
                            </div>
                            <div class="his_lineLong"></div>
                            <div class="his_detCnt">
                                <div class="his_detailTcnt">
                                    <div class="his_detailT">${ele.title1}</div>
                                    <div class="his_detailT">${ele.title2}</div>
                                    <div class="his_detailT">${ele.title3}</div>
                                </div>
                                <div class="his_detailDcnt">
                                    <div class="his_detailD">${ele.detail1}</div>
                                    <div class="his_detailD">${ele.detail2}</div>
                                    <div class="his_detailD">${ele.detail3}</div>
                                    <div class="his_detailD">${ele.detail4}</div>
                                </div>
                            </div>
                        `
                        downDiv.insertBefore(downImg, downDiv.firstChild);//이미지 배치
                        //이음선 위치
                        var lineCh = downDiv.firstChild.nextSibling;
                        lineCh.after(lineM);
                        hisDown.append(downDiv);
                        his_yearFlex[i].append(hisDown);
                    } else {
                        const his_upDownCnt = document.createElement('div')
                        his_upDownCnt.classList.add('his_upDownCnt');
                        const hisUp = document.createElement('div');
                        hisUp.classList.add('his_up');
                        const UpDiv = document.createElement('div');
                        const lineM = document.createElement('img');
                        lineM.src = '../static/img/jiwon/LineM.svg'
                        lineM.classList.add('his_lineM', 'his_lineMup');
                        const UpImg = document.createElement('img');
                        UpImg.src=`${ele.image}`
                        UpImg.classList.add('his_yearImg', 'his_upImg');
                        UpDiv.classList.add('his_upCnt');
                        UpDiv.innerHTML = `
                            <div class="his_detCnt">
                                <div class="his_detailTcnt">
                                    <div class="his_detailT">${ele.title1}</div>
                                    <div class="his_detailT">${ele.title2}</div>
                                    <div class="his_detailT">${ele.title3}</div>
                                </div>
                                <div class="his_detailDcnt">
                                    <div class="his_detailD">${ele.detail1}</div>
                                    <div class="his_detailD">${ele.detail2}</div>
                                    <div class="his_detailD">${ele.detail3}</div>
                                    <div class="his_detailD">${ele.detail4}</div>
                                </div>
                            </div>
                            <div class="his_detailY">
                                <img src='../static/img/jiwon/paper.jpg' class="his_border"></img>
                                ${ele.years}
                            </div>
                            <div class="his_lineLong"></div>
                        `
                        var lineCh = UpDiv.lastChild.previousSibling;
                        lineCh.after(lineM);//세로 선
                        UpDiv.append(UpImg);//이미지 배치
                        hisUp.append(UpDiv);
                        his_yearFlex[i].append(hisUp);
                    }
                }
            }
        });
    })
    
    const his_nav = document.querySelectorAll('.his_nav')//----원하는 시대로 이동하기----
    let isDown = false; //터치이벤트용
    window.addEventListener('wheel', (e) => {
        window.addEventListener('scroll', e=>{
            e.preventDefault();
        });
        // 마우스 휠 가로스크롤 850보다 클 때만.
        if(!(windowWidth.matches)){
            his_cnt.scrollBy({
                left: e.deltaY,
                // behavior: 'smooth'
            });
              
            // -----가로 스크롤 터치하기------
            let startX;
            let scrollLeft;
        
            his_cnt.addEventListener('mousedown', e => {
                isDown = true;
                his_cnt.classList.add('active');
                startX = e.pageX - his_cnt.offsetLeft;
                scrollLeft = his_cnt.scrollLeft;
            });
            his_cnt.addEventListener('mouseleave', () => {
                isDown = false;
            his_cnt.classList.remove('active');
            });
            his_cnt.addEventListener('mouseup', () => {
                isDown = false;
            his_cnt.classList.remove('active');
            });
            his_cnt.addEventListener('mousemove', e => {
                if (!isDown) return; 
                e.preventDefault();
                const x = e.pageX - his_cnt.offsetLeft;
                const walk = (x - startX);
                his_cnt.scrollLeft = scrollLeft - walk;
            });// -----가로 스크롤 터치하기------
            
            // 시대 이동
            his_nav.forEach((ele, idx) =>{
                ele.addEventListener('click', e=>{
                        const location = document.querySelector(".his_" + idx + 'nav').offsetLeft;
                        his_cnt.scrollLeft = location;
                })
            })
        } else { //가로850보다 작을때
            his_cnt.scrollBy({
                top: e.deltaY,
                // behavior: 'smooth'
            });
            console.log(`wheel: ${e.deltaY}`)
            // 세로일때 nav fix 
            let navTop = hisNav.getBoundingClientRect().top;
            console.log(navTop);
            if(navTop < (his_cnt.scrollTop + (2*e.deltaY))){
                hisNav.classList.add('his_fix');
                $headerBtn.addEventListener('click', e=>{
                    const navFix = document.querySelector('.his_fix');
                    navFix.style.top = '118px';
                })
            } else if(navTop > 8*e.deltaY) {
                hisNav.classList.remove('his_fix');
            }
            // let scroll = his_cnt.scrollTop;
            // let high = hisStart.scrollHeight;
            // if(scroll === high){
            //     hisNav.classList.add('his_fix');
            //     console.log(hisNav.classList);
            // }else{
            //     hisNav.classList.remove('his_fix');
            // }// 세로일때 nav fix 

            // 세로 스크롤 터치하기
            let startY;
            let scrollTop;
        
            his_cnt.addEventListener('mousedown', e => {
                isDown = true;
                his_cnt.classList.add('active');
                startY = e.pageY - his_cnt.offsetTop;
                scrollTop = his_cnt.scrollTop;
                console.log('mousedown');
            });
            his_cnt.addEventListener('mouseleave', () => {
                isDown = false;
                his_cnt.classList.remove('active');
                console.log('mouseleave');
            });
            his_cnt.addEventListener('mouseup', () => {
                console.log('mouseup');
                isDown = false;
                his_cnt.classList.remove('active');
            });
            his_cnt.addEventListener('mousemove', e => {
                if (!isDown) return; 
                e.preventDefault();
                const y = e.pageY - his_cnt.offsetTop;
                const walk = (y - startY);
                his_cnt.scrollTop = scrollTop - walk;
                console.log('mousemove');
            });// 세로 스크롤 터치하기
            
        }
    });
    //paper 높이 조절용
    // function setScreenSize(){
    //     let vh = window.innerHeight * 0.01;
    //     document.documentElement.style.setProperty('--vh', `${vh}px`);
    // }
    // setScreenSize();
    
    //cursor grab grabbing 
    his_cnt.addEventListener('mousedown', e=>{
        his_cnt.classList.add('his_grabbing');
    })
    his_cnt.addEventListener('mouseup', e=>{
        his_cnt.classList.remove('his_grabbing');
    })   
            
})()