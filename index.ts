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

let chars: Array<Object> = [];


async function viewChar(id: String) {
    document.location.href = `viewchar?p=${id}`;
}

async function deleteChar(id: String) {
    console.log(`want to deleted : ${id}`);
    await axios.delete()
}

async function editChar(id: String) {
    console.log(`want to mod : ${id}`);
    await axios.get()
}

function displayAllCharacter(char: Object): void {

    let clone: HTMLElement = <HTMLElement>tpl.cloneNode(true).content;
    clone.querySelector(".image").src = `data:image/png;base64,${char.image}`;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".short-description").innerHTML = char.shortDescription;
    clone.querySelector("#delete").onclick = function () { deleteChar(char.id) };
    clone.querySelector("#modify").onclick = function () { editChar(char.id) };
    clone.querySelector(".wrapper").onclick = function () { viewChar(char.id) };
    target.appendChild(clone);
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

async function getChar(id: String) {
    axios.get(`${url}characters/${id}`).then(data => {
        let clone: HTMLElement = <HTMLElement>tplSingle.cloneNode(true).content;
        clone.querySelector(".image").src = `data:image/jpeg;base64,${data.data.image}`;
        clone.querySelector(".name").innerHTML = data.data.name;
        clone.querySelector(".description").innerHTML = data.data.Description;
        clone.querySelector("#delete").onclick = function () { deleteChar(data.data.id) };
        clone.querySelector("#modify").onclick = function () { editChar(data.data.id) };
        single.appendChild(clone);
    }).catch(err => { console.error(err) })
}

if (document.location.pathname == "/index") {
    getAllChar();
} else if (document.location.pathname.startsWith("/viewchar")) {
    getChar(document.location.search.substring(3));
} else {
    document.location.href = "/index";
}






