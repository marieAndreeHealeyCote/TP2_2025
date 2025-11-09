import Validation from "../utils/Validation.js";
import EnregistrementLocal from "../utils/EnregistrementLocal.js";

class FormulaireConnexion {
    #application;
    #validation;
    #enregistrementLocal;
    #formulaireConnexion;
    #utilisateur;

    constructor(application) {
        this.#application = application;
        this.#validation = new Validation;
        this.#enregistrementLocal = new EnregistrementLocal;

        // this.mettreAJourNavigation();
    }

    render() {
        const gabarit = `<form id="connexion" data-connexion class="formulaire__connexion">
                <div class="input-group">
                    <label for="nom">Nom d'utilisateur</label>
                    <input type="text" maxlength="200" name="nom" id="nom" required>
                </div>
                <div class="input-group">
                    <label for="mdp">Mot de passe</label>
                    <input type="password" id="mdp" name="mdp" maxlength="200" required>
                </div>
                <div class="input-group">
                    <button type="submit">Connexion</button>
                </div>
            </form>
            <div data-deconnexion class="">
                <button  type="button" class="btn-cancel">Déconnexion</button>
            </div>
            `;

        const formulaireConteneurHTML = document.querySelector('[data-formulaire-connexion]');
        formulaireConteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        formulaireConteneurHTML.querySelector("[data-deconnexion]").addEventListener("click", this.deconnexion.bind(this));

        this.#formulaireConnexion = formulaireConteneurHTML.querySelector("[data-connexion]");
        this.#formulaireConnexion.addEventListener("submit", this.#onEnvoiFormConnexion.bind(this));
    }

    #onEnvoiFormConnexion(evenement) {
        evenement.preventDefault();

        const nom = this.#formulaireConnexion.elements.nom.value;
        const mdp = this.#formulaireConnexion.elements.mdp.value;

        //Vérifier, valider...
        this.connexion(nom, mdp);
    }

    async connexion(nom, mdp) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify({ nom, mdp })
        };
        console.log(config);

        const reponse = await fetch("api/utilisateurs/Connexion.php", config);
        console.log(reponse);
        const resultat = await reponse.json();

        console.log(resultat);
        if (reponse.status == "200") {
            //Stocker dans le localstorage
            localStorage.setItem("utilisateur", resultat.utilisateur);
        } else {
            //Vider le localstorage
            localStorage.removeItem("utilisateur");
        }

        this.mettreAJourNavigation();
    }

    deconnexion() {
        localStorage.removeItem("utilisateur");
        this.mettreAJourNavigation();
    }

    mettreAJourNavigation(formulaireConnexion) {
        this.#utilisateur = localStorage.getItem("utilisateur") || null;

        document.querySelector("[data-admin]").classList.toggle("invisible", !this.#utilisateur);
        formulaireConnexion.classList.toggle("invisible", this.#utilisateur);
        document.querySelector("[data-deconnexion]").classList.toggle("invisible", !this.#utilisateur);
    }

}

export default FormulaireConnexion;
