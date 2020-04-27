console.log("getquestions.js est chargé")
let numeroQuestion; //On dit que le numéro de la question est global
let oldNumeroQuestion;

database = JSON.parse(localStorage.getItem('database')); //On récupère la database dans les cookies
console.log("Cookie récupéré, database =")
console.log(database)

if (database == null) //Si elle n'est pas là...
{
	console.log("Pas de cookies, récupération du fichier par défaut")
	$.getJSON("database.json", function(data)
	{
		database = data; //...on récupère les données par défaut du JSON
		localStorage.setItem('database',JSON.stringify(database));
		questionRandom()
	})
}

else {questionRandom()};

cookieOptions = JSON.parse(localStorage.getItem('options')); //On récupère les options dans les cookies
console.log("Cookie récupéré, options =")
console.log(cookieOptions)

if (cookieOptions == null) //Si elle n'est pas là...
{
	console.log("Pas de cookies, récupération du fichier par défaut")
	$.getJSON("options.json", function(data)
	{
		cookieOptions = data; //...on récupère les données par défaut du JSON
		localStorage.setItem('options',JSON.stringify(cookieOptions));
	})
}

function indexAleatoire(tableau,propriete) //Ca c'est la fonction que j'ai copié de Untitled-1.html qui va calculer la proba par question en prenant le poids
{
	var i;
	var aleatoire;
	var somme;

	somme=0;
	i=tableau.length;
	while(--i>=0)
	{
		somme+=tableau[i][propriete];
	}
	aleatoire=Math.random()*somme;
	somme=0;
	i=tableau.length;
	while(--i>=0)
	{
		if((somme+=tableau[i][propriete])>aleatoire)
		{
		return i;
		}
	}
};

function questionRandom() //Lors de l'appui sur le bouton, cette fonction est appelé
{
	if (database[matiere].length != 0)
	{
		document.getElementById('reponse').textContent = ""; //On supprime la réponse de la question précédente
		oldNumeroQuestion = numeroQuestion
		while (numeroQuestion == oldNumeroQuestion) //Empêche d'avoir la même question 2 fois de suite
			{
				numeroQuestion = indexAleatoire(database[matiere],"poids") //On récupère le numéro de la question choisie par la fonction de random...
			}
		console.log("Affichage de la question")
		document.getElementById('question').textContent = database[matiere][numeroQuestion]["question"]; //...puis on l'affiche sur l'emplacement id="question"
	}
	else
	{
		document.getElementById('question').textContent = "Il n'y a pas de question pour cette matière"
	}
};

function reponse()
{
	if (database[matiere].length != 0)
	{
		document.getElementById('reponse').textContent = database[matiere][numeroQuestion]["reponse"];
	}
	else
	{
		document.getElementById('reponse').textContent = "Il n'y a toujours pas de question pour cette matière"
	}
};

function jeConnais()
{
	if (database[matiere].length != 0)
	{
		if (database[matiere][numeroQuestion]["poids"] != 1) //On vérifie que ça fera pas 0 après
		{
			database[matiere][numeroQuestion]["poids"] = database[matiere][numeroQuestion]["poids"] - cookieOptions.probaJeConnais;
		}
		localStorage.setItem('database',JSON.stringify(database));
		questionRandom()
	}
}

function jeConnaisPas()
{
	if (database[matiere].length != 0)
	{
		database[matiere][numeroQuestion]["poids"] = database[matiere][numeroQuestion]["poids"] + cookieOptions.probaJeConnaisPas;
		localStorage.setItem('database',JSON.stringify(database));
		questionRandom()
	}
}