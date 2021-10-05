// initilize header element
const menu = document.querySelector('.menu');
const btnMenu = document.querySelector('#btn-menu');
const drop = document.querySelector('#backdrop');
//initilize cart element
const btnCart = document.querySelector('.item-cartt');
const cart = document.querySelector('.cart-shop');
const closeCart = document.querySelector('.close-cart');
// initilize footer element
const footerList = document.querySelector('.footer-list');
const footerListSecond = document.querySelector('.footer-list-1');
const footerArrow = document.querySelector('.f-arrow');
const footerArrowSecond = document.querySelector('.f-arrows');
// initilize scroll element
const scrollBtn = document.querySelector('.scroll');
//offer
const offerModal = document.querySelector('.offer-modal');
const closeModal = document.querySelector('.offer-close');
//top-offer
const closeTopOffer = document.querySelector('.top-container-closebtn');
const topOffer = document.querySelector('.top-offer');
//item-login
const itemLogin = document.querySelector('.item-user');
const profileName = document.querySelector('.name-profile-text');
const profileClose = document.querySelector('.close-profile');
const extendProfile = document.querySelector('.extend-profile');
//function for open & close menu for mobile size
const modalCrt = document.querySelector('.modal-cart')

btnMenu.addEventListener('click', () => {
    btnMenu.innerHTML = '<i style="font-size:17px !important;" class="fa fa-times"></i>'
    drop.classList.add('visible');
    menu.classList.add('toggle');


})

btnCart.addEventListener('click', () => {
    drop.classList.add('visible');
    cart.classList.add('showCart');


})

closeCart.addEventListener('click', () => {
    drop.classList.remove('visible');
    cart.classList.remove('showCart');


})
drop.addEventListener('click', () => {
    btnMenu.innerHTML = '<i  class="fa fa-bars"></i>'
    menu.classList.remove('toggle');
    cart.classList.remove('showCart');
    drop.classList.remove('visible');
    modalCrt.classList.remove('visible')
})

//function for open & close acordion menu in header for mobile size
footerArrow.addEventListener('click', () => {

    footerList.classList.toggle('visible');
    footerArrow.classList.toggle('f-active')
})

footerArrowSecond.addEventListener('click', () => {

    footerListSecond.classList.toggle('visible');
    footerArrowSecond.classList.toggle('f-actives')
})

//function for scroll to top
if (scrollBtn != null) {
    scrollBtn.addEventListener('click', () => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    })
}
document.addEventListener("DOMContentLoaded", () => {

    if (offerModal !== null) {
        drop.classList.add('visible');
        offerModal.classList.add('visible');
    }

    // let StateUserLogin = localStorage.getItem("state");

    let profile=localStorage.getItem('profile')?JSON.parse(localStorage.getItem('profile')):[]
    let state=localStorage.getItem('state')?JSON.parse(localStorage.getItem('state')):[]
   





    if (state!==null && state.length>0) {
        itemLogin.removeEventListener('click', itemClick);
        if (profileName !== null && profileClose !== null) {
            profileName.textContent = profile.first;

            itemLogin.addEventListener('click', () => {
                extendProfile.classList.toggle('visible')
            })
           
            profileClose.addEventListener('click', () => {
                localStorage.removeItem("state");
                location.reload()
            })
        }

    }
})
if (closeModal != null) {
    closeModal.addEventListener('click', () => {
        drop.classList.remove('visible');
        offerModal.classList.remove('visible')
    })
}
//when click hidden header offer(top-offer)
if (closeTopOffer != null) {
    closeTopOffer.addEventListener("click", () => {
        topOffer.style.display = "none"
    })
}
const itemClick = () => {
    location.replace("login.html")
}
itemLogin.addEventListener('click', itemClick)