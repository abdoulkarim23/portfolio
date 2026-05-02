// Mock data — portfolio Arkam ALI
// Tout est centralisé ici pour faciliter l'intégration backend plus tard.

export const personal = {
  name: "Arkam ALI",
  initials: "AA",
  title: "Ingénieur ML / GenAI / RAG",
  tagline:
    "Je conçois des systèmes d'IA générative — recherche sémantique, RAG et agents LLM — du prototype à la production.",
  location: "Paris, Île-de-France",
  email: "arkam.ali_pro@outlook.com",
  phone: "06 41 52 86 44",
  status: "Recherche alternance 12 mois • Septembre 2026",
  github: "https://github.com/abdoulkarim23",
  linkedin: "https://www.linkedin.com/in/abdoulkarim-ali-25825b212",
  company: {
    name: "Conjectura",
    url: "https://conjectura.fr",
    role: "Entreprise partenaire",
  },
};

export const about = {
  heading: "À propos",
  paragraphs: [
    "Élève-ingénieur spécialisé en Intelligence Artificielle et Machine Learning, je travaille quotidiennement sur des systèmes de recherche sémantique, des bases vectorielles (FAISS) et des architectures de type RAG.",
    "Mon terrain de jeu : les LLMs, l'IA générative, le prompt engineering et les agents autonomes. J'aime mettre en production des assistants IA fiables, rapides et bien évalués.",
    "En parallèle de mes études à CY Tech, je collabore avec Conjectura sur des projets data & IA concrets pour accélérer la mise en production d'outils intelligents.",
  ],
  highlights: [
    { label: "Années en IA/Data", value: "3+" },
    { label: "Projets RAG livrés", value: "5" },
    { label: "Langues parlées", value: "4" },
    { label: "Stack principale", value: "Python" },
  ],
};

export const skills = [
  {
    category: "GenAI & NLP",
    icon: "Sparkles",
    items: [
      "RAG",
      "Embeddings",
      "FAISS",
      "Recherche sémantique",
      "Prompt engineering",
      "Transformers",
      "Hugging Face",
    ],
  },
  {
    category: "ML / Data",
    icon: "BrainCircuit",
    items: [
      "Python",
      "scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Analyse de données",
      "Modélisation prédictive",
    ],
  },
  {
    category: "Ingénierie",
    icon: "Terminal",
    items: [
      "SQL",
      "API REST",
      "FastAPI",
      "Docker",
      "Git",
      "Dataiku",
      "Spark",
    ],
  },
  {
    category: "Cloud",
    icon: "Cloud",
    items: ["GCP", "Azure", "BigQuery"],
  },
];

export const experiences = [
  {
    id: "exp-1",
    role: "Data Scientist / IA Engineer",
    company: "État-major des armées — CIMD",
    period: "En cours",
    location: "Paris",
    description:
      "Conception et mise en production d'un moteur de recherche sémantique et d'une architecture RAG pour interroger des jeux de données métier complexes.",
    achievements: [
      "Moteur de recherche sémantique basé sur embeddings multilingual-e5-large + indexation vectorielle FAISS.",
      "Architecture RAG de bout en bout pour interrogation de corpus métier.",
      "Benchmark de modèles NLP pour améliorer la précision et la pertinence.",
      "Interfaces utilisateur CLI + Streamlit pour un usage opérationnel.",
      "Tableaux de bord et KPIs sous QlikSense pour le suivi des données.",
    ],
    stack: ["Python", "FAISS", "Transformers", "Streamlit", "QlikSense"],
  },
  {
    id: "exp-2",
    role: "Collaborateur IA / Data",
    company: "Conjectura",
    period: "En cours",
    location: "France",
    description:
      "Projets data & IA pour des clients variés : de la data pipeline à l'assistant conversationnel, en passant par la mise en production cloud.",
    achievements: [
      "Conception d'assistants IA basés sur des LLMs et du retrieval augmenté.",
      "Industrialisation de pipelines de données multi-sources.",
      "Accompagnement technique et intégration produit.",
    ],
    stack: ["Python", "LLMs", "RAG", "Cloud", "Docker"],
  },
];

export const projects = [
  {
    id: "proj-1",
    title: "Chatbot RAG",
    subtitle: "Projet personnel",
    summary:
      "Chatbot de recherche contextuelle de documents avec réduction des hallucinations grâce à un découpage optimisé et une injection de contexte maîtrisée.",
    bullets: [
      "Embeddings + FAISS pour la recherche sémantique",
      "Optimisation du chunking et injection de contexte",
      "Interface interactive Streamlit",
    ],
    tags: ["RAG", "FAISS", "LLM", "Streamlit", "Python"],
    repo: "https://github.com/abdoulkarim23",
    year: "2025",
  },
  {
    id: "proj-2",
    title: "Pipeline de données — Dataiku",
    subtitle: "Industrialisation",
    summary:
      "Pipeline multi-sources industrialisé : nettoyage, transformation, et exposition des données via une API REST prête à être consommée.",
    bullets: [
      "Ingestion multi-sources & contrôle qualité",
      "Transformations robustes et versionnées",
      "Exposition via API pour consommation produit",
    ],
    tags: ["Dataiku", "ETL", "API REST", "SQL"],
    repo: "https://github.com/abdoulkarim23",
    year: "2024",
  },
  {
    id: "proj-3",
    title: "Système de recommandation",
    subtitle: "Java",
    summary:
      "Moteur de recommandation personnalisé basé sur les préférences utilisateurs et une approche hybride.",
    bullets: [
      "Filtrage collaboratif + basé sur le contenu",
      "Scoring et ranking personnalisés",
      "Évaluation offline sur dataset de test",
    ],
    tags: ["Java", "Recommender", "Algorithmes"],
    repo: "https://github.com/abdoulkarim23",
    year: "2023",
  },
];

export const education = [
  {
    id: "edu-1",
    school: "CY Tech",
    degree: "Diplôme d'ingénieur",
    field: "Mathématiques appliquées & Informatique",
    period: "En cours",
  },
  {
    id: "edu-2",
    school: "ENSGSI",
    degree: "Cycle ingénieur",
    field: "Génie des systèmes industriels & innovation",
    period: "2021 — 2023",
  },
  {
    id: "edu-3",
    school: "CPGE TSI",
    degree: "Classes préparatoires",
    field: "Technologie & Sciences Industrielles",
    period: "2018 — 2021",
  },
];

export const languages = [
  { name: "Français", level: "Langue maternelle", value: 100 },
  { name: "Swahili", level: "Bilingue", value: 95 },
  { name: "Anglais", level: "Courant", value: 85 },
  { name: "Arabe", level: "Professionnel", value: 70 },
];

export const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#experience", label: "Expérience" },
  { href: "#projects", label: "Projets" },
  { href: "#education", label: "Formation" },
  { href: "#conjectura", label: "Conjectura" },
  { href: "#contact", label: "Contact" },
];
