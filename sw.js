//'use strict'
importScripts('sw-toolbox.js')
toolbox.precache(['index.html',"./files/buttons.css","./files/base.css","./files/vicons-font.css","./files/normalize.css","question-maths.html",
"question-physique.html","question-chimie.html","question-histoire.html","question-geographie.html","question-si.html","addquestions.html","liste-maths.html","options.html","database.json",
"getquestions.js","addquestions.js","jquery.min.js","options.js","options.json","questionlist.js"])
// toolbox.router.get('/images/*', toolbox.cacheFirst)
toolbox.router.get('/*',toolbox.networkFirst, {
    networkTimeoutSeconds: 5 })