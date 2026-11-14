/* ===================================
   PANTALLA 1 - PARTÍCULAS
=================================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];

    const total = Math.min(
        120,
        Math.floor(window.innerWidth / 10)
    );

    for (let i = 0; i < total; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8 + .3,
            speed: Math.random() * .35 + .1,
            opacity: Math.random() * .7 + .2
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {

        particle.y -= particle.speed;

        if (particle.y < 0) {
            particle.y = canvas.height;
            particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(233, 202, 131, ${particle.opacity})`;
        ctx.fill();

    });

    requestAnimationFrame(animate);
}

resizeCanvas();
createParticles();
animate();

window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
});


/* ===================================
   TRANSICIÓN PANTALLA 1 -> 2
=================================== */

const startButton = document.getElementById("startButton");
const intro = document.getElementById("intro");
const memoryScreen = document.getElementById("memoryScreen");

startButton.addEventListener("click", () => {

    startButton.disabled = true;

    startButton.innerHTML = `
        <span class="button-icon">✧</span>
        <span>OPENING OUR MEMORIES...</span>
    `;

    intro.classList.add("leaving");

    setTimeout(() => {
        memoryScreen.classList.add("active");
    }, 550);

    setTimeout(() => {
        intro.style.display = "none";
    }, 1500);

});


/* ===================================
   MENSAJES DE LAS FOTOGRAFÍAS
=================================== */

const memories = [

    {
        love: "Mi lugar favorito",
        language: "ESPAÑOL",
        description: "Contigo, cualquier lugar se convierte en mi favorito."
    },

    {
        love: "My favorite person",
        language: "ENGLISH",
        description: "Some people make ordinary days extraordinary."
    },

    {
        love: "Mon bonheur",
        language: "FRANÇAIS",
        description: "Tu es une partie magnifique de mon histoire."
    },

    {
        love: "Für immer",
        language: "DEUTSCH",
        description: "Manche Momente bleiben für immer im Herzen."
    },

    {
        love: "Il mio amore",
        language: "ITALIANO",
        description: "Con te ogni momento diventa speciale."
    },

    {
        love: "大切な人",
        language: "JAPANESE",
        description: "あなたとの思い出は私の宝物です。"
    },

    {
        love: "소중한 사람",
        language: "KOREAN",
        description: "너와 함께하는 모든 순간이 소중해."
    },

    {
        love: "Meu amor",
        language: "PORTUGUÊS",
        description: "Cada momento contigo é uma lembrança preciosa."
    },

    {
        love: "Моя любовь",
        language: "РУССКИЙ",
        description: "Каждый момент с тобой особенный."
    },

    {
        love: "أجمل صدفة",
        language: "العربية",
        description: "كل لحظة معك هي ذكرى جميلة."
    }

];


/* ===================================
   VISOR DE FOTOGRAFÍAS
=================================== */

const photoFrames = document.querySelectorAll(".photo-frame");

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalLove = document.getElementById("modalLove");
const modalLanguage = document.getElementById("modalLanguage");
const modalDescription = document.getElementById("modalDescription");

const closeModal = document.getElementById("closeModal");

const openedPhotos = new Set();

const continueMemory = document.getElementById("continueMemory");
const continueButton = document.getElementById("continueButton");

const totalPhotos = 10;


/* ABRIR FOTOGRAFÍAS */

photoFrames.forEach(frame => {

    frame.addEventListener("click", () => {

        const index = Number(frame.dataset.photo);

        const memory = memories[index];

        const image = frame.querySelector("img");

        if (!memory || !image) return;

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        modalLove.textContent = memory.love;
        modalLanguage.textContent = memory.language;
        modalDescription.textContent = memory.description;

        photoModal.classList.add("open");

        document.body.style.overflow = "hidden";

        openedPhotos.add(index);

        if (openedPhotos.size === totalPhotos) {

            setTimeout(() => {
                continueMemory.classList.add("visible");
            }, 500);

        }

    });

});


/* CERRAR VISOR */

function closePhoto() {

    photoModal.classList.remove("open");

    document.body.style.overflow = "";

    setTimeout(() => {

        if (!photoModal.classList.contains("open")) {
            modalImage.src = "";
        }

    }, 500);

}

closeModal.addEventListener("click", closePhoto);

photoModal.addEventListener("click", event => {

    if (event.target === photoModal) {
        closePhoto();
    }

});

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        photoModal.classList.contains("open")
    ) {
        closePhoto();
    }

});


/* ===================================
   TRANSICIÓN PANTALLA 2 -> 3
=================================== */

const constellationScreen = document.getElementById("constellationScreen");

continueButton.addEventListener("click", () => {

    if (openedPhotos.size !== totalPhotos) return;

    continueButton.disabled = true;

    continueButton.innerHTML = `
        PREPARING OUR NEXT CHAPTER...
        <span>✦</span>
    `;

    memoryScreen.classList.add("leaving-memory");

    continueMemory.classList.remove("visible");

    setTimeout(() => {

        memoryScreen.style.display = "none";

        constellationScreen.classList.add("active");

    }, 1200);

});


/* ===================================
   PANTALLA 3 - CONSTELACIÓN Y RECUERDOS
=================================== */

const constellationStars = document.querySelectorAll(".constellation-star");
const constellationMessage = document.getElementById("constellationMessage");
const constellationUniverse = document.querySelector(".constellation-universe");
const constellationContinue = document.getElementById("constellationContinue");

const constellationModal = document.getElementById("constellationModal");
const constellationMediaImage = document.getElementById("constellationMediaImage");
const constellationMediaVideo = document.getElementById("constellationMediaVideo");
const closeConstellationModal = document.getElementById("closeConstellationModal");

const letterScreen = document.getElementById("letterScreen");
const typedLetter = document.getElementById("typedLetter");
const letterCursor = document.getElementById("letterCursor");
const letterSignature = document.getElementById("letterSignature");


/*
   ORDEN DE LOS RECUERDOS:

   ESTRELLA 1 -> Img/foto11.jpg
   ESTRELLA 2 -> Img/foto12.jpg
   ESTRELLA 3 -> Img/video1.mp4
   ESTRELLA 4 -> Img/foto13.jpg
   ESTRELLA 5 -> Img/video2.mp4
*/

const constellationMemories = [

    {
        type: "image",
        src: "Img/foto11.jpg",
        alt: "Nuestro recuerdo especial"
    },

    {
        type: "image",
        src: "Img/foto12.jpg",
        alt: "Otro recuerdo nuestro"
    },

    {
        type: "video",
        src: "Img/video1.mp4",
        alt: "Nuestro primer video"
    },

    {
        type: "image",
        src: "Img/foto13.jpg",
        alt: "Un recuerdo más de nosotros"
    },

    {
        type: "video",
        src: "Img/video2.mp4",
        alt: "Nuestro segundo video"
    }

];

const discoveredStars = new Set();

let zoomTimer = null;


/* ABRIR FOTO O VIDEO DE UNA ESTRELLA */

function openConstellationMemory(index) {

    const memory = constellationMemories[index];

    if (!memory) return;

    // Limpiar el contenido anterior del visor.
    constellationMediaVideo.pause();
    constellationMediaVideo.removeAttribute("src");
    constellationMediaVideo.load();

    constellationMediaImage.removeAttribute("src");

    constellationMediaImage.hidden = true;
    constellationMediaVideo.hidden = true;


    // Si el recuerdo es un video.
    if (memory.type === "video") {

        constellationMediaVideo.src = memory.src;
        constellationMediaVideo.hidden = false;
        constellationMediaVideo.load();

    }

    // Si el recuerdo es una fotografía.
    else {

        constellationMediaImage.src = memory.src;
        constellationMediaImage.alt = memory.alt;
        constellationMediaImage.hidden = false;

    }


    // Mostrar el visor.
    constellationModal.classList.add("open");

    document.body.style.overflow = "hidden";


    // Registrar la estrella descubierta.
    discoveredStars.add(index);


    // Mostrar el botón después de abrir las cinco estrellas.
    if (discoveredStars.size === constellationMemories.length) {

        setTimeout(() => {
            constellationContinue.classList.add("visible");
        }, 450);

    }

}


/* CERRAR VISOR DE LA CONSTELACIÓN */

function closeConstellationMemory() {

    constellationModal.classList.remove("open");

    constellationMediaVideo.pause();

    document.body.style.overflow = "";

    setTimeout(() => {

        if (!constellationModal.classList.contains("open")) {

            constellationMediaVideo.removeAttribute("src");
            constellationMediaVideo.load();

            constellationMediaImage.removeAttribute("src");

            constellationMediaImage.hidden = true;
            constellationMediaVideo.hidden = true;

        }

    }, 450);

}


/* INTERACCIÓN CON LAS CINCO ESTRELLAS */

constellationStars.forEach((star, index) => {

    star.addEventListener("click", () => {

        const message = star.dataset.message;

        const universeRect = constellationUniverse.getBoundingClientRect();
        const starRect = star.getBoundingClientRect();

        const centerX =
            starRect.left + starRect.width / 2 - universeRect.left;

        const centerY =
            starRect.top + starRect.height / 2 - universeRect.top;


        // Zoom cinematográfico hacia la estrella seleccionada.
        constellationUniverse.style.transformOrigin =
            `${centerX}px ${centerY}px`;

        constellationUniverse.classList.remove("zooming");

        requestAnimationFrame(() => {
            constellationUniverse.classList.add("zooming");
        });


        if (zoomTimer) {
            clearTimeout(zoomTimer);
        }

        zoomTimer = setTimeout(() => {

            constellationUniverse.classList.remove("zooming");

            constellationUniverse.style.transformOrigin = "center center";

        }, 950);


        // Cambiar el mensaje de la constelación.
        constellationMessage.style.opacity = "0";

        setTimeout(() => {

            constellationMessage.textContent = message;

            constellationMessage.style.opacity = "1";

        }, 250);


        // Marcar estrella como descubierta.
        star.classList.add("discovered");


        // Abrir el recuerdo correspondiente.
        openConstellationMemory(index);

    });

});


/* EVENTOS PARA CERRAR EL VISOR */

closeConstellationModal.addEventListener(
    "click",
    closeConstellationMemory
);

constellationModal.addEventListener("click", event => {

    if (event.target === constellationModal) {
        closeConstellationMemory();
    }

});

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        constellationModal.classList.contains("open")
    ) {
        closeConstellationMemory();
    }

});


/* ===================================
   TRANSICIÓN PANTALLA 3 -> 4
=================================== */

constellationContinue.addEventListener("click", () => {

    if (discoveredStars.size !== constellationMemories.length) {
        return;
    }

    const button = constellationContinue.querySelector("button");

    button.disabled = true;

    constellationContinue.classList.remove("visible");

    constellationScreen.classList.add("leaving-constellation");


    setTimeout(() => {

        constellationScreen.style.display = "none";

        letterScreen.classList.add("active");

        startLetterTyping();

    }, 1000);

});


/* ===================================
   PANTALLA 4 - CARTA CON TEXTO AUTOMÁTICO
=================================== */

const letterText = `Mi Naty:

Nueve meses. Y aunque pueda parecer solo una cantidad de tiempo, para mí significa muchísimo más. Son conversaciones, risas, ocurrencias, momentos bonitos y recuerdos que poco a poco se han convertido en una parte muy especial de mi vida.

Quiero que sepas que valoro cada detalle de ti: tu forma de ser, tus dibujos, tu humor y esa manera tan tuya de hacer que incluso un día normal se sienta diferente. No necesito que todo sea perfecto; me basta con que sigamos construyendo nuestra historia a nuestra manera.

Gracias por estos nueve meses, por cada momento compartido y por permitirme ser parte de tu vida. Todavía nos quedan muchísimas cosas por vivir, lugares por conocer y recuerdos por crear.

Feliz noveno mes, mi niña. Te quiero muchísimo.

Con todo mi cariño,`;


let typingTimer = null;


/* EFECTO DE ESCRITURA */

function startLetterTyping() {

    if (typingTimer) {
        clearTimeout(typingTimer);
    }

    let position = 0;

    typedLetter.textContent = "";

    letterSignature.classList.remove("visible");

    letterCursor.style.display = "inline-block";


    function typeNextCharacter() {

        if (position < letterText.length) {

            const character = letterText.charAt(position);

            typedLetter.textContent += character;

            position++;


            let delay = 34;


            // Pausas para dar naturalidad a la escritura.
            if ([".", ",", ";", ":", "!", "?"].includes(character)) {
                delay = 280;
            }

            if (character === "\n") {
                delay = 220;
            }


            typingTimer = setTimeout(typeNextCharacter, delay);

        }

        else {

            // Al terminar aparece la firma.
            letterCursor.style.display = "none";

            letterSignature.classList.add("visible");

        }

    }


    typeNextCharacter();

}
