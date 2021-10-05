//tab
const tabcontent = document.getElementsByClassName("tabcontent");
const tablinks = document.querySelectorAll(".tablink");
const firstBtn = document.querySelector(".first");


//cart items
const cartElement=document.querySelector('.list-cart')
const sumPrice=document.querySelector('.sum-price')
const sumPriceOffer=document.querySelector('.sum-price-offer')
const sumPriceCart=document.querySelector('.sum-price-cart')
const sumOffer=document.querySelector('.sum-offer')
const count=document.querySelector('.count')
const emptyCart=document.querySelector('.empty-c')
const leftCartSection=document.querySelector('.left')
let cartArr=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[] //get cart items data from localStorage

//function for show new tab
const openPage=(pageName)=>{
    for (let i = 0; i < tabcontent.length; i++) {
         tabcontent[i].style.display="none"
        
    }
 
   document.getElementById(pageName).style.display="block";


}

document.getElementById("defaultOpen").click()

firstBtn.addEventListener('click',()=>{
     firstBtn.classList.add('visible')

})





//function for show cart items
const showItems=(arr)=>{
     cartElement.innerHTML=''

     arr.forEach((item) => {
          const li=document.createElement('li')
          li.className='item-cart'
          li.innerHTML=`
          <div class="item-right">
          <img src="${item.url}">
          <span class="remove-m" data-id="${item.id}"><i class="fas fa-trash-alt"></i></span>
        </div>
        <div class="item-left">
         
          
           
          <div class="container">
            
            <p class="title"> ${item.title} </p>
            <p class="color"><span class="color-border"><i class="fas fa-circle"></i></span><span class="kind-color">قرمز</span></p>
            <p class="garranty"><span class="granty-border"><i class="fas fa-shield-alt"></i></span><span class="kind-garranty"> ۷ روز تضمین بازگشت کالا</span></p>
            <p class="store"><span class="store-border"><i class="fas fa-store"></i></span><span class="kind-store"> اچ دی کالا</span></p>
            <p class="status"><span class="status-border"><i class="far fa-save"></i></span><span class="kind-status">${item.exist=='isset'?'موجود در انبار ':'ناموجود در انبار'}</span></p>
             <div class="p-m">
             <p class="off">تخفیف  <span class="fee-price">${item.priceOffer!==0?numberWithCommas((item.price)-(item.priceOffer)):'0'}  </span> تومان</p>
             <p class="t-price"><span class="price">${item.priceOffer!==0?numberWithCommas(item.priceOffer):numberWithCommas(item.price)}</span> تومان</p>
             </div>
          </div>
      
          <div class="item-bottom">
           
        
             
            <div class="number-a">
         
            <span class="plus" data-id="${item.id}">+</span>
             <p class='item'>${item.amount}</p>
            <span class="min" data-id="${item.id}">-</span>
              

            </div>
          
              <p class="remove" data-id="${item.id}">حذف</p>
           </div>
           <div class="price-container">
             <p class="off">تخفیف  <span class="fee-price">${item.priceOffer!==0?numberWithCommas((item.price)-(item.priceOffer)):'0'}  </span> تومان</p>
             <p class="t-price"><span class="price">${item.priceOffer!==0?numberWithCommas(item.priceOffer):numberWithCommas(item.price)}</span> تومان</p>
           </div>
         </div>
          
          
          `
          
          cartElement.appendChild(li)
     })
}

// calculate total offer,total price 
const factor=(arr)=>{
     let cartTotal = 0;
     let totalAmount=0
     let totalPriceOffer=0
     let totalOffer=0
     let total=0
     arr.forEach(( item) => {
        cartTotal=cartTotal +item.price * item.amount
        totalAmount=totalAmount+item.amount
        totalPriceOffer=totalPriceOffer-(item.price-item.priceOffer)*item.amount
        total=total+(item.priceOffer!==0?item.priceOffer*item.amount:item.price*item.amount)
     })
     sumPrice.textContent=numberWithCommas(cartTotal)
     count.textContent=totalAmount
     sumPriceOffer.textContent=numberWithCommas(Math.abs(totalPriceOffer))
    totalOffer=Math.floor(totalPriceOffer*100/cartTotal)
    sumOffer.innerHTML=`% ${totalOffer!==''?Math.abs(totalOffer):'0'} `
    
  
    sumPriceCart.innerHTML=numberWithCommas(total)
}

const checkEmpty=()=>{
     if(cartArr.length>0){
       emptyCart.classList.add('visible')
       leftCartSection.classList.add('visible')
     }
     else{
          emptyCart.classList.remove('visible')
          leftCartSection.classList.remove('visible')
     }
}
//remove and add amount and min amount  function
const eventListner=(arr)=>{
     document.querySelectorAll('.item-cart').forEach((item) => {
          item.addEventListener('click',(e)=>{
               if(e.target.classList.contains("remove")){
                    let remove=e.target
                    let id=remove.dataset.id
                     removeProduct(arr,id) 
                     cartElement.removeChild(remove.parentElement.parentElement.parentElement) 
                     localStorage.setItem('cart',JSON.stringify(arr)) 
                     factor(arr)
                     checkEmpty()
               }
              else if(e.target.classList.contains("remove-m")){
                    let remove=e.target
                    let id=remove.dataset.id
                     removeProduct(arr,id) 
                     cartElement.removeChild(e.target.parentElement.parentElement) 
                     localStorage.setItem('cart',JSON.stringify(arr)) 
                     factor(arr)
                     checkEmpty()
               }
               if(e.target.classList.contains("plus")){
                    let add=e.target
                    let addid=add.dataset.id
                    console.log(addid);

                   let count= findProduct(arr,addid)

                   count.amount=count.amount+1
                   add.nextElementSibling.innerHTML=count.amount
                   localStorage.setItem('cart',JSON.stringify(arr)) 
                   factor(arr)
               }
               if(e.target.classList.contains("min")){
                    let min=e.target
                    let minid=min.dataset.id
                    console.log(minid);

                   let count= findProduct(arr,minid)

                   count.amount=count.amount-1
                   min.previousElementSibling.innerHTML=count.amount
                   if(count.amount<1){
                    removeProduct(arr,minid) 
                    cartElement.removeChild(e.target.parentElement.parentElement.parentElement.parentElement) 
                    checkEmpty()
                   }
                   localStorage.setItem('cart',JSON.stringify(arr)) 
                   factor(arr)
               }
          })
     })


}


document.addEventListener('DOMContentLoaded',()=>{
     showItems(cartArr)
     eventListner(cartArr)
     factor(cartArr)
     firstBtn.classList.add('visible')
     checkEmpty()
})
