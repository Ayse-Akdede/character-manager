// Character Manager project
//
// Team Ayse Akdede - Lindsay Vannebenne
// BeCode.org - Jepsen 2.14 / Hamilton 2.12
//
// Page started 30/09/2019 - Updated 30/09/2019

import axios from "axios";
const url = "https://character-database.becode.xyz/";

async function getAllChar(){
    await axios.get(`${url}characters`).then(data => {
        console.log(data);
    }).catch(err=> {console.error(err)})
}

getAllChar();