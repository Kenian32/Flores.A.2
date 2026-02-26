const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let flores = [];

// Ajustar el tamaño del canvas
function ajustarPantalla() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarPantalla);
ajustarPantalla();

class Flor {
    constructor(x, y) {
        this.x = x;
        this.yFinal = y;
        this.yActual = window.innerHeight; // Empieza desde abajo
        this.radioFlor = 0;
        this.maxRadio = Math.random() * 25 + 15;
        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        this.creciendoTallo = true;
        this.velocidadTallo = 6;
    }

    dibujar() {
        // Dibujar el tallo (línea verde)
        ctx.beginPath();
        ctx.moveTo(this.x, window.innerHeight);
        ctx.lineTo(this.x, this.yActual);
        ctx.strokeStyle = "#2e7d32";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Dibujar la flor solo si el tallo terminó
        if (!this.creciendoTallo) {
            this.dibujarPetalos();
        }
    }

    dibujarPetalos() {
        ctx.fillStyle = this.color;
        for (let i = 0; i < 6; i++) {
            const angulo = (Math.PI * 2 / 6) * i;
            const px = this.x + Math.cos(angulo) * this.radioFlor;
            const py = this.yFinal + Math.sin(angulo) * this.radioFlor;
            
            ctx.beginPath();
            ctx.arc(px, py, this.radioFlor / 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        // Centro amarillo
        ctx.beginPath();
        ctx.arc(this.x, this.yFinal, this.radioFlor / 3, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
    }

    actualizar() {
        if (this.creciendoTallo) {
            if (this.yActual > this.yFinal) {
                this.yActual -= this.velocidadTallo;
            } else {
                this.creciendoTallo = false;
            }
        } else {
            if (this.radioFlor < this.maxRadio) {
                this.radioFlor += 0.5;
            }
        }
    }
}

// Detectar el clic
window.addEventListener('mousedown', (e) => {
    flores.push(new Flor(e.clientX, e.clientY));
});

function animar() {
    // Limpiamos la pantalla con un color negro sólido
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    flores.forEach(flor => {
        flor.actualizar();
        flor.dibujar();
    });

    requestAnimationFrame(animar);
}

animar();