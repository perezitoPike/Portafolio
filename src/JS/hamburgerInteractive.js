document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const hudNav = document.getElementById('hud-nav');
    const navLinks = document.querySelectorAll('.hud-link');

    // Abrir/Cerrar menú
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        hudNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un link (para que no se quede abierto)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            hudNav.classList.remove('active');
        });
    });
});