// ==========================================
// ZIRYAB TEC - ADMINISTRATION COMPLÈTE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Initialisation générale
    afficherStatistiques();
    afficherFormations();
    afficherFormateurs();
    chargerFormateursDansSelect();
    
    // Initialisation des fonctionnalités
    initialiserRecherche();
    initialiserRechercheFormateurs();
    initialiserModal();
    initialiserModalFormateur();
    initialiserDeconnexion();
});

// ==========================================
// STATISTIQUES
// ==========================================

function afficherStatistiques() {
    const stats = DataManager.getStats();
    
    // Mise à jour des compteurs
    const elements = {
        'formationsCount': stats.totalFormations,
        'formateursCount': stats.totalFormateurs,
        'usersCount': stats.totalCandidats,
        'annoncesCount': stats.totalAnnonces,
        'formateursActifs': stats.formateursActifs,
        'formationsActives': stats.formationsActives
    };
    
    for (const [id, valeur] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = valeur;
        }
    }
}

// ==========================================
// GESTION DES FORMATIONS
// ==========================================

function afficherFormations() {
    const container = document.getElementById("formationsTableBody");
    if (!container) return;

    const formations = DataManager.getFormations();
    container.innerHTML = "";

    if (formations.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    Aucune formation trouvée
                </td>
            </tr>
        `;
        return;
    }

    formations.forEach(function (formation) {
        const formateur = DataManager.getFormateurById(formation.formateurId);
        const ligne = document.createElement("tr");

        ligne.innerHTML = `
            <td><strong>${formation.nom}</strong></td>
            <td>${formation.categorie}</td>
            <td>${formation.niveau}</td>
            <td>${formation.mode}</td>
            <td>${formation.dateDebut}</td>
            <td>${formation.placesDisponibles} / ${formation.places}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="modifierFormation(${formation.id})">
                    ✏️ Modifier
                </button>
                <button class="btn btn-sm btn-danger" onclick="supprimerFormation(${formation.id})">
                    🗑️ Supprimer
                </button>
            </td>
        `;

        container.appendChild(ligne);
    });
}

function initialiserRecherche() {
    const searchInput = document.getElementById("searchFormation");
    const categoryFilter = document.getElementById("filterCategory");
    const modeFilter = document.getElementById("filterMode");

    if (!searchInput) return;

    function filtrer() {
        const recherche = searchInput.value.toLowerCase().trim();
        const categorie = categoryFilter ? categoryFilter.value : "";
        const mode = modeFilter ? modeFilter.value : "";

        const formations = DataManager.getFormations();
        const resultats = formations.filter(function (formation) {
            const correspondNom = formation.nom.toLowerCase().includes(recherche);
            const correspondCategorie = categorie === "" || formation.categorie === categorie;
            const correspondMode = mode === "" || formation.mode === mode;

            return correspondNom && correspondCategorie && correspondMode;
        });

        afficherResultatsFormations(resultats);
    }

    searchInput.addEventListener("input", filtrer);
    if (categoryFilter) categoryFilter.addEventListener("change", filtrer);
    if (modeFilter) modeFilter.addEventListener("change", filtrer);
}

function afficherResultatsFormations(formations) {
    const container = document.getElementById("formationsTableBody");
    if (!container) return;

    container.innerHTML = "";

    if (formations.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    Aucune formation trouvée
                </td>
            </tr>
        `;
        return;
    }

    formations.forEach(function (formation) {
        const ligne = document.createElement("tr");
        ligne.innerHTML = `
            <td><strong>${formation.nom}</strong></td>
            <td>${formation.categorie}</td>
            <td>${formation.niveau}</td>
            <td>${formation.mode}</td>
            <td>${formation.dateDebut}</td>
            <td>${formation.placesDisponibles} / ${formation.places}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="modifierFormation(${formation.id})">
                    ✏️ Modifier
                </button>
                <button class="btn btn-sm btn-danger" onclick="supprimerFormation(${formation.id})">
                    🗑️ Supprimer
                </button>
            </td>
        `;
        container.appendChild(ligne);
    });
}

// ==========================================
// MODAL FORMATION
// ==========================================

function initialiserModal() {
    const modal = document.getElementById("formationModal");
    const addButton = document.getElementById("addFormationBtn");
    const closeButton = document.getElementById("closeModalBtn");
    const cancelButton = document.getElementById("cancelModalBtn");
    const form = document.getElementById("formationForm");

    if (!modal || !addButton || !closeButton || !cancelButton || !form) return;

    addButton.addEventListener("click", function () {
        ouvrirModalAjout();
    });

    closeButton.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    cancelButton.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    form.addEventListener("submit", enregistrerFormation);
}

function ouvrirModalAjout() {
    const modal = document.getElementById("formationModal");
    const form = document.getElementById("formationForm");

    form.reset();
    document.getElementById("formationId").value = "";
    document.getElementById("modalTitle").textContent = "Ajouter une formation";
    
    chargerFormateursDansSelect();
    modal.classList.add("active");
}

function modifierFormation(id) {
    const formation = DataManager.getFormationById(id);
    if (!formation) {
        alert("Formation introuvable.");
        return;
    }

    document.getElementById("formationId").value = formation.id;
    document.getElementById("formationNom").value = formation.nom;
    document.getElementById("formationDescription").value = formation.description;
    document.getElementById("formationCategorie").value = formation.categorie;
    document.getElementById("formationNiveau").value = formation.niveau;
    document.getElementById("formationMode").value = formation.mode;
    document.getElementById("formationDate").value = formation.dateDebut || "";
    document.getElementById("formationDateFin").value = formation.dateFin || "";
    document.getElementById("formationDuree").value = formation.duree || "";
    document.getElementById("formationPrix").value = formation.prix || 0;
    document.getElementById("formationPlaces").value = formation.places || 1;
    
    chargerFormateursDansSelect(formation.formateurId);
    document.getElementById("modalTitle").textContent = "Modifier la formation";
    document.getElementById("formationModal").classList.add("active");
}

function enregistrerFormation(event) {
    event.preventDefault();

    const id = document.getElementById("formationId").value;
    const nom = document.getElementById("formationNom").value.trim();
    const description = document.getElementById("formationDescription").value.trim();
    const categorie = document.getElementById("formationCategorie").value;
    const niveau = document.getElementById("formationNiveau").value;
    const mode = document.getElementById("formationMode").value;
    const dateDebut = document.getElementById("formationDate").value;
    const dateFin = document.getElementById("formationDateFin").value;
    const duree = document.getElementById("formationDuree").value.trim();
    const formateurId = Number(document.getElementById("formationFormateur").value);
    const places = Number(document.getElementById("formationPlaces").value);
    const prix = Number(document.getElementById("formationPrix").value);

    // Validation
    if (!nom || !description || !categorie || !niveau || !mode || 
        !dateDebut || !dateFin || !duree || !formateurId || !places || prix < 0) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    if (dateFin < dateDebut) {
        alert("La date de fin doit être après la date de début.");
        return;
    }

    if (id === "") {
        // Nouvelle formation
        const nouvelleFormation = {
            nom: nom,
            description: description,
            categorie: categorie,
            niveau: niveau,
            formateurId: formateurId,
            mode: mode,
            dateDebut: dateDebut,
            dateFin: dateFin,
            duree: duree,
            places: places,
            placesDisponibles: places,
            prix: prix,
            image: "assets/images/formations/default.jpg",
            programme: [],
            objectifs: [],
            statut: "active"
        };

        DataManager.addFormation(nouvelleFormation);
        alert("✅ Formation ajoutée avec succès !");
    } else {
        // Modification
        const ancienneFormation = DataManager.getFormationById(Number(id));
        const nouvellesDonnees = {
            nom: nom,
            description: description,
            categorie: categorie,
            niveau: niveau,
            formateurId: formateurId,
            mode: mode,
            dateDebut: dateDebut,
            dateFin: dateFin,
            duree: duree,
            places: places,
            prix: prix
        };

        if (ancienneFormation) {
            const placesReservees = Math.max(0, ancienneFormation.places - ancienneFormation.placesDisponibles);
            nouvellesDonnees.placesDisponibles = Math.max(0, places - placesReservees);
        }

        DataManager.updateFormation(Number(id), nouvellesDonnees);
        alert("✅ Formation modifiée avec succès !");
    }

    document.getElementById("formationModal").classList.remove("active");
    afficherFormations();
    afficherStatistiques();
}

function supprimerFormation(id) {
    const formation = DataManager.getFormationById(id);
    if (!formation) {
        alert("Formation introuvable.");
        return;
    }

    const confirmation = confirm("Voulez-vous vraiment supprimer la formation : " + formation.nom + " ?");
    if (!confirmation) return;

    DataManager.deleteFormation(id);
    afficherFormations();
    afficherStatistiques();
    alert("✅ Formation supprimée avec succès !");
}

// ==========================================
// GESTION DES FORMATEURS
// ==========================================

function afficherFormateurs() {
    const container = document.getElementById("formateursTableBody");
    if (!container) return;

    const formateurs = DataManager.getFormateurs();
    container.innerHTML = "";

    if (formateurs.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Aucun formateur trouvé
                </td>
            </tr>
        `;
        return;
    }

    formateurs.forEach(function (formateur) {
        const ligne = document.createElement("tr");
        ligne.innerHTML = `
            <td>
                <div class="avatar-placeholder">
                    ${formateur.prenom.charAt(0)}${formateur.nom.charAt(0)}
                </div>
            </td>
            <td>
                <strong>${formateur.prenom} ${formateur.nom}</strong>
                <br>
                <small>${formateur.email || 'Email non renseigné'}</small>
            </td>
            <td>${formateur.specialite}</td>
            <td>${formateur.experience}</td>
            <td>
                <span class="status-badge status-${formateur.status}">
                    ${formateur.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="modifierFormateur(${formateur.id})">
                    ✏️ Modifier
                </button>
                <button class="btn btn-sm ${formateur.status === 'active' ? 'btn-warning' : 'btn-success'}" 
                        onclick="basculerStatutFormateur(${formateur.id})">
                    ${formateur.status === 'active' ? '🔴 Désactiver' : '🟢 Activer'}
                </button>
                <button class="btn btn-sm btn-danger" onclick="supprimerFormateur(${formateur.id})">
                    🗑️ Supprimer
                </button>
            </td>
        `;
        container.appendChild(ligne);
    });
}

function initialiserRechercheFormateurs() {
    const searchInput = document.getElementById("searchFormateur");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const recherche = searchInput.value.toLowerCase().trim();
        const formateurs = DataManager.getFormateurs();
        
        const resultats = formateurs.filter(function (formateur) {
            const nomComplet = `${formateur.prenom} ${formateur.nom}`.toLowerCase();
            return nomComplet.includes(recherche) ||
                   formateur.specialite.toLowerCase().includes(recherche);
        });

        afficherResultatsFormateurs(resultats);
    });
}

function afficherResultatsFormateurs(formateurs) {
    const container = document.getElementById("formateursTableBody");
    if (!container) return;

    container.innerHTML = "";

    if (formateurs.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Aucun formateur trouvé
                </td>
            </tr>
        `;
        return;
    }

    formateurs.forEach(function (formateur) {
        const ligne = document.createElement("tr");
        ligne.innerHTML = `
            <td>
                <div class="avatar-placeholder">
                    ${formateur.prenom.charAt(0)}${formateur.nom.charAt(0)}
                </div>
            </td>
            <td>
                <strong>${formateur.prenom} ${formateur.nom}</strong>
                <br>
                <small>${formateur.email || 'Email non renseigné'}</small>
            </td>
            <td>${formateur.specialite}</td>
            <td>${formateur.experience}</td>
            <td>
                <span class="status-badge status-${formateur.status}">
                    ${formateur.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="modifierFormateur(${formateur.id})">
                    ✏️ Modifier
                </button>
                <button class="btn btn-sm ${formateur.status === 'active' ? 'btn-warning' : 'btn-success'}" 
                        onclick="basculerStatutFormateur(${formateur.id})">
                    ${formateur.status === 'active' ? '🔴 Désactiver' : '🟢 Activer'}
                </button>
                <button class="btn btn-sm btn-danger" onclick="supprimerFormateur(${formateur.id})">
                    🗑️ Supprimer
                </button>
            </td>
        `;
        container.appendChild(ligne);
    });
}

function initialiserModalFormateur() {
    const modal = document.getElementById("formateurModal");
    const addButton = document.getElementById("addFormateurBtn");
    const closeButton = document.getElementById("closeFormateurModalBtn");
    const cancelButton = document.getElementById("cancelFormateurModalBtn");
    const form = document.getElementById("formateurForm");

    if (!modal || !addButton || !closeButton || !cancelButton || !form) return;

    addButton.addEventListener("click", function () {
        ouvrirModalAjoutFormateur();
    });

    closeButton.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    cancelButton.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    form.addEventListener("submit", enregistrerFormateur);
}

function ouvrirModalAjoutFormateur() {
    const modal = document.getElementById("formateurModal");
    const form = document.getElementById("formateurForm");

    form.reset();
    document.getElementById("formateurId").value = "";
    document.getElementById("formateurModalTitle").textContent = "Ajouter un formateur";
    modal.classList.add("active");
}

function modifierFormateur(id) {
    const formateur = DataManager.getFormateurById(id);
    if (!formateur) {
        alert("Formateur introuvable.");
        return;
    }

    document.getElementById("formateurId").value = formateur.id;
    document.getElementById("formateurPrenom").value = formateur.prenom;
    document.getElementById("formateurNom").value = formateur.nom;
    document.getElementById("formateurSpecialite").value = formateur.specialite;
    document.getElementById("formateurExperience").value = parseInt(formateur.experience) || 0;
    document.getElementById("formateurBio").value = formateur.biographie || "";
    document.getElementById("formateurCertifications").value = formateur.certifications.join(", ");
    document.getElementById("formateurEmail").value = formateur.email || "";
    
    document.getElementById("formateurModalTitle").textContent = "Modifier le formateur";
    document.getElementById("formateurModal").classList.add("active");
}

function enregistrerFormateur(event) {
    event.preventDefault();

    const id = document.getElementById("formateurId").value;
    const prenom = document.getElementById("formateurPrenom").value.trim();
    const nom = document.getElementById("formateurNom").value.trim();
    const specialite = document.getElementById("formateurSpecialite").value;
    const experience = document.getElementById("formateurExperience").value;
    const biographie = document.getElementById("formateurBio").value.trim();
    const certifications = document.getElementById("formateurCertifications").value
        .split(',')
        .map(cert => cert.trim())
        .filter(cert => cert !== '');
    const email = document.getElementById("formateurEmail").value.trim();

    // Validation
    if (!prenom || !nom || !specialite || !experience || !biographie || certifications.length === 0 || !email) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    const formateurData = {
        prenom: prenom,
        nom: nom,
        specialite: specialite,
        experience: experience + " ans",
        biographie: biographie,
        certifications: certifications,
        email: email,
        photo: "assets/images/formateurs/default.jpg",
        status: "active"
    };

    if (id === "") {
        // Nouveau formateur
        DataManager.addFormateur(formateurData);
        alert("✅ Formateur ajouté avec succès !");
    } else {
        // Modification
        DataManager.updateFormateur(Number(id), formateurData);
        alert("✅ Formateur modifié avec succès !");
    }

    document.getElementById("formateurModal").classList.remove("active");
    afficherFormateurs();
    afficherStatistiques();
    chargerFormateursDansSelect();
}

function basculerStatutFormateur(id) {
    const formateur = DataManager.getFormateurById(id);
    if (!formateur) {
        alert("Formateur introuvable.");
        return;
    }

    const action = formateur.status === 'active' ? 'désactiver' : 'activer';
    const confirmation = confirm(`Voulez-vous vraiment ${action} ${formateur.prenom} ${formateur.nom} ?`);
    
    if (!confirmation) return;

    DataManager.toggleFormateurStatus(id);
    afficherFormateurs();
    afficherStatistiques();
    alert(`✅ Formateur ${action === 'activer' ? 'activé' : 'désactivé'} avec succès !`);
}

function supprimerFormateur(id) {
    const formateur = DataManager.getFormateurById(id);
    if (!formateur) {
        alert("Formateur introuvable.");
        return;
    }

    const confirmation = confirm(`Voulez-vous vraiment supprimer ${formateur.prenom} ${formateur.nom} ?`);
    if (!confirmation) return;

    DataManager.deleteFormateur(id);
    afficherFormateurs();
    afficherStatistiques();
    chargerFormateursDansSelect();
    alert("✅ Formateur supprimé avec succès !");
}

function chargerFormateursDansSelect(selectedId = null) {
    const select = document.getElementById("formationFormateur");
    if (!select) return;

    const formateurs = DataManager.getFormateursActifs();
    
    select.innerHTML = '<option value="">Sélectionner un formateur</option>' +
        formateurs.map(formateur => `
            <option value="${formateur.id}" ${selectedId === formateur.id ? 'selected' : ''}>
                ${formateur.prenom} ${formateur.nom} - ${formateur.specialite}
            </option>
        `).join('');
}

// ==========================================
// DÉCONNEXION
// ==========================================

function initialiserDeconnexion() {
    const logoutButton = document.getElementById("logoutBtn");
    if (!logoutButton) return;

    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "../connexion.html";
    });
}