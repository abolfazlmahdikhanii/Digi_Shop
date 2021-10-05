//variable

const upperCaseLetters = /[A-Z]/g;
const lowerCaseLettr = /[a-z]/g;
const checkemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const number = /[0-9]/g;

//var for login form
const btnSign = document.getElementById('sign');

const btnLogin = document.querySelector('#login');
const userLogin = document.querySelector('#userLogin');
const passLogin = document.querySelector('#passwordLogin');
const emailLogin = document.querySelector('#emailLogin');
//var for sign form
let showPass = document.querySelector('#show');
let showRePass = document.querySelector('#show-second');
let showLoginPass = document.querySelector('#showw-login');
let input = document.querySelectorAll('input'); //initilize all input 

let inputName = document.querySelector('#inputName'); //initilize input for name

let inputTel = document.querySelector('#inputTel'); //initilize input for last name

let inputEmail = document.querySelector('#inputEmail'); //initilize input for email

let inputUserName = document.querySelector('#inputUserName'); //initilize input for username

let inputPass = document.querySelector('#inputPassword'); //initilize input for password

let inputRePass = document.querySelector('#inputRePassword'); //initilize input for re enter the password

let inputCaptcha = document.querySelector('#inputCaptcha'); //initilize input for captcha

let Captcha = document.querySelector('#Captcha'); //initilize captcha


const btnNewCode = document.querySelector('#newcode'); //initilize new captcha btn

let form = document.querySelector('.alert-place'); //initilize message for validate





//class
class STORE {
    // save data to local storage
    set(itemset) {

        localStorage.setItem('profile', JSON.stringify(itemset));

    }
    // check local storage if exist data get data
    get() {

        let items = [];
        if (localStorage.getItem('profile')) {
            items = JSON.parse(localStorage.getItem('profile'))
        } else {
            items = []
        }
    }
    // valid data for login
    valid(loguser, logpass, logemail) {
        const storedUser = localStorage.getItem('profile');
        const USER = JSON.parse(storedUser);
        

        if (loguser == USER.user && logpass == USER.pass && logemail == USER.Email) {
            html.showMessage('ورود با موفقیت انجام شد', 'corr');
            let stateLogin = true;
            this.state(stateLogin)
        } else {
            html.showMessage('ورود شما با مشکل مواجه شد', 'active');
            let stateNotLogin = false;
            this.state(stateNotLogin)
        }



    }
    // check state login if true show userpanel page
    state(statelog = false) {
        let status=[
            {
            state:statelog
            }
        ]
        localStorage.setItem("state", JSON.stringify((status)));

        if (statelog == true) {
            location.replace('index.html');


         
        }
    }
}
class HTMLUI {
    captchaGenrate() {
        let captchaCode = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let code = captchaCode[Math.floor(Math.random() * captchaCode.length)];
        for (let index = 0; index < 5; index++) {
            code = code + captchaCode[Math.floor(Math.random() * captchaCode.length)]

        }
        return code
    }
    validateSign(name, tel, email, username, password, repassword, captcha, inputcaptcha) {


        if (name.trim() === "" || tel.trim() === "" || email.trim() === "" || username.trim() === "" || inputcaptcha.trim() === "" || password.trim() === "" || repassword.trim() === ""||isNaN(tel)) {

            this.showMessage('مقادیر را به درستی تکمیل نمایید', 'active');

            input.forEach(element => {
                element.classList.add("is-invalid");

            });
            Captcha.innerText = this.captchaGenrate()

        } else if (password.length < 8) {

            this.showMessage('رمز عبور حداقل باید 8 رقم باشد', 'active');
            inputPass.classList.add("is-invalid");
            inputRePass.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()

        } else if (!password.match(upperCaseLetters) || !password.match(lowerCaseLettr) || !password.match(number)) {
            this.showMessage('رمز عبور باید شامل حرف کوچک و یک حرف بزرگ و اعداد باشد', 'active');
            inputPass.classList.add("is-invalid");
            inputRePass.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        } else if (password !== repassword) {
            this.showMessage('رمز عبور با تکرار مطابقت ندارد', 'active');
            inputPass.classList.add("is-invalid");
            inputRePass.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        } else if (!email.match(checkemail)) {
            this.showMessage('ایمیل را درست وارد نمایید', 'active');
            inputEmail.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        } else if(tel.length<11){
            this.showMessage('شماره موبایل 11 رقم میباشد', 'active');
            inputTel.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        }
        else if (inputcaptcha !== captcha) {
            this.showMessage('عدم تطابق کد امنیتی', 'active');

            inputCaptcha.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        } else {

            const item = {
                first: name,
                phone: tel,
                Email: email,
                pass: password,
                user: username,
            }


            ls.set(item);
            // ls.get();
            this.showMessage('ثبت نام با موفقیت انجام شد', 'corr');
            input.forEach(element => {
                element.classList.remove("is-invalid");
                element.classList.add("is-valid");
            });
            setTimeout(() => {
                window.open("http://127.0.0.1:5500/login.html")
            }, 2500);



        }
    }
    validateLogin(user, pass, email, captcha, inputcaptcha) {
        if (user.trim() == "" || inputcaptcha.trim() == '' || pass.trim() == '' || email.trim() == '') {

            this.showMessage('مقادیر را به درستی تکمیل نمایید', 'active');

            input.forEach(element => {
                element.classList.add("is-invalid");

            });
            Captcha.innerText = this.captchaGenrate()

        } else if (pass.length < 8) {

            this.showMessage('رمز عبور حداقل باید 8 رقم باشد', 'active');
            inputPass.classList.add("is-invalid");
            inputRePass.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()

        } else if (!email.match(checkemail)) {
            this.showMessage('ایمیل را درست وارد نمایید', 'active');
            inputEmail.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        } else if (inputcaptcha !== captcha) {
            this.showMessage('عدم تطابق کد امنیتی', 'active');

            inputCaptcha.classList.add("is-invalid");
            Captcha.innerText = this.captchaGenrate()
        } else {
            const LocalStorge = new STORE();
            LocalStorge.valid(user, pass, email);

        }

    }
    showMessage(err, kind) {

        const div = document.createElement('div');

        div.innerHTML = `
        <div class="alert ${kind}"}">
            <div id="progress-message">
             <progress class="prog" max="100" value="100"></progress>
            </div>
            <div class="pr">
            <p>${err}</p>
            </div>
        </div>
            `;


        let container = document.querySelector('.alert-place div')
        if (container != null) {
            container.remove()
        }
        form.appendChild(div);
        let progres = document.querySelector('.prog')
        if (progres !== null) {
            let time = setInterval(function() {

                progres.value -= 1;
                if (progres.value === 0) {
                    clearInterval(time)
                    progres.value = 100;
                    div.remove();

                }



            }, 20);
        }








    }
}

const html = new HTMLUI(); //call HtmlUi class for show display
let ls = new STORE();
//eventlistner
eventListner(); //call event lisner function

function eventListner() {
    document.addEventListener("DOMContentLoaded", () => {

        Captcha.innerText = html.captchaGenrate()

    })
    btnNewCode.addEventListener('click', () => {

        Captcha.innerText = html.captchaGenrate()
    })
    if (btnSign != null) {
        btnSign.addEventListener('click', e => {
            e.preventDefault();

            let name = inputName.value;
            let tel = inputTel.value;
            let email = inputEmail.value;
            let username = inputUserName.value;
            let password = inputPass.value;
            let repassword = inputRePass.value;
            let captcha = Captcha.innerText;
            let inputcaptcha = inputCaptcha.value;

            html.validateSign(name, tel, email, username, password, repassword, captcha, inputcaptcha) //send all input vlaue to validte function for validate form





        })
    }
    if (btnLogin !== null) {
        btnLogin.addEventListener('click', e => {
            e.preventDefault()
            let USER_LOGIN = userLogin.value;
            let PASS_LOGIN = passLogin.value;
            let Email_LOGIN = emailLogin.value;
            let captcha = Captcha.innerText;
            let inputcaptcha = inputCaptcha.value;


            html.validateLogin(USER_LOGIN, PASS_LOGIN, Email_LOGIN, captcha, inputcaptcha);

        })
    }

    if (showPass !== null) {
        showPass.addEventListener('click', () => {

            showPass.classList.toggle('visible');
            if (inputPass.type === "password") {
                inputPass.type = "text"
            } else {
                inputPass.type = "password"
            }
        })
    }

    if (showRePass !== null) {
        showRePass.addEventListener('click', () => {

            showRePass.classList.toggle('visible');
            if (inputRePass.type === "password") {
                inputRePass.type = "text"
            } else {
                inputRePass.type = "password"
            }
        })
    }

    if (showLoginPass !== null) {
        showLoginPass.addEventListener('click', () => {

            showLoginPass.classList.toggle('visible');
            if (passLogin.type === "password") {
                passLogin.type = "text"
            } else {
                passLogin.type = "password"
            }
        })
    }
}