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
        const image = pizza.image_url ? `<img href=${pizza.image_url} alt=${pizza.nom}>` : "";

        const gabarit = `
            <div class="pizza-card">
                <div class="pizza-card__nom">
                    <h2>${pizza.nom}</h2>
                    <span class="pizza-card__prix">${pizza.prix} $</span>
                </div>
                
                ${image}
                
                <div class="pizza-card__description">
                    <h3>Description</h3>
                    <p>${pizza.description}</p>
                </div>
                
                <div class="pizza-card__ingredients">
                    <button class="bouton" data-supprimer>Supprimer le pizza</button>
                    <a href="/" data-link class="bouton">Retour à la liste</a>
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
        const resultat = await this.#application.supprimerpizza(this.#pizza.id);
        new Toast(document.body, resultat.message);
        setTimeout(
            function () {
                this.#application.router.naviguer("/");
            }.bind(this),
            2000
        );
    }
}
export default PizzaDetail;
