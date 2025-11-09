<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="/interfaceWeb24610/TP2_2025/">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <!-- CSS principal -->
    <link rel="stylesheet" href="assets/css/styles.css" />
    <!-- JS principal -->
    <script type="module" src="assets/js/index.js"></script>
    <title>Pizzeria Livraison</title>
</head>

<body>
    <mon-spinner msg="Veuillez patienter..."></mon-spinner>
    <header>
        <div class="header-container">
            <h1>🍕 Pizzeria Livraison</h1>
            <nav>
                <ul>
                    <li><a href="/" data-link>Voir toutes nos pizzas</a></li>
                    <li><a href="/admin" data-link data-admin>Admin</a></li>
                </ul>
            </nav>
        </div>
        <div class="formulaire__conteneur" data-formulaire-connexion></div>
    </header>
    <main data-application></main>
    <footer>
        <p>&copy; 2025 Pizzeria Livraison - Tous droits réservés</p>
    </footer>
</body>

</html>