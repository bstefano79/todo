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

const cardHtml=`<div class="card" id="cardItem{{id}}">
<header class="card-header">
  <p class="card-header-title">
    {{title}} - {{date}}
  </p>
  <button class="card-header-icon" aria-label="more options">
    <span class="icon">
      <i class="fas fa-angle-down" aria-hidden="true"></i>
    </span>
  </button>
</header>
<div class="card-content">
  <div class="content">
   {{text}}
  </div>
</div>
</div>`;

