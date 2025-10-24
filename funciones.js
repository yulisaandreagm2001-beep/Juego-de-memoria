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
agregarImagenes();
//funcion para agregar las imagenes en el tablero
function agregarImagenes(){
    //recorrer con un forEach las imagenes del array
    imgN1.forEach((imagen)=>{
        let div = d.createElement("div"); // crear el div
        div.classList.add = "col-3"; // agregar la clase col-3 al div
        let img = d.createElement("img"); // crear la clase img
        img.classList.add = "img-fluid altura-img"; // agregar la clase img-fluid a la imagen
        img.src = imagen.url; // agregar ubicacion
        div.appendChild(img); // agrrgar imagem al div
        tablero.appendChild(div);//agregamos los div al tablero


    });
}
