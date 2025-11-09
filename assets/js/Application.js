import Router from "./Router.js";
import Toast from "./components/Toast.js";
import FormulaireConnexion from "./components/FormulaireConnexion.js";
import Filtre from "./components/Filtre.js";
import Pizza from "./components/Pizza.js";
import Spinner from "./components/Spinner.js";

class Application {
    #conteneurHTML = null;
    #router;
    #formulaireConnexion;
    #filtre;
    #pizza;
    #utilisateur;

    #spinnerHTML;

    constructor() {
        // Initialisation du DOM
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#spinnerHTML = document.querySelector("mon-spinner");
        this.#router = new Router(this);
        this.#formulaireConnexion = new FormulaireConnexion(this);

        this.#formulaireConnexion.render();
    }
    get conteneurHTML() {
        return this.#conteneurHTML;
    }
    get router() {
        return this.#router;
    }

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

        try {
            const reponse = await fetch("api/pizzas/ajouterUn.php", config);
            const resultat = await reponse.json();

            if (!reponse.ok) {
                throw new Error(resultat);
            }

            return resultat.id;

        } catch (erreur) {
            new Toast(document.body, erreur.message);
        }
    }

    async modifierPizza(donnees, id) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        };

        try {
            const reponse = await fetch(`api/pizzas/modifierUn.php?id=${id}`, config);
            const resultat = await reponse.json();

            if (!reponse.ok) {
                throw new Error(resultat);
            }

            return resultat;
        } catch (erreur) {
            new Toast(document.body, erreur.message);
        }
    }

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
