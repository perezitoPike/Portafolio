document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cert-modal');
    const btnOpen = document.getElementById('btn-certificados');
    const btnClose = document.getElementById('close-modal');
    const overlay = document.querySelector('.modal-overlay');

    // Función para abrir
    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            // modal.classList.add('active');
            // // Opcional: Evitar que el fondo siga haciendo scroll
            // document.body.style.overflow = 'hidden'; 
            modal.style.display = 'flex'; // Primero lo mostramos
        setTimeout(() => {
            modal.classList.add('active'); // Luego disparamos la animación
        }, 10); 
        document.body.style.overflow = 'hidden';
        });
    }

    // Función para cerrar
    const closeModal = () => {
        // modal.classList.remove('active');
        // // Devolver el scroll al body
        // document.body.style.overflow = 'auto';
        modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none'; // Lo ocultamos totalmente tras la animación
    }, 300); // 300ms coincide con tu transition: 0.3s
    document.body.style.overflow = '';
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

// document.addEventListener('DOMContentLoaded', () => {
//     // ... (Mantén tu código anterior de abrir/cerrar modal) ...

//     const certItems = document.querySelectorAll('.cert-item');
//     const zoomView = document.getElementById('cert-zoom-view');
//     const zoomedImg = document.getElementById('zoomed-image');
//     const certNameDisplay = document.getElementById('cert-name-display');
//     const closeZoomBtn = document.querySelector('.close-zoom');

//     certItems.forEach(item => {
//         item.addEventListener('click', () => {
//             const imgSrc = item.querySelector('img').src;
//             const certTitle = item.querySelector('p').innerText;

//             // Cargamos los datos en el visualizador
//             zoomedImg.src = imgSrc;
//             certNameDisplay.innerText = certTitle.split('[')[0]; // Solo el nombre sin el año
            
//             // Activamos la vista de zoom
//             zoomView.classList.add('active');
//         });
//     });

//     // Cerrar el zoom y volver a la galería
//     if (closeZoomBtn) {
//         closeZoomBtn.addEventListener('click', () => {
//             zoomView.classList.remove('active');
//         });
//     }
// });
