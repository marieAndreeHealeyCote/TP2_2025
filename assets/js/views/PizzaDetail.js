import Toast from "../components/Toast.js";

class PizzaDetail {
    #application = null;
    #id;
    #pizza;
    #btnSupprimer;

    constructor(application, id) {
        this.#application = application;
        this.#id = id;
    }

    #genererDetail(pizza) {
        const image = pizza.image_url ? `<img src="assets/img/${pizza.image_url}" alt="${pizza.nom}">` : "";

        const gabarit = `
            <div class="pizza-card">
                <div class="pizza-card__nom">
                    <h2>${pizza.nom}</h2>
                    <span class="pizza-card__prix">${pizza.prix} $</span>
                </div>
                
                <div class="pizza-card__image">${image}</div>

                <div class="pizza-card__description">
                    <h3>Description</h3>
                    <p>${pizza.description}</p>
                </div>

                <div class="pizza-card__ingredients">
                <h3>Ingrédients</h3>
                    <p>${pizza.ingredients}</p>
                </div>
                
                <div class="pizza-card__footer">
                    <button class="btn bouton" data-supprimer>Supprimer la pizza</button>
                    <a href="/pizzas-modifier/${pizza.id}" data-link class="btn bouton">Modifier la pizza</a>
                    <a href="/" data-link class="btn bouton">Retour à la liste</a>
                </div>
            </div>
        `;
        return gabarit;
    }

    async render() {
        this.#pizza = await this.#application.rechercherPizzaParId(this.#id);

        this.#application.conteneurHTML.innerHTML = "";

        const gabarit = `
            <div class="pizza-card__content ">
                <h1>Détails de la pizza</h1>
                ${this.#genererDetail(this.#pizza)}
            </div>
        `;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#btnSupprimer = this.#application.conteneurHTML.querySelector("[data-supprimer]");

        this.#btnSupprimer.addEventListener("click", this.#onClick.bind(this));
    }
    async #onClick(evenement) {
        evenement.preventDefault();
        const resultat = await this.#application.supprimerPizza(this.#pizza.id);
        new Toast(document.body, resultat.message);
        setTimeout(
            function () {
                this.#application.router.naviguer("/");
            }.bind(this),
            500
        );
    }
}
export default PizzaDetail;
