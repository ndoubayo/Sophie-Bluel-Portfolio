const emailInputRef =document.querySelector("#email");
const passwordInputRef = document.querySelector("#password");
const firstIdentifier = "sophie.bluel@test.tld";
const lastIdentifier = "S0phie";

const enteredEmail =emailInputRef.value;
const enteredPassword = passwordInputRef.value;

const Url = "http://localhost:5678/api/users/login";

const formLogin = document.querySelector("#formLogin");
formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    const User = {
        email: e.target.querySelector("[name=email]").value,
        password: e.target.querySelector("[name=password]").value
    }
    const emailOfUser = e.target.querySelector("[name=email]").value;
    const passwordOfUser = e.target.querySelector("[name=password]").value;

    const firstIdentifier = "sophie.bluel@test.tld";
    const lastIdentifier = "S0phie";
    const payload = JSON.stringify(User)
    fetch(Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
    }).then(function(res){
        if (res.ok){
            window.location = "/index.html";
        }else if (emailOfUser !== firstIdentifier) {
            document.querySelector("#message").classList.add('warning')
        } else if (passwordOfUser !== lastIdentifier) {
            document.querySelector("#message2").classList.add('warning')
        } else {
            alert("L\'email et/ou le mot de pass entré est invalide(s)")
        }
        
        return res.json()
    }).then((data)=> window.sessionStorage.setItem("token", data.token))

})

// email:"sophie.bluel@test.tld",
// password:"S0phie"


