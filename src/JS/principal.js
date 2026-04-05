document.addEventListener('DOMContentLoaded', () => {
    const aboutText = document.getElementById('about-text'); // Tu ID en el HTML
    const readMoreBtn = document.getElementById('read-more-btn');

    if (readMoreBtn && aboutText) {
        readMoreBtn.addEventListener('click', () => {
            aboutText.classList.toggle('is-expanded');
            
            if (aboutText.classList.contains('is-expanded')) {
                readMoreBtn.textContent = '[- MOSTRAR MENOS]';
            } else {
                readMoreBtn.textContent = '[+ SEGUIR LEYENDO]';
                // Opcional: vuelve arriba de la sección al cerrar
                //document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});