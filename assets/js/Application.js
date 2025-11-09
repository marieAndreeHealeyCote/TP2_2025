import Router from "./Router.js";
import Toast from "./components/Toast.js";

class Application {
    #conteneurHTML = null;
    #router;
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
    recupererPizza() { }
    ajouterPizza() { }
}

export default Application;
