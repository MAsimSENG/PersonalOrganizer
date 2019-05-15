const signinButtondiv = document.getElementById("signinButton");
const signupButtondiv = document.getElementById("signupButton");
const signinButton = signinButtondiv.getElementsByTagName("button")[0];
const signupButton = signupButtondiv.getElementsByTagName("button")[0];
const signupFormdiv = document.getElementById("signupForm");
const signinFormdiv = document.getElementById("signinForm");
const signinForm = signinFormdiv.getElementsByTagName("form")[0];
const signupForm = signupFormdiv.getElementsByTagName("form")[0];
const dashboard = document.getElementById("dashboard");
const newListButton = document.getElementById("newList");
const listEditPage = document.getElementById("editList");
const listEditPageNameForm = listEditPage.getElementsByTagName("form")[0];
let userSessionData = {};
signinButtondiv.classList.remove("hide");
signupButtondiv.classList.remove("hide");

signinButton.addEventListener("click", (e) => {
  signinButtondiv.classList.add("hide");
  signupButtondiv.classList.add("hide");

  signinFormdiv.classList.remove("hide");


});

signupButton.addEventListener("click", (e) => {
  signupButtondiv.classList.add("hide");
  signinButtondiv.classList.add("hide");

  signupFormdiv.classList.remove("hide");

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
      name: "",
      values:[]
    }
  } ;
  localStorage.setItem(email, JSON.stringify(userData));
  signupFormdiv.classList.add("hide");
  dashboard.classList.remove("hide");

});

signinForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    email = document.getElementsByName("emailin")[0].value
    password = document.getElementsByName("passwordin")[0].value

    let user = JSON.parse(localStorage.getItem(email));
    if(user.email == email && user.password == password){
      signinFormdiv.classList.add("hide");
      dashboard.classList.remove("hide");
      userSessionData = user;

    }
});

newListButton.addEventListener("click",(e)=>{

  e.preventDefault();
  dashboard.classList.add("hide");
  listEditPage.classList.remove("hide");

});

listEditPageNameForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  listName = document.getElementsByName("listName")[0].value;
  userSessionData.alist.name = listName;
  email = userSessionData.email;

  localStorage.setItem(email, JSON.stringify(userSessionData));

  listNameHeader = document.getElementById("listName");

  listNameHeader.innerHTML = userSessionData.alist.name;

});
