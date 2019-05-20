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
const needtoRemoveList = document.getElementById("list");
list = document.getElementById("list");


let userSessionData = {};

signinButtondiv.classList.remove("hide");

signupButtondiv.classList.remove("hide");


// we have signup form, signinform, dashboard, editListapge, mainPage, settings
function showThisPage(pageName) {
  switch (pageName) {

    case "dashboard":
      dashboard.classList.remove("hide");
      listEditPage.classList.add("hide");
      signupFormdiv.classList.add("hide");
      signinFormdiv.classList.add("hide");
      signinButtondiv.classList.add("hide");
      signupButtondiv.classList.add("hide");

      break;

    case "listEditPage":
      dashboard.classList.add("hide");
      listEditPage.classList.remove("hide");
      signupFormdiv.classList.add("hide");
      signinFormdiv.classList.add("hide");
      signinButtondiv.classList.add("hide");
      signupButtondiv.classList.add("hide");

      break;

    case "signupForm":
      dashboard.classList.add("hide");
      listEditPage.classList.add("hide");
      signupFormdiv.classList.remove("hide");
      signinFormdiv.classList.add("hide");
      signinButtondiv.classList.add("hide");
      signupButtondiv.classList.add("hide");

      break;

    case "signinForm":
      dashboard.classList.add("hide");
      listEditPage.classList.add("hide");
      signupFormdiv.classList.add("hide");
      signinFormdiv.classList.remove("hide");
      signinButtondiv.classList.add("hide");
      signupButtondiv.classList.add("hide");

      break;

    case "showList":
      dashboard.classList.add("hide");
      listEditPage.classList.add("hide");
      signupFormdiv.classList.add("hide");
      signinFormdiv.classList.add("hide");
      signinButtondiv.classList.add("hide");
      signupButtondiv.classList.add("hide");
      break;
  }

}

function validateUser(email, password, user) {

  // validate user credentials
  if (user.email == email && user.password == password) {

    showThisPage("dashboard");

    return true;

  }

  return false;

}

function setLinktoListPageAndShowList(dashboardListWithLi, userSessionData) {

   dashboardListWithLi = dashboardListWithLi.children;


  for (li of dashboardListWithLi) {

      li = li.firstElementChild;

      li.addEventListener("click", (e) => {

        needtoRemoveList.innerHTML="";

        showThisPage("listEditPage");

        //showThisPage("showList");

        listName = e.target.innerHTML;
        listNameHeader.innerText = listName;

        listItems = userSessionData["alist"][listName];


          for (listItem of listItems) {

            li = document.createElement("li");

            li.innerText = listItem;

              list.appendChild(li);

      }

    });

  }
}

// dashboard list : <ul> listNames <li>
function createDashboardList(listNames, dashboardList) {

  for (let listName of listNames) {

    ahref = document.createElement("a");

    li = document.createElement("li");

    ahref.appendChild(li);

    ahref.setAttribute('href', "#");

    li.innerText = listName;

    dashboardList.appendChild(ahref);


  }
  return dashboardList;

}


  // a user can click on create new list and add title to it and list listItems
  // a user can click on an existing list and edit the title and add more items and cross out existing items
  // have one page for the lists with two conditions: if "create new list " is clicked
  // we create the same page but just empty
  // if an existing list is clicked we load its content and maintain its editability
  // dashboard and sigin,



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


  dashboard_nav_button.addEventListener("click", (e) => {

    showThisPage("dashboard");

    // get the names of all the lists in memory
    let listNames = Object.keys(userSessionData.alist);

    // lists is ul that holds all the list names
    let dashboardList = document.getElementById("lists");

    // to prevent lists from repeating themselves
    dashboardList.innerHTML = "";

    dashboardListWithLi = createDashboardList(listNames, dashboardList);

    setLinktoListPageAndShowList(dashboardListWithLi, userSessionData);

  });

  settings_nav_button.addEventListener("click", (e) => {
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
      password: password,
      alist: {

      }
    };
    localStorage.setItem(email, JSON.stringify(userData));

    showThisPage("dashboard");

  });

  signinForm.addEventListener("submit", (e) => {

    e.preventDefault();

    // get user email and password from the input forms and also user object
    let email = document.getElementsByName("emailin")[0].value;

    let password = document.getElementsByName("passwordin")[0].value;

    let user = JSON.parse(localStorage.getItem(email));

    let isAuthorized = validateUser(email, password, user);

    userSessionData = user;


    // if the user has any existing lists
    if (Object.keys(userSessionData.alist) && isAuthorized) {

      showThisPage("dashboard");
      navigation.classList.remove("hide");

      // get the names of the existing lists
      let listNames = Object.keys(userSessionData.alist);

      let dashboardList = document.getElementById("lists");

      // add each existing list as a li in ul on dashboard
      // inside for loop we create <a href="#"> <li> list name </li>  </a>
      dashboardListWithLi = createDashboardList(listNames, dashboardList);

      setLinktoListPageAndShowList(dashboardListWithLi, userSessionData);


    }

  });


  newListButton.addEventListener("click", (e) => {

    e.preventDefault();

    listNameHeader.innerHTML = "";

    list.innerHTML = "";

    showThisPage("listEditPage");

  });


  listEditPageNameForm.addEventListener("submit", (e) => {

    e.preventDefault();

    listName = document.getElementsByName("listName")[0].value;

    // if we are creating a new list then create a new empty list

    if ( listNameHeader.innerHTML == ""){

      userSessionData["alist"][listName] = []; // name:[]

      email = userSessionData.email;

      localStorage.setItem(email, JSON.stringify(userSessionData));

      listNameHeader.innerHTML = listName;

    }
    else {

      // delete the previous object and rename the list
    userSessionData["alist"][listName] = userSessionData["alist"][listNameHeader.innerHTML];

    delete userSessionData["alist"][listNameHeader.innerHTML];

    email = userSessionData.email;

    localStorage.setItem(email, JSON.stringify(userSessionData));

    listNameHeader.innerHTML = listName;

}


  });


  listInputForm.addEventListener("submit", (e) => {

    e.preventDefault();

    listInput = document.getElementById("listInput").value;

    li = document.createElement("li");

    li.innerText = listInput;

    list.appendChild(li);

    listName = listNameHeader.innerHTML;

    userSessionData["alist"][listName].push(listInput);

    email = userSessionData.email;

    localStorage.setItem(email, JSON.stringify(userSessionData));

  });
