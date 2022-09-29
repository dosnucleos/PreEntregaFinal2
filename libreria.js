// ReCircular 

class Libro {
    constructor (id, titulo, autor, precio, cantidad){
        this.id=id;
        this.titulo=titulo;
        this.autor=autor;
        this.precio=precio;
        this.cantidad=cantidad;

    }
}

// Libros en Stock

const libro1 = new Libro (1,"Las Señoritas", "Laura Ramos", 2000, 1);
const libro2 = new Libro (2, "La Tia Cosima", "Florencia Bonelli", 1800, 1);
const libro3 = new Libro (3, "El Alquimista", "Paulo Coelho", 1500, 1);
const libro4 = new Libro (4, "EL Barrio de los Locos", "Roberto D Anna", 1500, 1);
const libro5 = new Libro (5, "1810", "Felipe Pigna", 1000, 1);
const libro6 = new Libro (6, "El Psicoanalista", "John Katzenbach", 1300, 1);
const libro7 = new Libro (7, "Puerto Belgrano", "Juan Terranova", 1100, 1);
const libro8 = new Libro (8, "El Duelo", "Gabriel Rolón ", 1200,1);
const libro9 = new Libro (9, "Flores siempre es Bello", "Roberto D Anna ", 2200, 1);

//ArrayLibreria
const libreria = [libro1, libro2, libro3, libro4, libro5, libro6, libro7, libro8, libro9];


const contenedorLibros=document.getElementById ("contenedorLibros");

// Tarjeta Individual libros en el Home
libreria.forEach (libro =>{
    const divLibro = document.createElement ("div");
    divLibro.classList.add ("card", "col-xl-4", "col-md-6", "col-sm-12" );
    divLibro.innerHTML=`
                        <div>
                            <img src="img/${libro.id}.png" class="card-img-top img-fluid">
                            <div class="card-body py-3">
                            <h3 class="card-title"> Titulo: </h3> <p> ${libro.titulo} </p>
                            <h3 class="card-title"> Autor: </h3> <p> ${libro.autor} </p>
                            <p class="card-text"> Precio: $ ${libro.precio}</p>
                            
                            <button id="boton${libro.id}" class="btn btn-info"> Agregar al Carrito </button>
                            </div>
                        </div>
    `;
contenedorLibros.appendChild (divLibro);
const boton = document.getElementById (`boton${libro.id}`);
boton.addEventListener ("click", () => {
    agregarAlCarrito (libro.id);
})
});


// Creo el carrito de comprar y una funcion que busque por ID y lo agrege al carrito

const carrito = [];

const agregarAlCarrito = (id) => {
    const libro = libreria.find(libro => libro.id === id);
    const libroEnCarrito = carrito.find(libro => libro.id === id);
    if(libroEnCarrito) {
        libroEnCarrito.cantidad++;
    }else {
        carrito.push(libro);
    }
    actualizarCarrito();
    localStorage.setItem("libro", JSON.stringify(carrito));
    
}



const contenedorCarrito= document.getElementById ("contenedorCarrito");
const verCarrito= document.getElementById ("verCarrito");

verCarrito.addEventListener ("click", actualizarCarrito);

// Tarjeta Individual Libros dentro del OffCanva
function actualizarCarrito (){
    
    let aux ="";
    carrito.forEach (libro => {
        aux += `
                            <div class= "card">
                            <img src="img/${libro.id}.png" class="card-img-top img-fluid py-3">
                            <div class="card-body">
                            <h3 class="card-title"> Titulo: ${libro.titulo} </h3>
                            <h3 class="card-title"> Autor: ${libro.autor} </h3>
                            <p class="card-text"> Precio: $ ${libro.precio}</p>
                            <p class="card-text"> Cantidad: ${libro.cantidad}</p>
                            <button onClick = "eliminarDelCarrito (${libro.id})" class="btn btn-success"> Eliminar del carrito </button>
                            </div>
                        </div>
        `
        
    })
    contenedorCarrito.innerHTML=aux;
    calcularTotalCompra ();
}

//Boton Elimiar del Carrito

const eliminarDelCarrito = (id) => {
    const libro = carrito.find (libro => libro.id === id);
    carrito.splice (carrito.indexOf(libro),1);
    actualizarCarrito ();
}

//Boton Vaciar del Carrito

const vaciarCarrito =document.getElementById ("vaciarCarrito");
vaciarCarrito.addEventListener ("click", () => {
    carrito.splice (0, carrito.length);
    actualizarCarrito();
})

const totalCompra =document.getElementById ("totalCompra");

const calcularTotalCompra = ()=>{
    let total=0;
    carrito.forEach (libro => {
        total += libro.precio * libro.cantidad
;    });

totalCompra.innerHTML = total;
}

