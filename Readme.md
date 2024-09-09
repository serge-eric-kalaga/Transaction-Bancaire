
---

# Application de Transaction Bancaire

Cette application est une API bancaire construite avec Express.js, fournissant des routes pour la gestion des comptes, transactions et utilisateurs. Elle inclut des outils de monitoring avec Prometheus et Grafana, et fonctionne entièrement avec Docker Compose.

## Prérequis

- Docker
- Docker Compose

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/serge-eric-kalaga/Transaction-Bancaire.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd Transaction-Bancaire
   ```

3. Lancez l'application avec Docker Compose :

   ```bash
   docker-compose up --build
   ```

   Cela démarre l'API ainsi que la base de données MySQL et les outils de monitoring (Prometheus et Grafana).

## Monitoring avec Grafana

Les métriques sont surveillées avec Prometheus et visualisées sur Grafana. Après avoir démarré l'application, accédez à Grafana via :

- **Grafana** : `http://localhost:3030`
- **Prometheus** : `http://localhost:9091`

### Importation du dashboard

1. Téléchargez le fichier `dashboard_ExpressJS (Transaction Bancaire).json` dans le répertoire `data/grafana/provisioning/dashboards/`.
2. Accédez à Grafana via `http://localhost:3030`.
3. Cliquez sur le bouton `Plus` en haut à droite de la page.
4. Sélectionnez `Import` et choisissez le fichier `dashboard_ExpressJS (Transaction Bancaire)-1725888412968.json`.
5. Cliquez sur `Import`.
6. Une fois le fichier importé, cliquez sur `Home` en haut à droite de la page.
7. Cliquez sur `Explorer`.
8. Sélectionnez le dashboard `ExpressJS (Transaction Bancaire)` et cliquez sur `Open`.
9. Cliquez sur `Save`.

### Métriques disponibles sur Grafana

- Requêtes HTTP par statut (200, 400, 500, etc.)
- Requêtes HTTP par méthode (GET, POST, PUT, DELETE)
- Durée des requêtes (latence moyenne)
- Nombre total de requêtes HTTP
- Utilisation du CPU
- Utilisation de la mémoire

## Base de données (PHPMyAdmin)

- URL : `http://localhost:8082`
- Nom d'utilisateur : `serge`
- Mot de passe : `1234567890`

## Routes de l'API

### Comptes

- `GET /comptes/` : Récupère tous les comptes
- `POST /comptes/` : Crée un nouveau compte
- `GET /comptes/:numero_compte` : Récupère un compte par son numéro
- `PATCH /comptes/:numero_compte` : Met à jour un compte
- `DELETE /comptes/:numero_compte` : Supprime un compte

### Transactions

- `GET /transactions/` : Récupère toutes les transactions
- `POST /transactions/` : Crée une nouvelle transaction
- `GET /transactions/:numero_compte` : Récupère les transactions d’un compte spécifique
- `DELETE /transactions/:id` : Supprime une transaction

### Utilisateurs

- `GET /users/` : Récupère tous les utilisateurs
- `POST /users/register` : Crée un nouvel utilisateur
- `POST /users/login` : Connexion d'un utilisateur
- `GET /users/:username` : Récupère un utilisateur par nom d'utilisateur
- `PATCH /users/:username` : Met à jour un utilisateur
- `DELETE /users/:username` : Supprime un utilisateur

## Tests

Vous pouvez tester l'API en important la collection Postman fournie : `collection_TransactionBancaire.json`. Cette collection contient toutes les requêtes de test.

1. Ouvrez Postman.
2. Importez la collection.
3. Exécutez les requêtes et vérifiez les réponses.

---