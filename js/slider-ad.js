const slider = document.getElementsByClassName('item-slide');
const btnPrev = document.querySelector('#prev-slide');
const btnNext = document.querySelector('#next-slide');
const dotSlide = document.getElementsByClassName("dot-item");

let item = 0;

//function for display none all image
const itemDisplayNone = () => {
        for (let i = 0; i < slider.length; i++) {
            slider[i].style.display = "none";
        }
    }
    //remove active dot in slide
const dotRemoveActive = () => {
        for (let i = 0; i < dotSlide.length; i++) {
            dotSlide[i].classList.remove("active");
        }
    }
    //when click next show next image
btnNext.addEventListener('click', e => {
    e.preventDefault();
    item++;
    if (item > slider.length - 1) {
        item = 0;
    }
    dotRemoveActive();
    itemDisplayNone();


    slider[item].style.display = "block";
    dotSlide[item].classList.add("active");
})
btnPrev.addEventListener('click', e => {
    e.preventDefault();
    item--
    if (item < 0) {
        item = slider.length - 1;
    }
    dotRemoveActive();

    itemDisplayNone();

    slider[item].style.display = "block";
    dotSlide[item].classList.add("active");
})


//after 3 seconds show next image
setInterval(() => {
    item++;
    if (item > slider.length - 1) {
        item = 0;
    }
    dotRemoveActive();
    itemDisplayNone();


    slider[item].style.display = "block";
    dotSlide[item].classList.add("active");
}, 3000);