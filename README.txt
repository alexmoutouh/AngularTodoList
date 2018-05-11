Todo list : application nodejs et angular.

----------
Pre-requis
----------
-nodejs 8.2.1 minimum
-mongoDB 3.6
-les modules node suivants :
	-path
	-url
	-express
	-body-parser
	-uuid/v4
	-mongoose
Les modules sont deja installes dans le dossier node-modules. Si erreur, utiliser npm 
pour les reinstaller.

------------------
Logiciels utilises
------------------
-MongoDB Compass version 1.13.1 pour le debug des bases de donnees

-----------------------
Creer un jeu de donnees 
-----------------------
Meme si la base de donnees n'est pas creee, l'utilisation du serveur la cree
automatiquement. Neanmoins, il est possible de la creer et initialiser avec
un jeu de donnees de depart au prealable. Pour cela, exectuer createDBSample.js
avec node : 
"node <chemin_vers_createDBSample.js>"

Un base de donnees nommee todo sera alors creee. Elle contient la collection 
-users remplie avec l'utilisateur "Bob Bob"
-tasks remplie avec 50 taches nommees "taskI" avec I = 0 -> 49

-----------------
Lancer le serveur
-----------------
Lancer mongodb (mogod.exe) au prealable.
Dans une console, lancer le serveur avec node.
usage : "node <chemin_vers_serveur.js> <numero_de_port>"

-------------------
Utiliser le serveur
-------------------
-Se connecter ou s'inscrire(immediatement connecte dans ce cas)
-Utiliser la todo list : 
	-Ajouter tache
	-Supprimer tache
	-Cocher tache
