document.addEventListener('componentsLoaded', () => {
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
        if (!tooltip) return;
        tooltip.classList.remove('active');
        activeElement = null;
        clearTimeout(hoverTimer);
        clearTimeout(autoCloseTimer); // Limpiamos el contador de auto-cierre
    };

    const showTooltip = (el) => {
        clearTimeout(autoCloseTimer);

        const info = el.getAttribute('data-info') || "DATOS_NO_ENCONTRADOS";
        tooltipText.textContent = info;
        tooltip.classList.add('active');
        
        // Delay sutil para recalcular la posición según las dimensiones del nuevo texto
        setTimeout(() => positionTooltip(el), 10);
        
        activeElement = el;

        // --- LÓGICA DE AUTO-CIERRE PARA MÓVIL ---
        if (window.innerWidth <= 850) {
            autoCloseTimer = setTimeout(() => {
                hideTooltip();
            }, 4000); // Se cierra tras 4 segundos
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
            if (activeElement === el) {
                hideTooltip();
            } else {
                hideTooltip(); 
                showTooltip(el);
            }
        } else {
            // Si toca fuera de cualquier tarjeta, cerramos
            hideTooltip();
        }
    });

    // --- NUEVA LÓGICA DE DETECCIÓN DE SCROLL ---
    // Usamos capture: true para detectar el scroll en la ventana global 
    // y en cualquier contenedor interno con scroll (por ejemplo, dentro de un modal)
    window.addEventListener('scroll', () => {
        if (activeElement) {
            hideTooltip();
        }
    }, { capture: true, passive: true });

    // Ajustar o cerrar si se cambia el tamaño de la pantalla
    window.addEventListener('resize', hideTooltip);
});