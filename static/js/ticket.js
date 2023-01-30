(function(){
    //로그인 모달
    const $body = document.querySelector('.body');
    const $loginBtn = document.querySelector('.login_btn');
    const $loginModal = document.querySelector('#login_main_body');

    $loginBtn.addEventListener('click', e=>{
        //로그인 날짜 및 시간
        const $loginDate = document.querySelector('.login_date');
        const $loginTime = document.querySelector('.login_time');
        
        let loginDate = new Date();
        const year = loginDate.getFullYear();
        const month = loginDate.getMonth() + 1;
        const date = loginDate.getDate();
        
        const hours = loginDate.getHours();
        const minutes = loginDate.getMinutes();

        function newHours(){
            if(hours < 13){
                return hours;
            } 
            return hours > 12 || hours-12 < 10 ? '0'+ (hours-12) : hours-12;
        }

        $loginDate.innerHTML = `${year} - ${ month<10 ? '0'+ month : month} - ${ date<10 ? '0'+ date : date}`;
        $loginTime.innerHTML = ` ${hours>=12 ? 'PM' : 'AM'} ${newHours()} : ${minutes<10 ? '0'+minutes : minutes}`;

        $loginModal.classList.toggle('hidden', false);
        $body.classList.add('modal_overlay');
    })

    // 로그인 클릭 이벤트
    const $login_btn = document.querySelector('.login_form_btn');
    
    $login_btn.addEventListener('click', e=>{
        const $u_id = document.querySelector("input[name='u_id']"), $u_pw = document.querySelector("input[name='u_pw']");
        e.preventDefault();
        if(!$u_id.value){
            alert('아이디를 입력해 주세요.');
            $u_id.focus();
            return false;
        }
        if(!$u_pw.value){
            alert('비밀번호를 입력해 주세요.');
            $u_pw.focus();
            return false;
        }

        //로그인 데이터 저장
    
        function postLoginData(){
            const data = {
                id: $u_id.value,
                pw: $u_pw.value,
            }
            axios.post('http://localhost:3001/login', data)
            .then(data => console.log(data.data));
        }
        postLoginData();

        document.getElementById('login_frm').submit();

    })

})();