
import { createToast } from '../toast/script.js'
import { supabase } from './supa.js'

const luser = document.getElementById("luser");
const lpass = document.getElementById("lpass");
const ruser = document.getElementById("ruser");
const rpass = document.getElementById("rpass");
const loginbtn = document.getElementById("login");
const signupbtn = document.getElementById("register");
let luserval, ruserval;

loginbtn.addEventListener("click", (e) => {
    e.preventDefault();
    luserval = luser.value.toLowerCase();
    if(isemail(luserval)) {
        searchdata();
    }
});

let username;

signupbtn.addEventListener("click", (e) => {
    e.preventDefault();
    ruserval = ruser.value.toLowerCase();
    // console.log(ruserval);
    if(isemail(ruserval)) {
        username = ruser.value.replace(/@.*/, '');
        insertdata();
    }
})

const isemail = (email) => {
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if(!email.match(mailformat)){
        createToast("warning", "Email Address Invalid");
        return false;
    }
    else return true
}


async function searchdata() {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .match({email: luserval, password: CryptoJS.MD5(lpass.value).toString()})
    // console.log(data);
    if(data.length<=0) {
        createToast("error", "Incorrect credentials");
    }

    if(data.length > 0 && !error) {
        createToast("success", "Welcome");
        localStorage.setItem("email", data[0]['email'])
        localStorage.setItem("username", data[0]['username'])
        window.location.replace('./dashboard.html')
    } 
}


async function insertdata() {
    const { error } = await supabase
    .from('users')
    .insert({ username: username, email: ruserval, password: CryptoJS.MD5(rpass.value).toString()})

    const { error1 } = await supabase
    .from('profile')
    .insert({email: ruserval})

    const { error2 } = await supabase
    .from('userscore')
    .insert({email: ruserval})

    console.log(error)
    if(!error && !error1){ 
        createToast("success", "Welcome Aboard! Login"); 
    }
    
    if(error['code']=="23505") {
        createToast("warning", "User Already Present");
    }
    if(error['code']!="23505") {
        createToast("error", "Sorry! Try Again");
    }
    if(error1) createToast("error", "Profile Error");
    if(error2) createToast("error", "User Score Error");
    clearvalue(ruser, rpass);
    localStorage.setItem("email", ruserval);
    localStorage.setItem("username", username);
    window.location.replace('./2.html')
}


const clearvalue=(a=null,b=null, c=null) => {
    if(a!=null)
    a.value=''
    if(a!=null)
    b.value=''
    if(c!=null)
    c.value=''
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


