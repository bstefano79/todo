export const appHtml=`
<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
      <img src="img/todo.png" >
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" id="newItem">
        New Item
      </a>

      <a class="navbar-item">
      Edit
      </a>

      <a class="navbar-item">
        Clone
      </a>
      <a class="navbar-item" id="deleteItem">
      Delete
      </a>
      
    </div>
  </div>
</nav>
<div class="columns" style="padding:10px">
    <div class="column" id="firstColumn">

    </div>
    <div class="column" id="secondColumn">
    
    </div>
    <div class="column" id="thirdColumn">
    
    </div>
    <div class="column" id="fourthColumn">
    
    </div>
</div>
`;

export const formHtml=`
<div class="container is-max-desktop">
  <div class="notification is-primary">
  <input type="hidden" id="idItem" ></input> 
  <div class="field">
  <label class="label">Data</label>
  <div class="control" id="dateControl">
    <input type="date" id="date">
  </div>
  </div>
  
<div class="field">
<label class="label">Titolo</label>
<div class="control" id="titleControl">
  <input class="input" type="text" id="title" placeholder="Title input">
</div>
</div>


<div class="field">
<label class="label">Message</label>
<div class="control" id="textControl">
  <textarea class="textarea" id="text" placeholder="Textarea"></textarea>
</div>
</div>

<div class="field is-grouped">
<div class="control">
  <button class="button is-link" id="save">Save</button>
</div>
<div class="control">
  <button class="button is-link is-light" id="cancel">Cancel</button>
</div>
</div>
</div>
</div>`;

export const modalChoice=`
<div style="padding 20px;height:50px;">{{message}}</div>
<button class="button is-danger" id="yesCancel">Si</button>
<button class="button is-primary" id="noCancel">No</button>
`;