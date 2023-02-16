import {Item} from './item.js'
import { appHtml } from './template.js';

let prova= [new Item(1,"titolo di prova","testo di prova","10/03/2023"),new Item(2,"prova 2","ciao come va","15/04/2023"),new Item(3,"titolone","devo andare proprio li","10/08/2023"),new Item(4,"sa sa prova","non so cosa scrivere","10/12/2023"),new Item(5,"insieme","tma insieme a chi?","10/03/2022")];

function paint(){
    let firstColumn = document.getElementById("firstColumn");
    let secondColumn = document.getElementById("secondColumn");
    let thirdColumn = document.getElementById("thirdColumn");
    let fourthColumn = document.getElementById("fourthColumn");
    firstColumn.innerHTML="";
    secondColumn.innerHTML="";
    thirdColumn.innerHTML="";
    fourthColumn.innerHTML="";
    let i=0;
    prova.forEach((card)=>{
        let colummn=i%4;
        switch(colummn){
            case 0:
                firstColumn.innerHTML+=card.toHtml();
                break;
            case 1:
                secondColumn.innerHTML+=card.toHtml();
                break;
            case 2:
                thirdColumn.innerHTML+=card.toHtml();
                break;
            case 3:
                fourthColumn.innerHTML+=card.toHtml();
                break;
        }
        i++;
    })
    addSelectableItem();
}

function addSelectableItem(){
    let cardItems = document.getElementsByClassName("cardItem");
    Array.from(cardItems).forEach((card)=>{
        card.addEventListener('click',selectCard);
    })
}

const getSelectCardItem= () =>  new Promise((resolve) => {
    let selectCards = document.getElementsByClassName("cardSelected");
    if(selectCards.length>1){
        throw new Error("Qualcosa è andato storto non è prevista la multiselzione");
    }else  resolve(selectCards[0]);
  });

function deleteSelectCard(){
    getSelectCardItem().then((selectCard) =>{
        if(selectCard){
            prova = prova.filter((el)=>{if("cardItem"+el.id!=selectCard.id) return el});
            paint();
        }else{
            modalMessage("Nessun Item selezionato da eleiminare");
        }
    }).catch((err)=>modalMessage(err));
}

function selectCard(e){
    let card = e.currentTarget;
    getSelectCardItem().then((selectCard) =>{
        if(selectCard){
            selectCard.classList.remove("cardSelected");
        }
        card.classList.add("cardSelected");
    }).catch((err)=>modalMessage(err));
}

function modalMessage(message){
    document.getElementById("modalMessageText").innerHTML=message;
    document.getElementById("modalMessage").classList.add('is-active');
}

function closeModal(el){
    el.classList.remove('is-active');
}

(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {
    const target = close.closest('.modal');

    close.addEventListener('click', () => {
      closeModal(target);
    });
  });

let app = document.getElementById("app");
app.innerHTML=appHtml;
document.getElementById("deleteItem").addEventListener('click',deleteSelectCard);

paint();