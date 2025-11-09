import Toast from "../components/Toast.js";
import Filtre from "../components/Filtre.js";

class Accueil {
    #application = null;
    #pizzas = [];
    #filtre;

    constructor(application) {
        this.#application = application;
        this.#filtre = new Filtre(application);
    }

    #genererCarte(pizza) {
        const gabarit = `
            <div class="pizza-card">
               
                    ${pizza.image_url
                ? `
                        <div class="pizza-card__image">
                            <img src="assets/img/${pizza.image_url}" alt="${pizza.nom}">
                        </div>
                    `
                : `
                        <div class="pizza-card__image placeholder">
                            <span class="placeholder-icon">🍕</span>
                        </div>
                    `
            }
                    <div class="pizza-card__content">
                        <h3 class="pizza-card__nom">${pizza.nom}</h3>
                        ${pizza.description ? `<p class="pizza-card__description">${pizza.description}</p>` : ""}
                    </div>
                    <div class="pizza-card__footer">
                        <span class="pizza-card__prix">${pizza.prix}$</span>
                        <a href="/pizzas/${pizza.id}" data-link class="btn btn-primary">Voir détail</a>
                    </div>
            
            </div>
        `;
        return gabarit;
    }

    #genererListe() {

        let gabarit = `
        <div class="accueil-container"> 
            <div class="pizzas-section">
                <div class="grille">
        `;
        this.#pizzas.forEach((pizza) => {
            gabarit += this.#genererCarte(pizza);
        });

        gabarit += `
                </div>
            </div>
        </div>
        `;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    }

    //j'ai cliquer le tri
    clicFiltre(evenement) {
        // récupérer spécifiquement l'élément qui a reçu l'événement
        const filtreHTML = evenement.currentTarget;

        // récupérer la valeur de data-categorie
        let categorie = filtreHTML.dataset.categorie;

        this.render(categorie)
    }

    async render(categorie = "") {
        try {
            this.#pizzas = await this.#application.rechercherPizzas();

            if (categorie == "prix") {
                this.#pizzas = this.#filtre.trierParPrix(this.#pizzas);
            }
            if (categorie == "nom") {
                this.#pizzas = this.#filtre.trierParNom(this.#pizzas);
            }

            // Nettoyer le conteneur
            this.#application.conteneurHTML.innerHTML = "";

            // Afficher les filtres
            this.#filtre.render();

            // Afficher la liste des pizzas
            this.#genererListe();

            // Attacher les événements
            const pizzasHTML = this.#application.conteneurHTML.querySelectorAll('.pizzas-section [data-link]');
            pizzasHTML.forEach((pizza) => {
                const router = this.#application.router;
                pizza.addEventListener('click', function (evenement) {
                    console.log('pizza detail cliqué');
                    // router.miseAJour();
                });
            });

            // attacher sur les filtres
            document.querySelectorAll('[data-categorie]').forEach((filtre) => {
                filtre.addEventListener("click", this.clicFiltre.bind(this));
            });

        } catch (erreur) {
            new Toast(document.body, erreur.message);
        }
    }
}
export default Accueil;
