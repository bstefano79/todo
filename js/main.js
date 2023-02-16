import {Item} from './item.js'
import { appHtml } from './template.js';

function paint(){
    let app = document.getElementById("app");
    app.innerHTML=appHtml;
    let m=new Item(1,"titolo di prova","testo di prova","10/03/2023");
    console.log(m);
}

paint();