document.addEventListener("DOMContentLoaded", (event) => localStorage.removeItem("user-logged"));

let logginStatus = false;
let fetchDataList = fetchData();
const loginForm = document.querySelector("#btn-login");
loginForm.addEventListener("click", signIn);

const createAnAccount = document.querySelector("#btn-create-account");
createAnAccount.addEventListener("click", login);

function signIn() {
    const loginUsername = document.querySelector("#user-name-input").value;
    const loginPassword = document.querySelector("#password-input").value;

    fetchDataList.forEach((element) => {
        if (element.userName === loginUsername && element.password === loginPassword) {

            const logged = {
                id: element.id,
                errandsList: element.errandsList
            };

            localStorage.setItem("user-logged", JSON.stringify(logged));
            logginStatus = true;
            window.location.href = "home.html";
        };
    });

    if (!logginStatus) {
        alert("Verifique usuário e senha, caso não tenha, crie uma conta!");

        loginForm.reset();
    };
};

function fetchData() {
    return JSON.parse(localStorage.getItem("users")) ?? [];
};

function login() {
    return location.href = "create-an-account.html";
};
