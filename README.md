# Projet n°7 OpenClassrooms

## Création d'un réseau social d'entreprise pour Groupomania

Cloner le repository et suivez les instructions ci-après pour exécuté  ce projet en local
Pour des raisons pédégalogique j'ai laissé le fichier .env sur mon compte Github, merci de bien vouloir remplacer les valeurs des variables d'environnements par les vôtres .

## prérequis

- Installer Node.js
- Installer Express
- Installer MySQL 2
- installer Sequelize
- Installer Vue.js


## Base de données MySQL

- Ouvrez votre terminal
- Connectez-vous à MySQL : `mysql -h localhost -u root -p`
- Tapez votre mot de passe
- Créez la base de données : `CREATE DATABASE Groupomania CHARACTER SET 'utf8';`
- Utilisez la base de données créée : `USE Groupomania`
- Importez le fichier Groupomania.sql : `SOURCE Groupomania.sql;`
- Allez dans le Dossier api, ensuite ouvrez le fichier config.js renseignez votre mot de passe dans password:'xxxxxx'

## Installation des modules et configuration de l'API 

- Ouvrez votre terminal
- Allez dans le dossier api : `cd/api`
- Installez toutes les dépendances du projet : `npm install`
- Démarrez le serveur Node.js : `nodemon server`

## Installation des modules et démarrage de l'application

- ouvrez votre terminal
- Revenir au dossier parent avec la commande `cd ..`, ensuite vérifier si vous êtes dans le dossier `/Projet7-OC-master`
- Installez toutes les dépendances du projet : `npm install`.
- Démarrez l'application : `npm run serve`

## Testez l'application

- Ouvrez votre navigateur et allez sur : `http://localhost:8080/`
