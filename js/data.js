// ============================================
// ZIRYAB TEC - GESTION DES DONNÉES
// ============================================

// Données initiales de la plateforme
const DataStore = {
    users: [
        {
            id: 1,
            nom: "Admin",
            prenom: "Principal",
            email: "admin@ziryabtec.com",
            password: "admin123",
            role: "admin",
            dateCreation: "2024-01-01",
            status: "active"
        },
        {
            id: 2,
            nom: "Benali",
            prenom: "Karim",
            email: "karim.benali@email.com",
            password: "candidat123",
            role: "candidat",
            dateCreation: "2024-02-15",
            status: "active"
        }
    ],

    formateurs: [
        {
            id: 1,
            nom: "El Amrani",
            prenom: "Hassan",
            photo: "assets/images/formateurs/hassan.jpg",
            specialite: "Cloud Computing & DevOps",
            biographie: "Expert AWS certifié avec 15 ans d'expérience en architecture cloud.",
            certifications: ["AWS Solutions Architect", "Docker Certified", "Kubernetes"],
            experience: "15 ans",
            email: "hassan.elamrani@ziryabtec.com",
            status: "active",
            dateCreation: "2024-01-15"
        },
        {
            id: 2,
            nom: "Tazi",
            prenom: "Nadia",
            photo: "assets/images/formateurs/nadia.jpg",
            specialite: "Cybersécurité",
            biographie: "Consultante en sécurité informatique, experte en tests d'intrusion.",
            certifications: ["CEH", "CISSP", "OSCP"],
            experience: "12 ans",
            email: "nadia.tazi@ziryabtec.com",
            status: "active",
            dateCreation: "2024-01-20"
        },
        {
            id: 3,
            nom: "Chraibi",
            prenom: "Omar",
            photo: "assets/images/formateurs/omar.jpg",
            specialite: "Développement Full Stack",
            biographie: "Développeur senior spécialisé en React, Node.js et architectures modernes.",
            certifications: ["React Developer", "Node.js Certified"],
            experience: "10 ans",
            email: "omar.chraibi@ziryabtec.com",
            status: "active",
            dateCreation: "2024-02-01"
        }
    ],

    formations: [
        {
            id: 1,
            nom: "AWS Solutions Architect",
            description: "Formation complète pour devenir architecte cloud AWS certifié.",
            categorie: "Cloud",
            niveau: "Avancé",
            formateurId: 1,
            mode: "Présentiel",
            dateDebut: "2024-09-15",
            dateFin: "2024-12-15",
            duree: "3 mois",
            places: 20,
            placesDisponibles: 15,
            prix: 15000,
            image: "assets/images/formations/aws.jpg",
            programme: ["Introduction AWS", "EC2 et VPC", "S3 et stockage", "Sécurité AWS", "Architecture avancée"],
            objectifs: ["Maîtriser les services AWS", "Préparer la certification", "Déployer des architectures cloud"],
            statut: "active"
        },
        {
            id: 2,
            nom: "Cybersécurité Avancée",
            description: "Formation intensive en sécurité informatique et ethical hacking.",
            categorie: "Cybersécurité",
            niveau: "Intermédiaire",
            formateurId: 2,
            mode: "À distance",
            dateDebut: "2024-10-01",
            dateFin: "2024-12-31",
            duree: "3 mois",
            places: 15,
            placesDisponibles: 10,
            prix: 12000,
            image: "assets/images/formations/cyber.jpg",
            programme: ["Fondamentaux sécurité", "Tests d'intrusion", "Forensique", "Sécurité réseau"],
            objectifs: ["Comprendre les menaces", "Réaliser des audits", "Mettre en place la sécurité"],
            statut: "active"
        },
        {
            id: 3,
            nom: "Développement Full Stack",
            description: "Formation complète en développement web moderne avec React et Node.js.",
            categorie: "Développement",
            niveau: "Débutant",
            formateurId: 3,
            mode: "Présentiel",
            dateDebut: "2024-09-20",
            dateFin: "2025-01-20",
            duree: "4 mois",
            places: 25,
            placesDisponibles: 20,
            prix: 18000,
            image: "assets/images/formations/fullstack.jpg",
            programme: ["HTML/CSS/JS", "React", "Node.js", "PostgreSQL", "Déploiement"],
            objectifs: ["Créer des applications web", "Maîtriser React", "Développer des API"],
            statut: "active"
        },
        {
            id: 4,
            nom: "Intelligence Artificielle",
            description: "Formation avancée en machine learning et deep learning.",
            categorie: "Intelligence artificielle",
            niveau: "Avancé",
            formateurId: 1,
            mode: "À distance",
            dateDebut: "2024-11-01",
            dateFin: "2025-02-01",
            duree: "3 mois",
            places: 20,
            placesDisponibles: 12,
            prix: 20000,
            image: "assets/images/formations/ai.jpg",
            programme: ["Python pour IA", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
            objectifs: ["Comprendre les algorithmes ML", "Créer des modèles", "Déployer des solutions IA"],
            statut: "active"
        }
    ],

    annonces: [
        {
            id: 1,
            titre: "Nouvelle session AWS",
            description: "Les inscriptions pour la nouvelle session AWS Solutions Architect sont ouvertes.",
            date: "2024-09-15",
            statut: "publie"
        },
        {
            id: 2,
            titre: "Webinaire gratuit : Cybersécurité",
            description: "Participez à notre webinaire gratuit sur les fondamentaux de la cybersécurité.",
            date: "2024-08-20",
            statut: "publie"
        }
    ],

    inscriptions: [
        {
            id: 1,
            candidatId: 2,
            formationId: 1,
            dateInscription: "2024-08-01",
            statut: "confirmee"
        }
    ]
};

// ============================================
// INITIALISATION DU LOCALSTORAGE
// ============================================

// Sauvegarde dans localStorage si pas encore initialisé
if (!localStorage.getItem('ziryabData')) {
    localStorage.setItem('ziryabData', JSON.stringify(DataStore));
    console.log('Base de données initialisée avec succès');
}

// ============================================
// GESTIONNAIRE DE DONNÉES (DataManager)
// ============================================

const DataManager = {
    // ----- MÉTHODES GÉNÉRALES -----
    
    getData() {
        const data = localStorage.getItem('ziryabData');
        return data ? JSON.parse(data) : DataStore;
    },

    saveData(data) {
        localStorage.setItem('ziryabData', JSON.stringify(data));
    },

    // Générer un nouvel ID unique pour une collection
    generateId(collection) {
        if (collection.length === 0) return 1;
        return Math.max(...collection.map(item => item.id)) + 1;
    },

    // ----- GESTION DES FORMATIONS -----
    
    getFormations() {
        return this.getData().formations || [];
    },

    getFormationById(id) {
        return this.getFormations().find(f => f.id === parseInt(id));
    },

    addFormation(formation) {
        const data = this.getData();
        formation.id = this.generateId(data.formations);
        formation.dateCreation = new Date().toISOString().split('T')[0];
        formation.placesDisponibles = formation.placesDisponibles || formation.places;
        data.formations.push(formation);
        this.saveData(data);
        return formation;
    },

    updateFormation(id, updatedFormation) {
        const data = this.getData();
        const index = data.formations.findIndex(f => f.id === parseInt(id));
        if (index !== -1) {
            data.formations[index] = { 
                ...data.formations[index], 
                ...updatedFormation,
                id: parseInt(id) // Garder le même ID
            };
            this.saveData(data);
            return data.formations[index];
        }
        return null;
    },

    deleteFormation(id) {
        const data = this.getData();
        data.formations = data.formations.filter(f => f.id !== parseInt(id));
        this.saveData(data);
    },

    // ----- GESTION DES FORMATEURS -----
    
    getFormateurs() {
        return this.getData().formateurs || [];
    },

    getFormateurById(id) {
        return this.getFormateurs().find(f => f.id === parseInt(id));
    },

    getFormateursActifs() {
        return this.getFormateurs().filter(f => f.status === 'active');
    },

    addFormateur(formateur) {
        const data = this.getData();
        formateur.id = this.generateId(data.formateurs);
        formateur.dateCreation = new Date().toISOString().split('T')[0];
        formateur.status = formateur.status || 'active';
        data.formateurs.push(formateur);
        this.saveData(data);
        return formateur;
    },

    updateFormateur(id, updatedFormateur) {
        const data = this.getData();
        const index = data.formateurs.findIndex(f => f.id === parseInt(id));
        if (index !== -1) {
            data.formateurs[index] = { 
                ...data.formateurs[index], 
                ...updatedFormateur,
                id: parseInt(id) // Garder le même ID
            };
            this.saveData(data);
            return data.formateurs[index];
        }
        return null;
    },

    deleteFormateur(id) {
        const data = this.getData();
        data.formateurs = data.formateurs.filter(f => f.id !== parseInt(id));
        this.saveData(data);
    },

    // Nouvelle fonction : Activer/Désactiver un formateur
    toggleFormateurStatus(id) {
        const data = this.getData();
        const index = data.formateurs.findIndex(f => f.id === parseInt(id));
        if (index !== -1) {
            const nouveauStatut = data.formateurs[index].status === 'active' ? 'inactive' : 'active';
            data.formateurs[index].status = nouveauStatut;
            this.saveData(data);
            return data.formateurs[index];
        }
        return null;
    },

    // ----- GESTION DES ANNONCES -----
    
    getAnnonces() {
        return this.getData().annonces || [];
    },

    getAnnonceById(id) {
        return this.getAnnonces().find(a => a.id === parseInt(id));
    },

    getAnnoncesPubliees() {
        return this.getAnnonces().filter(a => a.statut === 'publie');
    },

    addAnnonce(annonce) {
        const data = this.getData();
        annonce.id = this.generateId(data.annonces);
        annonce.dateCreation = new Date().toISOString().split('T')[0];
        data.annonces.push(annonce);
        this.saveData(data);
        return annonce;
    },

    updateAnnonce(id, updatedAnnonce) {
        const data = this.getData();
        const index = data.annonces.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            data.annonces[index] = { 
                ...data.annonces[index], 
                ...updatedAnnonce,
                id: parseInt(id)
            };
            this.saveData(data);
            return data.annonces[index];
        }
        return null;
    },

    deleteAnnonce(id) {
        const data = this.getData();
        data.annonces = data.annonces.filter(a => a.id !== parseInt(id));
        this.saveData(data);
    },

    toggleAnnonceStatus(id) {
        const data = this.getData();
        const index = data.annonces.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            data.annonces[index].statut = 
                data.annonces[index].statut === 'publie' ? 'brouillon' : 'publie';
            this.saveData(data);
            return data.annonces[index];
        }
        return null;
    },

    // ----- GESTION DES UTILISATEURS -----
    
    getUsers() {
        return this.getData().users || [];
    },

    getUserById(id) {
        return this.getUsers().find(u => u.id === parseInt(id));
    },

    getUserByEmail(email) {
        return this.getUsers().find(u => u.email === email);
    },

    getCandidats() {
        return this.getUsers().filter(u => u.role === 'candidat');
    },

    addUser(user) {
        const data = this.getData();
        user.id = this.generateId(data.users);
        user.dateCreation = new Date().toISOString().split('T')[0];
        user.status = user.status || 'active';
        data.users.push(user);
        this.saveData(data);
        return user;
    },

    updateUser(id, updatedUser) {
        const data = this.getData();
        const index = data.users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            data.users[index] = { 
                ...data.users[index], 
                ...updatedUser,
                id: parseInt(id)
            };
            this.saveData(data);
            return data.users[index];
        }
        return null;
    },

    deleteUser(id) {
        const data = this.getData();
        data.users = data.users.filter(u => u.id !== parseInt(id));
        this.saveData(data);
    },

    toggleUserStatus(id) {
        const data = this.getData();
        const index = data.users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            data.users[index].status = 
                data.users[index].status === 'active' ? 'inactive' : 'active';
            this.saveData(data);
            return data.users[index];
        }
        return null;
    },

    // ----- GESTION DES INSCRIPTIONS -----
    
    getInscriptions() {
        return this.getData().inscriptions || [];
    },

    getInscriptionById(id) {
        return this.getInscriptions().find(i => i.id === parseInt(id));
    },

    getInscriptionsByUser(userId) {
        return this.getInscriptions().filter(i => i.candidatId === parseInt(userId));
    },

    getInscriptionsByFormation(formationId) {
        return this.getInscriptions().filter(i => i.formationId === parseInt(formationId));
    },

    addInscription(inscription) {
        const data = this.getData();
        inscription.id = this.generateId(data.inscriptions);
        inscription.dateInscription = new Date().toISOString().split('T')[0];
        inscription.statut = inscription.statut || 'en_attente';
        data.inscriptions.push(inscription);
        this.saveData(data);
        return inscription;
    },

    updateInscription(id, updatedInscription) {
        const data = this.getData();
        const index = data.inscriptions.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            data.inscriptions[index] = { 
                ...data.inscriptions[index], 
                ...updatedInscription,
                id: parseInt(id)
            };
            this.saveData(data);
            return data.inscriptions[index];
        }
        return null;
    },

    deleteInscription(id) {
        const data = this.getData();
        data.inscriptions = data.inscriptions.filter(i => i.id !== parseInt(id));
        this.saveData(data);
    },

    // ----- FONCTIONS STATISTIQUES -----
    
    getStats() {
        const data = this.getData();
        return {
            totalFormations: data.formations.length,
            formationsActives: data.formations.filter(f => f.statut === 'active').length,
            totalFormateurs: data.formateurs.length,
            formateursActifs: data.formateurs.filter(f => f.status === 'active').length,
            totalCandidats: data.users.filter(u => u.role === 'candidat').length,
            totalAnnonces: data.annonces.length,
            annoncesPubliees: data.annonces.filter(a => a.statut === 'publie').length,
            totalInscriptions: data.inscriptions.length
        };
    }
};

// Exposer DataManager globalement
window.DataManager = DataManager;

console.log('✅ DataManager chargé avec succès');