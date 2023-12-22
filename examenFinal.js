
boutonAjouter = document.getElementById('bouton-ajouter');
var form = document.getElementById('form-ajout-recette');

// Ajoutez un écouteur d'événements pour gérer la soumission du formulaire
//form.addEventListener('submit', function(event) {
boutonAjouter.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêchez le formulaire de se soumettre normalement

    // Obtenez les valeurs des champs de formulaire
    var ingredients = document.getElementById('ingredients').value;
    var instructions = document.getElementById('instructions').value;
    var quantite = document.getElementById('quantite').value;
    var listeingredients = $('#liste-ingredients').val().trim();




    //verifier si les valeurs quantite sont des chiffres
    if (quantite < 0 || isNaN(quantite)) { //si la quantite est inferieur a 0 ou n'est pas un chiffre
        alert("Veuillez entrer une quantitée valide.");
        return; // Sortez de la fonction si la quantitée n'est pas valide
    }
    else
    {
        //verifier que les ingredients et instructions sont des lettre
        if (isNaN(!ingredients) || isNaN(instructions)){
            alert("Veuillez entrer des champs valides.");
            return; // Sortez de la fonction si les champs de sont pas valides
        }
    }


    //Ajouter les elements à la liste si les champs sont remplis
    listeingredients.append($('<li>').addClass(list-group-ingredients).text(ingredients + quantite));

    //var listingredients = document.createElement('li');
    //listingredients.classList.add('list-group-item');
    //listingredients.textContent = ingredients + quantite; // textContent pour éviter risque d'injection HTML
    //document.getElementById('liste-recettes').appendChild(listingredients);

    form.reset();


    // Préparer les données à envoyer
    var data = {
        instructions: instructions,
        quantite: quantite,
        ingredients: ingredients
    };

    // Utiliser Ajax pour envoyer les données
    $.ajax({
        type: 'POST',
        url: '/endpoint', // URL de traitement (à remplacer)
        data: JSON.stringify(data), // Convertir les données en JSON
        contentType: 'application/json',
        success: function(response) {
            // Traitement en cas de succès
            console.log("Données envoyées avec succès", response);
        },
        error: function(err) {
            // Traitement en cas d'erreur
            console.log("Erreur lors de l'envoi des données", err);
        }
    });

    // Réinitialiser le formulaire après l'ajout
    $('#form-ajout-recette').trigger('reset');


    // Préparer les quantitée des ingrédients
    var listequantite = $('#???').children().map(function() {
        return $(this).text();
    }).get();

    // Envoi des informations de la liste de quantitées
    $.ajax({
        type: 'POST',
        url: '/endpoint-confirmation', // URL de confirmation (à remplacer)
        data: JSON.stringify({ email: emailDestinataire, cadeaux: cadeaux }),
        contentType: 'application/json',
        success: function(response) {
            // Traitement en cas de succès
            console.log("Confirmation envoyée", response);
            window.location.href = '/page-de-confirmation'; // Redirection (à remplacer)
        },
        error: function(err) {
            // Traitement en cas d'erreur
            console.log("Erreur lors de l'envoi de la confirmation", err);
        }
    });

});