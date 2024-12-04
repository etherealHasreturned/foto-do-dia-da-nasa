//5TAkNOa9ZklPaHGVlwWlLsdEgEqMhM9TOkcGAUCZ
//https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
const inputdate = document.getElementById("date")
const btpesquisar = document.getElementById("pesquisar")
const divresultado = document.querySelector(".resultado")
const apikey = "5TAkNOa9ZklPaHGVlwWlLsdEgEqMhM9TOkcGAUCZ"
const urlapi = "https://api.nasa.gov/planetary/apod?api_key="

btpesquisar.addEventListener("click", () => {
    const date = inputdate.value
    if (date) {
        buscardados(date)
    } else {
        alert("escolha uma data")
    }
})
async function buscardados(date) {
    const api = `${urlapi}${apikey}&date=${date}`

    try {
        const response = await fetch(api)
        const data = await response.json()
        resultado(data)
    } catch (error) {
        divresultado.innerHTML = "tente novamente mais tarde"
    }
}
function resultado(data) {
    const { title, explanation, url } = data
    divresultado.innerHTML = ""
    divresultado.innerHTML =
        `
    <h2>${title}</h2>
    <img src="${url}"/>
<p>${explanation}</p>
    `
}