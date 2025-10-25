// =======================
// VARIABLES GLOBALES (tu código original, con 1 variable nueva: comparando)
// =======================
const d = document;
const tablero = d.querySelector(".tablero");
const btnIniciar = d.querySelector(".btn-iniciar");
const spanIntentos = d.querySelector(".intentos");
const spanAciertos = d.querySelector(".aciertos");
const spanTiempo = d.querySelector(".tiempo");
const spanNivel = d.querySelector(".nivel");

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

// Variables de control
let imagenNombre = [];
let imagenID = [];
let bloqueadas = [];
let intentos = 0;
let aciertos = 0;
let tiempo = 0;
let temporizador = null;
let nivel = 1;
let juegoActivo = false;

// Nueva variable para evitar clicks mientras comparamos
let comparando = false;

// =======================
// INICIAR JUEGO
// =======================
btnIniciar.addEventListener("click", () => {
  if (!juegoActivo) {
    iniciarJuego();
    btnIniciar.textContent = "Reiniciar";
  } else {
    reiniciarJuego();
  }
});

function iniciarJuego() {
  juegoActivo = true;
  intentos = 0;
  aciertos = 0;
  tiempo = 0;
  nivel = 1;
  actualizarHUD();
  agregarImagenes();

  // temporizador
  if (temporizador) clearInterval(temporizador);
  temporizador = setInterval(() => {
    tiempo++;
    spanTiempo.textContent = tiempo;
  }, 1000);
}

function reiniciarJuego() {
  clearInterval(temporizador);
  tablero.innerHTML = "";
  imagenNombre = [];
  imagenID = [];
  bloqueadas = [];
  intentos = 0;
  aciertos = 0;
  tiempo = 0;
  juegoActivo = false;
  comparando = false;
  actualizarHUD();
  iniciarJuego();
}

// =======================
// AGREGAR IMÁGENES
// =======================
function agregarImagenes() {
  tablero.innerHTML = "";

  // Mezclar las cartas aleatoriamente
  imgN1.sort(() => 0.5 - Math.random());

  imgN1.forEach((imagen, i) => {
    let div = d.createElement("div");
    div.classList.add("col-3");

    let img = d.createElement("img");
    // mantenemos tus clases originales
    img.classList.add("img-fluid", "altura-img", "carta");
    img.id = i;
    img.src = "imagenes/ocultar.jpg";
    img.addEventListener("click", mostrarImg);

    div.appendChild(img);
    tablero.appendChild(div);
  });
}

// =======================
// MOSTRAR IMAGEN
// =======================
function mostrarImg() {
  // si el juego no está iniciado, o estamos comparando, o esta carta ya está bloqueada, salir
  if (!juegoActivo || comparando || this.classList.contains("bloqueada")) return;

  const imgID = this.getAttribute("id");
  const carta = this;

  // evita seleccionar la misma carta dos veces en la misma ronda
  if (imagenID.includes(imgID)) return;

  // mostrar imagen real
  carta.src = imgN1[imgID].url;

  // aseguramos que la imagen visible use contain para casos especiales (felicitaciones)
  carta.style.objectFit = "cover";

  imagenNombre.push(imgN1[imgID].nombre);
  imagenID.push(imgID);

  if (imagenNombre.length === 2) {
    // incrementa intento y actualiza visor
    intentos++;
    actualizarHUD();

    // bloqueamos temporalmente la entrada hasta comparar
    comparando = true;

    // esperar un instante para que el usuario vea la segunda carta
    setTimeout(compararImg, 800);
  }
}

// =======================
// COMPARAR IMÁGENES
// =======================
function compararImg() {
  const imagenesTablero = d.querySelectorAll(".tablero img");
  const [id1, id2] = imagenID;

  // si coinciden
  if (imagenNombre[0] === imagenNombre[1]) {
    // mostrar felicitacion dentro de la carta (no tocar tu array de personajes)
    imagenesTablero[id1].src = "imagenes/felicitaciones.jpg";
    imagenesTablero[id2].src = "imagenes/felicitaciones.jpg";

    // evitar que se recorte: usamos contain y fondo blanco si hace falta
    imagenesTablero[id1].style.objectFit = "contain";
    imagenesTablero[id2].style.objectFit = "contain";
    imagenesTablero[id1].style.backgroundColor = "#ffffff";
    imagenesTablero[id2].style.backgroundColor = "#ffffff";

    // bloquear interacciones en esas cartas
    imagenesTablero[id1].classList.add("bloqueada");
    imagenesTablero[id2].classList.add("bloqueada");

    // registrar bloqueadas (guardamos como strings para consistencia con ids)
    bloqueadas.push(String(id1), String(id2));

    // actualizar aciertos
    aciertos++;
    actualizarHUD();
  } else {
    // si no coinciden: VOLTEAR de nuevo mostrando el reverso (ocultar.jpg)
    // se mantiene visible un corto tiempo antes de voltearlas (ya se hizo esperar 800ms)
    imagenesTablero[id1].src = "imagenes/ocultar.jpg";
    imagenesTablero[id2].src = "imagenes/ocultar.jpg";

    // asegurarse que vuelvan a usar object-fit cover y sin fondo blanco
    imagenesTablero[id1].style.objectFit = "cover";
    imagenesTablero[id2].style.objectFit = "cover";
    imagenesTablero[id1].style.backgroundColor = "transparent";
    imagenesTablero[id2].style.backgroundColor = "transparent";
  }

  // limpiar selección y permitir nuevos clics
  imagenNombre = [];
  imagenID = [];
  comparando = false;

  // Si completa todas las parejas
  if (aciertos === imgN1.length / 2) {
    clearInterval(temporizador);
    // mostramos alerta; si quieres, también podemos mostrar una imagen grande central aquí
    setTimeout(() => {
      alert(`🎉 ¡Ganaste en ${tiempo} segundos con ${intentos} intentos!`);
    }, 300);
  }
}

// =======================
// ACTUALIZAR DATOS EN BARRA
// =======================
function actualizarHUD() {
  spanIntentos.textContent = intentos;
  spanAciertos.textContent = aciertos;
  spanTiempo.textContent = tiempo;
  spanNivel.textContent = nivel;
}

