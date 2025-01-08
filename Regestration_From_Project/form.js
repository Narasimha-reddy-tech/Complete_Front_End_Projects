const form = document.getElementById("form")
const uname = document.getElementById("uname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const cpassword = document.getElementById("cpassword")
const tandc = document.getElementById("tc")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    Validate();
})

function Validate() {
    let nameValue = uname.value.trim()
    let emailValue = email.value.trim()
    let passwordValue = password.value.trim()
    let cpasswordValue = cpassword.value.trim()
    //    let tandcValue=tandc.value
}
// user name check

if (nameValue === '') {
    setError(uname, 'user name cannot be empty')
}
else if (nameValue.length < 3) {
    setError(uname, 'user name should be minimum 3 characters')
}
else {
    setSuccess(uname)
}
// email check
if (emailValue === '') {
    setError(email, 'Email cannot be empty')
}
else if (!emailCheck(emailValue)) {
    setError(email, 'Enter valid email id')
}
else {
    setSuccess(email)
}

// password check
if (passwordValue === '') {
    setError(password, 'password cannot be empty')
}
else if (passwordValue.length < 8) {
    setError(password, 'user name should be minimum 8 character')
}
else {
    setSuccess(password)
}

// confirm password check
if (cpasswordValue === '') {
    setError(cpassword, 'password cannot be empty')
}
else if (cpasswordValue !== passwordValue) {
    setError(cpassword, 'user not matched')
}
else {
    setSuccess(cpassword)
}

// terms and conditions

if (!tandc.checked) {
    setError(tc, 'click on agree terms and conditions')
}
else {
    setSuccess(tc)
}

function setError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    small.innerText = message;
    parent.classList.add('error')
    parent.classList.remove('success')

    function setSuccess(input) {
        let parent = input.parentElement;
        parent.classList.add('success');
        parent.classList.remove('error')
    }
}
function emailCheck(input) {
    let emailReg = /^[a-z0-9.-_%+]+@[a-z]+\.[a-z]{2,4}$/;
    let valid = emailReg.test(input)
    return valid;
}