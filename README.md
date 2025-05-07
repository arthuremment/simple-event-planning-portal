# Simple Event Planning Portal

## 🎯 Objectif du projet

Développer une application web simple de gestion d'événements permettant aux administrateurs de gérer des événements et aux clients de les consulter et de réserver leur place.

## 🚀 Fonctionnalités principales

### Pour l'administrateur

- 🔍 Voir la liste de tous les événements créés
- ➕ Créer un nouvel événement
- ✏️ Modifier un événement existant
- ❌ Supprimer un événement
- 👥 Consulter les réservations d’un événement

Chaque événement comprend :
- Titre / Nom
- Description
- Date et heure
- Lieu
- Capacité (nombre de places disponibles)
- (Optionnel) Image ou catégorie

### Pour les clients

- 📋 Voir la liste des événements disponibles
- 🔎 Consulter les détails d’un événement sélectionné
- 📝 Réserver une place à un événement (si des places sont encore disponibles)

## 🧠 Gestion des données et état

J’ai choisi **Zustand** pour gérer l’état de l’application, avec persistance dans le **localStorage** afin d’assurer la sauvegarde des données même après un rechargement de la page. Cette solution est simple, légère, et parfaitement adaptée à un projet sans réel backend.

L’approche adoptée permet également une séparation claire des rôles (admin / client), et une potentielle évolution vers un backend réel (API REST ou GraphQL).

## 🌟 Fonctionnalités Bonus implémentées

- 🔐 Authentification basique pour différencier les rôles admin et client
- 🔍 Recherche d’événements (Barre de recherche dynamique)
- 🗂️ Filtres et tri (par date, lieu, catégorie)
- 🧾 Historique des réservations du client
- 💾 Persistance locale des données

## 🧱 Architecture

```plaintext
/src
├── 📁 store          # 🗄 Stores Zustand
├── 📁 components     # 🧩 Composants React réutilisables
├── 📁 pages          # 🖥 Vues principales (Admin/Client)
├── 📁 utils          # 🛠 Helpers
└── 📁 assets         # 🖼 Images
\`\`\`
```

## 🛠 Stack Technique

- **React** : pour la création des interfaces utilisateur
- **Zustand** : gestion d’état globale avec persistance
- **React Router** : pour la navigation entre pages
- **Tailwind CSS** : pour un style simple, clair et responsive
- **Lucide React** : pour les icones

L’architecture est modulaire et orientée composants pour favoriser la réutilisabilité et la séparation des responsabilités. Cela permettrait d’adapter l’interface aussi bien à une plateforme web qu’à une application mobile.

## ⚙️ Installation et exécution

1. Clonez ce dépôt:

```bash
git clone https://github.com/arthuremment/simple-event-planning-portal
```
   
2. Installez les dépendances :

```bash
npm install
```

3. Lancez l’application en développement :

```bash
npm run dev
```

## 💡 Hypothèses et simplifications

- Aucune base de données externe n’est utilisée (tout est en localStorage)
- L’authentification est simulée (sans sécurité avancée)
- Aucune gestion de compte utilisateur réelle (email/mot de passe)
- Une seule session utilisateur à la fois

## 🧠 Niveau de séniorité revendiqué

Je me positionne à un **niveau intermédiaire/avancé** :

- J’ai su organiser l’application en couches claires (logique / UI)
- J’ai utilisé un outil de gestion d’état adapté et extensible
- J’ai pensé à l’évolutivité (ex : séparation admin/client, gestion d’état centralisée, architecture modulaire)
- J’ai implémenté plusieurs bonus optionnels de manière complète

## 📚 Outils et bibliothèques principalement utilisés

- React
- Zustand
- Tailwind CSS
- localStorage (pour la persistance)

## 📬 Contact

N’hésitez pas à me contacter pour toute question ou suggestion !
