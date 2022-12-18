let passwordValue, confirmPasswordValue, usernameValue;
let isUser = 0;

function fetchData() {
    return JSON.parse(localStorage.getItem("users")) ?? [];
}

let fetchDataList = fetchData();

const btnCreateAccount = document.querySelector("#btn-create-account");
btnCreateAccount.addEventListener("click", () => {
    if (validationInputValues()) {
        if (validateUser()) {
            createUser();
        }
    }
});

function validationInputValues() {
    usernameValue = document.querySelector("#user-create-input").value;
    passwordValue = document.querySelector("#password-create-input").value;
    confirmPasswordValue = document.querySelector("#password-confirm-input").value;

    if (!passwordValue || !confirmPasswordValue || !usernameValue) {
        alert("Favor preencher todos os campos!");
        return;
    }
    if (passwordValue === confirmPasswordValue && usernameValue) {
        return true;
    }
    alert("Desculpe, as senhas não conferem! Verifique se você preencheu corretamente.");
    const registration = document.querySelector("#create-form");
    registration.reset();
};

function validateUser() {
    const isUser = fetchDataList.some((user) => user.userName === usernameValue);
    if (isUser) {
        alert("Esse nome de usuário já existe!");
        return;
    }
    return true;
};

function createUser() {
    const id = Math.floor((Math.random() * (1000000000 - 10)) + 10);
    const user = {
        id: id,
        userName: usernameValue,
        password: passwordValue,
        errandsList: [],
    };

    fetchDataList.push(user);
    localStorage.setItem("users", JSON.stringify(fetchDataList));

    alert(`Olá ${usernameValue}, sua conta foi criada com sucesso!`);
    location.href = "index.html";
};