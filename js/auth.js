// ==========================================
// ZIRYAB TEC - AUTHENTIFICATION
// ==========================================


// ==========================================
// CONNEXION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    // Si le formulaire de connexion n'existe pas,
    // on ne fait rien.
    if (!loginForm) {
        return;
    }


    // Quand l'utilisateur clique sur
    // "Se connecter"
    loginForm.addEventListener("submit", function (event) {

        // Empêcher le rechargement de la page
        event.preventDefault();


        // Récupérer les valeurs saisies
        const email =
            document.getElementById("email").value
            .trim()
            .toLowerCase();

        const password =
            document.getElementById("password").value;


        // Récupérer les utilisateurs
        // depuis data.js
        const users = DataManager.getUsers();


        // Chercher l'utilisateur
        const user = users.find(function (user) {

            return (
                user.email.toLowerCase() === email &&
                user.password === password
            );

        });


        // ==========================================
        // SI L'UTILISATEUR N'EXISTE PAS
        // ==========================================

        if (!user) {

            afficherMessageConnexion(
                "Email ou mot de passe incorrect."
            );

            return;
        }


        // ==========================================
        // SI LE COMPTE EST INACTIF
        // ==========================================

        if (user.status !== "active") {

            afficherMessageConnexion(
                "Votre compte est désactivé."
            );

            return;
        }


        // ==========================================
        // CONNEXION RÉUSSIE
        // ==========================================

        // On sauvegarde l'utilisateur connecté
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // Message de succès
        afficherMessageConnexion(
            "Connexion réussie !",
            "success"
        );


        // ==========================================
        // REDIRECTION SELON LE RÔLE
        // ==========================================

        setTimeout(function () {

            if (user.role === "admin") {

                // Administrateur
                window.location.href =
                    "admin/dashboard.html";

            } else {

                // Candidat
                window.location.href =
                    "espace-candidat.html";

            }

        }, 1000);

    });

});


// ==========================================
// AFFICHER UN MESSAGE
// ==========================================

function afficherMessageConnexion(
    message,
    type = "error"
) {

    const messageContainer =
        document.getElementById("loginMessage");


    if (!messageContainer) {
        return;
    }


    messageContainer.textContent = message;


    messageContainer.style.display = "block";


    // Changer le style selon le type
    if (type === "success") {

        messageContainer.className =
            "alert alert-success";

    } else {

        messageContainer.className =
            "alert alert-error";

    }

}