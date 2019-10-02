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
if (document.location.pathname == "/index") {
    // affiche tous les personnages
    api_routes_1.getAllChar();
}
else if (document.location.pathname.startsWith("/viewChar")) {
    // Affiche le personnage sur lequel on a cliqué
    api_routes_1.getCharAndDisplay(document.location.search.substring(3));
}
else if (document.location.pathname.startsWith("/editChar")) {
    // Deploie le formulaire et le rempli
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
        var name = form.querySelector("#form-name");
        var shortDescription = form.querySelector("#form-short-description");
        var description = form.querySelector("#form-description");
        reader.onloadend = function () {
            var split = reader.result.split(',');
            axios_1.default.post(url + "characters", {
                name: name.value,
                shortDescription: shortDescription.value,
                description: description.value,
                image: split[1],
            })
                .then(function (response) {
                alert("New character created : " + response.data.id);
                document.location.href = "index";
            })
                .catch(function (err) { return console.error(err); });
        };
        reader.readAsDataURL(file);
    });
}
else {
    document.location.href = "/index";
}
