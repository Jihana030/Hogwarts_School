(function(){
    'use strict';
    
    const pro_img_cnt = document.querySelector('.pro_cnt');
    
    // json가져오기
    function loadItems(){
        return fetch("./professor.json")
            .then((response)=>response.json())
            .then((json)=>json.items);
    }
    // json 뿌리기
    loadItems().then((items)=>{
        items.forEach((ele, i) => {
            const imgDiv = document.createElement('div');
            const image = document.createElement('img');
            const imfoDiv =  document.createElement('div');
            pro_img_cnt.appendChild(imgDiv);
            imgDiv.classList.add('proImage', `imgNum${i}`);
            image.src=`${ele.image}`;
            image.classList.add('pro_imgSize')
            imfoDiv.style.width=`${ele.width}`
            imfoDiv.style.height=`${ele.height}`
            imgDiv.style.width=`${ele.width}`
            imgDiv.style.height=`${ele.height}`
            imfoDiv.innerHTML=`
                ${house()}
                <div class='pro_textCnt'>
                    <div class='pro_position'>${ele.position}</div>
                    <div class='pro_name'>${ele.name}</div>
                    <div class='pro_subject'>${ele.subject}</div>
                    <div class='pro_years'>${ele.years}</div>
                </div>
            `
            imfoDiv.classList.add('proHidden', 'pro_hover');
            
            // 기숙사로고 관리
            function house(){
                if(ele.house){
                    return `<img class='pro_house' src="${ele.house}"></img>`
                } return '';
            };
            imgDiv.append(image);
            imgDiv.append(imfoDiv);
            // hover event
            imgDiv.addEventListener('mouseover', e=>{
                imfoDiv.classList.toggle('proHidden', false)
            })
            imgDiv.addEventListener('mouseout', e=>{
                imfoDiv.classList.toggle('proHidden', true)
            })
            
            // -------mouse trust event-----------------------------mouse trust event-----------------
            pro_img_cnt.addEventListener("mousemove", (e) => {
                let width = window.innerWidth / 2;
                let mouseMoved2 = ((width - e.pageX*2.5));
                let mouseMoved3 = ((width - e.pageY*2.8));
                imgDiv.style.transform = 'translate(' + mouseMoved2 + 'px, ' + mouseMoved3 + 'px)';
                imgDiv.style.transition=  'all 1s';
            });
        });
    })




})()