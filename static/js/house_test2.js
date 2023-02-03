(function(){
  const $houseTest_container = document.querySelector('.HouseTest_center_item');
  const $nextBtn = document.querySelector('.houseTest_nextBtn');
  
  //기숙사 테스트 리스트
  function qesList(){
      return fetch("../static/json/houseTest.json")
      .then(res=>res.json())
      .then(json=>json);
  }
  
  let i=-1;
  $nextBtn.addEventListener('click', e=>{
    console.log('a')
    $nextBtn.innerHTML = `Next`;
    if(i>-1){
      checkedAns()
    } else {
      makeList()
    }
  })
  
  function makeList(){
    qesList().then((item)=>{
      console.log(item);
      if(i<item.length){
        $houseTest_container.innerHTML = `
            <div class="houseTest_qes blurFilter opacity">
            ${item[i].q.replace(/\\n/g, '<br>')}
            </div>
            <div class="houseTest_ansList blurFilter opacity">
                <ul>
                    <li>
                        <label><input type="radio" name="houseTest" value="" /><p>${item[i].a[0].answer.replace(/\\n/g, '<br>')}</p></label>
                    </li>
                    <li>
                        <label><input type="radio" name="houseTest" value="" /><p>${item[i].a[1].answer.replace(/\\n/g, '<br>')}</p></label>
                    </li>
                    <li>
                        <label><input type="radio" name="houseTest" value="" /><p>${item[i].a[2].answer.replace(/\\n/g, '<br>')}</p></label>
                    </li>
                    <li>
                        <label><input type="radio" name="houseTest" value="" /><p>${item[i].a[3].answer.replace(/\\n/g, '<br>')}</p></label>
                    </li>
                </ul>
            </div>
        `;
      }
      addFilters();
    })
    i += 1;
  }
  
  function checkedAns(){
    const $ansList = document.querySelectorAll('input[type="radio"]');
  
    if(!$ansList[0].checked && !$ansList[1].checked && !$ansList[2].checked && !$ansList[3].checked) {
      alert('답변을 선택해 주세요.');
      return;
    } else {
      makeList();
    }
  }
  
  // Create our GSAP Timeline and respective Tweens
  function addFilters(){
    const sec = 0.9;
    gsap.timeline({repeat: -1, yoyo: true, repeatDelay: 360})
    .to('.blurFilter', {
      'filter': 'blur(0)',
      delay: sec,
      ease: 'power1.Out'})
      .to('.opacity', {
      'opacity': 1,
        delay: 0.05,
        ease: 'power1.Out'},"<");
  }

})();
