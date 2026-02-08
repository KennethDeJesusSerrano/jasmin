let indice = 0;
const slides = document.querySelectorAll(".slide");

function mostrarSlide(i) {
    slides.forEach(s => s.classList.remove("activo"));
    slides[i].classList.add("activo");
}

function siguiente() {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
}

function anterior() {
    indice = (indice - 1 + slides.length) % slides.length;
    mostrarSlide(indice);
}

// Cambio automático cada 4 segundos
setInterval(siguiente, 4000);


// ===== FONDO ANIMADO "TE AMO" =====
const canvas = document.getElementById("corazones");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let textos = [];

class TextoFlotante {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 20 + 20;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    dibujar() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ff4d6d";
        ctx.font = `${this.size}px Arial`;
        ctx.fillText("Te amo ❤️", this.x, this.y);
        ctx.globalAlpha = 1;
    }

    mover() {
        this.y -= this.speed;
        if (this.y < -50) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
        }
    }
}

function crearTextos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        textos.push(new TextoFlotante());
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    textos.forEach(t => {
        t.mover();
        t.dibujar();
    });
    requestAnimationFrame(animar);
}

crearTextos(35);
animar();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
