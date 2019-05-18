const signinButtondiv = document.getElementById("signinButton");
const signupButtondiv = document.getElementById("signupButton");
const signinButton = signinButtondiv.getElementsByTagName("button")[0];
const signupButton = signupButtondiv.getElementsByTagName("button")[0];
const signupFormdiv = document.getElementById("signupForm");
const signinFormdiv = document.getElementById("signinForm");
const signinForm = signinFormdiv.getElementsByTagName("form")[0];
const signupForm = signupFormdiv.getElementsByTagName("form")[0];
const dashboard = document.getElementById("dashboard");
const dashboard_nav_button = document.getElementById("dashboard_nav");
const settings_nav_button = document.getElementById("settings_nav");
const newListButton = document.getElementById("newList");
const listEditPage = document.getElementById("editList");
const listEditPageNameForm = listEditPage.getElementsByTagName("form")[0];
const listInputForm = document.getElementById("listInputForm");
const navigation = document.getElementById("navigation");
const listNameHeader = document.getElementById("listName");
const showList = document.getElementById("showList");
const valueList = document.getElementById("listValue");


let userSessionData = {};


// we have signup form, signinform, dashboard, editListapge, mainPage, settings
function showThisPage(pageName) {
  switch(pageName){

case "dashboard":
dashboard.classList.remove("hide");
listEditPage.classList.add("hide");
signupFormdiv.classList.add("hide");
signinFormdiv.classList.add("hide");
signinButtondiv.classList.add("hide");
signupButtondiv.classList.add("hide");
showList.classList.add("hide");

break;

case "listEditPage":
dashboard.classList.add("hide");
listEditPage.classList.remove("hide");
signupFormdiv.classList.add("hide");
signinFormdiv.classList.add("hide");
signinButtondiv.classList.add("hide");
signupButtondiv.classList.add("hide");
showList.classList.add("hide");

break;

case "signupForm":
dashboard.classList.add("hide");
listEditPage.classList.add("hide");
signupFormdiv.classList.remove("hide");
signinFormdiv.classList.add("hide");
signinButtondiv.classList.add("hide");
signupButtondiv.classList.add("hide");
showList.classList.add("hide");

break;

case "signinForm":
dashboard.classList.add("hide");
listEditPage.classList.add("hide");
signupFormdiv.classList.add("hide");
signinFormdiv.classList.remove("hide");
signinButtondiv.classList.add("hide");
signupButtondiv.classList.add("hide");
showList.classList.add("hide");

break;

case "showList":
dashboard.classList.add("hide");
listEditPage.classList.add("hide");
signupFormdiv.classList.add("hide");
signinFormdiv.classList.add("hide");
signinButtondiv.classList.add("hide");
signupButtondiv.classList.add("hide");
showList.classList.remove("hide");
break;
}

}

signinButtondiv.classList.remove("hide");
signupButtondiv.classList.remove("hide");





signinButton.addEventListener("click", (e) => {

  signinButtondiv.classList.add("hide");

  signupButtondiv.classList.add("hide");

  showThisPage("signinForm");

});

signupButton.addEventListener("click", (e) => {

  signupButtondiv.classList.add("hide");

  signinButtondiv.classList.add("hide");

showThisPage("signupForm");

});


dashboard_nav_button.addEventListener("click",(e)=>{

  showThisPage("dashboard");

  valueList.innerHTML="";

  user = JSON.parse(localStorage.getItem(email))

  userSessionData = user

// get the names of all the lists in memory
  let listNames = Object.keys(userSessionData.alist);

  // lists is ul that holds all the list names
  let lists = document.getElementById("lists");

  // to prevent lists from repeating themselves
  lists.innerHTML="";

// loop over all the list names in memory and make them an li
  for(listName of listNames){

    ahref = document.createElement("a");

    li = document.createElement("li");

    ahref.appendChild(li);

    ahref.setAttribute('href',"#");

    li.innerText = listName;

    li.addEventListener("click",(e)=>{
      
      let listName = e.target.innerHTML;

      showThisPage("showList");


      listItems = userSessionData["alist"][listName];


      for(listItem of listItems){

        li = document.createElement("li");

        li.innerText = listItem;

        valueList.appendChild(li);

      }

    });

    lists.appendChild(ahref);

  }

});

settings_nav_button.addEventListener("click",(e)=>{
  // show this page settings
});


signupForm.addEventListener("submit", (e) => {

  e.preventDefault();
  fn = document.getElementsByName("firstName")[0].value;
  ln = document.getElementsByName("lastName")[0].value;
  email = document.getElementsByName("email")[0].value;
  password = document.getElementsByName("password")[0].value;

  let userData = {
    firstName: fn,
    lastName: ln,
    email: email,
    password:password,
    alist: {

    }
  } ;
  localStorage.setItem(email, JSON.stringify(userData));
  signupFormdiv.classList.add("hide");
  showThisPage("dashboard");
  navigation.classList.remove("hide");


});

signinForm.addEventListener("submit", (e)=> {
    e.preventDefault();

// get user email and password from the input forms and also user object
    email = document.getElementsByName("emailin")[0].value

    password = document.getElementsByName("passwordin")[0].value

    let user = JSON.parse(localStorage.getItem(email));

// validate user credentials
    if(user.email == email && user.password == password){

      signinFormdiv.classList.add("hide");

      showThisPage("dashboard");

      navigation.classList.remove("hide");

      userSessionData = user;

    }

// if the user has any existing lists
    if(Object.keys(userSessionData.alist)) {

      // get the names of the existing lists
      let listNames = Object.keys(userSessionData.alist);

      let lists = document.getElementById("lists");

      // add each existing list as a li in ul on dashboard
      // inside for loop we create <a href="#"> <li> list name </li>  </a>
      for(listName of listNames){

        ahref = document.createElement("a");

        li = document.createElement("li");

        ahref.appendChild(li);

        ahref.setAttribute('href',"#");

        li.innerText = listName;

        lists.appendChild(ahref);

        li.addEventListener("click",(e)=>{

          showThisPage("showList");

          listItems = userSessionData["alist"][listName];


          for(listItem of listItems){

            li = document.createElement("li");

            li.innerText = listItem;

            valueList.appendChild(li);

          }

      });

    }

}
});


newListButton.addEventListener("click",(e)=>{

  e.preventDefault();

  listNameHeader.innerHTML = "";

  list.innerHTML="";

  showThisPage("listEditPage");

});


listEditPageNameForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  listName = document.getElementsByName("listName")[0].value;

  userSessionData.alist[listName] = []; // name:[]

  email = userSessionData.email;

  localStorage.setItem(email, JSON.stringify(userSessionData));

  listNameHeader.innerHTML = listName;

});


listInputForm.addEventListener("submit",(e)=>{

  e.preventDefault();

 listInput = document.getElementById("listInput").value;

 li = document.createElement("li");

 li.innerText = listInput;

list = document.getElementById("list");

list.appendChild(li);

listName = listNameHeader.innerHTML;

userSessionData["alist"][listName].push(listInput);

localStorage.setItem(email, JSON.stringify(userSessionData));

});
