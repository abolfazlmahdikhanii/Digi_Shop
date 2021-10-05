let titleInput = document.querySelector("#title-product");
let priceInput = document.querySelector("#price-product");
const state = document.querySelector("#se-state");
const sellerProduct=document.querySelector('#seller-product')
const priceOfferProduct=document.querySelector('#price-off-product')
const categorySelect = document.querySelector("#se-category");
const submit = document.querySelector(".sub-bt");
let image = document.querySelector("img");
const searchInput = document.querySelector(".search-item");
const tblCol = document.querySelector(".tbl-main");


let products = getStorage();


const filter={
  searchItem:''
}


const getDataUser = () => {
  const title = titleInput.value;
  const price = priceInput.value;
  const priceOffer = priceOfferProduct.value;
  const seller=sellerProduct.value
  
   if(title !== "" && price !== "" &&seller!=='' &&! isNaN(price) || ! isNaN(priceOffer)){
    let timeStamp=moment().valueOf()
    products.push({
     
      id:uuidv4(),
      title: title,
      price: price,
      priceOffer:priceOffer,
      seller:seller,
      exist: state.value,
      category: categorySelect.value,
      url: image.getAttribute('src'),
      created:timeStamp
    });
    saveStorage(products,null);
    appendItem(products,filter)
    titleInput.value = "";
    priceInput.value = "";
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  else {
     
    alert("err");
  } 
};


submit.addEventListener("click", (e) => {
  getDataUser();

});


searchInput.addEventListener('input',(e)=>{
  filter.searchItem=e.target.value
  appendItem(products,filter)
})
document.addEventListener('DOMContentLoaded',()=>{
 

   
    appendItem(products,filter)
  
})

