const newProduct = document.querySelector('#new')
const sellProduct = document.querySelector('#sell')
const bestProduct = document.querySelector('#best')
const superProduct = document.querySelector('#super-offer')
const modalCart = document.querySelector('.modal-cart')
const productContainer = document.querySelectorAll('.title-product div')
const formModal = document.querySelector('.frm-modal')
const backdropCart = document.querySelector('#backdrop')
const searchProduct = document.querySelector('#search-product')
const searchModal = document.querySelector('.search-modal')
const searchModall = document.querySelector('.search-modal')
const searchProductContainer = document.querySelector('.main-search')
let cartItems = document.querySelector(".notification");
const cartTotals = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const clearCartBtn = document.querySelector(".clear-cart");
const emptyCart = document.querySelector(".empty-cart");
const emptySearch = document.querySelector(".empty-search");
const btnSearch = document.querySelector("#btn-search");

// btn swiperProduct

const btnNextSwiper = document.querySelectorAll('.swiper-button-next ')
const btnPrevSwiper = document.querySelectorAll('.swiper-button-prev ')


let productJson = []
let productsShow = []
// get cart data
let cartt = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

// get data from json file
async function getProduct() {

    try {
        let res = await fetch("./products.json");
        let dataType = await res.json();
        let er = dataType.items;

        er = er.map((item) => {
            const {
                title,
                price,
                priceOffer,
                seller,
                exist,
                category,
                url,
                created
            } = item.fields;
            const {
                id
            } = item.sys;


            return {
                id,
                title,
                price,
                priceOffer,
                seller,
                exist,
                category,
                url,
                created
            };
        });
        return er;
    } catch (error) {
        console.log(error);
    }


}

//search in array and find item 
const cartFind = (arr, id) => {
    let itemCarts = arr.find((item) => {
        return item.id == id
    })
    return itemCarts
}

const filter = {
    search: ''
}


//append data in body for show
const append = (arr, ...container) => {
    let cartTotal = 0;
    let totalPriceOffer = 0
    let totalOffer = 0

    arr.forEach(item => {
        const divEl = document.createElement('div')
        divEl.className = 'swiper-slide'
        divEl.innerHTML = `
   
        <div class="product ">
            <div class="image-division ">
                <img src="${item.url}" alt="${item.title}">

            </div>
            <div class="prod-item ">
                <div class="prod-name " >
                    <h4 class="fw-700 "> ${item.title}</h4>
                </div>

                <div class="rate ">
                    <p class="text-muted "> امتیاز :<span>4</span></p>
                </div>
                <div class="prod ">

                    <div class="prod-seller ">
                        <p class="text-muted ">فروشنده : <span>${item.seller}</span></p>
                    </div>
                </div>
                <div class="prod-offPrice d-flex align-items-center ">

                    <p class="text-muted text-decoration-line-through off ">${item.priceOffer!==0?numberWithCommas(item.price):''}</p>
                    <p class="price ">${item.priceOffer!==0?numberWithCommas(item.priceOffer):numberWithCommas(item.price)} تومان</p>
                </div>
                <div class="badge-product ">
                
                 </div>
                <div class="prod-element ">

                    <a class="search" href="../product-detail.html#${item.id}" data-id="${item.id}"">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </a>
                  


                </div>
    

            </div>


        </div>
  
        `




        let cart = document.createElement('a')
        cart.className = 'cart'
        cart.setAttribute('data-id', `${item.id}`)
        cart.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        `
        divEl.querySelector('.prod-element').appendChild(cart)

        cart.addEventListener('click', (e) => {
            let id = cart.getAttribute('data-id')
            let elemntsItem = cartFind(productsShow, id)


            let element = document.createElement('div')
            formModal.innerHTML = ``
            element.innerHTML = `
            <div class="main-modal">
            <div class="img-modal">
                <img src="${elemntsItem.url}" alt="">
            </div>
            <div>
                <p class="t-header">${elemntsItem.title}</p>
                <p class="price-modal">قیمت : ${elemntsItem.priceOffer?elemntsItem.priceOffer:elemntsItem.price} تومان</p>
            </div>
            </div>
            <div class="bt-col">
                <button class="add-cart" data-id="${elemntsItem.id}"> ثبت </button>
                <button class="close">انصراف </button>
            </div>
            `

            formModal.appendChild(element)

            backdropCart.classList.add('visible')
            modalCart.classList.add('visible')


            //event btn modal
            element.querySelector('.close').addEventListener('click', () => {
                backdropCart.classList.remove('visible')
                modalCart.classList.remove('visible')
            })



            // add to cart

            const cartBtn = formModal.querySelector('.add-cart');
            cartBtn.addEventListener('click', (e) => {
                let idbt = e.target.dataset.id
                let idCart = cartFind(cartt, id)

                if (!idCart) {
                    let itemsCart = {
                        ...cartFind(productsShow, idbt),
                        amount: 1
                    };

                    cartt = [...cartt, itemsCart];
                    saveCart(cartt)
                    showCartItem(itemsCart);


                    setCartValue(cartt)

                } else {
                    idCart.amount++
                    saveCart(cartt)
                    setCartValue(cartt)
                    location.reload()

                }
                checkCart()



                backdropCart.classList.remove('visible')
                modalCart.classList.remove('visible')
            })
        })
        let p = document.createElement('p')
        p.className = 'off-badge '
        if (item.priceOffer !== 0) {


            let total = Math.floor(item.priceOffer * 100 / item.price - 100)
            p.innerHTML = `${Math.abs(total)} %`
            divEl.querySelector('.badge-product').appendChild(p)
        } else {
            divEl.querySelector('.badge-product').style.display = 'none'
        }
        container.forEach((el) => {
            if (item.category === el.getAttribute('id'))
                el.appendChild(divEl)
        })





    });





}

const checkEmptySearch = () => {
    if (searchProductContainer.children.length > 0) {
        emptySearch.classList.add('active')
    } else {
        emptySearch.classList.remove('active')
    }
}

const filterdSearch = (arr, filters) => {
    let productFilterd = arr.filter((item) => {
        return item.title.toLowerCase().includes(filters.search.toLowerCase())
    })


    searchProductContainer.innerHTML = ``
    productFilterd = productFilterd.forEach((item) => {
        const div = document.createElement('div')
        div.className = 'product-search'
        div.innerHTML = `
        <div class="search-img">
        <img src="${item.url}" alt="${item.title}">
    </div>
   
        <div class="prod-item ">
            <div class="prod-name " >
                <h4 class="fw-700 "> ${item.title}</h4>
            </div>

            <div class="rate ">
                <p class="text-muted "> امتیاز :<span>4</span></p>
            </div>
            <div class="prod ">

                <div class="prod-seller ">
                    <p class="text-muted ">فروشنده : <span>${item.seller}</span></p>
                </div>
            </div>
            <div class="prod-offPrice">

                <p class="text-muted text-decoration-line-through off ">${item.priceOffer!==0?numberWithCommas(item.price):''}</p>
                <p class="price ">${item.priceOffer!==0?numberWithCommas(item.priceOffer):numberWithCommas(item.price)} تومان</p>
            </div>
            
           


        </div>


    
     <div class="el-shop">
        <a class="search" href="../product-detail.html#${item.id}" data-id="${item.id}"">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </a>
     </div>
        
        
        
        `
        if (filter.search !== '') {
            searchProductContainer.appendChild(div)

        }

    })
    checkEmptySearch()
}

// shopping cart
const checkCart=()=> {
    if (cartt.length > 0) {
        emptyCart.classList.add('active')
    } else {
        emptyCart.classList.remove('active')
    }
}

const getCart=()=> {
    localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart")) :
        [];
}

const saveCart=(cart)=> {
    localStorage.setItem("cart", JSON.stringify(cart));
}

const setCartValue=(cart)=> { // show total and count item cart

    let cartItem = 0;
    let cartTotal = 0;
    cart.map((element) => {
        let p = element.priceOffer !==0 ? element.priceOffer : element.price;
        cartItem = cartItem + element.amount;
        cartTotal = cartTotal + p * element.amount;
    });
    cartItems.innerHTML = cartItem;
    cartTotals.innerHTML = `${cartTotal} تومان`;
}

const populateApp=(item)=> { //show cart items
    item.forEach((el) => {
        return showCartItem(el);
    });
}

const initApp=()=> { //whene load page send cart items to populateApp and show cart value
    cartProducts = getCart();
    setCartValue(cartt);
    populateApp(cartt);

}

const showCartItem=(item)=> { //show cart items



    const div = document.createElement("div");
    div.className = "cart-item ";
    div.innerHTML = `
    <img src=${item.url} alt=${item.title}/>
    <div>
    <h4>${item.title}</h4>
    <h5 class="price">${item.priceOffer!==0?numberWithCommas(item.priceOffer):numberWithCommas(item.price)} <span class="currancy">تومان</span></h5>
    <span class="remove-item" data-id=${item.id}>حذف</span>
    </div>
    <div>
    <i class="fas fa-chevron-up" data-id=${item.id}></i>
    <span class="item-amount">${item.amount}</span>
    <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>
    `;
    cartContent.appendChild(div);
}


const proceesCart=()=> { //function for clear items
    clearCartBtn.addEventListener("click", () => {
        clearCart();

    });
    cartContent.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            let remove = e.target;
            let id = remove.dataset.id;
            removeProducts(id);
            cartContent.removeChild(remove.parentElement.parentElement);
        }
        if (e.target.classList.contains("fa-chevron-up")) {
            let addAmount = e.target;
            let id = addAmount.dataset.id;

            let products = cartt.find((item) => {
                return item.id === id;
            });
            products.amount = products.amount + 1;
            addAmount.nextElementSibling.innerHTML = products.amount;

        }
        if (e.target.classList.contains("fa-chevron-down")) {
            let removeAmount = e.target;
            let id = removeAmount.dataset.id;

            let products = cartt.find((item) => {
                return item.id === id;
            });
            products.amount = products.amount - 1;
            removeAmount.previousElementSibling.innerHTML = products.amount;
            if (products.amount < 1) {
                removeProducts(id);
                cartContent.removeChild(removeAmount.parentElement.parentElement);
            }

        }
        checkCart()
        saveCart(cartt);
        setCartValue(cartt);
    });
}

const clearCart=()=> {


    let cartItems = cartt.map((item) => {
        return item.id;
    });
    cartItems.forEach((item) => {
        removeProducts(item);
    });
    while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);

    }
    checkCart()
}

const removeProducts=(id)=> {


    removeProduct(cartt, id)
    saveCart(cartt);

    setCartValue(cartt);
}











const listner = () => {

    document.addEventListener('DOMContentLoaded', () => {
        initApp()
        proceesCart()

        checkCart()

        productsShow = getStorage()
        getProduct().then((res) => {



                let check = productsShow.length == 0 ? res : productsShow //check the productshow if length ==0 res var svae to localstorage else productshow save in to the localstorage
                append(check, newProduct, sellProduct, bestProduct, superProduct) // send array with containers name for show elements
                let productJson = res

                if (localStorage.getItem('products') == null) {
                    location.reload()
                    saveStorage(res, productJson)
                }



            })
            .catch((err) => {
                alert(err)
            })


    })
    document.querySelector('.search-input').addEventListener('click', () => {
        backdropCart.classList.add('visible')
        searchModall.classList.add('active')
    })
    btnSearch.addEventListener('click', () => {
        backdropCart.classList.add('visible')
        searchModall.classList.add('active')
    })
    backdropCart.addEventListener('click', () => {
        backdropCart.classList.remove('visible')
        searchModall.classList.remove('active')
    })
    searchProduct.addEventListener('input', e => {


        filter.search = e.target.value
        filterdSearch(productsShow, filter)
        checkEmptySearch()
    })
    btnNextSwiper.forEach((item) => {
        item.addEventListener('click', (e) => {
            let id = e.target.dataset.id
            console.log(id);
            if (id == "swiper-next-super-offer") {
                superProduct.scrollLeft += 279

            }
            if (id == "swiper-next-new") {
                newProduct.scrollLeft += 279

            }
            if (id == "swiper-next-sell") {
                sellProduct.scrollLeft += 279

            }
            if (id == "swiper-next-best") {
                bestProduct.scrollLeft += 279

            }

        })
    })
    btnPrevSwiper.forEach((item) => {
        item.addEventListener('click', (e) => {
            let id = e.target.dataset.id

            if (id == "swiper-prev-super-offer") {
                superProduct.scrollLeft -= 279
            }
            if (id == "swiper-prev-new") {
                newProduct.scrollLeft -= 279
            }
            if (id == "swiper-prev-sell") {
                sellProduct.scrollLeft -= 279
            }
            if (id == "swiper-prev-best") {
                bestProduct.scrollLeft -= 279
            }

        })
    })
}
listner()
