/* document.addEventListener("DOMContentLoaded", () => {
    // Lista de imágenes de basura
    let items_basura = ["./img/botella_rota.png", "./img/lata.png", "./img/manzana_comida.png"];

    // Función para actualizar los elementos de basura
    function actualizar_items(array) {
        let numero = Math.floor(Math.random() * array.length);
        let nuevoElemento = document.createElement('img');
        nuevoElemento.className = 'basura';
        nuevoElemento.src = array[numero];
        nuevoElemento.alt = '';
        nuevoElemento.style.transition = 'all 0.5s';
        nuevoElemento.style.transform = 'translateY(850px)';
        
        // Insertar el nuevo ítem en el contenedor
        const elementosContainer = document.querySelector("#elementos");
        elementosContainer.innerHTML = '';
        elementosContainer.appendChild(nuevoElemento);
        
        // Aplicar animación de entrada
        setTimeout(() => {
            nuevoElemento.classList.add("mostrar");
        }, 300);
    }

    // Inicializar los elementos de basura
    actualizar_items(items_basura);

    // Inicializar Dragula
    const containers = document.querySelectorAll('.dropzone');
    const drake = dragula([...containers, document.querySelector("#elementos")], {
        revertOnSpill: true ,// Revertir el objeto a su lugar si no se suelta en una zona válida
        moves: function (el, source, handle, sibling) {
            // Solo permitir mover los elementos con la clase '.basura'
            return el.classList.contains('basura');
        }
    });


    // Configurar eventos para manejar el arrastre
    drake.on('drop', (el, target, source, sibling) => {
        console.log("Elemento soltado en la zona:", target.id);

        // Aquí puedes validar si el elemento fue soltado en la zona correcta
        // Puedes agregar lógica para verificar si el elemento coincide con el tipo de basura
        let basuraTipo = target.id;
        console.log(`Elemento arrastrado a la zona de ${basuraTipo}`);
        el.remove(); // Esto elimina el elemento del DOM para que no pueda ser arrastrado nuevamente
        // Actualizar los elementos después de soltar
        actualizar_items(items_basura);
    });

    drake.on('drag', (el) => {
        console.log('Arrastre iniciado:', el);
    });

    drake.on('cancel', (el) => {
        console.log('Arrastre cancelado:', el);
    });
});
 */

document.addEventListener("DOMContentLoaded", () => {
    let puntuacion = 0
    let items_basura = ["./img/botella_rota.png", "./img/lata.png", "./img/manzana_comida.png"];
    let tiempoLimite = 15; // Tiempo límite en segundos
    let cronometro;
/*     let itemActual = 0; */

    // Inicializar la primera basura
    actualizar_items(items_basura);

    function iniciarCronometro() {
        let tiempoRestante = tiempoLimite;
        document.getElementById("tiempo").textContent = tiempoRestante;

        cronometro = setInterval(() => {
            tiempoRestante--;
            document.getElementById("tiempo").textContent = tiempoRestante;

            // Si el tiempo llega a 0, pasar al siguiente item
            if (tiempoRestante === 0) {
                clearInterval(cronometro);
                pasarAlSiguienteItem();
            }
        }, 1000); // Actualizar cada segundo
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
        document.querySelector("#elementos").innerHTML = `<img class="basura" style="transition: all 0.3s; transform: translateY(850px); " src="${array[numero]}" alt="">`;
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
        console.log("Elemento soltado en la zona:", target.id);
        /* 
        Logica para la puntuación del usuario
        
        */
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

});