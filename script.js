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


// ===== FONDO DE CORAZONES ANIMADOS =====
const canvas = document.getElementById("corazones");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let corazones = [];

class Corazon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    dibujar() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size, this.y - this.size,
                          this.x - this.size * 2, this.y + this.size / 3,
                          this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size * 2, this.y + this.size / 3,
                          this.x + this.size, this.y - this.size,
                          this.x, this.y);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    mover() {
        this.y -= this.speed;
        if (this.y < -20) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
    }
}

function crearCorazones(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        corazones.push(new Corazon());
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    corazones.forEach(c => {
        c.mover();
        c.dibujar();
    });
    requestAnimationFrame(animar);
}

crearCorazones(40);
animar();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
