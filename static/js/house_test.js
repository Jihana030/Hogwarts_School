const $houseTest_qes = document.querySelector('.houseTest_qes');

// Create a new PIXI application
const app = new PIXI.Application({
    width: 537,
    height: 250,
    backgroundColor: 0xffffff,
    transparent: true,
});

// Append the canvas to the document <body>
$houseTest_qes.appendChild(app.view);

const $nextBtn = document.querySelector('.houseTest_nextBtn');

// Style it (font is imported from GoogleFonts in CSS)
const textStyle = {
    fontFamily: 'Eulyoo1945',
    fontSize: 20,
    fill: 0x7E674B,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: 600,
    lineHeight: 24,
    padding: 10, // some fonts get clipped 
  }

//기숙사 테스트 리스트
function qesList(){
    return fetch("../static/json/houseTest.json")
    .then(res=>res.json())
    .then(json=>json);
}

let i = 0;

$nextBtn.addEventListener('click', e=>{
    qesList().then((item)=>{
        if(i<11){
            const text = item[i].q;
            i += 1;
            console.log(text);
            makeText(text)
        }
    })
});

function makeText(text){
    const quote = new PIXI.Text(text, textStyle);
        quote.resolution = window.devicePixelRatio;
        quote.anchor.set(0.5);
        quote.x = app.screen.width/2;
        quote.y = app.screen.height/2;
        
        // Create a texture into which to write our text
        let textTexture = new PIXI.RenderTexture(
          new PIXI.BaseRenderTexture({
            width: app.screen.width,
            height: app.screen.height
          })
        )
        
        // Our filters
        const blurFilter = new PIXI.filters.BlurFilter();
        const colorMatrix = new PIXI.filters.ColorMatrixFilter();
        
        // Indentity Matrix for our target
        const identMatrix = 	[
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0,
                ];
        
        // The colorMatrix values to enhance the contrast of the blur
        const contrastMatrix = [
                    1, 0, 0, 0,   0,
                    0, 1, 0, 0,   0,
                    0, 0, 1, 0,   0,
                    0, 0, 0, 22, -7,
                ];
        
        // The container for our text
        const textContainer = new PIXI.Container();
        // Add the text graphics to it
        textContainer.addChild(quote);
        
        // Make a sprite from our texture
        const textSprite = new PIXI.Sprite(textTexture);
        // Render our text container into the texture
        app.renderer.render(textContainer, textTexture);
        // It is now safe to destroy our text Object to release memory
        quote.destroy();
        
        const sec = 1.1;
        // Create our GSAP Timeline and respective Tweens
        gsap.timeline({repeat: -1, yoyo: true, repeatDelay: 60})
        .to(blurFilter, {
            blur: 0,
            duration: sec,
            ease: 'power1.Out'
        })
        .to(contrastMatrix,{
          endArray: identMatrix,
          duration: sec,
          ease: 'power1.Out'
        }, "<")
        .to(textSprite, {
          alpha: 1,
          duration: 0.5,
          ease: 'power1.Out'
        },"<")
        
        blurFilter.blur = 15;
        colorMatrix.matrix = contrastMatrix;
        textSprite.filters = [blurFilter, colorMatrix];
        textSprite.alpha = 0; // start 
        app.stage.removeChild(app.stage.children[0]);
        app.stage.addChild(textSprite);
}