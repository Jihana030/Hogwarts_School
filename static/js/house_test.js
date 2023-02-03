const $houseTest_qes = document.querySelector('.houseTest_qes');
const $houseTest_ans = document.querySelectorAll('.houseTest_ansItem');

// Create a new PIXI application
const app = new PIXI.Application({
    width: 500,
    height: 250,
    backgroundColor: 0x000000,
    transparent: true,
});

const Ansapp0 = new PIXI.Application({
  width: 480,
  height: 40,
  backgroundColor: 0x000000,
  transparent: true,
});

const Ansapp1 = new PIXI.Application({
  width: 480,
  height: 40,
  backgroundColor: 0x000000,
  transparent: true,
});

const Ansapp2 = new PIXI.Application({
  width: 480,
  height: 40,
  backgroundColor: 0x000000,
  transparent: true,
});

const Ansapp3 = new PIXI.Application({
  width: 480,
  height: 40,
  backgroundColor: 0x000000,
  transparent: true,
});

// Append the canvas to the document <body>
$houseTest_qes.append(app.view);

$houseTest_ans[0].append(Ansapp0.view);
$houseTest_ans[1].append(Ansapp1.view);
$houseTest_ans[2].append(Ansapp2.view);
$houseTest_ans[3].append(Ansapp3.view);



const $nextBtn = document.querySelector('.houseTest_nextBtn');

// Style it (font is imported from GoogleFonts in CSS)
const textStyle = {
    fontFamily: 'Eulyoo1945',
    fontSize: 18,
    fill: 0x7E674B,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: 500,
    lineHeight: 22,
    fontWeight:  600,
    padding: 10, // some fonts get clipped 
  }

  const AnstextStyle = {
    fontFamily: 'Eulyoo1945',
    fontSize: 16,
    fill: 0x7E674B,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: 440,
    lineHeight: 20,
    fontWeight:  400,
    padding: 10, // some fonts get clipped 
  }

//기숙사 테스트 리스트
function testList(){
    return fetch("../static/json/houseTest.json")
    .then(res=>res.json())
    .then(json=>json);
}

let i = 0;
$nextBtn.addEventListener('click', e=>{
    testList().then((item)=>{
        if(i<11){
            const qesItem = item[i].q.replace(/\\n/g, '\n');
            makeQes(qesItem)

            const ansItem0 = item[i].a[0].answer.replace(/\\n/g, '\n');
            makeAns0(ansItem0)

            const ansItem1 = item[i].a[1].answer.replace(/\\n/g, '\n');
            makeAns1(ansItem1)

            const ansItem2 = item[i].a[2].answer.replace(/\\n/g, '\n');
            makeAns2(ansItem2)

            const ansItem3 = item[i].a[3].answer.replace(/\\n/g, '\n');
            makeAns3(ansItem3)
            i += 1;
        }
    })
});

function makeQes(text){
  console.log(text);
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

function makeAns0(text){
    const quote = new PIXI.Text(text, AnstextStyle);
        // quote.resolution = window.devicePixelRatio;
        quote.anchor.set(0.5);
        quote.x = Ansapp0.screen.width/2;
        quote.y = Ansapp0.screen.height/2;
        
        // Create a texture into which to write our text
        let textTexture = new PIXI.RenderTexture(
          new PIXI.BaseRenderTexture({
            width: Ansapp0.screen.width,
            height: Ansapp0.screen.height
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
        Ansapp0.renderer.render(textContainer, textTexture);
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
        Ansapp0.stage.removeChild(Ansapp0.stage.children[0]);
        Ansapp0.stage.addChild(textSprite);
}

function makeAns1(text){
  const quote = new PIXI.Text(text, AnstextStyle);
      quote.resolution = window.devicePixelRatio;
      quote.anchor.set(0.5);
      quote.x = Ansapp1.screen.width/2;
      quote.y = Ansapp1.screen.height/2;
      
      // Create a texture into which to write our text
      let textTexture = new PIXI.RenderTexture(
        new PIXI.BaseRenderTexture({
          width: Ansapp1.screen.width,
          height: Ansapp1.screen.height
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
      Ansapp1.renderer.render(textContainer, textTexture);
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
      Ansapp1.stage.removeChild(Ansapp1.stage.children[0]);
      Ansapp1.stage.addChild(textSprite);
}

function makeAns2(text){
  const quote = new PIXI.Text(text, AnstextStyle);
      quote.resolution = window.devicePixelRatio;
      quote.anchor.set(0.5);
      quote.x = Ansapp2.screen.width/2;
      quote.y = Ansapp2.screen.height/2;
      
      // Create a texture into which to write our text
      let textTexture = new PIXI.RenderTexture(
        new PIXI.BaseRenderTexture({
          width: Ansapp2.screen.width,
          height: Ansapp2.screen.height
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
      Ansapp2.renderer.render(textContainer, textTexture);
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
      Ansapp2.stage.removeChild(Ansapp2.stage.children[0]);
      Ansapp2.stage.addChild(textSprite);
}

function makeAns3(text){
  const quote = new PIXI.Text(text, AnstextStyle);
      quote.resolution = window.devicePixelRatio;
      quote.anchor.set(0.5);
      quote.x = Ansapp3.screen.width/2;
      quote.y = Ansapp3.screen.height/2;
      
      // Create a texture into which to write our text
      let textTexture = new PIXI.RenderTexture(
        new PIXI.BaseRenderTexture({
          width: Ansapp3.screen.width,
          height: Ansapp3.screen.height
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
      Ansapp3.renderer.render(textContainer, textTexture);
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
      Ansapp3.stage.removeChild(Ansapp3.stage.children[0]);
      Ansapp3.stage.addChild(textSprite);
}