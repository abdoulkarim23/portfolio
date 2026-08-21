// Données du portfolio — Arkam ALI
// Tout le contenu est centralisé ici.

export const personal = {
  name: "Arkam ALI",
  initials: "AA",
  title: "Ingénieur IA/ML — Production GenAI",
  tagline:
    "Je conçois et déploie des systèmes GenAI de production — RAG, recherche sémantique et serving de LLMs — y compris on-premise et air-gapped, sans dépendance cloud.",
  location: "Paris, France",
  email: "arkam.ali_pro@outlook.com",
  phone: "06 41 52 86 44",
  status: "Stage HENSOLDT (Allemagne) • GenAI on-premise",
  github: "https://github.com/abdoulkarim23",
  linkedin: "https://www.linkedin.com/in/abdoulkarim-ali-25825b212",
  planquia: "https://planquia.com",
  company: {
    name: "Conjectura",
    url: "https://conjectura.fr",
    role: "Co-fondateur & CTO",
    product: "Planquia",
  },
  chips: [
    "Production GenAI",
    "RAG hybride",
    "On-premise / air-gapped",
    "vLLM · FAISS",
  ],
};

export const heroStats = [
  { label: "Hit@1 NCORE AI", value: "19% → 31%" },
  { label: "Latence / document", value: "~22s" },
  { label: "Infra", value: "NVIDIA DGX" },
  { label: "Contexte", value: "Air-gapped" },
];

export const about = {
  heading: "Des systèmes GenAI qui tiennent en production",
  paragraphs: [
    "Ingénieur IA/ML, je construis des systèmes GenAI de production — RAG, recherche sémantique et serving de LLMs — avec une ownership de bout en bout : préparation des données, modélisation, évaluation et optimisation de latence.",
    "Mon terrain de jeu distinctif : le déploiement on-premise et air-gapped, sans dépendance cloud. J'ai conçu et industrialisé ces stacks en environnement défense — chez HENSOLDT (Allemagne) et à l'État-major des armées (CIMD) — sur infrastructure contrainte (vLLM, FAISS, NVIDIA DGX).",
    "En parallèle, je suis co-fondateur & CTO de Conjectura. J'y développe Planquia, un SaaS qui transforme des plans PDF de construction en devis structurés via un pipeline multimodal (OCR, vision, raisonnement LLM).",
  ],
  highlights: [
    { label: "Hit@1 NCORE AI", value: "+12 pts" },
    { label: "Latence / document", value: "~22s" },
    { label: "Déploiement", value: "Air-gapped" },
    { label: "Langues parlées", value: "4" },
  ],
};

export const skills = [
  {
    category: "On-premise & serving",
    icon: "Server",
    featured: true,
    items: [
      "vLLM",
      "Serving local / air-gapped",
      "NVIDIA DGX",
      "Optimisation GPU / unified memory",
      "CPU offloading",
      "Quantization NVFP4",
      "Profiling de latence",
    ],
  },
  {
    category: "GenAI & LLMs",
    icon: "Sparkles",
    featured: true,
    items: [
      "RAG",
      "multilingual-e5-large",
      "FAISS",
      "BM25",
      "RRF",
      "BGE-Reranker",
      "Prompt engineering",
      "LangChain",
      "Mistral",
      "BERT",
      "OpenAI & Anthropic",
    ],
  },
  {
    category: "Langages & ML",
    icon: "BrainCircuit",
    items: [
      "Python",
      "SQL",
      "Java",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Transformers",
      "Hugging Face",
    ],
  },
  {
    category: "Ingénierie & MLOps",
    icon: "Terminal",
    items: [
      "Pipelines ML end-to-end",
      "FastAPI",
      "REST API",
      "Docker",
      "Git",
      "CI/CD",
      "Tests unitaires",
      "Harness d'évaluation",
      "Clean Code",
      "Agile / Scrum",
    ],
  },
  {
    category: "Data & outils",
    icon: "Database",
    items: [
      "Streamlit",
      "Dataiku",
      "Spark",
      "MongoDB",
      "PostgreSQL",
      "QlikSense",
      "GCP / Azure (bases)",
    ],
  },
];

export const experiences = [
  {
    id: "exp-hensoldt",
    role: "Software Engineer — AI",
    kind: "Stage international",
    company: "HENSOLDT",
    period: "Juin — Sept. 2026",
    location: "Fürstenfeldbruck, Allemagne",
    current: true,
    description:
      "Conception et déploiement de NCORE AI, un système RAG de bout en bout pour l'identification des codes NATO Item Name à partir de PDFs techniques — en environnement air-gapped, sans cloud.",
    achievements: [
      "Déploiement sur NVIDIA DGX Spark avec vLLM, optimisé pour une infrastructure contrainte (GPU / unified memory, CPU offloading, quantization NVFP4).",
      "Pipeline de retrieval hybride : FAISS + BM25 + Reciprocal Rank Fusion, reranking cross-encoder BGE, génération Mistral-Small-4.",
      "Ingestion PDF multimodale (vision) et garde-fou de traduction pour un corpus technique multilingual.",
      "Harness d'évaluation : Hit@1 porté de 19 % à 31 %, latence ramenée à ~22 s par document.",
    ],
    stack: [
      "vLLM",
      "FAISS",
      "BM25",
      "RRF",
      "BGE-Reranker",
      "Mistral-Small-4",
      "NVIDIA DGX",
      "Python",
    ],
  },
  {
    id: "exp-cimd",
    role: "Data Scientist / AI Engineer",
    kind: "Alternance",
    company: "État-major des armées — CIMD",
    period: "Sept. 2024 — Août 2026",
    location: "Paris",
    current: false,
    description:
      "Mise en production d'un moteur de recherche sémantique et d'un assistant IA pour la codification NATO, en environnement on-premise sécurisé.",
    achievements: [
      "Moteur de recherche sémantique (RAG) pour la codification NATO, embeddings multilingual-e5-large et indexation vectorielle FAISS.",
      "Assistant IA (Mistral + RAG) pour interroger les règles NATO, avec injection de contexte maîtrisée.",
      "Interfaces opérationnelles CLI + Streamlit pour un usage métier quotidien.",
      "Tableaux de bord et KPIs sous QlikSense, dans un SI on-premise contraint.",
    ],
    stack: [
      "Python",
      "RAG",
      "FAISS",
      "Mistral",
      "multilingual-e5-large",
      "Streamlit",
      "QlikSense",
    ],
  },
  {
    id: "exp-conjectura",
    role: "Co-fondateur & CTO",
    kind: "Entrepreneuriat",
    company: "Conjectura — Planquia",
    period: "2026 — Présent",
    location: "Paris",
    current: true,
    description:
      "Lead developer de Planquia, un SaaS IA qui convertit des plans PDF de construction en devis structurés. Architecture, backend et roadmap produit.",
    achievements: [
      "Pipeline IA multimodal : OCR, computer vision et raisonnement LLM pour extraire et structurer l'information des plans.",
      "Stack full-stack : Python, FastAPI, SQLAlchemy, React / Next.js, PostgreSQL.",
      "Ownership produit : architecture, API, qualité de code et priorisation de la roadmap.",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Next.js", "PostgreSQL", "OCR", "LLM"],
  },
];

export const projects = [
  {
    id: "proj-ncore",
    title: "NCORE AI",
    subtitle: "HENSOLDT",
    year: "2026",
    featured: true,
    confidential: true,
    summary:
      "Système RAG de production pour identifier les codes NATO Item Name à partir de documentations techniques PDF — déployé on-premise sur NVIDIA DGX Spark, en air-gapped.",
    bullets: [
      "Retrieval hybride FAISS + BM25 + RRF, reranking BGE, Mistral-Small-4 via vLLM",
      "Ingestion PDF multimodale (vision) et garde-fou de traduction",
      "Évaluation : Hit@1 19 % → 31 %, ~22 s / document",
    ],
    metrics: [
      { label: "Hit@1", value: "19% → 31%" },
      { label: "Latence", value: "~22s / doc" },
    ],
    tags: ["RAG", "vLLM", "FAISS", "BGE", "Mistral", "NVIDIA DGX", "Air-gapped"],
  },
  {
    id: "proj-nato-rag",
    title: "Recherche sémantique NATO",
    subtitle: "État-major des armées — CIMD",
    year: "2024 — 2026",
    featured: false,
    confidential: true,
    summary:
      "Moteur RAG et assistant IA pour la codification NATO et l'interrogation des règles métier, en environnement on-premise sécurisé.",
    bullets: [
      "Embeddings multilingual-e5-large + index FAISS",
      "Assistant Mistral + RAG pour les règles NATO",
      "Interfaces CLI + Streamlit et dashboards QlikSense",
    ],
    tags: ["RAG", "FAISS", "Mistral", "Streamlit", "QlikSense", "On-premise"],
  },
  {
    id: "proj-planquia",
    title: "Planquia",
    subtitle: "Conjectura — SaaS",
    year: "2026",
    featured: false,
    confidential: false,
    url: "https://planquia.com",
    summary:
      "SaaS IA qui transforme des plans PDF de construction en devis structurés. Pipeline multimodal OCR + vision + raisonnement LLM, du document brut à la quotation.",
    bullets: [
      "Extraction multimodale (OCR, computer vision, LLM)",
      "Backend FastAPI / SQLAlchemy, frontend React / Next.js",
      "PostgreSQL, architecture produit et roadmap",
    ],
    tags: ["SaaS", "OCR", "Vision", "LLM", "FastAPI", "Next.js", "PostgreSQL"],
  },
];

export const education = [
  {
    id: "edu-1",
    school: "CY Tech",
    degree: "Diplôme d'ingénieur — spécialisation IA",
    field: "Mathématiques appliquées & Informatique. Attendu en 2027.",
    period: "2023 — 2027",
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
  { name: "Anglais", level: "C1 — Courant", value: 88 },
  { name: "Arabe", level: "Professionnel", value: 70 },
];

export const planquia = {
  heading: "Planquia — le produit que je construis",
  intro:
    "Co-fondateur & CTO de Conjectura, je développe Planquia : un SaaS qui lit des plans de construction et en sort des devis structurés.",
  pillars: [
    {
      icon: "Layers",
      title: "Pipeline multimodal",
      text: "OCR, computer vision et raisonnement LLM pour extraire l'information utile de PDFs techniques souvent hétérogènes.",
    },
    {
      icon: "Zap",
      title: "Full-stack, prêt à scaler",
      text: "Python, FastAPI, SQLAlchemy, React / Next.js et PostgreSQL — de l'API au produit, avec une architecture claire.",
    },
    {
      icon: "ShieldCheck",
      title: "Ownership produit",
      text: "Architecture, backend, qualité de code et roadmap : je porte le système de l'idée jusqu'aux utilisateurs.",
    },
  ],
};

export const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#experience", label: "Expérience" },
  { href: "#projects", label: "Projets" },
  { href: "#skills", label: "Compétences" },
  { href: "#education", label: "Formation" },
  { href: "#planquia", label: "Planquia" },
  { href: "#contact", label: "Contact" },
];
