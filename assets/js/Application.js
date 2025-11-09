import Router from "./Router.js";
import Toast from "./components/Toast.js";
import Formulaire from "./components/Formulaire.js";
import Filtre from "./components/Filtre.js";
import Pizza from "./components/Pizza.js";
import Spinner from "./components/Spinner.js";

class Application {
    #conteneurHTML = null;
    #router;
    #formulaire;
    #filtre;
    #pizza;
    #utilisateur;
    #formulaireConnexion;

    #spinnerHTML;

    constructor() {
        // Initialisation du DOM
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#spinnerHTML = document.querySelector("mon-spinner");
        this.#router = new Router(this);

        // this.mettreAJourNavigation();
    }
    get conteneurHTML() {
        return this.#conteneurHTML;
    }
    get router() {
        return this.#router;
    }

    recupererMenu() { }

    // mettreAJourNavigation() {
    //     this.#utilisateur = localStorage.getItem("utilisateur") || null;

    //     document.querySelector("[data-admin]").classList.toggle("invisible", !this.#utilisateur);
    //     this.#formulaireConnexion.classList.toggle("invisible", this.#utilisateur);
    //     document.querySelector("[data-deconnexion]").classList.toggle("invisible", !this.#utilisateur);
    // }

    async rechercherPizzas() {
        this.#spinnerHTML.setAttribute("msg", "    Veuillez patienter...");
        this.#spinnerHTML.afficher();
        const reponse = await fetch("api/pizzas/rechercherTout.php");
        const resultat = await reponse.json();
        setTimeout(
            function () {
                this.#spinnerHTML.cacher();
            }.bind(this),
            500
        );

        return resultat.data;
    }

    async rechercherPizzaParId(id) {
        const reponse = await fetch(`api/pizzas/rechercherUn.php?id=${id}`);
        const resultat = await reponse.json();

        return resultat;
    }

    async ajouterPizza(donnees) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        };

        const reponse = await fetch("api/pizzas/ajouterUn.php", config);
        const resultat = await reponse.json();

        return resultat.id;
    }

    modifierPizza() { }

    async supprimerPizza(id) {
        try {
            const reponse = await fetch(`api/pizzas/supprimerUn.php?id=${id}`);
            const resultat = await reponse.json();

            if (!reponse.ok) {
                throw new Error(resultat);
            }

            return resultat;
        } catch (erreur) {
            new Toast(document.body, erreur.message);
        }
    }
}

export default Application;
