let eye_slash = document.querySelector(".eye_slash")
let eye =  document.querySelector(".eye")
eye_slash.addEventListener("click", ()=>{
   eye.classList.remove("hide")
    eye_slash.classList.add("hide")
    let password = document.querySelector("#password")
    password.type = "text";
})
eye.addEventListener("click", ()=>{
    eye.classList.add("hide")
     eye_slash.classList.remove("hide")
     password.type = "password";
 })
 let login = document.querySelector(".login")
 login.addEventListener("click", ()=>{
    alert("Congratulations! you're loged in.")
})