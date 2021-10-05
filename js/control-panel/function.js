let i = 1

const getStorage = () => {
  return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
}
const saveStorage = (arr,data) => {

  

  //  
  let arrray=[...new Set([...arr,...data?data:[]])]
  

  

  localStorage.setItem('products', JSON.stringify(arrray))

 
  
}
const saveStoragee = (arr) => {

  localStorage.setItem('products', JSON.stringify(arr))

}


const findProduct = (arr, id) => {
  const finded = arr.find((item) => {
    return item.id == id
  })
  return finded
}
const removeProduct = (arr, id) => {
  const index = arr.findIndex((item) => {
    return item.id === id
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
}
const appendItem = (arr, filter) => {
  let filterProduct = arr.filter((item) => {
    return item.title.toLowerCase().includes(filter.searchItem.toLowerCase())
  })
  tblCol.innerHTML = ` <tr>
    <th class="th">ردیف</th>
    <th class="th">نام محصول</th>
    <th class="th">تصویر محصول</th>
    <th class="th"> قیمت محصول</th>
    <th class="th">دسته بندی </th>
    <th class="th">وضعیت</th>
    <th class="th">عملیات</th>
</tr>`
  i = 1
  filterProduct = filterProduct.forEach((element) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="row">${i++}</td>
      <td class="name">${element.title}</td>
      <td class="phone"><img class="img-tbl" src="${element.url}" alt="${element.url}"></td>
      <td class="phone">${element.priceOffer!==''?numberWithCommas(element.priceOffer):numberWithCommas(element.price)} تومان</td>
      
      <td class="adress">${element.category=='super-offer'?'شگفت انگیز':element.category=='new'?'جدید ترین':element.category=='sell'?'پرفروش ترین':element.category=='best'?'بهترین':''}</td>
      <td class="status">
      <div class='state-tbl'>
      <div class='chkCol'></div>
      <span class="state-txt">${element.exist=='isset'?'فعال':'غیرفعال'}</span>
      </div>
      </td>
     <td class="action">
     <a href="../Edit.html#${element.id}" class="bt-edit"><i class="far fa-edit"></i></a>
     <a  class="bt-remove" data-id="${element.id}">حذف</a>
 
     
    </td>
      `;


    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.className = 'chk-status'
    if (element.exist == 'isset') {
      input.checked = true
      tr.querySelector('.status').classList.add('active')
    } else {
      input.checked = false
      tr.querySelector('.status').classList.remove('active')
    }

    input.addEventListener('change', (e) => {

      const findedProduct = findProduct(products, element.id)
      tr.querySelector('.status').classList.toggle('active')
      if (e.target.checked == true) {
        findedProduct.exist = 'isset'
        tr.querySelector('.state-txt').textContent = 'فعال'
      } else {
        findedProduct.exist = 'empty'
        tr.querySelector('.state-txt').textContent = 'غیرفعال'
      }
      saveStorage(products,null);
    })

    tr.querySelector('.bt-remove').addEventListener('click',(e)=>{
      let id=e.target.dataset.id
      removeProduct(products,id)
      saveStoragee(products)
    appendItem(products,filter)
      if(products.length<1){
        localStorage.removeItem('products')
        location.assign("../index.html")
      }
    })
    tr.querySelector('.chkCol').appendChild(input)
    tblCol.appendChild(tr)
  });
};
const timeUpdate = (timeStamp) => {
  return moment(timeStamp).locale('fa').fromNow()
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
document.addEventListener('DOMContentLoaded',()=>{
 
})

