const hiddenBaner =document.querySelector("#baniere");

const emailInputRef =document.querySelector("#email");
const passwordInputRef = document.querySelector("#password");
const firstIdentifier = "sophie.bluel@test.tld";
const lastIdentifier = "S0phie";


// const enteredEmail =emailInputRef.current.value;
// const enteredPassword = passwordInputRef.current.value;

/* controle des champs de saisie vide*/

const checkEmptyInputs = () => {
    if (
        enteredEmail.trim().length === 0 ||
        enteredPassword.trim().length === 0
    ) {
        setError({
            title: "Champ(s) de saisie vide(s)",
            message: "Svp entrez votre mail/mot de pass"
        })
    }
}

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
    const userIdentifiers = {
        email: "sophie.bluel@test.tld",
        password: "S0phie"
    }
    const tokenId = window.sessionStorage.setItem ("data",JSON.stringify(userIdentifiers))
    const payload = JSON.stringify(User)
    fetch(Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
    }).then((res) => res.json()).then((data) =>window.localStorage.setItem("token", data.token))

    if (JSON.stringify(User) === JSON.stringify(userIdentifiers)) {
       
        window.location = "./index.html";
       console.log('Salut')
    }else if (emailOfUser !== firstIdentifier) {
        document.querySelector("#message").classList.add('warning')
    } else if (passwordOfUser !== lastIdentifier) {
        document.querySelector("#message2").classList.add('warning')
    } else {
        document.querySelector('#formLogin').innerHTML = "Accès Refusé"
    }
})


// email:"sophie.bluel@test.tld",
// password:"S0phie"


