
let titleInputEdit = document.querySelector("#title-product");
let priceInputEdit = document.querySelector("#price-product");
const stateEdit = document.querySelector("#se-state");
const categorySelectEdit = document.querySelector("#se-category");
const priceOfferProduct=document.querySelector('#price-off-product')
const sellerProduct=document.querySelector('#seller-product')

const submitEdit = document.querySelector("#submit-btn");
const deletEdit = document.querySelector(".delet-bt");
const lastUpdateTxt = document.querySelector(".last-update");
let imageEdit = document.querySelector("img");

let productsEdit=getStorage()

// get id from url
let productsId=location.hash.substring(1);

// Find a product that matches the URL ID
const findEdit=findProduct(productsEdit,productsId)

// Insert values to display

titleInputEdit.value=findEdit.title
priceInputEdit.value=findEdit.price
priceOfferProduct.value=findEdit.priceOffer
sellerProduct.value=findEdit.seller
stateEdit.value=findEdit.exist
categorySelectEdit.value=findEdit.category
imageEdit.src=findEdit.url
lastUpdateTxt.textContent=timeUpdate(findEdit.created)
if(imageEdit!==null){
    imageEdit.style.display='block'
}

//  EDIT DATA 
submitEdit.addEventListener('click',(e)=>{
    findEdit.title=titleInputEdit.value
    findEdit.price=priceInputEdit.value
    findEdit.exist=stateEdit.value
    findEdit.priceOffer=priceOfferProduct.value
    findEdit.seller=sellerProduct.value
    findEdit.category=categorySelectEdit.value
    findEdit.url =imageEdit.src
    findEdit.created=moment().valueOf()
    lastUpdateTxt.textContent=timeUpdate(findEdit.created)
    saveStorage(productsEdit,null)
    location.assign('../createProduct.html')
})
// DELETE DATA
deletEdit.addEventListener('click',(e)=>{
 removeProduct(productsEdit,findEdit.id)
 saveStorage(productsEdit,null)
 location.assign('../createProduct.html')
})