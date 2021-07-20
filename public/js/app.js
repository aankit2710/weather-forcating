console.log("Js File Loaded")

fetch("http://puzzle.mead.io/puzzle").then(response =>{
    response.json().then(data => {
        console.log(data)
    })
})

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")

weatherForm.addEventListener('submit', e =>{
e.preventDefault()

messageOne.textContent = "Loading........"
messageTwo.textContent = ""

fetch("http://localhost:3001/weather?address="+search.value).then(response =>{
    response.json().then(data => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
            messageThree.textContent = data.location
        }
    })
})
})