document.addEventListener("DOMContentLoaded",()=>{
    let html = ""
    console.log(JSON.parse(localStorage.getItem("data")))
    let data = JSON.parse(localStorage.getItem("data"))
    document.querySelector("#puntaje").textContent = data.puntaje + " puntos"
    console.log(data.errores.length == 0)
    if(data.errores.length === 0){
        document.querySelector("#errores p").innerHTML = '<h2 style="color: black !important;">No tuviste errores!<h2/>'
    }
    data.errores.forEach(element => {
       html += `<div>
       <h4>${element.grupo == "no-renovable" ? "No renovable" : element.grupo }</h4>
       <p>${element.name}</p>
       <img src="${element.url}" alt="${element.name}">
       </div>
       `
    });

    document.querySelector(".items-errores").innerHTML = html

})