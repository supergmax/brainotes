console.log("options.js est chargé")

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
		montrerParametres()
	})
}

else {montrerParametres()};

function montrerParametres()
{
	document.form.JeConnais.value = cookieOptions.probaJeConnais
	document.form.JeConnaisPas.value = cookieOptions.probaJeConnaisPas
}

function sauvegarderParametres()
{
	cookieOptions.probaJeConnais = document.form.JeConnais.value
	cookieOptions.probaJeConnaisPas = document.form.JeConnaisPas.value
	localStorage.setItem('options',JSON.stringify(cookieOptions));
	window.location.href="index.html"
}