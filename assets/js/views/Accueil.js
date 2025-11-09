import Toast from "../components/Toast.js";

class Accueil {
    #application = null;
    #pizzas = [];

    constructor(application) {
        this.#application = application;
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

        let grille = '<div class="grille">';
        this.#pizzas.forEach((pizza) => {
            grille += this.#genererCarte(pizza);
        });

        grille += "</div>";
        return grille;
    }

    async render() {
        try {
            this.#pizzas = await this.#application.rechercherPizzas();
            // Nettoyer le conteneur
            this.#application.conteneurHTML.innerHTML = "";

            // Générer le gabarit complet
            const gabarit = `
                <div class="accueil-container">
             
                    <div class="pizzas-section">
                        ${this.#genererListe()}
                    </div>
                </div>
            `;

            // Insérer le HTML
            this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

            // Attacher les événements
            const pizzasHTML = this.#application.conteneurHTML.querySelectorAll('.pizzas-section [data-link]');
            pizzasHTML.forEach((pizza) => {
                const router = this.#application.router;
                pizza.addEventListener('click', function (evt) {
                    console.log('pizza detail cliqué');
                    // router.miseAJour();
                });
            });

        } catch (erreur) {
            new Toast(document.body, erreur.message);
        }
    }
}
export default Accueil;
