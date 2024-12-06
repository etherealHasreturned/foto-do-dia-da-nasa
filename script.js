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
        if (!response.ok) {
            throw new Error("data fora do intervalo")
        }
        const data = await response.json()
        resultado(data)
    } catch (error) {
        divresultado.innerHTML = "insira uma data entre 1995 e a data atual de hoje"
    }
}
function resultado(data) {
    const { title, explanation, url, media_type } = data
    divresultado.innerHTML = ""
    divresultado.innerHTML =
        `
    <h2>${title}</h2>
    ${media_type === "image"
            ? `<img src="${url}" alt="Imagem do dia da NASA" />`
            : `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`
        }
<p class='explanation'>${explanation}</p>
             <button class="translate-btn">Traduzir</button>
   
             `
    const translateBtn = document.querySelector('.translate-btn');
    translateBtn.addEventListener('click', () => traduzirTexto(explanation, translateBtn));
}
async function traduzirTexto(explanation, translateBtn){
    const encodedText = encodeURIComponent(explanation); 
    const tradutorURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodedText}`;
    try{
        const response=await fetch(tradutorURL)
        const data=await response.json()
        const textoTraduzido = data[0].map(parteTexto => parteTexto[0]).join(' ')
        console.log(textoTraduzido)
        const paragrafo=document.querySelector(".explanation")
        paragrafo.innerHTML=textoTraduzido
        translateBtn.style.display="none"
    } catch(error){
        console.error("erro ao traduzir")
    }
}