const $houseTest_qes = document.querySelector('.houseTest_qes');

// Create a new PIXI application
const app = new PIXI.Application({
    width: 626,
    height: 442,
    backgroundColor: 0xfffffff,
});

// Append the canvas to the document <body>
$houseTest_qes.appendChild(app.view);

// The display text
function text(){
    for(let i=0; i<10; i++){
        const text = `${i}`;
        return text;
    }
}

// Style it (font is imported from GoogleFonts in CSS)
const textStyle = {
  fontFamily: 'Eulyoo1945',
  fontSize: 32,
  fill: 0x43403d,
  align: 'left',
  wordWrap: true,
  wordWrapWidth: 500,
  lineHeight: 60,
  padding: 10, // some fonts get clipped 
}

const quote = new PIXI.Text(text(), textStyle);
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

const sec = 2;
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
app.stage.addChild(textSprite);