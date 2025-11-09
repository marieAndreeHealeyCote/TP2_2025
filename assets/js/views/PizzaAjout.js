import Toast from "../components/Toast.js";

class PizzaAjout {
    #application = null;
    #champs;
    #donnees = {};
    #formulaire;
    #btnAnnuler;

    constructor(application) {
        this.#application = application;
    }

    #genererFormulaire() {
        const gabarit = `
            <form id="formulaire-ajout">
                <div class="form-group">
                    <label for="nom">Nom de la pizza :</label>
                    <input type="text" id="nom" name="nom" required max-length="200">
                </div>
                
                <div class="form-group">
                    <label for="description">Description :</label>
                    <textarea id="description" name="description" rows="5" required max-length="2000"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="prix">Prix ($) :</label>
                    <input type="number" id="prix" name="prix" step="0.01" min="1" max="90" required>
                </div>
                
                <div class="form-group">
                    <label for="image_url">URL de l'image :</label>
                    <input type="text" id="image_url" name="image_url">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-submit">Ajouter la pizza</button>
                    <a href="/" data-link class="btn-cancel" data-btn-annuler>Annuler</a>
                </div>
            </form>
            <div id="message-confirmation" class="message hidden"></div>
        `;
        return gabarit;
    }

    async render() {
        this.#application.conteneurHTML.innerHTML = "";

        const gabarit = `
            <div class="form">
                <h1>Ajouter une pizza </h1>
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


        const resultat = await this.#application.ajouterPizza(this.#donnees);

        if (resultat) {
            setTimeout(
                function () {
                    this.#application.router.naviguer("/pizzas/" + resultat.id);
                }.bind(this),
                500
            );
        } else {
            const message = "Erreur lors de la création de la pizza";
            new Toast(document.body, message);
        }

    }

}
export default PizzaAjout;
