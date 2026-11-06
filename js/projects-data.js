/**
 * Vezbec Portfolio - Complete Projects Dataset
 * Showcasing AppSheet, Glide App, and Zite enterprise solutions.
 */
const projectsData = [
  // ==========================================
  // APPSHEET PROJECTS
  // ==========================================
  {
    id: "appsheet-fieldops",
    platform: "appsheet",
    platformName: "Google AppSheet",
    badgeClass: "badge-appsheet",
    icon: "clipboard-check",
    color: "#38BDF8", // Cyan / Google Cloud Blue
    featured: true,
    thumbnailSvg: "appsheet-fieldops.svg",
    title: {
      fr: "Vezbec FieldOps — Inspection & GMAO Chantier",
      en: "Vezbec FieldOps — Field Inspection & CMMS"
    },
    category: {
      fr: "Construction & BTP • Maintenance Industrielle",
      en: "Construction & Industrial Maintenance"
    },
    shortDesc: {
      fr: "Application mobile 100% hors-ligne pour techniciens de terrain. Fiches d'inspection dynamiques, prise de photos annotées, signature client et génération automatique de rapports PDF certifiés.",
      en: "100% offline-first mobile app for field technicians. Dynamic inspection checklists, annotated photo capture, client e-signatures, and instant automated PDF audit generation."
    },
    fullDesc: {
      fr: "Vezbec FieldOps révolutionne les rondes d'inspection technique et la maintenance préventive. Déployée pour des équipes intervenant dans des zones sans réseau cellulaire (tunnels, sous-sols, sites industriels isolés), l'application permet de remplir des protocoles de sécurité rigoureux, de photographier les anomalies avec annotations au doigt, et de faire signer le responsable de site directement sur l'écran tactile. Dès qu'une connexion Wi-Fi ou 4G est détectée, les données se synchronisent de manière transparente avec Google Sheets et BigQuery, déclenchant l'envoi d'un rapport PDF corporatif aux clients.",
      en: "Vezbec FieldOps transforms routine technical inspections and preventive maintenance workflows. Engineered for field inspectors working in network-dead zones (basements, industrial facilities, remote sites), the app allows teams to complete rigorous compliance checklists, annotate defect photos on-screen, and capture digital client sign-offs. As soon as connectivity is re-established, records sync seamlessly to Google Sheets and BigQuery, instantly dispatching branded PDF audit reports to stakeholders."
    },
    features: {
      fr: [
        "Mode 100% hors-ligne avec synchronisation en arrière-plan sans perte de données",
        "Formulaires d'audit conditionnels s'adaptant selon les types d'équipements",
        "Capture de photos haute résolution avec outil d'annotation et fléchage des défauts",
        "Génération automatisée de rapports PDF prêts à imprimer avec logo et mise en page personnalisée",
        "Signature électronique sur écran et géolocalisation GPS certifiée de l'intervention"
      ],
      en: [
        "100% offline-first architecture with flawless background data synchronization",
        "Conditional branch inspection forms adjusting dynamically per equipment category",
        "High-res photo capture with built-in digital annotation and defect callouts",
        "Automated branded PDF generation dispatched via email webhook upon completion",
        "On-screen digital signature capture and GPS timestamp geo-tagging"
      ]
    },
    stack: ["Google AppSheet", "Google Cloud Platform", "Google Sheets", "Google Drive API", "AppSheet Automations (Webhooks)"],
    metrics: {
      fr: [
        { label: "Temps administratif économisé", value: "-14h / sem / inspecteur" },
        { label: "Délai de remise du rapport", value: "Immédiat (vs 4 jours)" },
        { label: "Erreurs de saisie manuscrite", value: "Éliminées à 100%" }
      ],
      en: [
        { label: "Weekly Admin Time Saved", value: "-14 hrs / tech / week" },
        { label: "Report Delivery Turnaround", value: "Instant (vs 4 days)" },
        { label: "Manual Paper Log Errors", value: "Reduced to 0%" }
      ]
    },
    users: {
      fr: "Inspecteurs de sécurité, techniciens de maintenance, superviseurs de chantier, chefs de projets BTP.",
      en: "Safety inspectors, field maintenance technicians, job site superintendents, construction PMs."
    }
  },
  {
    id: "appsheet-logistiq",
    platform: "appsheet",
    platformName: "Google AppSheet",
    badgeClass: "badge-appsheet",
    icon: "package",
    color: "#38BDF8",
    featured: false,
    thumbnailSvg: "appsheet-logistiq.svg",
    title: {
      fr: "LogistiQ Pro — Gestion d'Entrepôt & Scan Code-Barres",
      en: "LogistiQ Pro — Warehouse & Barcode Inventory"
    },
    category: {
      fr: "Logistique & Entreposage • Chaîne d'Approvisionnement",
      en: "Logistics & Warehousing • Supply Chain"
    },
    shortDesc: {
      fr: "Système de suivi d'inventaire multi-entrepôts avec lecture par caméra de codes-barres 1D/2D et QR codes. Alertes de stock critique et réapprovisionnement automatisé.",
      en: "Multi-facility inventory control system utilizing smartphone cameras for 1D/2D barcodes and QR scanning. Features automated safety stock threshold alerts."
    },
    fullDesc: {
      fr: "Conçue pour remplacer les coûteux terminaux de scan industriels par de simples smartphones et tablettes Android/iOS d'entreprise. LogistiQ Pro centralise les mouvements d'entrées, transferts inter-dépôts et sorties de stock. Les préparateurs scannent les codes-barres en un clin d'œil, réduisant drastiquement les erreurs d'étiquetage. Des alertes automatisées préviennent le responsable d'achats lorsque le stock de sécurité est atteint.",
      en: "Engineered to replace expensive dedicated barcode scanners with standard enterprise iOS and Android smartphones. LogistiQ Pro centralizes incoming receipts, internal warehouse transfers, and picking order dispatches. Warehouse workers scan item barcodes rapidly using the device camera, slashing fulfillment errors. Automated webhooks notify procurement managers the instant stock drops below safety margins."
    },
    features: {
      fr: [
        "Scan instantané de codes-barres (EAN, UPC, Code 128) et QR codes via l'appareil photo",
        "Traçabilité complète des mouvements de pièces avec historique d'opérateurs",
        "Alertes prédictives de réapprovisionnement configurables par référence",
        "Synchronisation avec bases de données PostgreSQL et inventaires Google Sheets",
        "Tableau de bord de valorisation financière des stocks en temps réel"
      ],
      en: [
        "High-speed barcode (EAN, UPC, Code 128) and QR scanning using built-in camera",
        "Granular audit trail of all part allocations, receipts, and user actions",
        "Configurable minimum threshold alerts triggering automated purchase notices",
        "Direct synchronization with PostgreSQL databases and Google Sheets",
        "Real-time inventory valuation dashboard and location heatmaps"
      ]
    },
    stack: ["Google AppSheet", "PostgreSQL", "Google Sheets", "Google Cloud Functions"],
    metrics: {
      fr: [
        { label: "Exactitude des stocks", value: "99.4% (vs 86%)" },
        { label: "Temps de préparation de commande", value: "Divisé par 2" },
        { label: "Coût de matériel économisé", value: "~15 000 $ en scanneurs" }
      ],
      en: [
        { label: "Inventory Accuracy", value: "99.4% (up from 86%)" },
        { label: "Order Picking Speed", value: "50% faster fulfillment" },
        { label: "Hardware Cost Avoidance", value: "~$15,000 saved on scanners" }
      ]
    },
    users: {
      fr: "Gestionnaires d'entrepôt, magasiniers, caristes, responsables des achats.",
      en: "Warehouse directors, picking clerks, forklift operators, procurement teams."
    }
  },
  {
    id: "appsheet-fleetmaster",
    platform: "appsheet",
    platformName: "Google AppSheet",
    badgeClass: "badge-appsheet",
    icon: "truck",
    color: "#38BDF8",
    featured: false,
    thumbnailSvg: "appsheet-fleetmaster.svg",
    title: {
      fr: "FleetMaster — Gestion de Flotte & Maintenance Préventive",
      en: "FleetMaster — Fleet & Preventive Vehicle Maintenance"
    },
    category: {
      fr: "Transport • Gestion de Véhicules & Équipements",
      en: "Transportation • Fleet Management"
    },
    shortDesc: {
      fr: "Suivi kilométrique en temps réel, inspections pré-départ obligatoires, gestion des cartes de carburant et planification des entretiens périodiques pour parcs de véhicules.",
      en: "Real-time mileage tracking, mandatory pre-trip walkaround inspections, fuel card expense logging, and scheduled preventative service dispatch."
    },
    fullDesc: {
      fr: "FleetMaster est la solution tout-en-un pour les gestionnaires de flottes de véhicules légers et poids lourds. Chaque matin, le conducteur effectue sa ronde de conformité (pneus, feux, fluides, freins) en moins de 3 minutes sur son téléphone. Les compteurs kilométriques et reçus d'essence sont enregistrés au fur et à mesure, permettant de calculer le coût au kilomètre exact de chaque véhicule et d'anticiper les révisions mécaniques.",
      en: "FleetMaster is the complete companion for light commercial vehicle and heavy truck fleet operators. Drivers complete mandatory pre-trip walkaround inspections (tires, fluids, lights, brakes) in under 3 minutes via mobile. Odometer logs and fuel receipts are photographed and aggregated, calculating real cost-per-kilometer while triggering maintenance scheduling before costly breakdowns occur."
    },
    features: {
      fr: [
        "Fiches d'inspection pré-départ obligatoires avec validation visuelle",
        "Journal de bord kilométrique et capture des reçus de carburant par photo",
        "Rappels automatiques de vidange, changement de pneus et contrôles techniques",
        "Historique complet des réparations mécaniques et coûts associés",
        "Visualisation de la flotte sur carte interactive Google Maps"
      ],
      en: [
        "Digital pre-trip circle check compliance with instant defect escalation",
        "Mileage logbook and receipt photo capture with automated OCR extraction",
        "Predictive service reminders for oil changes, tire rotations, and inspections",
        "Complete historical service ledger with parts and labor cost tracking",
        "Interactive fleet location and status overview on Google Maps"
      ]
    },
    stack: ["Google AppSheet", "Google Maps Platform", "Google Workspace", "Apps Script"],
    metrics: {
      fr: [
        { label: "Pannes imprévues sur la route", value: "-38% en 6 mois" },
        { label: "Conformité des inspections", value: "100% auditable" },
        { label: "Économie de carburant détectée", value: "12% d'optimisation" }
      ],
      en: [
        { label: "Unplanned Road Breakdowns", value: "-38% in 6 months" },
        { label: "Inspection Compliance", value: "100% audit-ready" },
        { label: "Fuel Cost Optimization", value: "12% bottom-line savings" }
      ]
    },
    users: {
      fr: "Chauffeurs-livreurs, répartiteurs logistiques, directeurs de flotte automobile, mécaniciens.",
      en: "Delivery drivers, logistics dispatchers, fleet directors, service technicians."
    }
  },

  // ==========================================
  // GLIDE APP PROJECTS
  // ==========================================
  {
    id: "glide-talentportal",
    platform: "glide",
    platformName: "Glide App",
    badgeClass: "badge-glide",
    icon: "users",
    color: "#818CF8", // Electric Indigo / Violet
    featured: true,
    thumbnailSvg: "glide-talentportal.svg",
    title: {
      fr: "TalentPortal HR — Portail Employé & Onboarding",
      en: "TalentPortal HR — Employee Hub & Onboarding"
    },
    category: {
      fr: "Ressources Humaines • Culture & Vie d'Entreprise",
      en: "Human Resources • Employee Engagement"
    },
    shortDesc: {
      fr: "Portail collaborateur moderne et élégant pour le personnel sur site et en télétravail. Annuaire d'équipe dynamique, demandes de congés, parcours d'intégration et sondages de climat d'équipe.",
      en: "Modern and sleek employee portal designed for remote and hybrid teams. Features an interactive team directory, PTO leave requests, structured onboarding paths, and pulse surveys."
    },
    fullDesc: {
      fr: "TalentPortal HR offre une expérience collaborateur digne des meilleures applications grand public. Les nouveaux embauchés y découvrent leur feuille de route d'onboarding personnalisée (vidéos de bienvenue, documents RH à signer, attribution de parrain). Les employés consultent l'annuaire d'équipe avec compétences clés, posent leurs congés en 2 clics avec validation manager instantanée, et accèdent aux avantages sociaux de l'entreprise où qu'ils soient.",
      en: "TalentPortal HR brings a consumer-grade user experience to corporate HR. New hires follow a gamified onboarding checklist with welcome videos, policy handbooks, and mentor assignments. Employees search the interactive directory by skill and department, request PTO leaves in two clicks with manager Slack notifications, and securely access their benefits packages from any mobile or desktop device."
    },
    features: {
      fr: [
        "Annuaire visuel des équipes avec recherche par compétences, départements et fuseaux horaires",
        "Gestionnaire de demandes de congés avec solde en temps réel et validation par notification",
        "Parcours d'accueil gamifié (checklist d'intégration, guide de bienvenue, vidéos)",
        "Boîte à idées et sondages mensuels confidentiels sur le bien-être au travail",
        "Coffre-fort documentaire sécurisé pour les politiques d'entreprise et assurances"
      ],
      en: [
        "Rich visual team directory with fast search by skills, departments, and time zones",
        "PTO vacation request module with real-time balance tracking and manager approvals",
        "Gamified step-by-step onboarding roadmap with video integration and policy sign-offs",
        "Anonymous employee pulse surveys and workplace suggestion box",
        "Secure document vault for corporate policies, benefits handbooks, and forms"
      ]
    },
    stack: ["Glide App (Glide Tables)", "Airtable Sync", "Slack Webhooks", "Make.com (Integromat)"],
    metrics: {
      fr: [
        { label: "Temps d'onboarding RH", value: "Divisé par 3" },
        { label: "Adoption collaborateurs", value: "94% dès le premier mois" },
        { label: "Questions répétitives RH", value: "-65% de tickets" }
      ],
      en: [
        { label: "HR Onboarding Effort", value: "Reduced by 3x" },
        { label: "Staff Adoption Rate", value: "94% in month 1" },
        { label: "Routine HR Inquiries", value: "-65% ticket volume" }
      ]
    },
    users: {
      fr: "Collaborateurs, gestionnaires d'équipes, directeurs RH, responsables de la culture d'entreprise.",
      en: "Employees, team leads, HR directors, people & culture managers."
    }
  },
  {
    id: "glide-salessprint",
    platform: "glide",
    platformName: "Glide App",
    badgeClass: "badge-glide",
    icon: "trending-up",
    color: "#818CF8",
    featured: false,
    thumbnailSvg: "glide-salessprint.svg",
    title: {
      fr: "SalesSprint — CRM Mobile & Pipeline Commercial",
      en: "SalesSprint — Mobile CRM & Deal Pipeline"
    },
    category: {
      fr: "Ventes & Développement des Affaires • CRM",
      en: "Sales & Business Development • Mobile CRM"
    },
    shortDesc: {
      fr: "CRM ultra-réactif pour commerciaux nomades. Gestion visuelle des opportunités en mode Kanban, rappels de relances automatisés et synchronisation directe avec le calendrier.",
      en: "Ultra-responsive mobile CRM for sales reps on the go. Visual Kanban deal tracking, automated follow-up reminders, and two-way calendar sync."
    },
    fullDesc: {
      fr: "Trop souvent délaissés par les CRM traditionnels trop complexes, les commerciaux de terrain ont besoin d'une interface rapide et épurée. SalesSprint permet de consigner une note d'appel ou un compte-rendu de réunion en moins de 30 secondes grâce à la dictée vocale. Le pipeline de vente est visualisé par étapes (Prospection, Démo, Soumission, Négociation, Gagné) avec calcul immédiat des commissions et probabilités de closing.",
      en: "Traditional enterprise CRMs are often too bloated for reps out in the field. SalesSprint provides a razor-sharp, distraction-free mobile interface. Reps record meeting notes in under 30 seconds using speech-to-text voice dictation. The deal pipeline is visualized through an intuitive drag-and-drop Kanban workflow with automated commission forecasts and closing probability metrics."
    },
    features: {
      fr: [
        "Pipeline de ventes Kanban interactif par étape de conversion avec totaux en direct",
        "Saisie ultra-rapide des comptes-rendus avec prise en charge de la dictée vocale",
        "Appel et envoi de courriels en 1 clic directement depuis la fiche contact",
        "Rappels automatisés avant les dates d'échéance de soumissions",
        "Rapports de performance commerciale et classements d'équipe motivants"
      ],
      en: [
        "Interactive Kanban deal board with drag-and-drop status stages and dynamic weighted totals",
        "Rapid post-meeting voice memo transcriptions and action item logging",
        "One-tap calling, texting, and email dispatch directly from customer profile",
        "Automated push notifications for stale opportunities and proposal follow-ups",
        "Real-time rep leaderboard and revenue pacing charts"
      ]
    },
    stack: ["Glide App", "Airtable Enterprise", "OpenAI Whisper (Voice Notes)", "Zapier"],
    metrics: {
      fr: [
        { label: "Mises à jour CRM après RDV", value: "+210% de rigueur" },
        { label: "Temps de relance moyen", value: "24h (vs 5 jours)" },
        { label: "Taux de conversion global", value: "+18% de ventes conclues" }
      ],
      en: [
        { label: "Post-Meeting Logging Rigor", value: "+210% increase" },
        { label: "Average Follow-Up Delay", value: "24 hrs (vs 5 days)" },
        { label: "Overall Close Rate", value: "+18% revenue lift" }
      ]
    },
    users: {
      fr: "Commerciaux nomades, directeurs des ventes, consultants indépendants, chargés de comptes.",
      en: "Field sales executives, VP of sales, account managers, business development reps."
    }
  },
  {
    id: "glide-eventhub",
    platform: "glide",
    platformName: "Glide App",
    badgeClass: "badge-glide",
    icon: "calendar",
    color: "#818CF8",
    featured: false,
    thumbnailSvg: "glide-eventhub.svg",
    title: {
      fr: "EventHub VIP — Application Événementielle & Réseautage",
      en: "EventHub VIP — Event Companion & Networking"
    },
    category: {
      fr: "Événements & Congrès • Salons Professionnels",
      en: "Corporate Events • Trade Shows & Summits"
    },
    shortDesc: {
      fr: "L'application officielle pour congrès et salons d'affaires. Horaires de conférences personnalisés, billetterie par code QR, sondages en direct et mise en relation des participants.",
      en: "The all-in-one companion app for industry conferences and summits. Personalized agenda builders, QR check-in badges, live attendee polling, and peer-to-peer networking."
    },
    fullDesc: {
      fr: "Déployée pour des sommets de 200 à 5 000 participants sans nécessiter de téléchargement sur l'App Store grâce à la technologie PWA. Les participants s'enregistrent en scannant leur badge QR à l'entrée, construisent leur planning de conférences en favorisant les conférenciers, et échangent des coordonnées professionnelles via un système de mise en relation sécurisé respectant la vie privée.",
      en: "Deployed for major industry conferences and trade shows ranging from 200 to 5,000 attendees without requiring friction-filled app store downloads. Guests check in in seconds via QR badge scanning, curate their daily schedules by bookmarking keynotes, interact with speakers through live Q&A, and exchange digital business cards via a privacy-compliant networking portal."
    },
    features: {
      fr: [
        "Programme des conférences interactif avec filtres par thématique et salle",
        "Badge virtuel d'accès QR code pour un enregistrement fluide aux portes",
        "Profils de conférenciers avec liens vers les présentations et supports téléchargeables",
        "Questions/Réponses (Q&A) en direct pendant les panels avec vote des participants",
        "Messagerie privée et demandes de rendez-vous B2B entre festivaliers"
      ],
      en: [
        "Interactive multi-track conference schedule with track and speaker filtering",
        "Virtual QR pass for instant friction-free venue check-in and session access",
        "Speaker directory with downloadable presentation slide decks and bios",
        "Live audience Q&A with upvoting during keynote sessions",
        "Private 1-on-1 networking chat and scheduled B2B meeting matchmaking"
      ]
    },
    stack: ["Glide App", "Stripe Checkout", "Google Sheets", "Twilio SMS Alerts"],
    metrics: {
      fr: [
        { label: "Temps d'attente à l'enregistrement", value: "< 10 secondes / invité" },
        { label: "Engagement des participants", value: "88% d'utilisation active" },
        { label: "Coût d'impression de brochures", value: "0 $ (100% digital)" }
      ],
      en: [
        { label: "Queue Time at Check-In", value: "< 10 sec / guest" },
        { label: "Attendee In-App Engagement", value: "88% active participation" },
        { label: "Printed Program Cost", value: "$0 (100% paperless)" }
      ]
    },
    users: {
      fr: "Organisateurs d'événements, conférenciers, congressistes, exposants et sponsors.",
      en: "Event organizers, keynote speakers, conference attendees, trade show sponsors."
    }
  },

  // ==========================================
  // ZITE PROJECTS
  // ==========================================
  {
    id: "zite-clientportal",
    platform: "zite",
    platformName: "Zite",
    badgeClass: "badge-zite",
    icon: "shield-check",
    color: "#10B981", // Emerald / High-Tech Green
    featured: true,
    thumbnailSvg: "zite-clientportal.svg",
    title: {
      fr: "Zite ClientPortal — Extranet Client & Suivi de Chantiers",
      en: "Zite ClientPortal — Client Extranet & Project Tracking"
    },
    category: {
      fr: "Architecture & Bâtiment • Services Professionnels",
      en: "Architecture & Engineering • Professional Services"
    },
    shortDesc: {
      fr: "Extranet client ultra-sécurisé offrant une transparence totale sur l'avancement des mandats. Partage de plans, validation de livrables en ligne et suivi budgétaire en temps réel.",
      en: "Enterprise-grade secure client extranet providing total transparency on project deliverables. Blueprints sharing, sign-off workflows, and live budget pacing."
    },
    fullDesc: {
      fr: "Conçu pour les firmes d'ingénierie, cabinets d'architecture et entrepreneurs généraux souhaitant offrir une expérience client premium. Zite ClientPortal met fin aux échanges interminables par courriel et aux pièces jointes égarées. Chaque client dispose d'un espace dédié et chiffré où il peut suivre les jalons de son projet, annoter des plans PDF, approuver des avenants budgétaires et payer ses factures en direct.",
      en: "Architected for engineering firms, architectural studios, and general contractors seeking to provide a white-glove client experience. Zite ClientPortal replaces fragmented email chains and lost attachments with a unified, encrypted portal. Each client logs into a tailored space to monitor milestones, review architectural drawings, authorize contract amendments, and settle invoices effortlessly."
    },
    features: {
      fr: [
        "Espaces de projets personnalisés avec accès contrôlé par rôle client",
        "Visualiseur de plans et documents PDF avec système d'annotation collaborative",
        "Module de validation électronique des avenants et livrables contractuels",
        "Suivi financier des jalons et intégration directe des factures",
        "Fil d'actualité chronologique des faits marquants du chantier avec photos"
      ],
      en: [
        "White-labeled client project workspaces with strict role-based access",
        "Integrated drawing & blueprint viewer with collaborative markups",
        "Legally-compliant digital change order approval and e-sign workflow",
        "Real-time milestone billing breakdown and automated invoice alerts",
        "Chronological job site progress feed featuring high-definition photo logs"
      ]
    },
    stack: ["Zite Platform", "Amazon S3 Storage", "Stripe Billing", "Webhooks REST"],
    metrics: {
      fr: [
        { label: "Satisfaction de la clientèle", value: "98% d'avis positifs" },
        { label: "Délai d'approbation des avenants", value: "24h (vs 9 jours)" },
        { label: "Courriels de suivi évités", value: "-70% de sollicitations" }
      ],
      en: [
        { label: "Customer Net Promoter Score", value: "98% positive reviews" },
        { label: "Change Order Approval Time", value: "24 hrs (vs 9 days)" },
        { label: "Routine Status Update Emails", value: "-70% reduction" }
      ]
    },
    users: {
      fr: "Clients finaux, directeurs de projets, architectes, directeurs des finances.",
      en: "Enterprise clients, project architects, general contractors, finance controllers."
    }
  },
  {
    id: "zite-analyticshub",
    platform: "zite",
    platformName: "Zite",
    badgeClass: "badge-zite",
    icon: "bar-chart-3",
    color: "#10B981",
    featured: false,
    thumbnailSvg: "zite-analyticshub.svg",
    title: {
      fr: "Vezbec Analytics Hub — Tableau de Bord Direction & KPI",
      en: "Vezbec Analytics Hub — Executive & KPI Operations Hub"
    },
    category: {
      fr: "Gouvernance & Finance • Pilotage Opérationnel",
      en: "Operations Governance • Executive Business Intelligence"
    },
    shortDesc: {
      fr: "Centre de commande centralisant les indicateurs clés de performance opérationnels, financiers et humains. Visualisations interactives et alertes d'écarts budgétaires.",
      en: "Centralized executive cockpit consolidating real-time financial, operational, and labor KPIs. Features interactive analytics and automated variance alerts."
    },
    fullDesc: {
      fr: "Un puissant tableau de bord exécutif conçu pour les équipes de direction qui ont besoin d'une visibilité claire et consolidée sur leurs opérations multi-sites. En agrégeant les données de plusieurs départements (ventes, opérations, approvisionnements), Zite Analytics Hub élimine la compilation manuelle de tableurs Excel et met en lumière les écarts de marge et les retards avant qu'ils n'impactent la rentabilité.",
      en: "A robust executive command center engineered for leadership teams requiring crystal-clear visibility across multi-site operations. By aggregating disparate department streams (sales, field operations, procurement), Zite Analytics Hub eliminates manual spreadsheet reconciliation and flags margin variances before they affect the bottom line."
    },
    features: {
      fr: [
        "Visualisations graphiques interactives (marges, coûts de main-d'œuvre, cadences)",
        "Système d'alertes en temps réel en cas de dépassement de seuil critique",
        "Filtres dynamiques par division d'entreprise, région et période fiscale",
        "Rapports exécutifs hebdomadaires synthétisés et générés automatiquement",
        "Contrôle strict des droits d'accès aux données financières sensibles"
      ],
      en: [
        "Interactive analytics charts (gross margin, labor burden, production throughput)",
        "Real-time push alerts triggered by custom financial and operational variance thresholds",
        "Dynamic multi-dimensional filtering by business unit, region, and fiscal period",
        "Automated weekly executive summary digest delivered straight to leadership",
        "Stringent role-based encryption for sensitive corporate financial metrics"
      ]
    },
    stack: ["Zite Platform", "Google BigQuery", "REST API Data Pipelines", "PostgreSQL"],
    metrics: {
      fr: [
        { label: "Temps de reporting mensuel", value: "De 3 jours à 5 minutes" },
        { label: "Détection des écarts de coûts", value: "En temps réel (J+0)" },
        { label: "Alignement stratégique", value: "Visibilité 360° partagée" }
      ],
      en: [
        { label: "Monthly Reporting Time", value: "From 3 days to 5 minutes" },
        { label: "Variance Detection Speed", value: "Instant real-time (T+0)" },
        { label: "Strategic Team Alignment", value: "360° unified visibility" }
      ]
    },
    users: {
      fr: "Directeurs généraux (CEO/COO), directeurs financiers (CFO), contrôleurs de gestion.",
      en: "Chief Executives (CEO/COO), Chief Financial Officers (CFO), operations controllers."
    }
  },
  {
    id: "zite-supportdesk",
    platform: "zite",
    platformName: "Zite",
    badgeClass: "badge-zite",
    icon: "life-buoy",
    color: "#10B981",
    featured: false,
    thumbnailSvg: "zite-supportdesk.svg",
    title: {
      fr: "SupportDesk Portal — Gestion de Tickets & Suivi SLA",
      en: "SupportDesk Portal — Service Tickets & SLA Tracking"
    },
    category: {
      fr: "Service Client & Support Technique • IT Services",
      en: "Customer Support & IT Service Management"
    },
    shortDesc: {
      fr: "Gestionnaire de tickets de support client et technique avec calcul automatique des délais de réponse SLA, base de connaissances intégrée et routage intelligent des requêtes.",
      en: "Technical service desk and ticketing portal with automated SLA response timers, integrated knowledge base, and smart ticket routing."
    },
    fullDesc: {
      fr: "Une application complète pour professionnaliser le support après-vente et le service informatique interne. Les utilisateurs soumettent des tickets avec photos ou captures d'écran, reçoivent un numéro de suivi unique et visualisent l'état de traitement en direct. Les agents disposent d'un gestionnaire de files d'attente avec priorisation intelligente et minuteries SLA pour garantir le respect des contrats de service.",
      en: "A comprehensive service desk platform designed to elevate post-sales technical support and internal IT operations. End-users submit tickets with screenshots and diagnostic logs, receive automated tracking codes, and monitor resolution progress live. Support engineers leverage smart queue triage with dynamic SLA countdown timers to guarantee compliance with client service contracts."
    },
    features: {
      fr: [
        "Système de billetterie multicanal avec statut en direct (Nouveau, En cours, Résolu)",
        "Minuterie dynamique de conformité aux accords de niveau de service (SLA)",
        "Base de connaissances consultable avec articles de dépannage en libre-service",
        "Routage automatique des tickets selon l'expertise technique requise",
        "Enquêtes de satisfaction automatisées envoyées à la fermeture de chaque ticket"
      ],
      en: [
        "Multi-channel ticketing workspace with live status stages (New, In Progress, Resolved)",
        "Dynamic SLA countdown timers with priority-based escalation triggers",
        "Integrated searchable self-service knowledge base with troubleshooting guides",
        "Smart automated ticket dispatching matched to agent specialty",
        "Automated CSAT satisfaction surveys delivered immediately upon ticket resolution"
      ]
    },
    stack: ["Zite Platform", "SendGrid Email API", "Airtable", "Webhooks JSON"],
    metrics: {
      fr: [
        { label: "Temps de première réponse", value: "< 15 minutes (vs 4h)" },
        { label: "Respect des engagements SLA", value: "99.2% de conformité" },
        { label: "Résolution en libre-service", value: "32% des questions résolues sans agent" }
      ],
      en: [
        { label: "First Response Time", value: "< 15 mins (down from 4 hrs)" },
        { label: "SLA Contract Compliance", value: "99.2% adherence" },
        { label: "Self-Service Resolution", value: "32% inquiries solved autonomously" }
      ]
    },
    users: {
      fr: "Responsables support, techniciens d'assistance, clients finaux, gestionnaires SLA.",
      en: "Support leads, helpdesk technicians, client users, customer success managers."
    }
  }
];

// Export to window for global access
window.projectsData = projectsData;

