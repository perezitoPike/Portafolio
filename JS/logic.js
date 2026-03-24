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

/* PARA LA SECCION DE PROYECTOS MOVIMIENTO AUTOMATICO */
// Datos de los proyectos (Esto facilita los cambios)
const projectsData = [
    {
        title: "Lectuticona",
        subtitle: "Software Educativo",
        desc: "Proyecto enfocado en la enseñanza de lenguas originarias con interfaces lúdicas.",
        img: "img/Projects/aprendiendoaduana-1.jpg",
        icon: "img/logos/frameworks/unity-icon.webp",
        tags: ["unity", "csharp"],
        tools: ["img/logos/frameworks/csharp-icon.webp", "img/logos/frameworks/unity-icon.webp"]
    },
    {
        title: "Futbol Bago",
        subtitle: "Minijuego de Física",
        desc: "Simulador de tiros penales utilizando físicas avanzadas en Unity.",
        img: "img/Projects/aprendiendoaduana-2.jpg",
        icon: "img/logos/frameworks/unity-icon.webp",
        tags: ["unity"],
        tools: ["img/logos/frameworks/unity-icon.webp"]
    }
];

let currentFilteredProjects = [...projectsData];
let currentProjectIndex = 0;

// 1. FUNCIÓN PARA RENDERIZAR LA LISTA IZQUIERDA
function renderProjectList(filter = 'all') {
    const menu = document.getElementById('project-menu');
    menu.innerHTML = ""; // Limpiar lista

    currentFilteredProjects = projectsData.filter(p => filter === 'all' || p.tags.includes(filter));

    currentFilteredProjects.forEach((project, index) => {
        const li = document.createElement('li');
        li.className = `project-nav-item ${index === 0 ? 'active' : ''}`;
        li.innerHTML = `
            <div class="nav-icon"><img src="${project.icon}"></div>
            <div class="nav-text">
                <strong>${project.title}</strong>
                <span>${project.subtitle}</span>
            </div>
            <div class="nav-arrow">▶</div>
        `;
        li.onclick = () => {
            stopAutoPlay();
            updateViewer(index);
        };
        menu.appendChild(li);
    });

    if (currentFilteredProjects.length > 0) updateViewer(0);
}

// 2. FUNCIÓN PARA ACTUALIZAR EL VISOR
function updateViewer(index) {
    if (currentFilteredProjects.length === 0) return;
    
    const project = currentFilteredProjects[index];
    currentProjectIndex = index;

    // Animación de salida (opcional)
    const display = document.getElementById('project-display');
    display.style.opacity = 0;

    setTimeout(() => {
        document.getElementById('view-title').innerText = project.title;
        document.getElementById('view-desc').innerText = project.desc;
        document.getElementById('view-img').src = project.img;
        
        const toolsContainer = document.getElementById('view-tools');
        toolsContainer.innerHTML = project.tools.map(t => `<img src="${t}">`).join('');

        // Activar item en la lista
        document.querySelectorAll('.project-nav-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        display.style.opacity = 1;
    }, 200);
}

// 3. LÓGICA DE FILTROS
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Estilo de botones
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Filtrar
        renderProjectList(e.target.dataset.filter);
    });
});

// 4. NAVEGACIÓN MANUAL (BOTONES FLOTANTES)
document.querySelector('.nav-btn-float.next').onclick = () => {
    let next = (currentProjectIndex + 1) % currentFilteredProjects.length;
    updateViewer(next);
};

document.querySelector('.nav-btn-float.prev').onclick = () => {
    let prev = (currentProjectIndex - 1 + currentFilteredProjects.length) % currentFilteredProjects.length;
    updateViewer(prev);
};

// Iniciar sistema
document.addEventListener('DOMContentLoaded', () => {
    renderProjectList();
    // Aquí puedes llamar a tu startAutoPlay() si deseas que inicie solo
});

/* LOGICA CONTACTO */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    // Configuración de WhatsApp
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    btnWhatsapp.onclick = () => {
        const name = document.getElementById('name').value;
        const msg = document.getElementById('message').value;
        const phone = "591XXXXXX"; // ¡Wilder, pon aquí tu número con código de país!
        
        const url = `https://wa.me/${phone}?text=Hola Wilder, soy ${name}. ${msg}`;
        window.open(url, '_blank');
    };

    // Configuración de Correo (Vía mailto para empezar)
    contactForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const msg = document.getElementById('message').value;
        
        const mailtoLink = `mailto:tu-correo@gmail.com?subject=Contacto Portafolio: ${name}&body=De: ${email}%0D%0A%0D%0A${msg}`;
        window.location.href = mailtoLink;
    };
});