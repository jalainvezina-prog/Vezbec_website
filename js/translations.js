/**
 * Vezbec Portfolio - Bilingual Translation Dictionary (FR / EN)
 */
const translations = {
  fr: {
    // Navigation
    nav: {
      brandTag: "Solutions No-Code & Low-Code",
      home: "Accueil",
      gallery: "Portfolio & Galerie",
      contact: "Contact",
      cta: "Lancer un projet",
      currentLang: "FR"
    },
    // Homepage Hero
    hero: {
      badge: "Expertise AppSheet • Glide • Zite",
      titlePre: "Transformez vos processus avec des",
      titleHighlight: "applications sur-mesure",
      titlePost: "agiles et performantes.",
      description: "Conception et déploiement ultra-rapides d'applications métiers mobiles et web. Éliminez la saisie manuelle, connectez vos données et offrez à vos équipes des outils sur-mesure sans les coûts d'un développement traditionnel.",
      ctaPrimary: "Découvrir nos réalisations",
      ctaSecondary: "Demander une consultation gratuite",
      badgeRating: "Note moyenne 4.9/5 sur plus de 50 déploiements d'entreprise"
    },
    // Stats Counter
    stats: {
      stat1Number: "50+",
      stat1Label: "Applications d'affaires déployées",
      stat2Number: "10x",
      stat2Label: "Plus rapide qu'un dev traditionnel",
      stat3Number: "99.8%",
      stat3Label: "Taux de satisfaction client",
      stat4Number: "100%",
      stat4Label: "Mobile & Cloud multiplateforme"
    },
    // Platforms Section
    platforms: {
      tagline: "Écosystème Technologique",
      title: "Les meilleures plateformes No-Code & Low-Code du marché",
      subtitle: "Nous sélectionnons l'architecture logicielle idéale selon vos flux de travail, vos règles métiers et votre infrastructure existante.",
      appsheet: {
        title: "AppSheet",
        subtitle: "L'écosystème Google Cloud pour les opérations",
        desc: "Idéal pour les équipes de terrain, la maintenance (GMAO), les audits et la gestion d'inventaire. Fonctionne hors-ligne (offline-first) avec synchronisation Google Sheets, SQL et BigQuery.",
        feature1: "Mode 100% hors-ligne avec synchronisation automatique",
        feature2: "Scan codes-barres, QR codes et géolocalisation GPS",
        feature3: "Génération automatique de rapports PDF & emails",
        tag: "Opérations & Terrain"
      },
      glide: {
        title: "Glide App",
        subtitle: "Design moderne et portails intuitifs",
        desc: "Parfait pour les portails clients, CRM commerciaux, annuaires RH et applications événementielles. Interface utilisateur haut de gamme avec intégration Airtable, Excel et API.",
        feature1: "Design ultra-léché optimisé pour mobile et tablette",
        feature2: "Gestion granulaire des rôles et accès utilisateurs",
        feature3: "Synchronisation instantanée avec Airtable et bases SQL",
        tag: "Portails & Expérience Utilisateur"
      },
      zite: {
        title: "Zite",
        subtitle: "Applications de gestion et portails agiles",
        desc: "Spécialisé pour la gestion de chantiers, les formulaires complexes, le suivi d'équipements et la collaboration inter-équipes avec tableaux de bord réactifs.",
        feature1: "Suivi de projets et flux de travail dynamiques",
        feature2: "Tableaux de bord d'indicateurs clés (KPI) en temps réel",
        feature3: "Règles de validation poussées et automatisations",
        tag: "Gestion & Tableaux de bord"
      }
    },
    // Featured Projects
    featured: {
      tagline: "Projets Récents",
      title: "Aperçu de nos réalisations phares",
      subtitle: "Des solutions concrètes qui génèrent un retour sur investissement immédiat pour nos clients.",
      viewDetails: "Voir la fiche projet",
      viewAllGallery: "Explorer toute la galerie (9 projets)",
      platformFilter: "Filtrer par plateforme"
    },
    // Value Props / Why Low-Code
    whyLowCode: {
      tagline: "Pourquoi le Low-Code ?",
      title: "L'agilité d'une startup, la robustesse de l'entreprise",
      subtitle: "Découvrez pourquoi les PME et grandes entreprises migrent leurs outils internes vers des architectures no-code modernes.",
      item1Title: "Déploiement en quelques semaines",
      item1Desc: "Là où un développement logiciel classique nécessite 6 à 12 mois, nos applications sont opérationnelles et testées en 2 à 4 semaines.",
      item2Title: "Réduction des coûts de 60 à 80%",
      item2Desc: "Investissez dans la valeur métier plutôt que dans la maintenance d'infrastructures lourdes et de code serveur obsolète.",
      item3Title: "Évolution continue sans dette technique",
      item3Desc: "Vos processus changent ? Nous ajustons les champs, automatisations et règles en quelques minutes sans réécrire l'application.",
      item4Title: "Sécurité & Conformité de niveau cloud",
      item4Desc: "Bénéficiez de la sécurité des géants technologiques (Google Cloud, AWS, Microsoft) avec chiffrement de bout en bout."
    },
    // Delivery Method / Process
    process: {
      tagline: "Méthodologie",
      title: "Du besoin opérationnel à l'application déployée",
      subtitle: "Un accompagnement structuré, transparent et orienté résultats à chaque étape.",
      step1Num: "01",
      step1Title: "Cadrage & Modélisation",
      step1Desc: "Analyse de vos processus actuels, cartographie des données (Sheets, Airtable, SQL) et définition des parcours utilisateurs clés.",
      step2Num: "02",
      step2Title: "Prototypage Interactif",
      step2Desc: "Création d'un prototype navigable en moins de 5 jours ouvrés pour valider l'ergonomie avec vos équipes.",
      step3Num: "03",
      step3Title: "Développement & Intégration",
      step3Desc: "Configuration des règles d'affaires, automatisations (emails, PDF, webhooks), rôles d'accès et tests de robustesse.",
      step4Num: "04",
      step4Title: "Déploiement & Formation",
      step4Desc: "Mise en production, accompagnement au changement, formation vidéo de vos collaborateurs et support technique dédié."
    },
    // Testimonials
    testimonials: {
      tagline: "Témoignages",
      title: "Ce que disent nos clients",
      item1Quote: "« L'application AppSheet conçue par Vezbec a éliminé 15 heures de saisie papier hebdomadaire pour nos inspecteurs sur les chantiers. Un vrai tournant ! »",
      item1Author: "Marc-André B.",
      item1Role: "Directeur des Opérations, Construction Nordik",
      item2Quote: "« Notre portail client Glide est devenu notre meilleur argument de vente. Nos clients adorent suivre l'avancement de leurs dossiers en direct. »",
      item2Author: "Sophie Tremblay",
      item2Role: "Fondatrice, LogiLogix Solutions",
      item3Quote: "« Une réactivité exemplaire. L'application Zite a été livrée avec 1 semaine d'avance et s'est intégrée sans accroc à nos outils existants. »",
      item3Author: "Jean-Philippe R.",
      item3Role: "VP Technologies, Groupe Industriel Québec"
    },
    // CTA Banner
    ctaBanner: {
      title: "Prêt à propulser vos opérations au niveau supérieur ?",
      subtitle: "Planifiez une démonstration personnalisée ou soumettez votre cahier des charges.",
      btnPrimary: "Démarrer un projet",
      btnSecondary: "Consulter la galerie d'applications"
    },
    // Gallery Page Specific
    galleryPage: {
      tagline: "Démonstrateur Interactif",
      title: "Galerie des Applications No-Code & Low-Code",
      subtitle: "Explorez nos cas d'usage réels conçus sur AppSheet, Glide et Zite. Filtrez par technologie ou recherchez une fonctionnalité spécifique.",
      searchPlaceholder: "Rechercher une application, un secteur ou un mot-clé...",
      filterAll: "Tous les projets",
      filterAppSheet: "Google AppSheet",
      filterGlide: "Glide App",
      filterZite: "Zite",
      resultsCount: "projets affichés",
      noResults: "Aucune application ne correspond à votre recherche.",
      btnReset: "Réinitialiser les filtres",
      cardPlatform: "Plateforme",
      cardFeatures: "Points forts",
      btnDetails: "Voir la fiche complète",
      btnLiveDemo: "Demander une démo",
      // Modal labels
      modalTechStack: "Technologies & Connecteurs",
      modalCoreFeatures: "Fonctionnalités Clés",
      modalBusinessImpact: "Impact & Valeur d'Affaires",
      modalTargetUsers: "Utilisateurs cibles",
      modalClose: "Fermer",
      modalRequestSimilar: "Commander une solution similaire"
    },
    // Contact Page Specific
    contactPage: {
      tagline: "Démarrons Votre Projet",
      title: "Parlons de votre prochaine application",
      subtitle: "Remplissez ce formulaire détaillé pour obtenir une estimation budgétaire et un délai de livraison sous 24 à 48 heures.",
      infoTitle: "Coordonnées directes",
      infoDesc: "Vous avez une question urgente ou souhaitez échanger directement avec notre expert technique ?",
      emailLabel: "Courriel direct",
      emailValue: "contact@vezbec.com",
      phoneLabel: "Téléphone direct",
      phoneValue: "+1 (581) 700-8432",
      locLabel: "Emplacement",
      locValue: "Québec (QC), Canada • Déploiements internationaux à distance",
      hoursLabel: "Disponibilité",
      hoursValue: "Lundi au Vendredi : 8h30 - 17h30 (HNE)",
      // Form
      formTitle: "Formulaire d'estimation de projet",
      fieldName: "Nom complet *",
      placeholderName: "ex. Marc-André Tremblay",
      fieldEmail: "Courriel professionnel *",
      placeholderEmail: "ex. ma.tremblay@entreprise.ca",
      fieldPhone: "Téléphone",
      placeholderPhone: "ex. +1 (418) 555-0199",
      fieldCompany: "Entreprise ou Organisation",
      placeholderCompany: "ex. Tremblay & Associés Inc.",
      fieldPlatform: "Plateforme pressentie *",
      platformOptionPrompt: "Sélectionnez une plateforme...",
      platformOptionAppSheet: "Google AppSheet (Terrain, Formulaires, Hors-ligne)",
      platformOptionGlide: "Glide App (Portail client, CRM mobile, RH)",
      platformOptionZite: "Zite (Gestion de chantier, Tableaux de bord)",
      platformOptionUnsure: "Je ne sais pas encore / Conseillez-moi",
      fieldBudget: "Budget approximatif envisagé *",
      budgetOptionPrompt: "Sélectionnez une fourchette...",
      budget1: "Moins de 2 500 $ CAD (POC / Prototype rapide)",
      budget2: "2 500 $ à 5 000 $ CAD (Application métier ciblée)",
      budget3: "5 000 $ à 10 000 $ CAD (Système complet multi-rôles)",
      budget4: "Plus de 10 000 $ CAD (Écosystème d'entreprise & ERP)",
      fieldTimeline: "Délai de déploiement souhaité",
      timelinePrompt: "Sélectionnez un délai...",
      timelineUrgent: "Urgent (moins de 2 semaines)",
      timelineStandard: "1 mois (idéal pour la plupart des projets)",
      timelineFlexible: "1 à 3 mois (en cours de cadrage)",
      fieldMessage: "Description de votre besoin opérationnel *",
      placeholderMessage: "Décrivez les tâches manuelles à automatiser, les utilisateurs concernés et les sources de données existantes (Google Sheets, Excel, SQL)...",
      btnSubmit: "Transmettre ma demande de projet",
      btnSubmitting: "Envoi en cours...",
      guaranteeText: "Réponse garantie sous 24h ouvrées. Accord de confidentialité (NDA) disponible sur demande.",
      // FAQ
      faqTitle: "Foire Aux Questions (FAQ)",
      faqSubtitle: "Tout ce que vous devez savoir avant de lancer votre projet No-Code.",
      faq1Q: "Combien de temps faut-il pour créer une application fonctionnelle ?",
      faq1A: "La plupart de nos applications sont livrées entre 2 et 4 semaines. Un prototype interactif (POC) est généralement testable dès la fin de la première semaine.",
      faq2Q: "Les applications fonctionnent-elles sur iPhone, Android et ordinateurs de bureau ?",
      faq2A: "Oui, à 100%. AppSheet, Glide et Zite sont 'responsive' et multiplateformes. Elles s'installent en tant qu'applications mobiles natives ou PWA (Progressive Web App) et s'utilisent également dans tout navigateur web moderne.",
      faq3Q: "Mes données restent-elles ma propriété et sont-elles sécurisées ?",
      faq3A: "Absolument. Vos données restent hébergées dans votre propre environnement infonuagique (votre compte Google Workspace, Microsoft 365, Airtable ou serveur SQL). Nous ne stockons aucune de vos données métier.",
      faq4Q: "Une connexion Internet est-elle obligatoire sur le terrain ?",
      faq4A: "Avec Google AppSheet, vos techniciens peuvent travailler 100% hors-ligne (en sous-sol, en forêt ou sur chantiers isolés). Les données, photos et signatures sont enregistrées localement et se synchronisent automatiquement dès le retour du réseau.",
      faq5Q: "Pourrai-je modifier l'application moi-même après la livraison ?",
      faq5A: "Tout à fait ! Nous offrons une session de formation complète et de la documentation vidéo. La force du No-Code est justement de vous libérer de la dépendance technique pour les ajustements quotidiens."
    },
    // Footer
    footer: {
      desc: "Studio d'ingénierie No-Code & Low-Code spécialisé dans l'optimisation des flux d'entreprise avec Google AppSheet, Glide et Zite.",
      col1Title: "Navigation",
      col2Title: "Technologies",
      col3Title: "Localisation & Contact",
      copyright: "© 2026 Vezbec. Tous droits réservés. Conçu avec rigueur et passion au Québec.",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation"
    },
    // Toast Messages
    notifications: {
      formSuccessTitle: "Demande envoyée avec succès !",
      formSuccessMsg: "Merci de votre confiance. Notre équipe analysera votre projet et vous contactera sous 24h ouvrées.",
      formErrorTitle: "Veuillez vérifier les champs",
      formErrorMsg: "Veuillez remplir tous les champs obligatoires (*).",
      copiedToClipboard: "Copié dans le presse-papier !"
    }
  },

  en: {
    // Navigation
    nav: {
      brandTag: "No-Code & Low-Code Solutions",
      home: "Home",
      gallery: "Portfolio & Gallery",
      contact: "Contact",
      cta: "Launch a Project",
      currentLang: "EN"
    },
    // Homepage Hero
    hero: {
      badge: "AppSheet • Glide • Zite Expertise",
      titlePre: "Transform your workflows with",
      titleHighlight: "custom-built business apps",
      titlePost: "built for speed and performance.",
      description: "Ultra-fast design and deployment of mobile and web business applications. Eliminate manual data entry, connect your databases, and empower your workforce with tailored tools at a fraction of custom software development costs.",
      ctaPrimary: "Explore Our Work",
      ctaSecondary: "Request a Free Consultation",
      badgeRating: "Rated 4.9/5 average across 50+ enterprise deployments"
    },
    // Stats Counter
    stats: {
      stat1Number: "50+",
      stat1Label: "Business Apps Deployed",
      stat2Number: "10x",
      stat2Label: "Faster than traditional dev",
      stat3Number: "99.8%",
      stat3Label: "Client Satisfaction Rate",
      stat4Number: "100%",
      stat4Label: "Cross-Platform Mobile & Cloud"
    },
    // Platforms Section
    platforms: {
      tagline: "Technology Stack",
      title: "Industry-Leading No-Code & Low-Code Platforms",
      subtitle: "We architect the optimal software foundation tailored to your business rules, operational workflows, and existing IT infrastructure.",
      appsheet: {
        title: "AppSheet",
        subtitle: "Google Cloud Ecosystem for Operations",
        desc: "Ideal for field crews, facility maintenance (CMMS), inspections, and inventory management. Features true offline-first capability with live sync to Google Sheets, SQL, and BigQuery.",
        feature1: "100% offline-ready with automatic background sync",
        feature2: "Barcode/QR scanning, GPS mapping, & digital signatures",
        feature3: "Automated PDF report generation & trigger workflows",
        tag: "Operations & Field Services"
      },
      glide: {
        title: "Glide App",
        subtitle: "Sleek User Experience & Modern Portals",
        desc: "Engineered for customer portals, sales CRMs, team directories, and event apps. Delivers top-tier visual polish and instant synchronization with Airtable, Excel, and REST APIs.",
        feature1: "Pixel-perfect UI optimized for mobile & tablet",
        feature2: "Granular user permissions and role-based security",
        feature3: "Real-time sync with Airtable, Postgres, & Google Sheets",
        tag: "Portals & Customer Experience"
      },
      zite: {
        title: "Zite",
        subtitle: "Agile Project & Work Management Systems",
        desc: "Tailored for construction site supervision, complex dynamic forms, equipment allocation, and cross-functional team collaboration with reactive dashboards.",
        feature1: "Dynamic project tracking and milestone workflows",
        feature2: "Real-time KPI analytics and operational dashboards",
        feature3: "Advanced data validation rules & automated triggers",
        tag: "Management & Executive Dashboards"
      }
    },
    // Featured Projects
    featured: {
      tagline: "Featured Works",
      title: "Showcase of Flagship Deployments",
      subtitle: "Concrete, high-ROI business solutions engineered to solve operational bottlenecks.",
      viewDetails: "View Project Specs",
      viewAllGallery: "Explore Full Gallery (9 Projects)",
      platformFilter: "Filter by platform"
    },
    // Value Props / Why Low-Code
    whyLowCode: {
      tagline: "Why Low-Code?",
      title: "Startup Speed with Enterprise Reliability",
      subtitle: "Discover why agile SMBs and large enterprises are replacing legacy manual tools with modern low-code architectures.",
      item1Title: "Delivered in Weeks, Not Months",
      item1Desc: "Where traditional custom software demands 6 to 12 months, our applications are fully deployed and vetted within 2 to 4 weeks.",
      item2Title: "60% to 80% Cost Reduction",
      item2Desc: "Invest directly in business value rather than paying for sprawling server infrastructure maintenance and obsolete legacy code.",
      item3Title: "Agile Evolution without Technical Debt",
      item3Desc: "As your operations change, adjust fields, workflows, and business logic in minutes without rewriting core codebases.",
      item4Title: "Enterprise-Grade Cloud Security",
      item4Desc: "Backed by the multi-layered security infrastructure of Google Cloud, AWS, and Microsoft with end-to-end encryption."
    },
    // Delivery Method / Process
    process: {
      tagline: "Methodology",
      title: "From Operational Need to Deployed Solution",
      subtitle: "A structured, transparent, and results-driven roadmap at every stage.",
      step1Num: "01",
      step1Title: "Audit & Architecture",
      step1Desc: "Deep-dive analysis of your current workflows, data model structuring (Sheets, Airtable, SQL), and core user journey mapping.",
      step2Num: "02",
      step2Title: "Interactive Prototyping",
      step2Desc: "Crafting a functional, clickable prototype within 5 business days so your team can test usability before final build.",
      step3Num: "03",
      step3Title: "Development & Integration",
      step3Desc: "Implementing business logic, automated email/PDF webhooks, granular access controls, and comprehensive stress testing.",
      step4Num: "04",
      step4Title: "Deployment & Training",
      step4Desc: "Live rollout, user adoption training, customized video tutorials, and dedicated ongoing technical support."
    },
    // Testimonials
    testimonials: {
      tagline: "Testimonials",
      title: "What Our Clients Say",
      item1Quote: "“The AppSheet application built by Vezbec eliminated 15 hours of weekly paper log entry for our field construction inspectors. A complete game-changer!”",
      item1Author: "Marc-André B.",
      item1Role: "Director of Operations, Nordik Construction",
      item2Quote: "“Our Glide client portal became our top competitive advantage during sales pitches. Our clients love tracking project milestones in real-time.”",
      item2Author: "Sophie Tremblay",
      item2Role: "Founder, LogiLogix Solutions",
      item3Quote: "“Exceptional responsiveness and technical acumen. The Zite app was delivered a week ahead of schedule and integrated flawlessly with our legacy data.”",
      item3Author: "Jean-Philippe R.",
      item3Role: "VP Technologies, Quebec Industrial Group"
    },
    // CTA Banner
    ctaBanner: {
      title: "Ready to Supercharge Your Business Operations?",
      subtitle: "Schedule a personalized demonstration or submit your technical requirements today.",
      btnPrimary: "Start a Project",
      btnSecondary: "Browse Application Gallery"
    },
    // Gallery Page Specific
    galleryPage: {
      tagline: "Interactive Showcase",
      title: "No-Code & Low-Code Applications Gallery",
      subtitle: "Explore real-world operational applications built with AppSheet, Glide, and Zite. Filter by tech stack or search for specific capabilities.",
      searchPlaceholder: "Search by app title, industry, or feature keyword...",
      filterAll: "All Projects",
      filterAppSheet: "Google AppSheet",
      filterGlide: "Glide App",
      filterZite: "Zite",
      resultsCount: "projects displayed",
      noResults: "No applications matched your search criteria.",
      btnReset: "Reset All Filters",
      cardPlatform: "Platform",
      cardFeatures: "Key Highlights",
      btnDetails: "View Full Specs",
      btnLiveDemo: "Request Live Demo",
      // Modal labels
      modalTechStack: "Tech Stack & Integrations",
      modalCoreFeatures: "Core Capabilities",
      modalBusinessImpact: "Operational Impact & ROI",
      modalTargetUsers: "Target Personas",
      modalClose: "Close",
      modalRequestSimilar: "Request Similar Solution"
    },
    // Contact Page Specific
    contactPage: {
      tagline: "Let's Build Together",
      title: "Discuss Your Next Application",
      subtitle: "Fill out this scoping form to receive a detailed cost estimate and delivery timeline within 24 to 48 hours.",
      infoTitle: "Direct Channels",
      infoDesc: "Have an urgent inquiry or want to speak directly with our lead solutions architect?",
      emailLabel: "Direct Email",
      emailValue: "contact@vezbec.com",
      phoneLabel: "Direct Phone",
      phoneValue: "+1 (581) 700-8432",
      locLabel: "Headquarters",
      locValue: "Quebec City (QC), Canada • Worldwide Remote Delivery",
      hoursLabel: "Operating Hours",
      hoursValue: "Monday through Friday: 8:30 AM - 5:30 PM (EST)",
      // Form
      formTitle: "Project Scoping & Estimation Form",
      fieldName: "Full Name *",
      placeholderName: "e.g. Marc-André Tremblay",
      fieldEmail: "Work Email *",
      placeholderEmail: "e.g. ma.tremblay@company.com",
      fieldPhone: "Phone Number",
      placeholderPhone: "e.g. +1 (418) 555-0199",
      fieldCompany: "Company / Organization",
      placeholderCompany: "e.g. Tremblay & Associates Inc.",
      fieldPlatform: "Target Platform *",
      platformOptionPrompt: "Select a platform...",
      platformOptionAppSheet: "Google AppSheet (Field Ops, Offline, Complex Forms)",
      platformOptionGlide: "Glide App (Client Portal, Mobile CRM, HR)",
      platformOptionZite: "Zite (Site Management, Agile KPI Dashboards)",
      platformOptionUnsure: "Not sure yet / Recommend best fit",
      fieldBudget: "Estimated Budget Range *",
      budgetOptionPrompt: "Select a range...",
      budget1: "Under $2,500 CAD (POC / Rapid Prototype)",
      budget2: "$2,500 to $5,000 CAD (Targeted Business App)",
      budget3: "$5,000 to $10,000 CAD (Full Multi-Role System)",
      budget4: "Over $10,000 CAD (Enterprise Suite & ERP Integration)",
      fieldTimeline: "Target Timeline",
      timelinePrompt: "Select a timeframe...",
      timelineUrgent: "Urgent (Under 2 weeks)",
      timelineStandard: "1 Month (Ideal for most scopes)",
      timelineFlexible: "1 to 3 Months (Discovery phase)",
      fieldMessage: "Operational Scope & Requirements *",
      placeholderMessage: "Describe the manual workflows you wish to automate, user types, and existing data sources (Google Sheets, Excel, SQL database)...",
      btnSubmit: "Submit Project Request",
      btnSubmitting: "Submitting...",
      guaranteeText: "Response guaranteed within 24 business hours. Non-Disclosure Agreement (NDA) signed upon request.",
      // FAQ
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know before kicking off your low-code project.",
      faq1Q: "How long does it take to deploy a production-ready application?",
      faq1A: "Most of our applications are delivered within 2 to 4 weeks. An interactive proof-of-concept (POC) is typically ready for testing by the end of week 1.",
      faq2Q: "Do the apps work on iPhone, Android, and desktop browsers?",
      faq2A: "Yes, 100%. AppSheet, Glide, and Zite are fully responsive and cross-platform. They install as native mobile apps or PWAs on iOS and Android, and run smoothly in any modern desktop web browser.",
      faq3Q: "Do I retain ownership of my data, and is it secure?",
      faq3A: "Absolutely. All data remains hosted inside your own cloud tenant (your Google Workspace, Microsoft 365, Airtable base, or SQL database). We never store or hostage your business records.",
      faq4Q: "Is an internet connection required out in the field?",
      faq4A: "With Google AppSheet, your staff can work completely offline (in basements, rural sites, or remote industrial areas). All entries, photos, and signatures are cached locally and automatically sync once network connectivity is re-established.",
      faq5Q: "Can our internal team update the application after handover?",
      faq5A: "Yes! We provide thorough handover documentation and custom video walkthroughs. One of the main benefits of No-Code is liberating your organization from vendor lock-in for everyday adjustments."
    },
    // Footer
    footer: {
      desc: "Bespoke No-Code & Low-Code engineering studio specializing in enterprise workflow modernization with Google AppSheet, Glide, and Zite.",
      col1Title: "Navigation",
      col2Title: "Technologies",
      col3Title: "Location & Contact",
      copyright: "© 2026 Vezbec. All rights reserved. Crafted with care in Quebec, Canada.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    // Toast Messages
    notifications: {
      formSuccessTitle: "Inquiry Successfully Sent!",
      formSuccessMsg: "Thank you for reaching out. Our solution architect will review your scope and get back to you within 24 business hours.",
      formErrorTitle: "Please check your inputs",
      formErrorMsg: "Please fill in all required fields (*).",
      copiedToClipboard: "Copied to clipboard!"
    }
  }
};

// Export to window for global access
window.translations = translations;

