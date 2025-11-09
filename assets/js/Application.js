import Router from "./Router.js";
import Toast from "./components/Toast.js";
import Spinner from "./components/Spinner.js";

class Application {
    #conteneurHTML = null;
    #router;

    #spinnerHTML;

    constructor() {
        // Initialisation du DOM
        this.#conteneurHTML = document.querySelector("[data-application]");

        this.#router = new Router(this);
    }
    get conteneurHTML() {
        return this.#conteneurHTML;
    }
    get router() {
        return this.#router;
    }

    recupererMenu() { }


    async rechercherServices() {
        this.#spinnerHTML.setAttribute("msg", "pizza");
        this.#spinnerHTML.afficher();
        const reponse = await fetch("api/pizzas/RechercherTout.php");
        const resultat = await reponse.json();
        setTimeout(
            function () {
                this.#spinnerHTML.cacher();
            }.bind(this),
            500
        );

        return resultat.donnees;
    }

    async rechercherPizzaParId(id) {
        const reponse = await fetch(`api/pizzas/RechercherUn.php?id=${id}`);
        const resultat = await reponse.json();

        return resultat.donnees;
    }

    async ajouterPizza(donnees) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        };

        const reponse = await fetch("api/pizzas/AjouterUn.php", config);
        const resultat = await reponse.json();

        return resultat.id;
    }

    modifierPizza() { }

    async supprimerPizza(id) {
        try {
            const reponse = await fetch(`api/pizzas/SupprimerUn.php?id=${id}`);
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
