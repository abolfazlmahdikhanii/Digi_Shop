
//get color
const txtKindColor=document.querySelector('.kind-color');
const radioKindColor=document.querySelectorAll('.radio');
// open the dis div

const closeBtn=document.querySelector('.kind-more-close');
const moreDiv=document.querySelector('.more');

// share modal
const shareBtn=document.querySelector('.share-product');
const backDrop=document.querySelector('#backdrop');
const shareModal=document.querySelector('.share');
const closeModalShare=document.querySelector('.header-close-modal');
// small image
const smallImage=document.querySelectorAll('.img-pr-small');

// copy url
const copyBtn=document.querySelector('.btn-modal');
const copyFacebook=document.querySelector('#facebook');
const copyWhatsUp=document.querySelector('#whatsup');
const copyTwitt=document.querySelector('#tweet');
const copyTel=document.querySelector('#tel');

const eventListener=()=>{
document.addEventListener('DOMContentLoaded',()=>{
    // get color
    radioKindColor.forEach(element => {
        if(element.checked)
        txtKindColor.textContent=element.value
        
        element.addEventListener('change',(e)=>{
            e.preventDefault()
           txtKindColor.textContent=e.target.value;
        })
    });


})

// open the dis div

closeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    moreDiv.classList.remove('visible');
    moreBtn.style.display='block'

})

// share modal
shareBtn.addEventListener('click',(e)=>{
e.preventDefault();
backDrop.classList.add('visible');
shareModal.classList.add('visible');
document.body.style.position = 'fixed';
document.body.style.top = `-${window.scrollY}px`;
document.body.style.left = `-${window.scrollX}px`;
document.body.style.right = `-${window.scrollX}px`;
document.body.style.bottom = `-${window.scrollX}px`;
})
backDrop.addEventListener('click',(e)=>{
    e.preventDefault();
    backDrop.classList.remove('visible');
    shareModal.classList.remove('visible');
    document.body.style.position = 'unset';
    document.body.style.top = `${window.scrollY}px`;
})

// small image show
smallImage.forEach(element => {
    element.addEventListener('click',(e)=>{
        document.querySelector('.img-lg').src=e.target.src
        console.log(e.target.src);
    })
});

// open info modal

closeModalShare.addEventListener('click',()=>{
    backDrop.classList.remove('visible');
    shareModal.classList.remove('visible');
    
    document.body.style.position = 'unset';
    document.body.style.top = `${window.scrollY}px`;
})

// open all detail info box 



// copy url

copyBtn.addEventListener('click',(e)=>{


    navigator.clipboard.writeText(window.location.href)
    .then(() => { 
        document.querySelector('#copy').classList.add('visible');
        document.querySelector('.txt-btn-modal').classList.add('visible');
    
        setTimeout(() => {
            document.querySelector('#copy').classList.remove('visible');
            document.querySelector('.txt-btn-modal').classList.remove('visible');
        }, 5000);
    })
    .catch((error) => { e.target.textContent='کپی نشد' });



    

     
    
})
// copy link in facebook
copyFacebook.addEventListener('click',()=>{
const whats_app_message = window.location.href;
        const whatsapp_url = "https://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]="+whats_app_message;
        window.open(whatsapp_url, '_blank').focus();

})
copyTel.addEventListener('click',()=>{
    const whats_app_message = window.location.href;
    var whatsapp_url = "https://telegram.me/share?url="+whats_app_message;
    window.open(whatsapp_url, '_blank').focus();
})
copyWhatsUp.addEventListener('click',()=>{
const whats_app_message = window.location.href;
        var whatsapp_url = "https://api.whatsapp.com/send/?phone&text="+whats_app_message;
        window.open(whatsapp_url, '_blank').focus();
})
copyTwitt.addEventListener('click',()=>{
    const whats_app_message = window.location.href;
    var whatsapp_url = "https://twitter.com/intent/tweet?url="+whats_app_message;
    window.open(whatsapp_url, '_blank').focus();
})


// image zoom

}


// events
eventListener()


