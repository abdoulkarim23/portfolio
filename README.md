# Portfolio — Arkam ALI

Portfolio personnel de **Arkam ALI**, Ingénieur ML / GenAI / RAG, déployé sur GitHub Pages.

🔗 **[abdoulkarim23.github.io/portfolio](https://abdoulkarim23.github.io/portfolio)**

---

## Stack technique

- **React 19** — UI
- **React Router v7** — routing avec `basename="/portfolio"`
- **Tailwind CSS** — styling
- **EmailJS** — envoi de formulaire de contact sans backend
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
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Conjectura.jsx
│   │   │   ├── Contact.jsx   # Formulaire EmailJS
│   │   │   └── Footer.jsx
│   │   ├── mock.js           # Toutes les données du portfolio
│   │   └── App.js
│   └── package.json
└── github/
    └── workflows/
        └── deploy.yml        # CI/CD GitHub Actions
~~~

## Lancer en local

```bash
cd frontend
npm install
npm start
```

L'app tourne sur [http://localhost:3000](http://localhost:3000).

---

## Configurer le formulaire de contact (EmailJS)

Le formulaire envoie les messages directement sur `arkam.ali_pro@outlook.com` via EmailJS, sans backend.

### 1. Créer un compte EmailJS

Rendez-vous sur [emailjs.com](https://www.emailjs.com) et créez un compte gratuit (200 emails/mois).

### 2. Connecter Outlook

Dashboard → **Email Services** → **Add New Service** → choisir **Outlook** → autoriser l'accès.

Copie le **Service ID** généré (ex: `service_abc123`).

### 3. Créer un template

Dashboard → **Email Templates** → **Create New Template** :

- **To email** : `arkam.ali_pro@outlook.com`
- **Subject** : `Nouveau message portfolio — {{name}}`
- **Body** :
Nom : {{name}}
Email : {{email}}
Message :
{{message}}

Copie le **Template ID** généré (ex: `template_xyz789`).

### 4. Récupérer la Public Key

Dashboard → **Account** → **General** → copie ta **Public Key**.

### 5. Mettre à jour Contact.jsx

Dans `frontend/src/components/Contact.jsx`, remplace les 3 constantes :

```js
const EMAILJS_SERVICE_ID  = "service_abc123";
const EMAILJS_TEMPLATE_ID = "template_xyz789";
const EMAILJS_PUBLIC_KEY  = "AbCdEfGhIjKlMnOpQr";
```

---

## Déployer sur GitHub Pages

Chaque push sur `main` déclenche automatiquement le build et le déploiement :

```bash
git add .
git commit -m "feat: mise à jour du portfolio"
git push origin main
```

---

## Modifier le contenu

Tout le contenu est centralisé dans un seul fichier :
frontend/src/mock.js

---

## Licence

Projet personnel — tous droits réservés © Arkam ALI
