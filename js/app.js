const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');

const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let data = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCursos);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarrito.addEventListener('click', () => {
        data = [];
        agregarCursoCarrito();
    });
}


function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        data = data.filter(curso => curso.id !== cursoId);
        agregarCursoCarrito(); 
    }
    
}

function agregarCursos(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const curso = leerDatosCurso(e.target.parentNode.parentElement);
        
        if(revisarRepetidos(curso) !== -1){
            data[revisarRepetidos(curso)].cantidad++;
            agregarCursoCarrito();
            return;
        }

        data.push(curso);
        agregarCursoCarrito();
    }
}

function revisarRepetidos(curso) {
    return data.findIndex(element => element.id === curso.id);
}

function leerDatosCurso(element) {
    return {
        imagen: element.querySelector('img').src,
        nombre: element.querySelector('h4').textContent,
        precio: element.querySelector('p > span').textContent,
        id: element.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
}


function agregarCursoCarrito(){
    
    limpiarHTML();

    data.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = cursoCarritoHTML(curso);
        listaCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //listaCarrito.innerHTML = '';
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }

}

function cursoCarritoHTML({imagen, nombre, precio, id, cantidad}){
    return `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
    `;
    
}