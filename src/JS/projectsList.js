/* PARA LA SECCION DE PROYECTOS MOVIMIENTO AUTOMATICO */
// Datos de los proyectos (Esto facilita los cambios)
const projectsData = [
    {
        title: "Lectuticona",
        subtitle: "Software Educativo",
        desc: "Proyecto enfocado en la enseñanza de lenguas originarias con interfaces lúdicas.",
        img: "src/img/Projects/aprendiendoaduana-1.jpg",
        icon: "src/img/logos/frameworks/unity-icon.webp",
        tags: ["unity", "csharp"],
        tools: ["src/img/logos/frameworks/csharp-icon.webp", "src/img/logos/frameworks/unity-icon.webp"]
    },
    {
        title: "Futbol Bago",
        subtitle: "Minijuego de Física",
        desc: "Simulador de tiros penales utilizando físicas avanzadas en Unity.",
        img: "src/img/Projects/aprendiendoaduana-2.jpg",
        icon: "src/img/logos/frameworks/unity-icon.webp",
        tags: ["unity"],
        tools: ["src/img/logos/frameworks/unity-icon.webp"]
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

