// Variables globales
const d = document;
let imgN1 = [
  { nombre: "Yoshi", url: "imagenes/Yoshi.jpg" },
  { nombre: "bowser", url: "imagenes/bowser.jpg" },
  { nombre: "luigi", url: "imagenes/luigi.jpg" },
  { nombre: "Mario", url: "imagenes/Mario.jpg" },
  { nombre: "peach", url: "imagenes/peach.jpg" },
  { nombre: "donkey", url: "imagenes/donkey.jpg" },
  { nombre: "Yoshi", url: "imagenes/Yoshi.jpg" },
  { nombre: "bowser", url: "imagenes/bowser.jpg" },
  { nombre: "luigi", url: "imagenes/luigi.jpg" },
  { nombre: "Mario", url: "imagenes/Mario.jpg" },
  { nombre: "peach", url: "imagenes/peach.jpg" },
  { nombre: "donkey", url: "imagenes/donkey.jpg" }
];

let tablero = d.querySelector(".tablero");
let imagenNombre = [];
let imagenID = [];
let cartasBloqueadas = []; // guardar las que ya se acertaron
let bloqueoTemporal = false; // para evitar hacer clic mientras compara

// --- Mezclar las cartas al inicio ---
imgN1.sort(() => 0.5 - Math.random());

// --- Crear tablero ---
function agregarImagenes() {
  tablero.innerHTML = "";
  imgN1.forEach((imagen, i) => {
    let div = d.createElement("div");
    div.classList.add("carta");

    let img = d.createElement("img");
    img.classList.add("img-fluid", "altura-img");
    img.id = i;
    img.src = "imagenes/ocultar.jpg";
    img.addEventListener("click", mostrarImg);

    div.appendChild(img);
    tablero.appendChild(div);
  });
}

agregarImagenes();

// --- Mostrar imagen al hacer clic ---
function mostrarImg() {
  if (bloqueoTemporal) return; // evita clics durante comparación
  let imgID = this.getAttribute("id");

  // si la carta ya fue acertada, ignorar clic
  if (cartasBloqueadas.includes(imgID)) return;

  this.src = imgN1[imgID].url;
  imagenNombre.push(imgN1[imgID].nombre);
  imagenID.push(imgID);

  // cuando hay dos seleccionadas, comparar
  if (imagenNombre.length === 2) {
    bloqueoTemporal = true;
    setTimeout(compararImg, 800);
  }
}

// --- Comparar las dos imágenes ---
function compararImg() {
  let imagenesTablero = d.querySelectorAll(".tablero img");

  const [id1, id2] = imagenID;
  const [nombre1, nombre2] = imagenNombre;

  if (nombre1 === nombre2) {
    // ✅ Acierto
    imagenesTablero[id1].src = "imagenes/felicitaciones.jpg";
    imagenesTablero[id2].src = "imagenes/felicitaciones.jpg";
    cartasBloqueadas.push(id1, id2); // bloquearlas
  } else {
    // ❌ No coinciden → ocultarlas otra vez
    imagenesTablero[id1].src = "imagenes/ocultar.jpg";
    imagenesTablero[id2].src = "imagenes/ocultar.jpg";
  }

  // limpiar variables para próxima jugada
  imagenNombre = [];
  imagenID = [];
  bloqueoTemporal = false;

  // ✅ Verificar si ganó
  if (cartasBloqueadas.length === imgN1.length) {
    mostrarFelicitacionFinal();
  }
}

// --- Mostrar imagen de felicitación al ganar ---
function mostrarFelicitacionFinal() {
  const felicitacion = d.createElement("img");
  felicitacion.src = "imagenes/felicitaciones.jpg";
  felicitacion.style.position = "fixed";
  felicitacion.style.top = "50%";
  felicitacion.style.left = "50%";
  felicitacion.style.transform = "translate(-50%, -50%)";
  felicitacion.style.width = "350px";
  felicitacion.style.borderRadius = "10px";
  felicitacion.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  felicitacion.style.zIndex = "999";
  document.body.appendChild(felicitacion);

  setTimeout(() => felicitacion.remove(), 2000);
}
