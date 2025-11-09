class Filtre {
    #application;
    constructor(application) {
        this.#application = application;
    }

    trierParPrix(liste) {
        const clone = [...liste];

        clone.sort(function (a, b) {
            return a.prix - b.prix;
        });
        return clone;
    }

    trierParNom(liste) {
        const clone = [...liste];

        clone.sort(function (a, b) {
            return a.nom - b.nom;
        });

        return clone;
    }

    render() {
        const gabarit = `<div class="filtres">
            <button class="bouton" data-categorie="prix">Trier par prix</button>
            <button class="bouton" data-categorie="nom">Trier par nom</button>
        </div>`;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

    }
}

export default Filtre;
