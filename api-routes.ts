// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 02/10/2019 - Updated 02/10/2019

import axios from "axios";
import { closeModal, formChar, Char, tpl, tplSingle, target, single, newChar, showModal } from "./utils"
import showdown from "showdown";
let converter = new showdown.Converter();
const url = "https://character-database.becode.xyz/";
let chars: Array<Object> = [];

function displayAllCharacter(char: Char): void {
    let clone = <HTMLElement>tpl.cloneNode(true).content;
    (<HTMLImageElement>clone.querySelector(".image")!).src = `data:image/png;base64,${char.image}`;
    clone.querySelector(".name")!.innerHTML = char.name;
    clone.querySelector(".short-description")!.innerHTML = char.shortDescription;
    (<HTMLButtonElement>clone.querySelector("#delete")!).onclick = function () { routeDeleteChar(char.id) };
    (<HTMLButtonElement>clone.querySelector("#modify")!).onclick = function () { routeEditChar(char.id) };
    (<HTMLButtonElement>clone.querySelector(".wrapper")!).onclick = function () { routeViewChar(char.id) };
    target.appendChild(clone);
}

function displayChar(char: Char): void {
    let clone = <HTMLElement>tplSingle.cloneNode(true).content;
    (<HTMLImageElement>clone.querySelector(".image")!).src = `data:image/png;base64,${char.image}`;
    clone.querySelector(".name")!.innerHTML = char.name;
    clone.querySelector(".description")!.innerHTML = converter.makeHtml(char.description);
    (<HTMLButtonElement>clone.querySelector("#delete")!).onclick = function () { routeDeleteChar(char.id) };
    (<HTMLButtonElement>clone.querySelector("#modify")!).onclick = function () { routeEditChar(char.id) };
    single.appendChild(clone);
}

export async function delChar(id: String) {
    await axios.delete(`${url}characters/${id}`)
        .then(response => {
            alert("Character deleted with success !");
            closeModal();
            window.location.href = '/index';
        })
        .catch(err => console.error(err));
}

export async function getAllChar() {
    await axios.get(`${url}characters`).then(data => {
        data.data.forEach((elt: Object) => {
            chars.push(elt);
        });
        chars.forEach((char, index) => {
            displayAllCharacter(<Char>char);
        })
    }).catch(err => { console.error(err) })
}

export async function getCharAndDisplay(id: String) {
    axios.get(`${url}characters/${id}`).then(data => {
        displayChar(data.data);
    }).catch(err => { console.error(err) })
}

export async function populateForm(id: String) {
        let name = <HTMLInputElement>formChar.querySelector("#form-name")!;
        let shortDescription = <HTMLInputElement>formChar.querySelector("#form-short-description");
        let description = <HTMLInputElement>formChar.querySelector("#form-description");
        let idChar = <HTMLInputElement>formChar.querySelector("#form-char-id");
    await axios.get(`${url}characters/${id}`).then(response => {
        name.value = response.data.name;
        shortDescription.value = response.data.shortDescription;
        description.value = response.data.description;
        idChar.value = response.data.id;
        let para = document.createElement('p');
        para.innerText = "Image actuelle :";
        let img = document.createElement('img');
        img.src = `data:image/png;base64,${response.data.image}`;
        let divTemp = document.createElement("div");
        divTemp.className = "wrapper-actual";
        divTemp.appendChild(para);
        divTemp.appendChild(img);
        formChar.appendChild(divTemp);
        newChar.onclick = function () { updateChar(formChar) };
    })
}

export async function updateChar(form: HTMLFormElement) {
    let id = <HTMLInputElement>form.querySelector("#form-char-id")!;
    let actualImg = form.querySelector('img')!.src.split(',');
    let newImg = <HTMLInputElement>form.querySelector("#form-image")!.files[0];
    if (newImg != undefined) {
        let file = <unknown>newImg;
        let reader = new FileReader();
        reader.onloadend = function () {
            let split = (<string>reader.result!).split(',');
            let name = <HTMLInputElement>form.querySelector("#form-name")!;
            let shortDescription = <HTMLInputElement>form.querySelector("#form-short-description");
            let description = <HTMLInputElement>form.querySelector("#form-description");
            axios.put(`${url}characters/${id.value}`, {
                name: name.value,
                shortDescription: shortDescription.value,
                description: description.value,
                image: split[1],
            })
                .then(response => {
                    alert(`character updated: ${id.value}`);
                    document.location.href = "index";
                })
                .catch(err => console.error(err))
        }
        reader.readAsDataURL(<Blob>file);
    } else {
        let name = <HTMLInputElement>form.querySelector("#form-name")!;
        let shortDescription = <HTMLInputElement>form.querySelector("#form-short-description");
        let description = <HTMLInputElement>form.querySelector("#form-description");
        axios.put(`${url}characters/${id.value}`, {
            name: name.value,
            shortDescription: shortDescription.value,
            description: description.value,
            image: actualImg[1],
        })
            .then(response => {
                alert(`character updated: ${id.value}`);
                document.location.href = "index";
            })
            .catch(err => console.error(err))
    }
}

export function routeViewChar(id: String) {
    document.location.href = `viewChar?p=${id}`;
}

export function routeDeleteChar(id: string) {
    showModal();
    const btnClose = <HTMLButtonElement>document.querySelector("#close-modal")!;
    btnClose.onclick = function () { closeModal() };
    const btnDel = <HTMLButtonElement>document.querySelector("#del-char")!;
    btnDel.onclick = function () { delChar(id) };
    const spanId = document.querySelector(".idChar")!;
    spanId.innerHTML = id;
}

export function routeEditChar(id: String) {
    document.location.href = `editChar?p=${id}`;
}