# Express-Mysql-Template

Ce projet est un modèle d'application Express.js avec une base de données MySQL et une intégration de Prometheus pour la surveillance.

## Démarrage de l'application avec Docker Compose

1. **Clonez le dépôt**

   ```bash
   git clone <URL_DU_DEPOT>
   cd Express-Mysql-Template

## Créez un fichier `.env`

Copiez le fichier `.env.example` en `.env` et configurez les variables d'environnement selon vos besoins.

## Démarrez les services

Assurez-vous que Docker et Docker Compose sont installés. Exécutez la commande suivante pour construire et démarrer les conteneurs :

```bash
docker-compose up --build
```

## Routes de Base

- `GET /` : Route de base, renvoie un message de succès.
- `GET /users` : Route pour gérer les utilisateurs (voir le fichier `User.route.js` pour plus de détails).
- `GET /metrics` : Expose les métriques pour Prometheus.
- `GET /error-test` : Route de test pour générer une erreur et vérifier le gestionnaire d'erreurs global.

## Structure du Projet

```
└── 📁Express-Mysql-Template
    └── 📁app
        └── 📁configs
            └── Database.js
            └── HTTPStatusCode.js
            └── InitData.js
        └── 📁controllers
            └── User.controller.js
        └── 📁logs
        └── 📁middlewares
            └── Auth.js
            └── ErrorHandler.js
            └── Logger.js
            └── Metrics.js
            └── Response.js
        └── 📁models
            └── User.model.js
        └── 📁routes
            └── User.route.js
        └── 📁utilities
        └── 📁utils
            └── Logger.js
        └── .dockerignore
        └── .env
        └── Dockerfile
        └── Index.js
        └── package-lock.json
        └── package.json
    └── 📁data
    └── 📁monitoring
```
