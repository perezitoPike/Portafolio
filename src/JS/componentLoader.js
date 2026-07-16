document.addEventListener("DOMContentLoaded", async () => {
    const components = document.querySelectorAll("[data-component]");
    
    const loadComponent = async (element) => {
        const path = element.getAttribute("data-component");
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Error al cargar: ${path}`);
            const html = await response.text();
            
            // Reemplaza el contenedor por el contenido real
            element.outerHTML = html;
        } catch (error) {
            console.error("Component Loader Error:", error);
            element.innerHTML = `<p style="color:red;">// ERROR_LOADING_COMPONENT: ${path}</p>`;
        }
    };

    // Cargamos todos los componentes en paralelo
    await Promise.all(Array.from(components).map(loadComponent));
    
    // Disparamos un evento personalizado por si tus otros scripts necesitan saber cuándo el DOM está completo
    document.dispatchEvent(new Event("componentsLoaded"));
});