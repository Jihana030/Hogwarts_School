(function(){
    const $input = document.querySelectorAll('.join_alert_input');
    const $joinAlert = document.querySelectorAll('.join_alert');

    //blur
    $input.forEach((ele, idx) => {
        ele.addEventListener('blur', e=>{
            if(!ele.value){
                $joinAlert[idx].classList.toggle('hidden', false);
            } else{
                if(!idx){
                    $joinAlert[idx].classList.toggle('hidden', true);
                } else if(idx === 1){
                    idReg(ele, idx);
                } else if(idx ===2){
                    pwReg(ele, idx);
                } else if(idx === 3){
                    cpw(idx);
                } else if(idx === 4){
                    emailReg(ele, idx);
                }
            }
        });
    })

    //keyup
    $input.forEach((ele, idx)=>{
        ele.addEventListener('keyup', e=>{
            if(idx === 1){
                idReg(ele, idx);
            } else if(idx ===2){
                pwReg(ele, idx);
            } else if(idx === 3){
                cpw(idx);
            } else if(idx === 4){
                emailReg(ele, idx);
            }
        })
    })

    //아이디 정규식
    function idReg(ele, idx){
        const idRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;
        if(!idRegExp.test(ele.value)){
            $joinAlert[idx].classList.toggle('hidden', false);
        } else{
            $joinAlert[idx].classList.toggle('hidden', true);
        }
    }

    //비밀번호 정규식
    function pwReg(ele, idx){
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/g;
        if(!pwRegExp.test(ele.value)){
            $joinAlert[idx].classList.toggle('hidden', false);
        } else{
            $joinAlert[idx].classList.toggle('hidden', true);
        }
    }

    //비밀번호 확인
    function cpw(idx){
        if($input[2].value !== $input[3].value){
            $joinAlert[idx].classList.toggle('hidden', false);
        } else{
            $joinAlert[idx].classList.toggle('hidden', true);
        }
    }

    //주소 입력
    const $joinSearchBtn = document.querySelector('.join_search_btn');
    $joinSearchBtn.addEventListener('click', kakaopost);

    function kakaopost() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.querySelector(".u_address").value = extraAddr;
                
                } else {
                    document.querySelector(".u_address").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.querySelector(".u_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.querySelector(".u_dAddress").focus();
            }
        }).open(
            {
    popupName: 'postcodePopup',
    // autoClose: false,
}
)};

    //이메일 정규식
    function emailReg(ele, idx){
        const EmailRegExp =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!EmailRegExp.test(ele.value)){
            $joinAlert[idx].classList.toggle('hidden', false);
        } else{
            $joinAlert[idx].classList.toggle('hidden', true);
        }
    }

  //submit만 되게
  const $joinBtn = document.querySelector('.join_btn');

  $joinBtn.addEventListener('click', e=>{
    e.preventDefault();
    const $joinDefAlert = document.querySelectorAll('.join_alert');
    const $joinDef = document.querySelectorAll('.join_default');
    let submitResult;

    for(let i=0; i<$joinDefAlert.length; i++){
        if(!$joinDefAlert[i].classList.contains('hidden') || !$joinDef[i].value) {
            alert(`${$joinDefAlert[i].innerHTML.replace('* ','')}`);
            $joinDef[i].focus();
            $joinDefAlert[i].classList.toggle('hidden', false);
            // submitResult = false;
            return false;
        } 
    }

    const $checked = document.querySelector('input[name="join_def_cheked"]');
    if(!$checked.checked){
        alert(`개인 정보 수집 동의에 체크해 주세요.`);
        submitResult = false;
        return false;
    } else {
        submitResult = true;
    }

    if(!submitResult){
        return false;
    } 

    document.getElementById('join_frm').submit();
    // 입학 편지

    const $joinLetter = document.querySelector('.join_letter');
    const $toName = document.querySelector('.join_letter_userName');
    const $body = document.querySelector('.join_letter_bg');

    $toName.innerHTML = `${document.querySelector('.toName').value}`;

    $joinLetter.classList.remove('hidden');
    $body.classList.add('letter_overlay');
    window.scrollTo(0,0);
})


    // 편지 닫음
    const $letterCloseBtn = document.querySelector('.join_letter_closeBtn');

    $letterCloseBtn.addEventListener('click', ()=>{
        location.replace('http://192.168.0.132:3001/main');
    })

})();