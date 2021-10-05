let fileTag = document.getElementById("file");
let preview = document.getElementById("output");
let upload = document.querySelector(".upload");
const progressUpload = document.querySelector(".prog-uplod");



const prog=()=>{
   let time= setInterval(() => {
        progressUpload.value = progressUpload.value + 1;

        if (progressUpload.value == 100) {
          clearInterval(time);
          preview.classList.add('visible')
          progressUpload.classList.remove('visible');
          progressUpload.value = 0
        }
    }, 30);
}
upload.addEventListener('click', (e) => {
    e.preventDefault()
        progressUpload.classList.add('visible');
        preview.classList.remove('visible')
    
    if (fileTag) {
        fileTag.click()
    }


}, false)

fileTag.addEventListener("change", function() {
    changeImage(this);
});
function changeImage(input) {
    
    let reader;
    prog()
    reader = new FileReader();
    if (input.files && input.files[0]) {
        reader.onload = (e) => {
            output.setAttribute('src', e.target.result);
            
            
        }
        reader.readAsDataURL(input.files[0])
    }
}




