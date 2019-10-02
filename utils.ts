// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 02/10/2019 - Updated 02/10/2019

export const tpl = <HTMLElement>document.querySelector("#template");
export const target = <HTMLDivElement>document.querySelector("#target");
export const tplSingle = <HTMLElement>document.querySelector("#singleChar");
export const single = <HTMLDivElement>document.querySelector("#single");
export const newButton = <HTMLButtonElement>document.querySelector("#new");
export const newChar = <HTMLButtonElement>document.querySelector("#new-char");
export const modal = <HTMLDivElement>document.querySelector("#modal");
export const formChar = <HTMLFormElement>document.querySelector("#form-new-char");

export interface Char {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    image: Blob;
}

export function closeModal() {
    if (modal) {
        modal.style.display = "none";
    }
}

export function showModal() {
    if (modal) {
        modal.style.display = "block";
    }
}

export function formNewChar() {
    if (formChar) {
        formChar.style.display = "flex";
    }
}

