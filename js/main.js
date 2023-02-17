import {Item} from './item.js'
import {appHtml,formHtml, modalChoice} from './template.js';

let prova= [new Item(1,"titolo di prova","testo di prova","10/03/2023"),new Item(2,"prova 2","ciao come va","15/04/2023"),new Item(3,"titolone","devo andare proprio li","10/08/2023"),new Item(4,"sa sa prova","non so cosa scrivere","10/12/2023"),new Item(5,"insieme","tma insieme a chi?","10/03/2022")];

function paintCard(){
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
        Array.from(selectCards).forEach((card)=>card.classList.remove("cardSelected"));
        throw new Error("Qualcosa è andato storto non è prevista la multiselzione");
    }else  resolve(selectCards[0]);
  });

function deleteSelectCard(){
    getSelectCardItem().then((selectCard) =>{
        if(selectCard){
            modalMessageChoice("sei sicuro di voler cancellare l'elemento selezionato?",{
                yesCancel:()=>{
                    prova = prova.filter((el)=>{if("cardItem"+el.id!=selectCard.id) return el});
                    paintCard();
                    closeChoiceModal();
                },
                noCancel:closeChoiceModal
            });
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

function modalMessageChoice(message,funcObj){
    document.getElementById("modalMessageText").innerHTML=modalChoice.replace('{{message}}',message);
    if(funcObj){
        for (const [key, value] of Object.entries(funcObj)) {
            document.getElementById(key).addEventListener('click',value);
        }
          
    }
    let modalMessage = document.getElementById("modalMessage");
    modalMessage.classList.add('is-active');
    modalMessage.classList.add('choice');
}

function closeModal(el){
    el.classList.remove('is-active');
}

function closeChoiceModal(){
    (document.querySelectorAll('.choice') || []).forEach((close) => {
        const target = close.closest('.modal');
        target.classList.remove('choice');
        target.classList.remove('is-active');
    });
}

(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {
    const target = close.closest('.modal');

    close.addEventListener('click', () => {
        if(!target.className.includes('choice'))
            closeModal(target);
    });
});

function controlItemCardForm(){
    let errorItem=false;
    (document.querySelectorAll('.errorControl, .errorHelp') || []).forEach((el)=>el.classList.remove(...["errorControl","errorHelp"]));
    let id=document.getElementById('id').value;
    let dateElem = document.getElementById('date');
    let date=null;
    if (dateElem) {
        date=dateElem.bulmaCalendar.value();
    }
    if(!date){
        errorItem=true;
        ['Control','Help'].forEach(
            (el)=>document.getElementById("date"+el).classList.add("error"+el));
    }
    let title= document.getElementById('title').value;
    if(!title){
        errorItem=true;
        ['Control','Help'].forEach(
            (el)=>document.getElementById("title"+el).classList.add("error"+el));
    }
    let text= document.getElementById('text').value;
    if(!text){
        errorItem=true;
        ['Control','Help'].forEach(
            (el)=>document.getElementById("text"+el).classList.add("error"+el));
    }
    if(!errorItem){
        return new Item(id,title,text,date);
    }
    return false;
}

function selectCardToItem(selectCard){
    let id = selectCard.id.replace("cardItem","")*1;
    let title=selectCard.firstElementChild.firstElementChild.firstElementChild.innerHTML;
    let date = selectCard.firstElementChild.firstElementChild.lastElementChild.innerHTML;
    let text = selectCard.lastElementChild.firstElementChild.innerHTML;
    return new Item(id,title,text,date);
}

function paintPage(page){

    let app = document.getElementById("app");
    if(!page || page==="home"){
        app.innerHTML=appHtml;
        document.getElementById("deleteItem").addEventListener('click',deleteSelectCard);
        document.getElementById("newItem").addEventListener('click',()=> paintPage("insert"));
        document.getElementById("editItem").addEventListener('click',()=> paintPage("edit"));

        paintCard();
    }else if(page==="insert"){
        app.innerHTML=formHtml;
        let options={dateFormat: 'dd/MM/yyyy', lang: 'it-IT', displayMode:'dialog'};

        // Initialize all input of type date
        bulmaCalendar.attach('[type="date"]', options);
       
        document.getElementById("cancel").addEventListener('click', ()=>{modalMessageChoice("sei sicuro di non voler salvare?",{
            yesCancel:()=>{
                paintPage("home");
                closeChoiceModal();
            },
            noCancel:closeChoiceModal
        })});

        document.getElementById("save").addEventListener('click',()=>{

            let newItem = controlItemCardForm();
            if(newItem){
                newItem.id=prova[0]?prova.reduce((maxId,el)=>maxId<el.id?el.id:maxId,prova[0].id):1;
                prova.push(newItem);
                paintPage("home");
            }
        });
            
        
    }
    else if(page==="edit"){
        getSelectCardItem().then((selectCard) =>{
            if(selectCard){
                app.innerHTML=formHtml;
                let options={dateFormat: 'dd/MM/yyyy', lang: 'it-IT', displayMode:'dialog'};
                let selectCardItem=selectCardToItem(selectCard)
                // Initialize all input of type date
                bulmaCalendar.attach('[type="date"]', options);
                
                for (const [key, value] of Object.entries(selectCardItem)) {
                    if(key!="date"){
                        document.getElementById(key).value=value
                    }else{
                        document.getElementById(key).bulmaCalendar.value(value);
                    }
                }

                document.getElementById("cancel").addEventListener('click', ()=>{modalMessageChoice("sei sicuro di non voler salvare?",{
                    yesCancel:()=>{
                        paintPage("home");
                        closeChoiceModal();
                    },
                    noCancel:closeChoiceModal
                })});
        
                document.getElementById("save").addEventListener('click',()=>{
                    let modItem = controlItemCardForm();
                    if(modItem){
                        prova=prova.filter((el)=>{
                            if(el.id==modItem.id){
                                el.modToItem(modItem);
                            }
                            return el;
                        });
                        paintPage("home");
                    }
                });
            }else{
                modalMessage("Nessun Item selezionato da modificare");
            }
        }).catch((err)=>modalMessage(err));
    }

    let navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Add a click event on each of them
        navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            let target = el.dataset.target;
            let $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });
}

paintPage("home");

