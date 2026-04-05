const objectsSkill = [
    {
        title:"Unity",
        alt:"Unity",
        src_image:"src/img/logos/frameworks/unity-icon.webp"
    }
]

/* Skill scrolling */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const slots = track.querySelectorAll('.skill-slot');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    const scrollAnimation = track.animate(
        [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-50%)' }
        ], {
        duration: 20000,
        interations: Infinity,
        easing: 'linear'
    }
    );

    // FUNCIÓN CLAVE: Detectar si es móvil para pausar
    const checkMobile = () => {
        if (window.innerWidth <= 850) {
            scrollAnimation.pause();
        } else {
            scrollAnimation.play();
        }
    };

    // Ejecutar al cargar y al cambiar tamaño de ventana
    checkMobile();
    window.addEventListener('resize', checkMobile);

    setInterval(() => {
        if (scrollAnimation.playbackRate < 0 && scrollAnimation.currentTime <= 0) {
            scrollAnimation.currentTime = scrollAnimation.effect.getComputedTiming().duration;
        }
    }, 10);

    const normalSpeed = 1;
    const fastSeed = 8;

    const speedUp = () => {
        // track.style.animationDuration = fastSeed;
        // track.style.animationDirection = 'normal';
        scrollAnimation.playbackRate = fastSeed;
        scrollAnimation.play();
    };

    const reverseSpeed = () => {
        // track.style.animationDuration = fastSeed;
        // track.style.animationDirection = 'reverse';
        scrollAnimation.playbackRate = -fastSeed;
        scrollAnimation.play();
    };

    const resetSpeed = () => {
        // track.style.animationDuration = normalSpeed;
        // track.style.animationDirection = 'normal';
        scrollAnimation.playbackRate = normalSpeed;
    }



    btnPrev.addEventListener('mouseup', resetSpeed);
    btnPrev.addEventListener('mouseleave', resetSpeed);
    btnPrev.addEventListener('touchend', resetSpeed);

    btnPrev.addEventListener('mousedown', speedUp);
    btnPrev.addEventListener('touchstart', (e) => {
        e.preventDefault();
        speedUp();
    });

    btnNext.addEventListener('mouseup', resetReverseWorkaround);
    btnNext.addEventListener('mouseleave', resetReverseWorkaround);
    btnNext.addEventListener('touchend', resetReverseWorkaround);

    btnNext.addEventListener('mousedown', reverseSpeed);
    btnNext.addEventListener('touchstart', (e) => {
        e.preventDefault();
        reverseSpeed();
    });

    function resetReverseWorkaround() {
        resetSpeed();
        if (scrollAnimation.currentTime <= 0) {
            scrollAnimation = scrollAnimation.effect.getComputedTiming().duration;
        }
    }

    // track.addEventListener('mouseenter', () => scrollAnimation.pause());
    // track.addEventListener('mouseleave', () => scrollAnimation.play());
    for (let index = 0; index < slots.length; index++) {
        const element = slots[index];
        element.addEventListener('mouseenter', () => scrollAnimation.pause());
        element.addEventListener('mouseleave', () => {
            if (scrollAnimation.playbackRate === normalSpeed) {
                scrollAnimation.play();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const track = document.getElementById('track');
    const btnShowMore = document.getElementById('btn-show-more');
    const btnShowLess = document.getElementById('btn-show-less');

    // Lógica del Inventario Desplegable (Solo afecta en móvil por el CSS)
    if (btnShowMore && btnShowLess) {
        // Al hacer clic en "+"
        btnShowMore.addEventListener('click', () => {
            track.classList.add('is-expanded');
        });

        // Al hacer clic en "-"
        btnShowLess.addEventListener('click', () => {
            track.classList.remove('is-expanded');
            
            // Opcional: Hace que la pantalla suba de vuelta al inicio de la sección Skills
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
        });
    }
});