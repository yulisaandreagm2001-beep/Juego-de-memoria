//variables globales
const d = document;
let imgN1 = [
    {nombre: "Yoshi", url: "imagenes/Yoshi.jpg"},
    {nombre: "bowser", url: "imagenes/bowser.jpg"},
    {nombre: "luigi", url: "imagenes/luigi.jpg"},
    {nombre: "Mario", url: "imagenes/Mario.jpg"},
    {nombre: "peach", url: "imagenes/peach.jpg"},
    {nombre: "donkey", url: "imagenes/donkey.jpg"},
    {nombre: "Yoshi", url: "imagenes/Yoshi.jpg"},
    {nombre: "bowser", url: "imagenes/bowser.jpg"},
    {nombre: "luigi", url: "imagenes/luigi.jpg"},
    {nombre: "Mario", url: "imagenes/Mario.jpg"},
    {nombre: "peach", url: "imagenes/peach.jpg"},
    {nombre: "donkey", url: "imagenes/donkey.jpg"}
];

let tablero = d.querySelector(".tablero")
let imagenNombre = []; //guardar nombre de las imagenes
let imagenID = []; // guardar posiciones de las imagenes

agregarImagenes();
//funcion para agregar las imagenes en el tablero
function agregarImagenes(){
    //recorrer con un forEach las imagenes del array
    imgN1.forEach((imagen,i)=>{
        let div = d.createElement("div"); // crear el div
        div.classList.add = "col-3"; // agregar la clase col-3 al div
        let img = d.createElement("img"); // crear la clase img
        img.classList.add = "img-fluid altura-img"; // agregar la clase img-fluid a la imagen
        img.id = i; // enumeracion de las cartas
        img.src = "imagenes/ocultar.jpg"; // agregar ubicacion
        img.addEventListener("click",mostrarImg);
        div.appendChild(img); // agrrgar imagem al div
        tablero.appendChild(div);//agregamos los div al tablero

    });
}
// funcion para mostrar las imagenes
function mostrarImg(){
   let imgID = this.getAttribute("id");
//alert("# de imagen: "+imgID)
    this.src = imgN1[imgID].url;
   imagenNombre.push(imgN1[imgID].nombre);
   imagenID.push(imgID);
 
   if(imagenNombre.length == 2){
    setTimeout(compararImg,500);
 }
}

// funcion para comparar imagenes
function compararImg(){
    let imagenesTablero = d.querySelectorAll(".tablero > div img")
    if(imagenNombre[0] == imagenNombre[1]){
alert("Felicitaciones adivinaste una imagen");
imagenesTablero[imagenID[0]].src = "imagenes/felicitaciones.jpg"
imagenesTablero[imagenID[1]].src = "imagenes/felicitaciones.jpg"
    } else{
        alert("Fallaste las imagenes son diferentes")
     imagenesTablero[imagenID[0]].src = "imagenes/ocultar.jpg"
    imagenesTablero[imagenID[1]].src = "imagenes/ocultar.jpg"
    }
    imagenNombre = [];
    imagenID = [];

    }
