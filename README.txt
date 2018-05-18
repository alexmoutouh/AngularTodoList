Todo list : application nodejs et angular.

----------
Pre-requis
----------
-nodejs 8.2.1 minimum
-mongoDB 3.6
-les modules node suivants :
	-path
	-fs
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

------------------------
Configuration du serveur
------------------------
Le fichier servConfig.json contient des informations relatives au port et a l'url 
de la base de donnees mongo. 
Pour changer le port sur lequel lancer le serveur, modifier la valeur du champ 
"port" avec un entier.
Pour changer l'url de la base de donnees mongo, modifier la valeur du champ 
"db" avec une chaine de caracteres representant la nouvelle url. 
	Ex : "mongodb://localhost/TODO" (les " sont a mettre)

-----------------------
Creer un jeu de donnees 
-----------------------
Meme si la base de donnees n'est pas creee, l'utilisation du serveur la cree
automatiquement. Neanmoins, il est possible de la creer et initialiser avec
un jeu de donnees de depart au prealable. Pour cela, exectuer createDBSample.js
avec node : 
"node <chemin_vers_createDBSample.js>"

Un base de donnees sera alors creee a l'url renseignee dans servConfig.json 
(cf Configuration du serveur). Elle contient les collections :
-users remplie avec l'utilisateur : 
	login : "Bob"
	mot de passe : "Bob"
-tasks remplie avec 10 taches nommees "taskI" avec I = 0 -> 9

-----------------
Lancer le serveur
-----------------
Lancer mongodb (mongod.exe) au prealable.
Dans une console, lancer le serveur avec node : 
"node <chemin_vers_serveur.js>"

Le serveur sera lance sur le port renseigne dans servConfig.json 
(cf Configuration du serveur).

-------------------
Utiliser le serveur
-------------------
L'adresse url de la partie client est : http://localhost:<numero_de_port>
L'utilisateur a la possibilite de : 
-Se connecter ou s'inscrire (immediatement connecte dans ce cas la)
-Utiliser la todo list : 
	-Ajouter une tache
	-Supprimer une tache
	-Cocher ou decocher une tache

---------
Remarques
---------
-L'application n'est pas securisee.
-La connexion cree deux cookies pour le login et le mdp. Ils sont valables 1 jour. 
Tant qu'ils ne sont pas expires, l'utilisateur n'a pas besoin de se reconnecter et 
peut directement reacceder a sa todo liste en rentrant son url : 
	http://localhost:<numero_de_port>/#!/todo
Si les cookies ne sont plus valables, l'utilisateur est redirige vers la page de 
connexion.
-Plusieurs utilisateurs peuvent etre connectes en meme temps (depuis des navigateurs 
differents par exemple).
-Un meme utilisateur peut se connecter en meme temps depuis diffrents endroits (depuis 
des navigateurs differents, ou le client du serveur et une appli ionic par exemple). 
Mais s'il se deconnecte, il deviens deconnecte sur toutes ces locations en question.
