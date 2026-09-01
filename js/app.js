// ==========================================
// ZIRYAB TEC - APPLICATION JAVASCRIPT
// ==========================================


// ==========================================
// LANCEMENT DE L'APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Page d'accueil
    afficherFormationsAccueil();
    afficherAnnonces();

    // Page des formations
    afficherFormationsPage();
    activerRechercheEtFiltre();

    // Page détail d'une formation
    afficherDetailFormation();

});


// ==========================================
// AFFICHER LES FORMATIONS SUR L'ACCUEIL
// ==========================================

function afficherFormationsAccueil() {

    const container = document.getElementById("formationsPreview");

    if (!container) {
        return;
    }

    const formations = DataManager.getFormations();

    container.innerHTML = "";

    formations.forEach(function (formation) {

        const formateur = DataManager.getFormateurById(
            formation.formateurId
        );

        const carte = document.createElement("div");

        carte.className = "formation-card";

        carte.innerHTML = `

            <div class="formation-image">

                <img
                    src="${formation.image}"
                    alt="${formation.nom}"
                    style="
                        width:100%;
                        height:200px;
                        object-fit:cover;
                    "
                    onerror="this.style.display='none';"
                >

            </div>

            <div class="formation-content">

                <span class="formation-category">
                    ${formation.categorie}
                </span>

                <h3 class="formation-title">
                    ${formation.nom}
                </h3>

                <p class="formation-details">
                    ${formation.description}
                </p>

                <p>
                    <strong>Niveau :</strong>
                    ${formation.niveau}
                </p>

                <p>
                    <strong>Mode :</strong>
                    ${formation.mode}
                </p>

                <p>
                    <strong>Formateur :</strong>
                    ${
                        formateur
                            ? formateur.prenom + " " + formateur.nom
                            : "Non défini"
                    }
                </p>

                <br>

                <a
                    href="pages/formations.html"
                    class="btn btn-primary"
                >
                    Voir les formations
                </a>

            </div>
        `;

        container.appendChild(carte);

    });
}


// ==========================================
// AFFICHER LES FORMATIONS
// SUR LA PAGE FORMATIONS
// ==========================================

function afficherFormationsPage() {

    const container =
        document.getElementById("formationsList");

    if (!container) {
        return;
    }

    afficherListeFormations(
        DataManager.getFormations()
    );

}


// ==========================================
// AFFICHER LA LISTE DES FORMATIONS
// ==========================================

function afficherListeFormations(formations) {

    const container =
        document.getElementById("formationsList");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    // Aucune formation trouvée
    if (formations.length === 0) {

        container.innerHTML = `

            <div style="
                grid-column:1 / -1;
                text-align:center;
                padding:3rem;
            ">

                <h3>
                    Aucune formation trouvée
                </h3>

                <p>
                    Essayez une autre recherche
                    ou une autre catégorie.
                </p>

            </div>

        `;

        return;
    }


    // Afficher chaque formation
    formations.forEach(function (formation) {

        const formateur =
            DataManager.getFormateurById(
                formation.formateurId
            );


        const carte =
            document.createElement("div");


        carte.className =
            "formation-card";


        carte.innerHTML = `

            <div class="formation-image">

                <img
                    src="../${formation.image}"
                    alt="${formation.nom}"
                    style="
                        width:100%;
                        height:200px;
                        object-fit:cover;
                    "
                    onerror="this.style.display='none';"
                >

            </div>


            <div class="formation-content">

                <span class="formation-category">
                    ${formation.categorie}
                </span>


                <h3 class="formation-title">
                    ${formation.nom}
                </h3>


                <p class="formation-details">
                    ${formation.description}
                </p>


                <div class="formation-meta">

                    <span class="meta-tag">
                        Niveau : ${formation.niveau}
                    </span>

                    <span class="meta-tag">
                        ${formation.mode}
                    </span>

                    <span class="meta-tag">
                        ${formation.duree}
                    </span>

                </div>


                <p>

                    <strong>Formateur :</strong>

                    ${
                        formateur
                            ? formateur.prenom +
                              " " +
                              formateur.nom
                            : "Non défini"
                    }

                </p>


                <br>


                <button
                    class="btn btn-primary"
                    onclick="voirFormation(${formation.id})"
                >
                    Voir la formation
                </button>

            </div>

        `;


        container.appendChild(carte);

    });

}


// ==========================================
// RECHERCHE ET FILTRE
// ==========================================

function activerRechercheEtFiltre() {

    const searchInput =
        document.getElementById("searchFormation");

    const categoryFilter =
        document.getElementById("categoryFilter");


    if (!searchInput || !categoryFilter) {
        return;
    }


    // Recherche pendant la saisie
    searchInput.addEventListener(
        "input",
        filtrerFormations
    );


    // Filtre par catégorie
    categoryFilter.addEventListener(
        "change",
        filtrerFormations
    );

}


// ==========================================
// FILTRER LES FORMATIONS
// ==========================================

function filtrerFormations() {

    const searchInput =
        document.getElementById("searchFormation");

    const categoryFilter =
        document.getElementById("categoryFilter");


    if (!searchInput || !categoryFilter) {
        return;
    }


    const recherche =
        searchInput.value
            .toLowerCase()
            .trim();


    const categorie =
        categoryFilter.value;


    const formations =
        DataManager.getFormations();


    const formationsFiltrees =
        formations.filter(function (formation) {


            const nom =
                formation.nom.toLowerCase();


            const description =
                formation.description.toLowerCase();


            const correspondRecherche =
                nom.includes(recherche) ||
                description.includes(recherche);


            const correspondCategorie =
                categorie === "all" ||
                formation.categorie === categorie;


            return (
                correspondRecherche &&
                correspondCategorie
            );

        });


    afficherListeFormations(
        formationsFiltrees
    );

}


// ==========================================
// OUVRIR UNE FORMATION
// ==========================================

function voirFormation(id) {

    const formation =
        DataManager.getFormationById(id);


    if (!formation) {

        alert("Formation introuvable.");

        return;
    }


    window.location.href =
        "formation-detail.html?id=" + id;

}


// ==========================================
// AFFICHER LE DETAIL D'UNE FORMATION
// ==========================================

function afficherDetailFormation() {

    const container =
        document.getElementById("formationDetail");


    // Si nous ne sommes pas sur la page détail
    if (!container) {
        return;
    }


    // Récupérer l'ID dans l'URL
    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id"));


    // Récupérer la formation
    const formation =
        DataManager.getFormationById(id);


    // Si la formation n'existe pas
    if (!formation) {

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:4rem;
            ">

                <h2>
                    Formation introuvable
                </h2>

                <p>
                    La formation demandée
                    n'existe pas.
                </p>

                <br>

                <a
                    href="formations.html"
                    class="btn btn-primary"
                >
                    Retour aux formations
                </a>

            </div>

        `;

        return;
    }


    // Récupérer le formateur
    const formateur =
        DataManager.getFormateurById(
            formation.formateurId
        );


    // Afficher les informations
    container.innerHTML = `

        <div style="
            max-width:1100px;
            margin:auto;
        ">


            <!-- RETOUR -->

            <div style="
                margin-bottom:2rem;
            ">

                <a
                    href="formations.html"
                    style="
                        text-decoration:none;
                        color:#666;
                    "
                >
                    ← Retour aux formations
                </a>

            </div>


            <!-- PRESENTATION -->

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:3rem;
                align-items:center;
                margin-bottom:4rem;
            ">


                <!-- IMAGE -->

                <div>

                    <img
                        src="../${formation.image}"
                        alt="${formation.nom}"
                        style="
                            width:100%;
                            max-height:400px;
                            object-fit:cover;
                            border-radius:8px;
                        "
                        onerror="
                            this.style.display='none';
                        "
                    >

                </div>


                <!-- INFORMATIONS -->

                <div>

                    <span class="formation-category">
                        ${formation.categorie}
                    </span>


                    <h1 style="
                        font-size:2.5rem;
                        margin:1rem 0;
                    ">
                        ${formation.nom}
                    </h1>


                    <p style="
                        color:#666;
                        font-size:1.1rem;
                        margin-bottom:2rem;
                    ">
                        ${formation.description}
                    </p>


                    <div class="formation-meta">

                        <span class="meta-tag">
                            Niveau :
                            ${formation.niveau}
                        </span>

                        <span class="meta-tag">
                            ${formation.mode}
                        </span>

                        <span class="meta-tag">
                            Durée :
                            ${formation.duree}
                        </span>

                    </div>


                    <p>
                        <strong>
                            Date de début :
                        </strong>

                        ${formation.dateDebut}
                    </p>


                    <p>
                        <strong>
                            Date de fin :
                        </strong>

                        ${formation.dateFin}
                    </p>


                    <p>
                        <strong>
                            Places disponibles :
                        </strong>

                        ${formation.placesDisponibles}
                        /
                        ${formation.places}
                    </p>


                    <p style="
                        font-size:1.5rem;
                        font-weight:700;
                        margin:1.5rem 0;
                    ">

                        ${formation.prix.toLocaleString(
                            "fr-FR"
                        )}

                        DH

                    </p>


                    <button
                        class="btn btn-primary"
                        onclick="
                            alert(
                                'La fonctionnalité d\\'inscription sera disponible prochainement.'
                            )
                        "
                    >
                        S'inscrire à cette formation
                    </button>

                </div>

            </div>


            <!-- PROGRAMME -->

            <div style="
                margin-bottom:3rem;
            ">

                <h2>
                    Programme de la formation
                </h2>

                <br>


                <div>

                    ${formation.programme
                        .map(function(module, index) {

                            return `

                                <div style="
                                    background:#faf7f2;
                                    padding:1rem;
                                    margin-bottom:0.75rem;
                                    border-radius:8px;
                                    border-left:4px solid #1a1a1a;
                                ">

                                    <strong>
                                        Module ${index + 1}
                                    </strong>

                                    <br>

                                    ${module}

                                </div>

                            `;

                        })
                        .join("")
                    }

                </div>

            </div>


            <!-- OBJECTIFS -->

            <div style="
                margin-bottom:3rem;
            ">

                <h2>
                    Objectifs de la formation
                </h2>

                <br>


                <ul style="
                    padding-left:2rem;
                ">

                    ${formation.objectifs
                        .map(function(objectif) {

                            return `

                                <li style="
                                    margin-bottom:0.75rem;
                                ">
                                    ${objectif}
                                </li>

                            `;

                        })
                        .join("")
                    }

                </ul>

            </div>


            <!-- FORMATEUR -->

            <div style="
                background:#faf7f2;
                padding:2rem;
                border-radius:8px;
            ">

                <h2>
                    Votre formateur
                </h2>

                <br>


                <h3>

                    ${
                        formateur
                            ? formateur.prenom +
                              " " +
                              formateur.nom
                            : "Non défini"
                    }

                </h3>


                ${
                    formateur
                        ? `

                            <p>
                                ${formateur.biographie}
                            </p>

                            <br>

                            <p>

                                <strong>
                                    Spécialité :
                                </strong>

                                ${formateur.specialite}

                            </p>


                            <p>

                                <strong>
                                    Expérience :
                                </strong>

                                ${formateur.experience}

                            </p>

                        `
                        : ""
                }

            </div>

        </div>

    `;

}


// ==========================================
// AFFICHER LES ANNONCES
// ==========================================

function afficherAnnonces() {

    const container =
        document.getElementById(
            "announcementsList"
        );


    if (!container) {
        return;
    }


    const annonces =
        DataManager.getAnnonces();


    container.innerHTML = "";


    annonces

        .filter(function (annonce) {

            return annonce.statut === "publie";

        })

        .forEach(function (annonce) {

            const carte =
                document.createElement("div");


            carte.className =
                "announcement-item";


            carte.innerHTML = `

                <div class="announcement-content">

                    <span class="announcement-date">
                        ${annonce.date}
                    </span>

                    <h3 class="announcement-title">
                        ${annonce.titre}
                    </h3>

                    <p>
                        ${annonce.description}
                    </p>

                </div>

            `;


            container.appendChild(carte);

        });

}