"use strict";
// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 02/10/2019 - Updated 02/10/2019
Object.defineProperty(exports, "__esModule", { value: true });
exports.tpl = document.querySelector("#template");
exports.target = document.querySelector("#target");
exports.tplSingle = document.querySelector("#singleChar");
exports.single = document.querySelector("#single");
exports.newButton = document.querySelector("#new");
exports.newChar = document.querySelector("#new-char");
exports.modal = document.querySelector("#modal");
exports.formChar = document.querySelector("#form-new-char");
function closeModal() {
    if (exports.modal) {
        exports.modal.style.display = "none";
    }
}
exports.closeModal = closeModal;
function showModal() {
    if (exports.modal) {
        exports.modal.style.display = "block";
    }
}
exports.showModal = showModal;
function formNewChar() {
    if (exports.formChar) {
        exports.formChar.style.display = "flex";
    }
}
exports.formNewChar = formNewChar;
