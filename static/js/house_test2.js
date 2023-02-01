const $houseTest_container = document.querySelector('.HouseTest_center_item');
const $nextBtn = document.querySelector('.houseTest_nextBtn');

//기숙사 테스트 리스트
function qesList(){
    return fetch("../static/json/houseTest.json")
    .then(res=>res.json())
    .then(json=>json);
}

let i=0;
$nextBtn.addEventListener('click', e=>{
    qesList().then((item)=>{
      if(i<item.length){
        $houseTest_container.innerHTML = `
        <div class="HouseTest_center opacity blurFilter">
            <div class="HouseTest_img">
                <img src="" alt="">
            </div>
            <div class="houseTest_qes">
            ${item[i].q}
            </div>
            <div class="houseTest_ansList">
                <ul>
                    <li>
                        <label><input type="radio" name="houseTest_g" value="" />${item[i].a[0].answer}</label>
                    </li>
                    <li>
                        <label><input type="radio" name="houseTest_g" value="" />${item[i].a[1].answer}</label>
                    </li>
                    <li>
                        <label><input type="radio" name="houseTest_g" value="" />${item[i].a[2].answer}</label>
                    </li>
                    <li>
                        <label><input type="radio" name="houseTest_g" value="" />${item[i].a[3].answer}</label>
                    </li>
                </ul>
            </div>
        `;

        addFilters();
      }
    })
    
    i += 1;
    $nextBtn.innerHTML = `Next`;
});

const textTexture = new PIXI.RenderTexture(
  new PIXI.BaseRenderTexture({
    width: $houseTest_container.innerHTML.width,
    height: $houseTest_container.innerHTML.height
  })
)

// Our filters
const colorMatrix = new PIXI.filters.ColorMatrixFilter();
const textSprite = new PIXI.Sprite(textTexture);
 
// Indentity Matrix for our target
const identMatrix = 	[
          1, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 0, 1, 0,
      ];

// The colorMatrix values to enhance the contrast of the blur
const contrastMatrix = [
          1, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 0, 22, -7,
      ];

// Create our GSAP Timeline and respective Tweens
function addFilters(){
  const sec = 1.1;
  gsap.timeline({repeat: -1, yoyo: true, repeatDelay: 60})
  .to('.blurFilter', {
    'filter': 'blur(0)',
    delay: sec,
    ease: 'power1.Out'})
    .to(contrastMatrix,{
      endArray: identMatrix,
      duration: sec,
      ease: 'power1.Out'}, "<")
    .to('.opacity', {
    'opacity': 1,
      delay: 0.05,
      ease: 'power1.Out'},"<");
  
    colorMatrix.matrix = contrastMatrix;
}
