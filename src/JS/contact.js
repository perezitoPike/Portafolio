// /* LOGICA CONTACTO */
// document.addEventListener('DOMContentLoaded', () => {
//     const contactForm = document.getElementById('contact-form');

//     // Configuración de WhatsApp
//     const btnWhatsapp = document.getElementById('btn-whatsapp');
//     btnWhatsapp.onclick = () => {
//         const name = document.getElementById('name').value;
//         const msg = document.getElementById('message').value;
//         const phone = "591XXXXXX"; // ¡Wilder, pon aquí tu número con código de país!

//         const url = `https://wa.me/${phone}?text=Hola Wilder, soy ${name}. ${msg}`;
//         window.open(url, '_blank');
//     };

//     // Configuración de Correo (Vía mailto para empezar)
//     contactForm.onsubmit = (e) => {
//         e.preventDefault();
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const msg = document.getElementById('message').value;

//         const mailtoLink = `mailto:tu-correo@gmail.com?subject=Contacto Portafolio: ${name}&body=De: ${email}%0D%0A%0D%0A${msg}`;
//         window.location.href = mailtoLink;
//     };
// });

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const btnEmail = document.getElementById('btn-email');
    
    // Configuración de WhatsApp
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    btnWhatsapp.onclick = () => {
        const name = document.getElementById('name').value;
        const msg = document.getElementById('message').value;
        const phone = "591XXXXXX"; // ¡Wilder, cámbialo aquí!
        
        if(!name || !msg) {
            alert("SISTEMA: Datos insuficientes para transmisión.");
            return;
        }

        const url = `https://wa.me/${phone}?text=Hola Wilder, soy ${name}. ${msg}`;
        window.open(url, '_blank');
    };

    // Configuración de Correo con feedback de "Envío"
    contactForm.onsubmit = (e) => {
        e.preventDefault();
        
        // Efecto visual de "Procesando"
        const originalText = btnEmail.innerHTML;
        btnEmail.innerHTML = "<span>ENVIANDO_PAQUETE...</span>";
        btnEmail.style.opacity = "0.7";

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const msg = document.getElementById('message').value;
        
        setTimeout(() => {
            const mailtoLink = `mailto:tu-correo@gmail.com?subject=Contacto Portafolio: ${name}&body=De: ${email}%0D%0A%0D%0A${msg}`;
            window.location.href = mailtoLink;
            
            // Restaurar botón
            btnEmail.innerHTML = originalText;
            btnEmail.style.opacity = "1";
        }, 800); // Pequeño delay para simular proceso
    };
});