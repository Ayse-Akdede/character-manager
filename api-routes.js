"use strict";
// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 02/10/2019 - Updated 02/10/2019
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
var showdown_1 = __importDefault(require("showdown"));
var converter = new showdown_1.default.Converter();
var url = "https://character-database.becode.xyz/";
var chars = [];
function displayAllCharacter(char) {
    var clone = utils_1.tpl.cloneNode(true).content;
    clone.querySelector(".image").src = "data:image/png;base64," + char.image;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".short-description").innerHTML = char.shortDescription;
    clone.querySelector("#delete").onclick = function () { routeDeleteChar(char.id); };
    clone.querySelector("#modify").onclick = function () { routeEditChar(char.id); };
    clone.querySelector(".wrapper").onclick = function () { routeViewChar(char.id); };
    utils_1.target.appendChild(clone);
}
function displayChar(char) {
    var clone = utils_1.tplSingle.cloneNode(true).content;
    clone.querySelector(".image").src = "data:image/png;base64," + char.image;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".description").innerHTML = converter.makeHtml(char.description);
    clone.querySelector("#delete").onclick = function () { routeDeleteChar(char.id); };
    clone.querySelector("#modify").onclick = function () { routeEditChar(char.id); };
    utils_1.single.appendChild(clone);
}
function delChar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.delete(url + "characters/" + id)
                        .then(function (response) {
                        alert("Character deleted with success !");
                        utils_1.closeModal();
                        window.location.href = '/index';
                    })
                        .catch(function (err) { return console.error(err); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.delChar = delChar;
function getAllChar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url + "characters").then(function (data) {
                        data.data.forEach(function (elt) {
                            chars.push(elt);
                        });
                        chars.forEach(function (char, index) {
                            displayAllCharacter(char);
                        });
                    }).catch(function (err) { console.error(err); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAllChar = getAllChar;
function getCharAndDisplay(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1.default.get(url + "characters/" + id).then(function (data) {
                displayChar(data.data);
            }).catch(function (err) { console.error(err); });
            return [2 /*return*/];
        });
    });
}
exports.getCharAndDisplay = getCharAndDisplay;
function populateForm(id) {
    return __awaiter(this, void 0, void 0, function () {
        var name, shortDescription, description, idChar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = utils_1.formChar.querySelector("#form-name");
                    shortDescription = utils_1.formChar.querySelector("#form-short-description");
                    description = utils_1.formChar.querySelector("#form-description");
                    idChar = utils_1.formChar.querySelector("#form-char-id");
                    return [4 /*yield*/, axios_1.default.get(url + "characters/" + id).then(function (response) {
                            name.value = response.data.name;
                            shortDescription.value = response.data.shortDescription;
                            description.value = response.data.description;
                            idChar.value = response.data.id;
                            var para = document.createElement('p');
                            para.innerText = "Image actuelle :";
                            var img = document.createElement('img');
                            img.src = "data:image/png;base64," + response.data.image;
                            var divTemp = document.createElement("div");
                            divTemp.className = "wrapper-actual";
                            divTemp.appendChild(para);
                            divTemp.appendChild(img);
                            utils_1.formChar.appendChild(divTemp);
                            utils_1.newChar.onclick = function () { updateChar(utils_1.formChar); };
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.populateForm = populateForm;
function updateChar(form) {
    return __awaiter(this, void 0, void 0, function () {
        var id, actualImg, newImg, file, reader_1, name_1, shortDescription, description;
        return __generator(this, function (_a) {
            id = form.querySelector("#form-char-id");
            actualImg = form.querySelector('img').src.split(',');
            newImg = form.querySelector("#form-image").files[0];
            if (newImg != undefined) {
                file = newImg;
                reader_1 = new FileReader();
                reader_1.onloadend = function () {
                    var split = reader_1.result.split(',');
                    var name = form.querySelector("#form-name");
                    var shortDescription = form.querySelector("#form-short-description");
                    var description = form.querySelector("#form-description");
                    axios_1.default.put(url + "characters/" + id.value, {
                        name: name.value,
                        shortDescription: shortDescription.value,
                        description: description.value,
                        image: split[1],
                    })
                        .then(function (response) {
                        alert("character updated: " + id.value);
                        document.location.href = "index";
                    })
                        .catch(function (err) { return console.error(err); });
                };
                reader_1.readAsDataURL(file);
            }
            else {
                name_1 = form.querySelector("#form-name");
                shortDescription = form.querySelector("#form-short-description");
                description = form.querySelector("#form-description");
                axios_1.default.put(url + "characters/" + id.value, {
                    name: name_1.value,
                    shortDescription: shortDescription.value,
                    description: description.value,
                    image: actualImg[1],
                })
                    .then(function (response) {
                    alert("character updated: " + id.value);
                    document.location.href = "index";
                })
                    .catch(function (err) { return console.error(err); });
            }
            return [2 /*return*/];
        });
    });
}
exports.updateChar = updateChar;
function routeViewChar(id) {
    document.location.href = "viewChar?p=" + id;
}
exports.routeViewChar = routeViewChar;
function routeDeleteChar(id) {
    utils_1.showModal();
    var btnClose = document.querySelector("#close-modal");
    btnClose.onclick = function () { utils_1.closeModal(); };
    var btnDel = document.querySelector("#del-char");
    btnDel.onclick = function () { delChar(id); };
    var spanId = document.querySelector(".idChar");
    spanId.innerHTML = id;
}
exports.routeDeleteChar = routeDeleteChar;
function routeEditChar(id) {
    document.location.href = "editChar?p=" + id;
}
exports.routeEditChar = routeEditChar;
