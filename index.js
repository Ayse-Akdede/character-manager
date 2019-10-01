"use strict";
// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 30/09/2019 - Updated 30/09/2019
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
var url = "https://character-database.becode.xyz/";
var tpl = document.querySelector("#template");
var target = document.querySelector("#target");
var tplSingle = document.querySelector("#singleChar");
var single = document.querySelector("#single");
var chars = [];
function viewChar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.location.href = "viewchar?p=" + id;
            return [2 /*return*/];
        });
    });
}
function deleteChar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("want to deleted : " + id);
                    return [4 /*yield*/, axios_1.default.delete()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function editChar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("want to mod : " + id);
                    return [4 /*yield*/, axios_1.default.get()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function displayAllCharacter(char) {
    var clone = tpl.cloneNode(true).content;
    clone.querySelector(".image").src = "data:image/png;base64," + char.image;
    clone.querySelector(".name").innerHTML = char.name;
    clone.querySelector(".short-description").innerHTML = char.shortDescription;
    clone.querySelector("#delete").onclick = function () { deleteChar(char.id); };
    clone.querySelector("#modify").onclick = function () { editChar(char.id); };
    clone.querySelector(".wrapper").onclick = function () { viewChar(char.id); };
    target.appendChild(clone);
}
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
function getChar(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1.default.get(url + "characters/" + id).then(function (data) {
                var clone = tplSingle.cloneNode(true).content;
                clone.querySelector(".image").src = "data:image/jpeg;base64," + data.data.image;
                clone.querySelector(".name").innerHTML = data.data.name;
                clone.querySelector(".description").innerHTML = data.data.Description;
                clone.querySelector("#delete").onclick = function () { deleteChar(data.data.id); };
                clone.querySelector("#modify").onclick = function () { editChar(data.data.id); };
                single.appendChild(clone);
            }).catch(function (err) { console.error(err); });
            return [2 /*return*/];
        });
    });
}
if (document.location.pathname == "/index") {
    getAllChar();
}
else if (document.location.pathname.startsWith("/viewchar")) {
    getChar(document.location.search.substring(3));
}
else {
    document.location.href = "/index";
}
