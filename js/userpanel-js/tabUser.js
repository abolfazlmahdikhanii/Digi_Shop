const tabcontent = document.getElementsByClassName("tabcontent");
const tabcontentNoti = document.getElementsByClassName("tabcontent-noti");
const tablinks = document.querySelectorAll(".tablink");
const firstBtn = document.querySelector(".first");
const secondBtn = document.querySelector(".second");

const openPage=(pageName)=>{
    for (let i = 0; i < tabcontent.length; i++) { //all tabcontent display=none
         tabcontent[i].style.display="none"
      
    }
    if(tabcontentNoti !==null){
     for (let i = 0; i < tabcontentNoti.length; i++) {
          tabcontentNoti[i].style.display="none"
       
     }
   }
   document.getElementById(pageName).style.display="block"; // all pagename dispaly=block


}

document.getElementById("defaultOpen").click() 


//  function for tab
firstBtn.addEventListener('click',()=>{
     firstBtn.classList.add('visible')
     secondBtn.classList.remove('visible')
    
})

secondBtn.addEventListener('click',()=>{
     firstBtn.classList.remove('visible')
     secondBtn.classList.add('visible')
    
})

document.addEventListener('DOMContentLoaded',()=>{
     firstBtn.classList.add('visible');
  

     
})