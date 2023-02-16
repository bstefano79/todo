export class Item{
    constructor(id,title,text,date){
        this.id=id;
        this.title=title;
        this.text=text;
        this.date=date;
    }

    toHtml(){

        let card = cardHtml;
        card=card.replace('{{id}}',this.id);
        card=card.replace('{{date}}',this.date);
        card=card.replace('{{title}}',this.title);
        card=card.replace('{{text}}',this.text);
        return card;
    }
};

const cardHtml=`<div class="card cardItem" id="cardItem{{id}}">
<header class="card-header">
  <p class="card-header-title is-size-7">
    {{title}} - {{date}}
  </p>
</header>
<div class="card-content">
  <div class="content">
   {{text}}
  </div>
</div>
</div><br>
`;

