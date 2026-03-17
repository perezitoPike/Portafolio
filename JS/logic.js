// let lastScrollTop = 0;
// const header = document.getElementById('main-header');

// window.addEventListener('scroll', function () {
//     let currentScroll = this.window.pageYOffset || this.document.documentElement.scrollTop;

//     if (currentScroll > lastScrollTop) {
//         header.classList.add('hidden');
//     } else {
//         header.classList.remove('hidden');
//     }

//     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
// }, false);

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


// =========================================
// SISTEMA DE POP-UP (MODAL DE CERTIFICADOS)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cert-modal');
    const btnOpen = document.getElementById('btn-certificados');
    const btnClose = document.getElementById('close-modal');
    const overlay = document.querySelector('.modal-overlay');

    // Función para abrir
    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            modal.classList.add('active');
            // Opcional: Evitar que el fondo siga haciendo scroll
            document.body.style.overflow = 'hidden'; 
        });
    }

    // Función para cerrar
    const closeModal = () => {
        modal.classList.remove('active');
        // Devolver el scroll al body
        document.body.style.overflow = 'auto';
    };

    if (btnClose) btnClose.addEventListener('click', closeModal);
    
    // Cerrar también si el usuario hace clic fuera de la caja gris (en el overlay)
    if (overlay) overlay.addEventListener('click', closeModal);

    // Cerrar con la tecla Escape (Buen detalle de UX/Accesibilidad)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantén tu código anterior de abrir/cerrar modal) ...

    const certItems = document.querySelectorAll('.cert-item');
    const zoomView = document.getElementById('cert-zoom-view');
    const zoomedImg = document.getElementById('zoomed-image');
    const certNameDisplay = document.getElementById('cert-name-display');
    const closeZoomBtn = document.querySelector('.close-zoom');

    certItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const certTitle = item.querySelector('p').innerText;

            // Cargamos los datos en el visualizador
            zoomedImg.src = imgSrc;
            certNameDisplay.innerText = certTitle.split('[')[0]; // Solo el nombre sin el año
            
            // Activamos la vista de zoom
            zoomView.classList.add('active');
        });
    });

    // Cerrar el zoom y volver a la galería
    if (closeZoomBtn) {
        closeZoomBtn.addEventListener('click', () => {
            zoomView.classList.remove('active');
        });
    }
});