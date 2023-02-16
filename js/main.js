import {Item} from './item.js'
import { appHtml } from './template.js';

function paint(){
    let app = document.getElementById("app");
    app.innerHTML=appHtml;
    let firstColumn = document.getElementById("firstColumn");
    let secondColumn = document.getElementById("secondColumn");
    let thirdColumn = document.getElementById("thirdColumn");
    let fourthColumn = document.getElementById("fourthColumn");
    let prova= [new Item(1,"titolo di prova","testo di prova","10/03/2023")];
}

function addSelectableItem(){
    
}

paint();