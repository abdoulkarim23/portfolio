# Portfolio — Arkam ALI

Portfolio personnel de **Arkam ALI**, Ingénieur IA/ML (Production GenAI, RAG, on-premise), déployé sur GitHub Pages.

🔗 **[abdoulkarim23.github.io/portfolio](https://abdoulkarim23.github.io/portfolio)**

---

## Stack technique

- **React 19** — UI
- **React Router v7** — routing avec `basename` GitHub Pages (`/portfolio`)
- **Tailwind CSS** — styling
- **GitHub Pages** — hébergement statique

## Structure du projet

~~~
portfolio/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── 404.html          # Gestion SPA sur GitHub Pages
│   │   └── .nojekyll
│   ├── src/
│   │   ├── components/       # Sections du site
│   │   ├── mock.js           # Toutes les données du portfolio
│   │   └── App.js
│   └── package.json
└── .github/workflows/
    └── deploy.yml            # CI/CD GitHub Actions
~~~

## Lancer en local

```bash
cd frontend
npm install
npm start
```

Avec `homepage` configuré pour GitHub Pages, l'app est servie sur [http://localhost:3000/portfolio](http://localhost:3000/portfolio).

---

## Contact

Le formulaire envoie les messages automatiquement vers `arkam.ali_pro@outlook.com` via [FormSubmit](https://formsubmit.co) (site statique, pas de backend).

**Activation (une seule fois)** : clique **ACTIVATE FORM** dans le mail FormSubmit. Le formulaire utilise ensuite la clé `5f89ddc9d69312d3a3a5d9e709830ec8` (l'email n'apparaît plus dans le code). Chaque visiteur te fait arriver un vrai email, avec Reply-To sur son adresse.

---

## Déployer sur GitHub Pages

Chaque push sur `main` déclenche le build et le déploiement vers la branche `gh-pages`.

---

## Modifier le contenu

Le contenu (expérience, projets, compétences, textes FR/EN) est centralisé dans :

`frontend/src/mock.js`

Le bouton **FR | EN** dans la barre de navigation bascule toute la page. Le choix est mémorisé dans le navigateur.

---

## Licence

Projet personnel — tous droits réservés © Arkam ALI
