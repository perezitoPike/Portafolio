document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('hud-tooltip');
    const tooltipText = document.getElementById('tooltip-text');
    let activeElement = null;
    let hoverTimer = null;      // Para el delay al entrar en PC
    let autoCloseTimer = null;  // Para el auto-cierre en móvil

    const positionTooltip = (el) => {
        const rect = el.getBoundingClientRect();
        // Usamos fixed para que siga al elemento incluso en el scroll del modal
        const top = rect.top - tooltip.offsetHeight - 10;
        const left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    };

    const hideTooltip = () => {
        tooltip.classList.remove('active');
        activeElement = null;
        clearTimeout(hoverTimer);
        clearTimeout(autoCloseTimer); // Limpiamos el contador de auto-cierre
    };

    const showTooltip = (el) => {
        // Si ya hay un timer de auto-cierre corriendo, lo matamos para empezar de nuevo
        clearTimeout(autoCloseTimer);

        const info = el.getAttribute('data-info') || "DATOS_NO_ENCONTRADOS";
        tooltipText.textContent = info;
        tooltip.classList.add('active');
        
        // Un pequeño delay para el cálculo de posición después de que el texto cambie el tamaño
        setTimeout(() => positionTooltip(el), 10);
        
        activeElement = el;

        // --- LÓGICA DE AUTO-CIERRE PARA MÓVIL ---
        // Si detectamos que es una pantalla táctil/móvil (ancho menor a 850px)
        if (window.innerWidth <= 850) {
            autoCloseTimer = setTimeout(() => {
                hideTooltip();
            }, 4000); // Se cierra tras 4 segundos de inactividad
        }
    };

    // EVENTOS PC (Mouse)
    document.addEventListener('mouseover', (e) => {
        const el = e.target.closest('.edu-card, .cert-item');
        if (el && window.innerWidth > 850) {
            hoverTimer = setTimeout(() => showTooltip(el), 400);
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (window.innerWidth > 850) {
            const el = e.relatedTarget?.closest('.edu-card, .cert-item');
            if (!el) hideTooltip();
        }
    });

    // EVENTOS CLICK (Móvil y PC Toggle)
    document.addEventListener('click', (e) => {
        const el = e.target.closest('.edu-card, .cert-item');
        
        if (el) {
            // Si el usuario hace click en el mismo que ya está abierto, se cierra
            if (activeElement === el) {
                hideTooltip();
            } else {
                // Si hace click en uno nuevo, cerramos el anterior y abrimos el nuevo
                hideTooltip(); 
                showTooltip(el);
            }
        } else {
            // Si toca fuera de cualquier tarjeta, cerramos
            hideTooltip();
        }
    });

    // Ajustar posición si se cambia el tamaño de la ventana o se hace scroll
    window.addEventListener('resize', hideTooltip);
});