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
      <a class="navbar-item">
        New Item
      </a>

      <a class="navbar-item">
      Edit
      </a>

      <a class="navbar-item">
        Clone
      </a>
      <a class="navbar-item">
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