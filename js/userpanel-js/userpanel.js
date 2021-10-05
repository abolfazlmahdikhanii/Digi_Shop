
// menu

const closeMenu = document.querySelector('.close-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const dashboarddMenu = document.querySelector('.dashboard-menu');
const chk=document.querySelectorAll('.chk-status')
const chkStatus=document.querySelectorAll('input[type="checkbox"]:checked')
const chkStatusTxt=document.querySelectorAll('.state-txt')
const Status=document.querySelector('.status')
// menu
const headerMenu=document.querySelector('.header-item')
const headerMenuPc=document.querySelector('.header-item-pc')
const Menu=document.querySelector('.menu')
const drop = document.querySelector('#backdrop');
const menuItem = document.querySelectorAll('.item');
const txtItem = document.querySelectorAll('.a');
const closeBtn = document.querySelector('.close-btn');
const tbl = document.querySelector('.tbl');





// checkbox event


Array.prototype.forEach.call(chk, function(element) {
  element.addEventListener('change', function() {
   chkStatusTxt.forEach(el => {
    el.textContent='data-wow value is: ' + element.value;
   });
  });
});


// menu
headerMenu.addEventListener('click',()=>{
Menu.classList.add('toggle')
drop.classList.add('visible');
if(tbl!=null){
  tbl.classList.add('active')
}

})
drop.addEventListener('click', () => {
  
    Menu.classList.remove('toggle');
    
    drop.classList.remove('visible');
    if(tbl!=null){
      tbl.classList.add('active')
    }
})
headerMenuPc.addEventListener('click',()=>{
  Menu.classList.toggle('active')
 
  menuItem.forEach(element => {
    element.classList.toggle('active')
  });
  txtItem.forEach(element => {
    element.classList.toggle('active')
  });
})
closeBtn.addEventListener('click', () => {
  
  Menu.classList.remove('toggle');
  
  drop.classList.remove('visible');
  if(tbl!=null){
    tbl.classList.remove('active')
  }
})
document.addEventListener('DOMContentLoaded',()=>{
  let profile=localStorage.getItem('state')?JSON.parse(localStorage.getItem('state')):[]
  console.log(profile[0].state);
 if(profile[0].state==false){
    
     location.assign('http://127.0.0.1:5500/index.html')
    

 }
})





