class Pizza {
    #conteneurPizzaHTML;
    #elementHTML;
    #boutonHTML;

    #nom;
    #description;
    #ingredients;
    #prix;
    #imageUrl;
    #estSansGluten;
    #estVegan;

    constructor(conteneurPizzaHTML, pizza) {
        this.#conteneurPizzaHTML = conteneurPizzaHTML;

        this.#nom = pizza.nom;
        this.#description = pizza.description;
        this.#ingredients = pizza.ingredients;
        this.#prix = pizza.prix;
        this.#imageUrl = pizza.imageUrl;
        this.#estSansGluten = pizza.estSansGluten;
        this.#estVegan = pizza.estVegan;
    }

    get nom() {
        return this.#nom;
    }
    get description() {
        return this.#description;
    }

    get description() {
        return this.#ingredients;
    }
    get description() {
        return this.#prix;
    }
    get description() {
        return this.#imageUrl;
    }
    get description() {
        return this.#estSansGluten;
    }
    get description() {
        return this.#estVegan;
    }

    #injecterHTML() {
        const gabarit = `<div class="carte">
            <img src="${this.#imageUrl}" alt="">
            <h2>${this.#nom}</h2>
            <div class="ajouter-panier">
            <h3>${this.#prix}$</h3>
            <button class="bouton">Ajouter</button>
            </div>
        </div>`;

        this.#conteneurPizzaHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#elementHTML = this.#conteneurPizzaHTML.lastElementChild;
        this.#boutonHTML = this.#elementHTML.querySelector("button");

    }
    afficher() {
        this.#injecterHTML();
    }

}
export default Pizza;