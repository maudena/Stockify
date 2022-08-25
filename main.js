
let productos = []
const formLista = document.getElementById('formLista')
const menuDerecha = document.getElementById('sidebar');
const boton = document.getElementById('btnAgregar')
const apiClima = document.getElementById('apiClima')
const apiKey = "5d21703e9d21d3d03ce0aa34bca0e2df";



listarProductos();



menuDerecha.innerHTML = '<h2 class="menuSide">Herramientas</h2>';

let buscador = document.createElement('input');
buscador.type = 'text';
buscador.id = 'buscador'
buscador.placeholder = "Buscar";
buscador.classList.add('#buscador', 'mt-2');
menuDerecha.appendChild(buscador);



let inputDeleteAll = document.createElement('button');
inputDeleteAll.type = 'button';
inputDeleteAll.innerText = 'Borrar Todo';
inputDeleteAll.classList.add('btn-outline', 'mt-2');
menuDerecha.appendChild(inputDeleteAll);

let limpiarLista = document.createElement('button');
limpiarLista.type = 'button';
limpiarLista.innerText = 'Limpiar lista';
limpiarLista.classList.add('btn-outline', 'mt-2', 'd-flex');
menuDerecha.appendChild(limpiarLista);
limpiarLista.onclick = () => {
    tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';
}

let btnCargarData = document.createElement('button');
btnCargarData.type = 'button';
btnCargarData.innerText = 'Cargar Data';
btnCargarData.classList.add('btn-outline', 'd-flex', 'mt-2');
menuDerecha.appendChild(btnCargarData);



function agregarProducto(producto, costo, cantidad, rubro) {
    let newProducto = {
        producto: producto,
        costo: costo,
        cantidad: cantidad,
        rubro: rubro,
        utilidad: utilidad,
        id: getProductoId()

    }
    productos.push(newProducto)
    almacenarLocal(productos);

}

function getProductoId() {
    let lastProductoId = localStorage.getItem("lastProductoId") || "0";
    let newProductoId = JSON.parse(lastProductoId) + 1;
    localStorage.setItem("lastProductoId", newProductoId);
    return newProductoId;

}

function almacenarLocal(aLista) {
    localStorage.setItem('Productos', JSON.stringify(aLista));
}

function tomarDatos() {

    producto = document.getElementById('producto').value,
        costo = document.getElementById('costo').value,
        cantidad = document.getElementById('cantidad').value,
        rubro = document.getElementById('rubro').value,
        utilidad = document.getElementById('sugerido').value,


        agregarProducto(producto, costo, cantidad, rubro, utilidad);
    listarProductos()
    formLista.reset();
}

function getListaProductos() {

    let listaGuardada = localStorage.getItem('Productos');

    if (listaGuardada == null) {
        productos = [];
    } else {
        productos = JSON.parse(listaGuardada);
    }
    return productos;


}

document.querySelector('#btnAgregar').onclick = () => {

        producto = document.getElementById('producto')
        costo = document.getElementById('costo')
        cantidad = document.getElementById('cantidad')
        rubro = document.getElementById('rubro')
        utilidad = document.getElementById('sugerido')
        parrafo = document.getElementById('alerta')

        entrar = false;
        alerta = '';


    if (producto.value.length <1 || costo.value.length <1 || cantidad.value.length <1 || rubro.value.length <1 || utilidad.value.length <1){
        alerta += `Por favor rellene los campos <br>`
        entrar = true;
    } else{
        tomarDatos();
    }

    if(entrar= true){
        parrafo.innerHTML = alerta;
    }
}






function listarProductos() {
    let lista = getListaProductos(),
        tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';


    for (let i = 0; i < lista.length; i++) {
        const iva = 1.21;
        let fila = tbody.insertRow(i);
        fila.setAttribute("IdFila", lista[i].id)
        let productoCelda = fila.insertCell(0);
        let costoCelda = fila.insertCell(1);
        let cantidadCelda = fila.insertCell(2);
        let rubroCelda = fila.insertCell(3);
        let idCelda = fila.insertCell(4)
        let utilidadCelda = fila.insertCell(5)
        let inputDeleteCell = fila.insertCell(6)
        let inputDelete = document.createElement('button')
        inputDelete.classList.add('btn-close');
        inputDeleteCell.appendChild(inputDelete)

        productoCelda.innerHTML = lista[i].producto;
        fila.classList.add('articulo');
        costoCelda.innerHTML = lista[i].costo;
        cantidadCelda.innerHTML = lista[i].cantidad;
        rubroCelda.innerHTML = lista[i].rubro;
        idCelda.innerHTML = lista[i].id;
        utilidadCelda.innerHTML = Math.round(lista[i].costo * iva * (1 + (lista[i].utilidad) / 100));


        tbody.appendChild(fila);

        inputDelete.addEventListener('click', (evento) => {
            let filaProducto = evento.target.parentNode.parentNode;
            let idProducto = parseInt(filaProducto.getAttribute("IdFila"));
            fila.remove();
            productos = productos.filter(producto => producto.id !== idProducto)
            almacenarLocal(productos);

        })
    }

}


inputDeleteAll.onclick = () => {
    Swal.fire({
        title: 'Atención!',
        text: "Quieres borrar todos los datos cargados?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar Todo'
    }).then((result) => {
        if (result.isConfirmed) {
            tbody = document.querySelector('#tablaProductos tbody');
            tbody.innerHTML = '';
            localStorage.clear();
            location.reload();
        }
    })

}


btnCargarData.onclick = () => {

    fetch('../data.json')
        .then((res) => res.json())
        .then((data) => {
            tbody = document.querySelector('#tablaProductos tbody');

            for (let i = 0; i < data.length; i++) {
                const iva = 1.21;
                let fila = tbody.insertRow(i);
                fila.setAttribute("IdFila", data[i].id)
                fila.classList.add('articulo');
                let productoCelda = fila.insertCell(0);
                let costoCelda = fila.insertCell(1);
                let cantidadCelda = fila.insertCell(2);
                let rubroCelda = fila.insertCell(3);
                let idCelda = fila.insertCell(4)
                let utilidadCelda = fila.insertCell(5)
                let inputDeleteCell = fila.insertCell(6)
                let inputDelete = document.createElement('button')
                inputDelete.classList.add('btn-close');
                inputDeleteCell.appendChild(inputDelete)

                productoCelda.innerHTML = data[i].nombre;
                costoCelda.innerHTML = data[i].costo;
                cantidadCelda.innerHTML = data[i].cantidad;
                rubroCelda.innerHTML = data[i].rubro;
                idCelda.innerHTML = data[i].id;
                utilidadCelda.innerHTML = Math.round(data[i].costo * iva * (1 + (data[i].utilidad) / 100));


                tbody.appendChild(fila);
                inputDelete.addEventListener('click', (evento) => {
                    let filaProducto = evento.target.parentNode.parentNode;
                    let idProducto = filaProducto.getAttribute("IdFila");
                    filaProducto.remove();
                    dltProducto(idProducto);

                })
            }

        })

}

//---------------FUNCION PARA BUSCADOR-------------------//

document.addEventListener('keyup', filtrar => {

    if (filtrar.target.matches("#buscador")) {

        if (filtrar.key === "Escape") filtrar.target.value = ""

        document.querySelectorAll(".articulo").forEach(producto => {

            producto.textContent.toLowerCase().includes(filtrar.target.value.toLowerCase())
                ? producto.classList.remove("filtro")
                : producto.classList.add("filtro")
            console.log(producto)
        })

    }


});


// ----------------- CONSUMIENDO API DE CLIMA-------------------//

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key]);
    });

}



const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}