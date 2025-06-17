function loadHTML(filePath, elementId) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            // Dopo aver caricato l'header, reimposta il link attivo
            if (elementId === 'header-placeholder') {
                setActiveNavLink();
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav .nav-left ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    // Caso speciale per la homepage (index.html)
    // Se nessun link è attivo e la pagina è index.html, non fare nulla di specifico
    // o potresti voler attivare un link 'Home' se esistesse.
    // Se la pagina corrente è 'crea-viaggio.html', assicurati che sia attivo.
    if (currentPage === 'crea-viaggio.html') {
        const creaViaggioLink = document.querySelector('a[href="crea-viaggio.html"]');
        if (creaViaggioLink) {
            // Rimuovi 'active' da altri link se necessario, anche se il loop sopra dovrebbe già farlo
            navLinks.forEach(l => l.classList.remove('active'));
            creaViaggioLink.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header.html', 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder');
});