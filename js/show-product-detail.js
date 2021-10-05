
const productTitle=document.querySelectorAll('.product-title')
const productTitleEn=document.querySelectorAll('.title-en')
const productImage=document.querySelector('.img-lg')

const productCoustomer=document.querySelector('.coustomer')
const productExsist=document.querySelector('.exist')
const productOffer=document.querySelector('.offer-border')
const productOldPrice=document.querySelector('.old-price')
const productNewPrice=document.querySelector('.new-price')
const btnAddCart=document.querySelector('.btn-add-to-cart')
const showCartModal=document.querySelector('.show-cart')
const showCartText=document.querySelector('.cart-txt')


const product=getStorage()
let cartt=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
let idProduct=location.hash.toString().substring(1)//return id from url after than # 


let findedProduct=product.find((item)=>{
    return item.id===idProduct
})

const data=()=>{
    
// find data from local storage whene url id ==local storage id
    
    
    // show data in page
    productTitle.forEach((item)=>{
        item.textContent=findedProduct.title;
    })
    productImage.src=findedProduct.url
    
    btnAddCart.setAttribute('data-id',`${findedProduct.id}`)
    productCoustomer.textContent=findedProduct.seller;
    productExsist.textContent=findedProduct.exist=='isset'?'موجود در انبار':'ناموجود درانبار'
    productOldPrice.innerHTML=`${findedProduct.priceOffer!==0?numberWithCommas(findedProduct.price):''}`
    productNewPrice.innerHTML=`${findedProduct.priceOffer!==0?numberWithCommas(findedProduct.priceOffer):numberWithCommas(findedProduct.price)} تومان`
    if(findedProduct.priceOffer!==0){
        let total=Math.floor(findedProduct.priceOffer*100/findedProduct.price-100)
        productOffer.innerHTML=`${Math.abs(total)} %`
    }
    else{
        productOffer.style.display='none'
    
    }
}

const findCartItem=(arr,id)=>{
    let findedItem=arr.find((item)=>{
        return item.id===id
    })
    return findedItem
}
const eventListner=()=>{
    btnAddCart.addEventListener('click',(e)=>{ //add items to cart

    const btnId=e.target.dataset.id
       let getCartId=findCartItem(cartt,btnId)
       if(!getCartId){ //if item in cart not exist add item
        let itemsCart = { ...findedProduct, amount: 1 };

        cartt = [...cartt, itemsCart];
        localStorage.setItem('cart',JSON.stringify(cartt))
      
        
       }
       else{ // if item exist only add amount
           getCartId.amount++
           localStorage.setItem('cart',JSON.stringify(cartt))

         
       }
       showCartModal.classList.add('visible')
       showCartText.innerHTML=`"${getCartId.title}"`
       setTimeout(() => {
        showCartModal.classList.remove('visible')
       }, 6000);
   
    })
    
    document.addEventListener('DOMContentLoaded',()=>{
      
        
        data()
      

    })
}
eventListner()


