class Pizza404 {
    #application = null;

    constructor(application) {
        this.#application = application;
    }

    render() {
        this.#application.conteneurHTML.innerHTML = "";
        const gabarit = `<div>
            <h1>🍕 Oups! Page non trouvée... 🍕</h1>
            <a href="/" data-link>Retour à l'accueil</a>
        </div>`;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    }
}
export default Pizza404;
