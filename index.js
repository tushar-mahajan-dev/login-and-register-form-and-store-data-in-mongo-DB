const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    Validate();
})


//---
const sendData = (usernameVal,rate, count) =>{
    if(rate === count){
        alert("register success");
        location.href=`register.html?username=${usernameVal}`
    }
}
//final data validation
const successMsg=(usernameVal) => {
    let formCon = document.getElementsByClassName('form-control');
    var count = formCon.length - 1;
    for(var i=0; i<formCon.length; i++){
        if(formCon[i].className === "form-control success"){
            var rate = 0 + i;
            console.log(rate);
            sendData(usernameVal, rate, count);
        }else{
            return false;
        }
    }
}

//more email validation 
const isEmail=(emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if(atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if(dot <= atSymbol + 2) return false;
    if(dot === emailVal.length - 1) return false;
    return true;
}


const Validate=()=> {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const confirmpasswordVal = confirmpassword.value.trim();


//validation apply on name

if(usernameVal == ""){
    setErrorMsg(username, 'name can not be blank');
}else if(usernameVal.length <= 2){
    setErrorMsg(username, 'Must contain 3 characters');
}else{
    setSuccessMsg(username);
}


//validation for email
if(emailVal == ""){
    setErrorMsg(email, 'email can not be blank');
}else if(!isEmail(emailVal)){
    setErrorMsg(email, 'Not valid email');
}else{
    setSuccessMsg(email);
}


//phone
if(phoneVal == ""){
    setErrorMsg(phone, 'phone can not be blank');
}else if(phoneVal.length != 10){
    setErrorMsg(phone, 'Not valid phone');
}else{
    setSuccessMsg(phone);
}


//password
if(passwordVal == ""){
    setErrorMsg(password, 'password can not be blank');
}else if(passwordVal.length <= 4){
    setErrorMsg(password, 'Min 4 characters');
}else{
    setSuccessMsg(password);
}


// confirm password
if(confirmpasswordVal == ""){
    setErrorMsg(confirmpassword, 'confirmpassword can not be blank');
}else if(passwordVal != confirmpasswordVal){
    setErrorMsg(confirmpassword, 'Password not match');
}else{
    setSuccessMsg(confirmpassword);
}

successMsg();
}


function setErrorMsg(input, errormsgs){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className="form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input){
    const formControl=input.parentElement;
    formControl.className="form-control success";
}





