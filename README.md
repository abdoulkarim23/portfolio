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

Le formulaire ouvre le client mail du visiteur (`mailto:`) vers `arkam.ali_pro@outlook.com`. Les liens email et téléphone restent cliquables en parallèle.

---

## Déployer sur GitHub Pages

Chaque push sur `main` déclenche le build et le déploiement vers la branche `gh-pages`.

---

## Modifier le contenu

Tout le contenu (expérience, projets, compétences, textes) est centralisé dans :

`frontend/src/mock.js`

---

## Licence

Projet personnel — tous droits réservés © Arkam ALI
