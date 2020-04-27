database = JSON.parse(localStorage.getItem('database')); //On récupère la database dans les cookies
console.log("Cookie récupéré, database =")
console.log(database)

if (database == null) //Si elle n'est pas là...
	{
		noDatabase = true // On a besoin que la database soit chargé, pas le temps d'attendre pour écrire avec document.writeln()
	}


try
{
	console.log("Début du script")
	for (let nbInList = 0; nbInList<database[matiere].length; nbInList++)
		{
			document.writeln('<div class="box bg-1" style="padding: 1em 0;">')
			document.writeln('<form name="' + nbInList + '" >')
			document.writeln('<p class="button button--round-l button--text-medium"><font size="4">Question :  </font></p>')
			document.writeln('<input type="text" name="question" placeholder="Question" value="' + database[matiere][nbInList]["question"] + '" class="button button--antiman button--round-l button--text-medium" style="margin: 0; max-width: 370px; height: 0;" size=300><br><br><br><br><br>')
			document.writeln('<p class="button button--round-l button--text-medium"><font size="4">Réponse :</font></p>')
			document.writeln('<input type="text" name="reponse" placeholder="Réponse" value="' + database[matiere][nbInList]["reponse"] + '" class="button button--antiman button--round-l button--text-medium" style="margin: 0; max-width: 370px; height: 0;" size=300><br><br><br><br><br>')
			document.writeln('<p class="button button--round-l button--text-medium"><font size="4">Poid :</font></p>')
			document.writeln('<input type="text" name="poids" placeholder="Poids" value="' + database[matiere][nbInList]["poids"] + '" class="button button--antiman button--round-l button--text-medium" style="margin: 0; max-width: auto; height: 0;" size=300>')
			document.writeln('<p class="button button--round-l button--text-medium"><font size="4">Matière :</font></p>')
			if (matiere == "maths")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option selected>MATHS</option><option>PHYSIQUE</option><option>CHIMIE</option><option>HISTOIRE</option><option>GEOGRAPHIE</option><option>SI</option><option>PERSO</option></select>')
				}
			else if (matiere == "physique")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option selected>PHYSIQUE</option><option>CHIMIE</option><option>HISTOIRE</option><option>GEOGRAPHIE</option><option>SI</option><option>PERSO</option></select>')
				}
			else if (matiere == "chimie")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option>PHYSIQUE</option><option selected>CHIMIE</option><option>HISTOIRE</option><option>GEOGRAPHIE</option><option>SI</option><option>PERSO</option></select>')
				}
			else if (matiere == "histoire")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option>PHYSIQUE</option><option>CHIMIE</option><option selected>HISTOIRE</option><option>GEOGRAPHIE</option><option>SI</option><option>PERSO</option></select>')
				}
			else if (matiere == "geographie")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option>PHYSIQUE</option><option>CHIMIE</option><option>HISTOIRE</option><option selected>GEOGRAPHIE</option><option>SI</option><option>PERSO</option></select>')
				}
			else if (matiere == "si")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option>PHYSIQUE</option><option>CHIMIE</option><option>HISTOIRE</option><option>GEOGRAPHIE</option><option selected>SI</option><option>PERSO</option></select>')
				}
			else if (matiere == "perso")
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option>PHYSIQUE</option><option>CHIMIE</option><option>HISTOIRE</option><option>GEOGRAPHIE</option><option>SI</option><option selected>PERSO</option></select>')
				}
			else
				{
					document.writeln('<select name="matiere" class="button button--antiman button--round-l button--text-medium" style="margin: 0;"><option>MATHS</option><option>PHYSIQUE</option><option>CHIMIE</option><option>HISTOIRE</option><option>GEOGRAPHIE</option><option>SI</option><option>PERSO</option></select>')
					console.log("Erreur : La matière n'est pas dans la liste")
				}
				document.writeln('</form>')
				document.writeln('</div>')
				document.writeln('<hr>')
				console.log("Question chargée")
		}
		console.log("Fin du script")
}
catch(error)
{
	console.error(error)
	if (noDatabase == true)
	{
		document.write("Vous devez télécharger les questions avant d'afficher cette page.<br><button onclick='questionlisterror()'>Cliquez ici</button>")
	}
}

function questionlisterror()
{
	$.getJSON("database.json", function(data) {
		database = data;
		console.log(database)
		localStorage.setItem('database',JSON.stringify(database));
		console.log(JSON.parse(localStorage.getItem('database')));
		window.location.href=""
	});
}

function sauvegarderQuestions()
{	
	oldLength = database[matiere].length
	database[matiere] = []
	console.log(matiere)
	console.log(database[matiere])
	for(let nbInList = 0; nbInList<oldLength; nbInList++)
	{
		question = document[nbInList].question.value
		console.log(question)
		reponse = document[nbInList].reponse.value
		console.log(reponse)
		poids = parseInt(document[nbInList].poids.value) //On transforme la chaine de texte en nombre entier (tout les lettres ajoutées seront enlevés)
		console.log(poids)
		matiereQuestion = document[nbInList].matiere.value.toLowerCase() //On mets en minuscules pour avoir le même format que la database
		console.log(matiereQuestion)

		newquestion = //On construit la nouvelle question avec la même mise en forme que le reste
			{
				"question": question,
				"reponse": reponse,
				"poids": poids
			}
		
		database[matiere].push(newquestion) //On l'ajoute à la liste et c'est bon
	}
	console.log(database)
	localStorage.setItem('database',JSON.stringify(database));
	window.location.href=""
}