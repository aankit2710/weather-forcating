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
const messageFour = document.querySelector("#message-4")
const messageFive = document.querySelector("#message-5")
const messageSix = document.querySelector("#message-6")
const messageSeven = document.querySelector("#message-7")
const messageEight = document.querySelector("#message-8")
const messageNine = document.querySelector("#message-9")

weatherForm.addEventListener('submit', e =>{
e.preventDefault()

messageOne.textContent = "Loading........"
messageTwo.textContent = ""
messageThree.textContent = ""
messageFour.textContent = ""
messageFive.textContent = ""
messageSix.textContent = ""
messageSeven.textContent = ""
messageEight.textContent = ""
messageNine.textContent = ""

fetch("/weather?address="+search.value).then(response =>{
    response.json().then(data => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = "Search For : " + data.address
            messageTwo.textContent = "Temperature : " + data.temperature
            messageThree.textContent = "Maximum Temperature : " + data.maxTemp
            messageFour.textContent = "Minimum Temperature : " + data.minTemp
            messageFive.textContent = "Conditions : " +data.conditions
            messageSix.textContent = "Precipitation Probability : " +data.precipprob
            messageSeven.textContent = "Humidity : " +data.humidity
            messageEight.textContent = data.description
            messageNine.textContent = "Exact Location : " +data.location
        }
    })
})
})