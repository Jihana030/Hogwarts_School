(function(){
    'use strict'

    // ------------start--------------------start--------------------------------------
    const alohomora = document.querySelector('.alohomora');
    const start_right = document.querySelector('.start_backChange_right');
    const start_left = document.querySelector('.start_backChange_left');
    alohomora.addEventListener('keyup', e=> {
        if(e.keyCode===13){
            if(e.target.value==='Alohomora' || e.target.value==='alohomora' || e.target.value==='알로호모라'){
                start_left.classList.add('start_ani_left');
                start_right.classList.add('start_ani_right');
                alohomora.classList.add('displayNone')
            } else {
                alohomora.classList.toggle('start_error');
            }
        }
    })
    // ------------start--------------------start--------------------------------------
})()