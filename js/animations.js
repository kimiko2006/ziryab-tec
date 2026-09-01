// ==========================================
// ZIRYAB TEC - ANIMATIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments au défilement
    initialiserAnimationsDefilement();
    
    // Animation des compteurs
    initialiserCompteurs();
});

// ==========================================
// ANIMATIONS AU DÉFILEMENT
// ==========================================

function initialiserAnimationsDefilement() {
    const elements = document.querySelectorAll('.formation-card, .feature-card, .testimonial-card, .partner-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ==========================================
// ANIMATION DES COMPTEURS
// ==========================================

function initialiserCompteurs() {
    const compteurs = document.querySelectorAll('.stat-number');
    
    compteurs.forEach(function(compteur) {
        const valeurFinale = parseInt(compteur.textContent);
        if (isNaN(valeurFinale)) return;
        
        let valeurActuelle = 0;
        const duree = 1000; // 1 seconde
        const pas = Math.ceil(valeurFinale / (duree / 16));
        
        function animer() {
            valeurActuelle += pas;
            if (valeurActuelle >= valeurFinale) {
                compteur.textContent = valeurFinale;
                return;
            }
            compteur.textContent = valeurActuelle;
            requestAnimationFrame(animer);
        }
        
        // Démarrer l'animation quand l'élément est visible
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                animer();
                observer.unobserve(compteur);
            }
        });
        
        observer.observe(compteur);
    });
}