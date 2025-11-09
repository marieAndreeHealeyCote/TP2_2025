import Toast from "../components/Toast.js";

class PizzaModifier {
    #application = null;
    #id;
    #champs;
    #donnees = {};
    #formulaire;
    #btnAnnuler;

    constructor(application, id) {
        this.#application = application;
        this.#id = id;
    }

    #genererFormulaire() {
        const pizza = this.#donnees;
        const gabarit = `
            <form id="formulaire-ajout">
                <div class="form">
                    <label for="nom">Nom de la pizza :</label>
                    <input type="text" id="nom" name="nom" required max-length="200" value="${pizza.nom}">
                </div>
                
                <div class="form-group">
                    <label for="description">Description :</label>
                    <textarea id="description" name="description" rows="5" required max-length="2000">${pizza.description}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="prix">Prix ($) :</label>
                    <input type="number" id="prix" name="prix" step="0.01" min="1" max="90" required value="${pizza.prix}">
                </div>
                
                <div class="form-group">
                    <label for="image_url">URL de l'image :</label>
                    <input type="text" id="image_url" name="image_url" value="${pizza.image_url}">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-submit">Modifier la pizza</button>
                    <a href="/" data-link class="btn-cancel" data-btn-annuler>Annuler</a>
                </div>
            </form>
            <div id="message-confirmation" class="message hidden"></div>
        `;
        return gabarit;
    }

    async render() {
        this.#donnees = await this.#application.rechercherPizzaParId(this.#id);

        this.#application.conteneurHTML.innerHTML = "";

        const gabarit = `
            <div class="">
                <h1>Modifier la pizza</h1>
                ${this.#genererFormulaire()}
            </div>
        `;
        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#formulaire = this.#application.conteneurHTML.querySelector("form");
        this.#champs = this.#formulaire.querySelectorAll("[name]");

        this.#formulaire.addEventListener("submit", this.#onSubmit.bind(this));
    }

    async #onSubmit(evenement) {
        evenement.preventDefault();
        this.#champs.forEach(
            function (champ) {
                const name = champ.name;
                const value = champ.value;

                this.#donnees[name] = value;
            }.bind(this)
        );

        const resultat = await this.#application.modifierPizza(this.#donnees, this.#id);

        new Toast(document.body, resultat.message);
        setTimeout(
            function () {
                this.#application.router.naviguer("/");
            }.bind(this),
            500
        );
    }
}
export default PizzaModifier;