// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 30/09/2019 - Updated 30/09/2019

import axios from "axios";
const url = "https://character-database.becode.xyz/";

const tpl: HTMLElement = <HTMLElement>document.querySelector("#template");
const target: HTMLElement = <HTMLElement>document.querySelector("#target");
const tplSingle: HTMLElement = <HTMLElement>document.querySelector("#singleChar");
const single: HTMLElement = <HTMLElement>document.querySelector("#single");
const newButton: HTMLElement = <HTMLElement>document.querySelector("#new");
const newChar: HTMLElement = <HTMLElement>document.querySelector("#new-char");

newButton.addEventListener('click', () => {
    if (document.location.href != `/newchar`) {
        document.location.href = `/newchar`;
        newButton.innerHTML = "Retour";
    } else {
        newButton.innerHTML = "New";
        document.location.href = `/index`;
    }
})

let chars: Array<Object> = [];

function closeModal() {
    document.querySelector("#modal").style.display = "none";
}

function routeViewChar(id: String) {
    document.location.href = `viewChar?p=${id}`;
}

async function delChar(id: String) {
    await axios.delete(`${url}characters/${id}`)
        .then(response => {
            alert("Character deleted with success !");
            closeModal();
            window.location.href = '/index';
        })
        .catch(err => console.error(err));
}

function routeDeleteChar(id: String) {
    document.querySelector("#modal").style.display = "block";
    document.querySelector("#close-modal").onclick = function () { closeModal() };
    document.querySelector("#del-char").onclick = function () { delChar(id) };
    document.querySelector(".idChar").innerHTML = id;
}

async function routeEditChar(id: String) {
    document.location.href = `editChar?p=${id}`;
}

function displayAllCharacter(char: Object): void {

    let clone: HTMLElement = tpl.cloneNode(true).content;
    clone.querySelector(".image").src = `data:image/png;base64,${char.image}`;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".short-description").innerHTML = char.shortDescription;
    clone.querySelector("#delete").onclick = function () { routeDeleteChar(char.id) };
    clone.querySelector("#modify").onclick = function () { routeEditChar(char.id) };
    clone.querySelector(".wrapper").onclick = function () { routeViewChar(char.id) };
    target.appendChild(clone);
}

function displayChar(char: Object): void {
    let clone: HTMLElement = <HTMLElement>tplSingle.cloneNode(true).content;
    clone.querySelector(".image").src = `data:image/jpeg;base64,${char.image}`;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".description").innerHTML = char.description;
    clone.querySelector("#delete").onclick = function () { routeDeleteChar(char.id) };
    clone.querySelector("#modify").onclick = function () { routeEditChar(char.id) };
    single.appendChild(clone);
}

async function getAllChar() {
    await axios.get(`${url}characters`).then(data => {
        data.data.forEach((elt: Object) => {
            chars.push(elt);
        });
        chars.forEach((char, index) => {
            displayAllCharacter(char);
        })
    }).catch(err => { console.error(err) })
}

async function getCharAndDisplay(id: String) {
    axios.get(`${url}characters/${id}`).then(data => {
        displayChar(data.data);
    }).catch(err => { console.error(err) })
}

async function formNewChar() {
    document.querySelector("#form-new-char").style.display = "block";
}

async function updateChar(form: HTMLCollection) {
    let id = form.querySelector("#form-char-id").value;
    let actualImg = form.querySelector('img').src.split(',');
    if (form.querySelector("#form-image").files[0] != undefined) {
        let file = form.querySelector("#form-image").files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            let split = reader.result.split(',');
            axios.put(`${url}characters/${id}`, {
                name: form.querySelector("#form-name").value,
                shortDescription: form.querySelector("#form-short-description").value,
                description: form.querySelector("#form-description").value,
                image: split[1],
            })
                .then(response => {
                    alert(`character updated: ${id}`);
                    document.location.href = "index";
                })
                .catch(err => console.error(err))
        }
        reader.readAsDataURL(file);
    } else {
        axios.put(`${url}characters/${id}`, {
            name: form.querySelector("#form-name").value,
            shortDescription: form.querySelector("#form-short-description").value,
            description: form.querySelector("#form-description").value,
            image: actualImg[1],
        })
            .then(response => {
                alert(`character updated: ${id}`);
                document.location.href = "index";
            })
            .catch(err => console.error(err))  
    }
}

async function populateForm(id: String) {
    let form = document.querySelector("#form-new-char");
    await axios.get(`${url}characters/${id}`).then(response => {
        form.querySelector("#form-name").value = response.data.name;
        form.querySelector("#form-short-description").value = response.data.shortDescription;
        form.querySelector("#form-description").value = response.data.description;
        form.querySelector("#form-char-id").value = response.data.id;
        let para = document.createElement('p');
        para.innerText = "Image actuelle :";
        let img = document.createElement('img');
        img.src = `data:image/png;base64,${response.data.image}`;
        form.appendChild(para);
        form.appendChild(img);
        document.querySelector("#new-char").onclick = function () { updateChar(form) };
    })
}

if (document.location.pathname == "/index") {
    getAllChar();
} else if (document.location.pathname.startsWith("/viewChar")) {
    getCharAndDisplay(document.location.search.substring(3));
} else if (document.location.pathname.startsWith("/editChar")) {
    formNewChar();
    populateForm(document.location.search.substring(3));
} else if (document.location.pathname.startsWith("/newchar")) {
    console.log('hello new char');
    formNewChar()
    newChar.addEventListener('click', () => {
        let form: Node = document.querySelector("#form-new-char");
        let file = form.querySelector("#form-image").files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            let split = reader.result.split(',');
            axios.post(`${url}characters`, {
                name: form.querySelector("#form-name").value,
                shortDescription: form.querySelector("#form-short-description").value,
                description: form.querySelector("#form-description").value,
                image: split[1],
            })
                .then(response => {
                    alert(`New character created : ${response.data.id}`);
                    document.location.href = "index";
                })
                .catch(err => console.error(err))
            console.log(JSON.stringify(newChar))
        }
        reader.readAsDataURL(file);
    })
} else {
    document.location.href = "/index";
}






