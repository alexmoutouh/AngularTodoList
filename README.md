# Todo list : application nodejs et angular.

## Pre-requis
- nodejs 8.2.1 minimum
- mongoDB 3.6
- les modules node suivants :
	- path
	- fs
	- url
	- express
	- body-parser
	- uuid/v4
	- mongoose

## Logiciels utilisés
- MongoDB Compass version 1.13.1 pour le debug des bases de donnees

## Configuration du serveur
Le fichier servConfig.json contient des informations relatives au port et à l'url 
de la base de donnees mongo. 
Pour changer le port sur lequel lancer le serveur, modifier la valeur du champ 
"port" avec un entier.
Pour changer l'url de la base de donnees mongo, modifier la valeur du champ 
"db" avec une chaine de caracteres representant la nouvelle url. 
	Ex : "mongodb://localhost/TODO" (les " sont a mettre)

## Creer un jeu de données 
Même si le serveur la crée automatiquement, il est possible de la construire et 
initialiser avec un jeu de donnees de départ au préalable. Pour cela, exéctuer 
createDBSample.js avec node : 
"node <chemin_vers_createDBSample.js>"

Une base de données sera alors créée a l'url renseignée dans servConfig.json 
(cf Configuration du serveur). Elle contient les collections :
- users, remplie avec l'utilisateur : 
	login : "Bob"
	mot de passe : "Bob"
- tasks, remplie avec 10 taches

## Lancer le serveur
Lancer mongodb (mongod.exe) au préalable.
Dans une console, lancer le serveur avec node : 
"node <chemin_vers_serveur.js>"

Le serveur sera lancé sur le port renseigné dans servConfig.json 
(cf Configuration du serveur).

## Utiliser le serveur
L'adresse url de la partie client est : http://localhost:<numero_de_port>
L'utilisateur a la possibilité de : 
- Se connecter ou s'inscrire (immédiatement connecté dans ce cas)
- Utiliser la todo list : 
	- Ajouter une tâche
	- Supprimer une tâche
	- Cocher ou décocher une tâche

## Remarques
- L'application n'est pas securisée (ce n'était pas le sujet du projet).
- La connexion crée deux cookies pour le login et le mdp. Ils sont valables 1 jour. 
Tant qu'ils ne sont pas expirés, l'utilisateur n'a pas besoin de se reconnecter et 
peut directement acceder de nouveau à sa todo liste en rentrant son url : 
	http://localhost:<numero_de_port>/#!/todo
Les cookies sont valables tant que la date d'expiration n'est pas arrivée à son terme 
ou qu'un autre utilisateur ne s'est pas connecté sur le même navigateur (dans ce cas les 
cookies sont ecrasés avec les informations du nouvel utilisateur).
Ainsi, il est vivement conseillé à l'utilisateur de se déconnecter en cliquant sur le 
bouton de deconnexion une fois qu'il a fini d'utiliser l'application pour éviter le risque 
qu'un autre utilisateur puisse potentiellement accéder à son compte.
Si les cookies ne sont plus valables, l'utilisateur est redirigé vers la page de 
connexion.
- Plusieurs utilisateurs peuvent etre connectés en meme temps (depuis des navigateurs 
differents par exemple).
- Un même utilisateur peut se connecter en même temps depuis diffrents endroits (depuis 
des navigateurs differents, ou le client du serveur et une appli ionic par exemple). 
Mais s'il se déconnecte, il devient déconnecté sur toutes ces locations.
