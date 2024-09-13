document.addEventListener("DOMContentLoaded", () => {
    let juegoTerminado = false;
    let rondas = 0
    let puntuacion = 0
    let tiempoLimite = 10;
    let cronometro;
    let errores = []
    const respuestas =
    {
        organico: ["manzana", "hueso", "banana", "pescado", "hamburguesa", "sandia"],
        renovable: ["lata", "juguito", "bolsa_plastica", "caja", "vaso_carton"],
        no_renovable: ["botella", "cigarrillos", "servilleta", "polvo", "papel_metalizado"]
    }

    let items_basura = [
        //Renovable
        {
            url: "./img/lata.png",
            grupo: "renovable",
            name: "lata"
        },
        {
            url: "./img/bolsa_plastica.png",
            grupo: "renovable",
            name: "bolsa_plastica"
        },
        {
            url: "./img/juguito.png",
            grupo: "renovable",
            name: "juguito"
        },
        {
            url: "./img/caja.png",
            grupo: "renovable",
            name: "caja"
        },
        {
            url: "./img/vaso_carton.png",
            grupo: "renovable",
            name: "vaso_carton"
        },
        //-----------------------------------------------------------------------------------------
        //No renovables
        {
            url: "./img/servilleta.png",
            grupo: "no-renovable",
            name: "servilleta"
        },
        {
            url: "./img/botella_rota.png",
            grupo: "no-renovable",
            name: "botella"
        },
        {
            url: "./img/polvo.png",
            grupo: "no-renovable",
            name: "polvo"
        },
        {
            url: "./img/papel_metalizado.png",
            grupo: "no-renovable",
            name: "papel_metalizado"
        },
        {
            url: "./img/cigarrillos.png",
            grupo: "no-renovable",
            name: "cigarrillos"
        },
        //----------------------------------------------------------------------------------------
        //Organicos
        {
            url: "./img/hueso.webp",
            grupo: "no-renovable",
            name: "hueso"
        },
        {
            url: "./img/manzana_comida.png",
            grupo: "organico",
            name: "manzana"
        },
        {
            url: "./img/banana.png",
            grupo: "organico",
            name: "banana"
        },
        {
            url: "./img/hamburguesa.png",
            grupo: "organico",
            name: "hamburguesa"
        },
        {
            url: "./img/pescado.png",
            grupo: "organico",
            name: "pescado"
        },
        {
            url: "./img/sandia.png",
            grupo: "organico",
            name: "sandia"
        }
    ]
    /*  let items_basura = ["./img/botella_rota.png", "./img/lata.png", "./img/manzana_comida.png"]; */

    /*     let itemActual = 0; */

    // Inicializar la primera basura
    actualizar_items(items_basura);

    function iniciarCronometro() {
        if (!juegoTerminado) {
            let tiempoRestante = tiempoLimite;
            document.getElementById("cronometro").textContent = tiempoRestante;

            cronometro = setInterval(() => {
                tiempoRestante--;
                document.getElementById("cronometro").textContent = tiempoRestante;

                // Si el tiempo llega a 0, pasar al siguiente item
                if (tiempoRestante === 0) {
                    rondas += 1
                    puntuacion -= 30
                    document.querySelector("#puntos h2").textContent = puntuacion
                    clearInterval(cronometro);
                    pasarAlSiguienteItem();
                }
            }, 1000); // Actualizar cada segundo
        } else {
            clearInterval(cronometro);
            document.getElementById("cronometro").textContent = "0"
        }

    }

    function pasarAlSiguienteItem() {
        /*   itemActual++;
          if (itemActual >= items_basura.length) {
              itemActual = 0; // Reiniciar si llega al final
          } */
        actualizar_items(items_basura);

    }

    function actualizar_items(array) {
        clearInterval(cronometro); // Detener el cronómetro anterior
        let numero = Math.floor(Math.random() * array.length);
        document.querySelector("#elementos").innerHTML = `<img name="${array[numero].name}" grupo="${array[numero].grupo}" class="basura" style="transition: all 0.3s; transform: translateY(850px); " src="${array[numero].url}" alt="">`;
        // Aplicar animación de entrada
        setTimeout(() => {
            document.querySelector(".basura").classList.add("mostrar");
        }, 300);
        iniciarCronometro(); // Iniciar un nuevo cronómetro
    }

    // Dragula para manejo de arrastre y soltar
    const containers = document.querySelectorAll('.dropzone');
    const basuras = document.querySelectorAll('#elementos');

    const drake = dragula([...basuras, ...containers], {
        revertOnSpill: true,  // Revertir el objeto si no se suelta en una zona válida
        moves: function (el, source, handle, sibling) {
            // Solo permitir mover los elementos con la clase '.basura'
            return el.classList.contains('basura');
        }
    });

    drake.on('drop', (el, target, source) => {
        rondas += 1
        if (rondas == 13) {
            document.querySelector(".modal").classList.add("modal--show")
            juegoTerminado = true
            iniciarCronometro()
            clearInterval(cronometro);
        }
        console.log("rondas: ", rondas)
        console.log("Elemento:", el, "soltado en la zona:", target);
        /* 
        Logica para la puntuación del usuario
        
        */

        let key = Object.keys(respuestas).find(e => e == target.id)
        if (respuestas[key].includes(el.getAttribute("name"))) {
            if (parseInt(document.querySelector("#cronometro").textContent) > 5) {
                puntuacion += 20
                document.querySelector("#puntos h2").textContent = puntuacion
            } else {
                puntuacion += 10
                document.querySelector("#puntos h2").textContent = puntuacion
            }
            document.querySelector("#bien").classList.add("mostrar_mensajes")
            setTimeout(() => {
                document.querySelector("#bien").classList.remove("mostrar_mensajes")
            }, 2200);

        } else {
            puntuacion -= 10
            document.querySelector("#puntos h2").textContent = puntuacion
            document.querySelector("#mal").classList.add("mostrar_mensajes")
            setTimeout(() => {
                document.querySelector("#mal").classList.remove("mostrar_mensajes")
            }, 2200);
            errores.push({ url: el.src, name: el.getAttribute("name"), grupo: el.getAttribute("grupo") })
            console.log(errores)

        }

        /* if(respuestas.el.getAttribute("name")) */
        //Utilizar el atributo grupo para identificar si el jugador atina en la caneta
        clearInterval(cronometro);  // Detener el cronómetro al soltar
        pasarAlSiguienteItem();  // Ir al siguiente item
        // Aplicar la animación de desaparición
        el.classList.add('desaparecer');

        // Esperar que la animación termine antes de pasar al siguiente item
        el.addEventListener('animationend', () => {
            clearInterval(cronometro);  // Detener el cronómetro al soltar
            el.remove();  // Eliminar el elemento del DOM
            pasarAlSiguienteItem();  // Ir al siguiente item
        });
    });

    document.querySelector(".btn").addEventListener("click", (e) => {
        let data =
        {
            errores,
            puntaje: puntuacion
        }
        localStorage.setItem("data", JSON.stringify(data))
        window.location.href = "resultados.html"
    })
});