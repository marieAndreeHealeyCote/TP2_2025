class Formulaire {
    #application;

    constructor(application) {
        this.#application = application;
    }

    render() {
        const gabarit = `<form id="connexion">
                <div class="input-group">
                    <label for="nom">Nom d'utilisateur</label>
                    <input type="text" maxlength="200" name="nom" id="nom" required>
                </div>
                <div class="input-group">
                    <label for="mdp">Mot de passe</label>
                    <input type="password" id="mdp" name="mdp" maxlength="200" required>
                </div>
                <div class="input-groupe">
                    <input type="submit" value="Connexion">
                </div>
            </form>
            <div class="input-groupe" data-deconnexion>
                <button>Déconnexion</button>
            </div>`;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
    }
}

export default Formulaire;
