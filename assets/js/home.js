let logged = JSON.parse(localStorage.getItem("user-logged"));

document.addEventListener("DOMContentLoaded", () => {
    if (!logged) {
        alert("Usuário não está logado!");
        location.href = "index.html";
    }
    createTable();
});

function createTable() {
    logged.errandsList.forEach((errands) => showErrands(errands));
}

function showErrands(errands) {

    let row = document.createElement("tr");
    row.id = errands.errandsID;

    let columnErrandsID = document.createElement("td");
    columnErrandsID.className = "td-column-errands-ID";

    let columnDescription = document.createElement("td");
    columnDescription.className = "td-description";

    let columnDetailing = document.createElement("td");
    columnDetailing.className = "td-detailing";

    let columnAction = document.createElement("td");
    columnAction.className = "td-action";

    let table = document.getElementById("t-body");

    let editBtn = document.createElement("button");
    editBtn.id = "editBtn";
    editBtn.innerHTML = "Editar";
    editBtn.addEventListener("click", () => {
        errandsEdit(row.id);
    })

    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerHTML = "Deletar";
    deleteBtn.addEventListener("click", () => {
        errandsDelete(row.id);
    })

    columnAction.appendChild(editBtn);
    columnAction.appendChild(deleteBtn);
    row.appendChild(columnErrandsID);
    row.appendChild(columnDescription);
    row.appendChild(columnDetailing);
    row.appendChild(columnAction);
    table.appendChild(row);

    columnErrandsID.innerHTML = errands.errandsID;
    columnDescription.innerHTML = errands.description;
    columnDetailing.innerHTML = errands.detailing;

}

let saveBtn = document.querySelector("#btn-save");
saveBtn.addEventListener("click", errandsSave);

function errandsSave() {

    let checkErrandsID = 1;

    const inputDescription = document.getElementById("description-input").value;
    const inputDetailing = document.getElementById("detailing-input").value;

    if (!inputDescription || !inputDetailing) {
        alert("Não é possível salvar uma tarefa sem um título ou descrição.");
        return;
    }

    listTdErrandsID = document.getElementsByClassName("td-column-errands-ID");
    for (const iterator of listTdErrandsID) {
        let tdErrandsID = Number(iterator.innerText);
        if (tdErrandsID >= checkErrandsID) {
            checkErrandsID = tdErrandsID + 1;
        };
    };

    let errands =
    {
        description: inputDescription,
        detailing: inputDetailing,
        errandsID: checkErrandsID
    };

    logged.errandsList.push(errands);
    localStorage.setItem("user-logged", JSON.stringify(logged));
    document.getElementById("errand-list-form").reset();
    showErrands(errands);
}

function errandsDelete(targetErrands) {

    if (confirm("Você realmente deseja apagar essa tarefa?")) {
        const targetTr = document.getElementById(targetErrands);
        targetTr.remove();

        let targetErrandsIndex = logged.errandsList.findIndex((errands) => errands.errandsID == targetErrands);
        logged.errandsList.splice(targetErrandsIndex, 1);

        localStorage.setItem("user-logged", JSON.stringify(logged));
    }
}

function errandsEdit(targetErrands) {

    const targetTr = document.getElementById(targetErrands);
    const targetDescription = targetTr.childNodes[1];
    const targetDetailing = targetTr.childNodes[2];
    const targetBtns = targetTr.childNodes[3];
    let targetErrandsIndex = logged.errandsList.findIndex((errands) => errands.errandsID == targetErrands);

    targetDescription.innerHTML = `<input id="input-description" value="${targetDescription.innerText}">`;
    targetDetailing.innerHTML = `<input id="input-detailing" value="${targetDetailing.innerText}">`;
    targetBtns.innerHTML = `
    <button type="button" id="btn-confirm" class="btn btn-success">Confirmar</button>
    <button type="button" id="btn-cancel" class="btn btn-danger">Cancelar</button>`;

    const cancelBtn = document.getElementById("btn-cancel");
    cancelBtn.id = "cancelBtn";
    cancelBtn.addEventListener("click", () => {
        targetDescription.innerHTML = logged.errandsList[targetErrandsIndex].description;
        targetDetailing.innerHTML = logged.errandsList[targetErrandsIndex].detailing;

        while (!logged.errandsList[targetErrandsIndex].description || !logged.errandsList[targetErrandsIndex].detailing) {
            alert("Não é possível editar uma tarefa sem um título ou descrição.");
            return;
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "deleteBtn");
        deleteBtn.innerHTML = "Deletar";
        deleteBtn.addEventListener("click", () => errandsDelete(targetErrands));

        const editBtn = document.createElement("button");
        editBtn.id = "editBtn";
        editBtn.innerHTML = "Editar";
        editBtn.addEventListener("click", () => errandsEdit(targetErrands));

        targetBtns.appendChild(editBtn);
        targetBtns.appendChild(deleteBtn);
        targetBtns.removeChild(confirmBtn);
        targetBtns.removeChild(cancelBtn);
    });

    const confirmBtn = document.getElementById("btn-confirm");
    confirmBtn.id = "confirmBtn";
    confirmBtn.addEventListener("click", () => {

        logged.errandsList[targetErrandsIndex].description = document.getElementById("input-description").value;
        logged.errandsList[targetErrandsIndex].detailing = document.getElementById("input-detailing").value;

        localStorage.setItem("user-logged", JSON.stringify(logged));

        while (!logged.errandsList[targetErrandsIndex].description || !logged.errandsList[targetErrandsIndex].detailing) {
            alert("Não é possível editar uma tarefa sem um título ou descrição.");
            return;
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "deleteBtn");
        deleteBtn.innerHTML = "Deletar";
        deleteBtn.addEventListener("click", () => errandsDelete(targetErrands));

        const editBtn = document.createElement("button");
        editBtn.id = "editBtn";
        editBtn.innerHTML = "Editar";
        editBtn.addEventListener("click", () => errandsEdit(targetErrands));

        targetDescription.innerHTML = document.getElementById("input-description").value;
        targetDetailing.innerHTML = document.getElementById("input-detailing").value;

        targetBtns.appendChild(editBtn);
        targetBtns.appendChild(deleteBtn);
        targetBtns.removeChild(confirmBtn);
        targetBtns.removeChild(cancelBtn);
    });
}

const logOut = document.getElementById("exit-home").addEventListener("click", (event) => {
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem("users"));
    let loggedUser = users.find((user) => user.id == logged.id);

    loggedUser.errandsList = logged.errandsList;

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.removeItem("user-logged")

    const confirmExit = confirm("Você realmente deseja sair e voltar para a página de login?");

    return confirmExit ? window.location.href = "index.html" : window.location.href = "home.html";

});
