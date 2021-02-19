const template = document.createElement('template');
template.innerHTML = `
  <style>
    #typeahead-component {
      margin: 10px;
      position: relative;
    }
    .form-group {
      width: 200px;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    .results {
      border: 1px solid #ccc;
      border-top: 0;
      padding: 5px 0;
      max-height: 200px;
      overflow-y: scroll;
      opacity: 1;
      transition: opacity .2ms;
      position: absolute;
      background-color: white;
      width: 198px;
    }
    .results.hide {
      opacity: 0;
    }
    
    .result {
      padding: 5px;
      cursor: pointer;
    }
    .result:hover, .result.active {
      background-color: #eee;
    }
    
    form {
      display: flex;
    }
    
    .form-group + .form-group {
      margin-left: 50px;
    }
    
    input {
      display: block;
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
    }
    
    .notification {
  opacity: 1;
  position: absolute;
    opacity: 1;
    top: 0;
    right: 0;
}

.notification.hide {
  opacity: 0;
}
  </style>
  <div id="typeahead-component" class="gh-users-group form-group">
    <label id="label"></label>
  </div>
`;

export default template;
