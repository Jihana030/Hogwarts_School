(function(){
    'use strict'

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
    window.addEventListener('scroll', e=>{
        e.preventDefault();
    });
    const his_nav = document.querySelectorAll('.his_nav')//----원하는 시대로 이동하기----
    let isDown = false; //터치이벤트용

    let navTop = hisNav.getBoundingClientRect().top;
    window.addEventListener('wheel', (e) => {
       
    // 마우스 휠 가로스크롤 850보다 클 때만.
        if(!(windowWidth.matches)){
            his_cnt.scrollBy({
                left: e.deltaY,
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
                top: e.deltaY
            });

            // 세로일때 nav fix
            if(navTop<=window.scrollY + 1){
                hisNav.classList.add('his_fix');
            } else {
                hisNav.classList.remove('his_fix');
            }
            
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
    
    //cursor grab grabbing 
    his_cnt.addEventListener('mousedown', e=>{
        his_cnt.classList.add('his_grabbing');
    })
    his_cnt.addEventListener('mouseup', e=>{
        his_cnt.classList.remove('his_grabbing');
    })   
            
})()