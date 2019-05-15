
let listArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];


// get the div that contains the form element
const form = document.getElementById("add_itemform");

const button = form.querySelector("button");

button.addEventListener("click",addItem);

// get the div that contains the html list
const listContainer = document.getElementById("td_List_div");

const list = listContainer.getElementsByTagName("ul")[0];

// get the delete list container
const dete = document.getElementById("del");

const del_b = dete.getElementsByTagName("button")[0];

del_b.addEventListener("click",deleteList);


// when first opening the page bring in previous list items
displayItems();

function displayItems(){

  for( prop of listArray){

    addList(prop);

  }

}


/*
  Prevents reload, update listArray and localStorage, and show updated list
*/
function addItem(e) {

  e.preventDefault();

  const list_value = document.getElementById('listText').value;

  listArray.push(list_value);

  localStorage.setItem('items',JSON.stringify(listArray));

  addList(list_value);

}
/*
creates a new list item and appends it to the list
*/
  function addList (lv) {

  const newListItem = document.createElement("li");

  const list_checkbox = document.createElement("input");

  list_checkbox.setAttribute("type","checkbox");
  list_checkbox.addEventListener("click",removeListItem);

  newListItem.innerText= lv;

  newListItem.setAttribute("contenteditable","true");
  newListItem.addEventListener("blur",editListItem);
  newListItem.appendChild(list_checkbox);

  list.appendChild(newListItem);
}

function editListItem(e){
  let index = 0;
  let lists_ul = e.target.parentNode.children;
  for(prop of lists_ul){
  if(prop.innerText === e.target.innerText){
    break;
  }
  index+=1;
}
listArray[index] = e.target.innerText;
localStorage.setItem('items',JSON.stringify(listArray));

}


function removeListItem(e){

  list.removeChild(e.target.parentElement);

  listArray.splice( listArray.indexOf(e.target.parentElement.innerText), 1 );

  localStorage.setItem('items',JSON.stringify(listArray));

}

/*
* Be able to delete entire list at once
*/
function deleteList(e){

  e.preventDefault();

  localStorage.clear();

  location.reload();

}
