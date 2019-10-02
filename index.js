"use strict";
// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 30/09/2019 - Updated 02/10/2019
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var api_routes_1 = require("./api-routes");
var Utils = __importStar(require("./utils"));
var url = "https://character-database.becode.xyz/";
/* const tpl = <HTMLElement>document.querySelector("#template");
const target = <HTMLDivElement>document.querySelector("#target");
const tplSingle = <HTMLElement>document.querySelector("#singleChar");
const single = <HTMLDivElement>document.querySelector("#single");
const newButton = <HTMLButtonElement>document.querySelector("#new");
const newChar = <HTMLButtonElement>document.querySelector("#new-char");
let chars: Array<Object> = []; */
window.addEventListener('DOMContentLoaded', function () {
    if (document.location.pathname != "/newchar") {
        Utils.newButton.innerText = "New";
    }
    else {
        Utils.newButton.innerText = "Retour";
    }
});
Utils.newButton.addEventListener('click', function () {
    if (document.location.pathname != "/newchar") {
        document.location.href = "/newchar";
    }
    else {
        document.location.href = "/index";
    }
});
/* function closeModal() {
    if (document.querySelector("#modal")) {
        let modal = <HTMLDivElement>document.querySelector("#modal")!;
        modal.style.display = "none";
    }
} */
/* async function delChar(id: String) {
    await axios.delete(`${url}characters/${id}`)
        .then(response => {
            alert("Character deleted with success !");
            closeModal();
            window.location.href = '/index';
        })
        .catch(err => console.error(err));
} */
/* function routeViewChar(id: String) {
    document.location.href = `viewChar?p=${id}`;
}

function routeDeleteChar(id: String) {
    Utils.showModal();
    document.querySelector("#close-modal").onclick = function () { Utils.closeModal() };
    document.querySelector("#del-char").onclick = function () { delChar(id) };
    document.querySelector(".idChar").innerHTML = id;
}

function routeEditChar(id: String) {
    document.location.href = `editChar?p=${id}`;
}
 */
/* function displayAllCharacter(char: Object): void {
    let clone = <HTMLElement>Utils.tpl.cloneNode(true).content;
    clone.querySelector(".image").src = `data:image/png;base64,${char.image}`;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".short-description").innerHTML = char.shortDescription;
    clone.querySelector("#delete").onclick = function () { routeDeleteChar(char.id) };
    clone.querySelector("#modify").onclick = function () { routeEditChar(char.id) };
    clone.querySelector(".wrapper").onclick = function () { routeViewChar(char.id) };
    Utils.target.appendChild(clone);
}

function displayChar(char: Object): void {
    let clone = <HTMLElement>Utils.tplSingle.cloneNode(true).content;
    clone.querySelector(".image").src = `data:image/jpeg;base64,${char.image}`;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".description").innerHTML = char.description;
    clone.querySelector("#delete").onclick = function () { routeDeleteChar(char.id) };
    clone.querySelector("#modify").onclick = function () { routeEditChar(char.id) };
    Utils.single.appendChild(clone);
} */
/* async function getAllChar() {
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
} */
/* async function formNewChar() {
    document.querySelector("#form-new-char").style.display = "block";
} */
/* async function updateChar(form: HTMLCollection) {
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
} */
/* async function populateForm(id: String) {
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
} */
if (document.location.pathname == "/index") {
    api_routes_1.getAllChar();
}
else if (document.location.pathname.startsWith("/viewChar")) {
    api_routes_1.getCharAndDisplay(document.location.search.substring(3));
}
else if (document.location.pathname.startsWith("/editChar")) {
    Utils.formNewChar();
    api_routes_1.populateForm(document.location.search.substring(3));
}
else if (document.location.pathname.startsWith("/newchar")) {
    console.log('hello new char');
    Utils.formNewChar();
    Utils.newChar.addEventListener('click', function () {
        var form = document.querySelector("#form-new-char");
        var file = form.querySelector("#form-image").files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            var split = reader.result.split(',');
            axios_1.default.post(url + "characters", {
                name: form.querySelector("#form-name").value,
                shortDescription: form.querySelector("#form-short-description").value,
                description: form.querySelector("#form-description").value,
                image: split[1],
            })
                .then(function (response) {
                alert("New character created : " + response.data.id);
                document.location.href = "index";
            })
                .catch(function (err) { return console.error(err); });
            console.log(JSON.stringify(Utils.newChar));
        };
        reader.readAsDataURL(file);
    });
}
else {
    document.location.href = "/index";
}
