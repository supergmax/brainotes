database = JSON.parse(localStorage.getItem('database')); //On récupère la database dans les cookies
console.log("Cookie récupéré, database =")
console.log(database)

if (database == null) //Si elle n'est pas là...
	{
		console.log("Pas de cookies, récupération du fichier par défaut")
		$.getJSON("database.json", function(data) {database = data}); //...on récupère les données par défaut du JSON
		localStorage.setItem('database',JSON.stringify(database));
	}

document.form.poids.value = 5;

function addquestion()
	{
		question = document.form.question.value
		console.log(question)
		reponse = document.form.reponse.value
		console.log(reponse)
		poids = parseInt(document.form.poids.value) //On transforme la chaine de texte en nombre entier (tout les lettres ajoutées seront enlevés)
		console.log(poids)
		matiere = document.form.matiere.value.toLowerCase() //On mets en minuscules pour avoir le même format que la database
		console.log(matiere)


		if (question == "" || reponse == "" || document.form.poids.value == "") //On vérifie que les champs ne sont pas vides
			{
				console.log("Il y a des champs vides")
				document.getElementById('warning').textContent = "Il y a des champs vides"
				document.getElementById('warning').color = "red"
				emptyField = true
			}


		alreadyExists = false
		for (let nbQuestion = 0; nbQuestion<database[matiere].length; nbQuestion++) // On vérifie que la question n'existe pas déjà
			{
				if (question == database[matiere][nbQuestion]["question"])
					{
						alreadyExists = true;
						console.log("Cette question existe déjà")
						document.getElementById('warning').textContent = "Cette question existe déjà"
						document.getElementById('warning').color = "red"
						break;
					}
			}
		
		
		if (alreadyExists == false && emptyField == false) // Si il n'y a pas de problème, on enregistre
			{
			console.log("Création d'une nouvelle question")
			document.getElementById('warning').textContent = null
			newquestion = //On construit la nouvelle question avec la même mise en forme que le reste
				{
					"question": question,
					"reponse": reponse,
					"poids": poids
				}

			database[matiere].push(newquestion) //On l'ajoute à la liste et c'est bon
			console.log(database)
			localStorage.setItem('database',JSON.stringify(database));
			document.getElementById('warning').textContent = "Nouvelle question créée et sauvegardée"
			document.getElementById('warning').color = "green"
			}
	}