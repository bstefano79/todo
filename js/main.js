import {Item} from './item.js'
import { appHtml } from './template.js';

function paint(){
    let app = document.getElementById("app");
    app.innerHTML=appHtml;
    let firstColumn = document.getElementById("firstColumn");
    let secondColumn = document.getElementById("secondColumn");
    let thirdColumn = document.getElementById("thirdColumn");
    let fourthColumn = document.getElementById("fourthColumn");
    let prova= [new Item(1,"titolo di prova","testo di prova","10/03/2023"),new Item(1,"prova 2","ciao come va","15/04/2023"),new Item(1,"titolone","devo andare proprio li","10/08/2023"),new Item(1,"sa sa prova","non so cosa scrivere","10/12/2023"),new Item(1,"insieme","tma insieme a chi?","10/03/2022")];
    firstColumn.innerHTML=prova[0].toHtml()+prova[4].toHtml();
    secondColumn.innerHTML=prova[1].toHtml();
    thirdColumn.innerHTML=prova[2].toHtml();
    fourthColumn.innerHTML=prova[3].toHtml();
    addSelectableItem();
}

function addSelectableItem(){
    let cardItems = document.getElementsByClassName("cardItem");
    Array.from(cardItems).forEach((card)=>{
        console.log(card);
        card.addEventListener('click',selectCard);
    })
}

function selectCard(e){
    let card = e.currentTarget;
    let selectCard = document.getElementsByClassName("cardSelected")[0];
    if(selectCard){
        selectCard.classList.remove("cardSelected");
    }
    card.classList.add("cardSelected");
}

paint();