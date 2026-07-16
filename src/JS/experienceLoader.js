import { objectExperiences } from './data/experienceData.js';
/* 
<article class="exp-card">
    <figure class="exp-visual">
        <img src="src/img/logos/work/todogames_logo.jpg" alt="Logo TodoGames">
        <div class="frame-decotarion"></div>
    </figure>
    <div class="exp-info">
        <header>
            <span class="timestamp">ENTRY_2022_2024</span>
            <h3>TODO GAMES</h3>
            <h4>UNITY DEVELOPER & GAME PROGRAMMER</h4>
        </header>
        <p class="exp-preview">Developing game mechanics and systems: coding player actions and allowed actions,
            as well as developing different systems such as authentication, quests, question bank.</p>
        <details class="exp-description">
            <summary>ACCESS_FILL_LOG</summary>
            <div class="details-content">
                <p>SDK implementation: configuring and integrating SDKs for use, such as PlayFab, Firebase,
                    Oculus, and Photon.</p>
                <p>Optimization and adaptation: Performance was improved in some applications, making better use
                    of memory to provide higher application quality, and also adapting some projects so that
                    they can be on different platforms and be responsive.</p>
            </div>
        </details>
    </div>
</article>
*/

document.addEventListener('componentsLoaded', () => {
    let experienceMenu = document.getElementById("experience-menu");
    if (!experienceMenu) return;

    const detailsContent = (specialPointsWorked) => {
        const paragraphsHTML = specialPointsWorked
            .map(element => `<p>${element}</p>`)
            .join('');
        return `<div class="details-content">${paragraphsHTML}</div>`;
    }

    // Función auxiliar para renderizar un slot
    const createExperienceElement = (experience) => {
        const article = document.createElement('article');
        article.className = `exp-card`;
        article.innerHTML = `
            <figure class="exp-visual">
                <img src=${experience.src} alt=${experience.alt}>
                <div class="frame-decotarion"></div>
            </figure>
            <div class="exp-info">
                <header>
                    <span class="timestamp">${experience.workduration}</span>
                    <h3>${experience.title}</h3>
                    <h4>${experience.workstation}</h4>
                </header>
                <p class="exp-preview">${experience.shortdescription}</p>
                <details class="exp-description">
                    <summary>ACCESS_FILL_LOG</summary>                    
                    ${detailsContent(experience.specialPointsWorked)}
                </details>
            </div>
        `;
        return article;
    }

    objectExperiences.forEach(experience => {
        const experienceElement = createExperienceElement(experience);
        experienceMenu.appendChild(experienceElement);
    });
    document.dispatchEvent(new Event("experienceLoaded"));
});