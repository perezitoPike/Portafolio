// Archivo: src/JS/skillAutoScroll.js
import { objectsSkill } from './data/skillsData.js';

/* 1. Inyección de Skills duplicadas para efecto infinito sin saltos */
document.addEventListener('componentsLoaded', () => {
    let menuSkills = document.getElementById("track");
    if (!menuSkills) return;

    // Guardamos los botones de móvil que ya existen en el HTML para mantener su posición
    const btnShowMore = document.getElementById('btn-show-more');
    const btnShowLess = document.getElementById('btn-show-less');

    // Función auxiliar para renderizar un slot
    const createSkillElement = (skill) => {
        const li = document.createElement('li');
        li.className = `skill-slot`;
        li.innerHTML = `
            <div class="slot-frame"><img src="${skill.src_image}" alt="${skill.alt}" class="skill-icon"></div>
            <span class="slot-label">${skill.title}</span>
        `;
        return li;
    };

    // PRIMERA TANDA: Inyectamos todos los skills originales antes de los botones
    objectsSkill.forEach(skill => {
        const li = createSkillElement(skill);
        menuSkills.insertBefore(li, btnShowMore);
    });

    // SEGUNDA TANDA (Duplicados): Inyectamos una copia idéntica de los skills
    // Esto es vital en PC para que al llegar a -50% el primer elemento repetido tape el hueco de forma infinita
    objectsSkill.forEach(skill => {
        const li = createSkillElement(skill);
        // Le añadimos una clase para poder ocultar estos clones fácilmente en modo móvil si fuese necesario
        li.classList.add('pc-clone'); 
        menuSkills.insertBefore(li, btnShowMore);
    });

    document.dispatchEvent(new Event("SkillsLoaded"));
});

/* 2. Control de Animación Infinitamente Fluida */
document.addEventListener('SkillsLoaded', () => {
    const track = document.getElementById('track');
    const slots = track.querySelectorAll('.skill-slot:not(.mobile-toggle-btn)'); // Excluimos botones + y -
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (!track || !btnPrev || !btnNext) return;

    // Configuración de la animación nativa de traslado infinito
    let scrollAnimation = track.animate(
        [
            { transform: 'translateX(-50%)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 25000, 
            iterations: Infinity, 
            easing: 'linear'
        }
    );

    const normalSpeed = 1;
    const fastSpeed = 7;

    const duration = scrollAnimation.effect.getComputedTiming().duration;
    
    // Ajuste del bucle para el nuevo sentido de la marcha
    function updateLoop() {
        if (window.innerWidth > 850) {
            const currentTime = scrollAnimation.currentTime;

            // Al ir de izquierda a derecha (normalSpeed > 0), al tocar el final (0), 
            // salta instantáneamente al inicio del tiempo para continuar el ciclo
            if (scrollAnimation.playbackRate > 0 && currentTime >= duration) {
                scrollAnimation.currentTime = 0;
            } 
            // Si el usuario usa el botón de rebobinar (playbackRate < 0) y llega a 0,
            // lo mandamos al final de la línea temporal de manera limpia
            else if (scrollAnimation.playbackRate < 0 && currentTime <= 0) {
                scrollAnimation.currentTime = duration;
            }
        }
        requestAnimationFrame(updateLoop);
    }
    requestAnimationFrame(updateLoop);

    // FUNCIÓN CLAVE: Pausa en móvil, corre en Web
    const checkMobile = () => {
        if (window.innerWidth <= 850) {
            scrollAnimation.pause();
        } else {
            scrollAnimation.play();
        }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const speedUp = () => {
        scrollAnimation.playbackRate = fastSpeed;
        scrollAnimation.play();
    };

    const reverseSpeed = () => {
        scrollAnimation.playbackRate = -fastSpeed;
        scrollAnimation.play();
    };

    const resetSpeed = () => {
        scrollAnimation.playbackRate = normalSpeed;
        if (window.innerWidth > 850) {
            scrollAnimation.play();
        }
    };

    // Asignación de Eventos Limpios a los Botones de navegación HUD
    btnPrev.addEventListener('mousedown', speedUp);
    btnPrev.addEventListener('mouseup', resetSpeed);
    btnPrev.addEventListener('mouseleave', resetSpeed);
    btnPrev.addEventListener('touchstart', (e) => { e.preventDefault(); speedUp(); });
    btnPrev.addEventListener('touchend', resetSpeed);

    btnNext.addEventListener('mousedown', reverseSpeed);
    btnNext.addEventListener('mouseup', resetSpeed);
    btnNext.addEventListener('mouseleave', resetSpeed);
    btnNext.addEventListener('touchstart', (e) => { e.preventDefault(); reverseSpeed(); });
    btnNext.addEventListener('touchend', resetSpeed);

    // Pausa del escáner / carrusel al hacer Hover sobre cualquier Skill individual
    slots.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (window.innerWidth > 850) scrollAnimation.pause();
        });
        element.addEventListener('mouseleave', () => {
            if (window.innerWidth > 850 && scrollAnimation.playbackRate === normalSpeed) {
                scrollAnimation.play();
            }
        });
    });
});

/* 3. Lógica del Inventario Desplegable en Móviles */
document.addEventListener('SkillsLoaded', () => {
    const track = document.getElementById('track');
    const btnShowMore = document.getElementById('btn-show-more');
    const btnShowLess = document.getElementById('btn-show-less');

    if (btnShowMore && btnShowLess) {
        btnShowMore.addEventListener('click', () => {
            track.classList.add('is-expanded');
        });

        btnShowLess.addEventListener('click', () => {
            track.classList.remove('is-expanded');
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
        });
    }
});