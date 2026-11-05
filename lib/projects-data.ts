export type CareerPillar =
  | "All Projects"
  | "Data Analytics"
  | "Data Engineering"
  | "Full-Stack Development"
  | "AI Engineering"

export interface TechnicalDecision {
  choice: string
  rationale: string
  tradeoffConsidered: string
}

export interface ChallengeSolution {
  challenge: string
  engineeredSolution: string
  outcome: string
}

export interface CaseStudyData {
  overview: string
  problemStatement: string
  engineeringApproach: string
  systemArchitecture: {
    summary: string
    diagramPath: string
    diagramType: "illustrative_architecture" | "verified_system_topology"
    steps: {
      phase: string
      component: string
      technology: string
      role: string
    }[]
  }
  technologyDecisions: TechnicalDecision[]
  implementationDetails: {
    title: string
    highlight: string
    codeSnippet?: string
    keyPractices: string[]
  }
  challengesAndSolutions: ChallengeSolution[]
  verifiedResults: {
    metric: string
    context: string
    evidenceType: "Live Application" | "Client Implementation" | "Benchmarked Architecture" | "Production Deployment"
  }[]
  projectLinks: {
    liveDemo?: string
    github?: string
    documentation?: string
  }
}

export interface ProjectItem {
  id: string
  slug: string
  title: string
  tagline: string
  featured: boolean
  flagship: boolean
  primaryPillar: CareerPillar
  pillars: CareerPillar[]
  previewImage: string
  previewType: "illustrative_architecture" | "verified_system_topology"
  businessProblem: string
  solutionSummary: string
  impactHighlight: string
  verifiedMetric: string
  technologies: string[]
  accentColor: string
  gradient: string
  liveDemo?: string
  github?: string
  caseStudy: CaseStudyData
}

export const careerPillars: CareerPillar[] = [
  "All Projects",
  "Data Analytics",
  "Data Engineering",
  "Full-Stack Development",
  "AI Engineering",
]

export const projectsData: ProjectItem[] = [
  {
    id: "churn-platform",
    slug: "churn-platform",
    title: "ChurnPlatform – AI Customer Analytics & Retention Engine",
    tagline: "End-to-end customer churn prediction with TreeSHAP explainability and Airflow DAGs.",
    featured: true,
    flagship: true,
    primaryPillar: "AI Engineering",
    pillars: ["AI Engineering", "Data Engineering"],
    previewImage: "/projects/churnplatform-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Customer success teams lacked early predictive signals to identify high-risk customer accounts before cancellation, suffering from fragmented data silos across billing, event telemetry, and support tickets.",
    solutionSummary:
      "Engineered point-in-time feature extraction across a 13-table PostgreSQL schema, trained calibrated XGBoost models, orchestrated Airflow automated batch DAGs, and served real-time predictions via FastAPI to a React dashboard.",
    impactHighlight: "Sub-50ms inference with TreeSHAP explanations empowering non-technical retention teams.",
    verifiedMetric: "Live AI Retention Engine",
    technologies: [
      "Python",
      "PostgreSQL",
      "XGBoost",
      "TreeSHAP",
      "FastAPI",
      "Apache Airflow",
      "React",
      "Docker",
      "AWS",
    ],
    accentColor: "border-purple-400/40 text-purple-300",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    liveDemo: "https://churnplatform.vercel.app",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "ChurnPlatform is an end-to-end customer retention intelligence system engineered to bridge raw multi-table transactional data and tactical customer retention interventions. Rather than relying on black-box predictions, the system couples calibrated gradient boosting with TreeSHAP attribution so success managers can understand precisely why a customer is trending toward churn.",
      problemStatement:
        "B2B and subscription SaaS organizations frequently discover customer churn only after cancellation requests occur. Operational records (product usage telemetry, payment retry histories, support ticket frequency) live across segregated databases. Prior attempts at scoring churn suffered from target leakage—training models on telemetry logged after cancellation decisions had already occurred.",
      engineeringApproach:
        "Designed strict point-in-time feature extraction pipelines using Apache Airflow and PostgreSQL. For each historical observation date, feature values (rolling 7d/30d login drop-offs, payment retry counts, unresolved ticket durations) are isolated to the exact millisecond before the observation threshold. This guarantees zero future data leakage during model training.",
      systemArchitecture: {
        summary:
          "Four-tier architecture decoupling data persistence, batch feature orchestration, asynchronous machine learning inference, and an interactive client-side retention triage portal.",
        diagramPath: "/projects/churnplatform-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Persistence Layer",
            component: "Relational Schema",
            technology: "PostgreSQL 15",
            role: "13-table normalized schema housing user identities, subscription intervals, billing records, session events, and support interactions.",
          },
          {
            phase: "Feature Store & DAGs",
            component: "Pipeline Engine",
            technology: "Apache Airflow",
            role: "Executes scheduled windowed feature extraction queries, writing point-in-time feature vectors to analytical staging tables.",
          },
          {
            phase: "Model & Explainability",
            component: "Inference Engine",
            technology: "XGBoost & TreeSHAP",
            role: "Evaluates gradient-boosted decision trees to compute churn probabilities and individual feature SHAP contribution scores.",
          },
          {
            phase: "Serving & Client Portal",
            component: "Application Tier",
            technology: "FastAPI & React",
            role: "High-concurrency REST endpoints serving account risk lists, waterfall contribution plots, and simulated retention intervention levers.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "XGBoost over Deep Neural Networks",
          rationale:
            "Tabular customer behavioral data with mixed numeric, categorical, and skewed frequency features consistently performs with higher sample efficiency and less tuning overhead on gradient boosted trees.",
          tradeoffConsidered:
            "Evaluated multi-layer perceptrons, but XGBoost provided direct compatibility with fast exact TreeSHAP algorithms for sub-50ms explainability.",
        },
        {
          choice: "Point-in-Time Airflow SQL DAGs over Real-Time Streaming",
          rationale:
            "Customer churn is a strategic account transition occurring over weeks, not seconds. Daily batch aggregation with historical backfilling prevented costly stream state management while ensuring audit consistency.",
          tradeoffConsidered:
            "Kafka/Flink streaming was considered, but added unnecessary infrastructure complexity for a daily decision cadence.",
        },
      ],
      implementationDetails: {
        title: "Point-in-Time Sliding Window SQL Feature Extraction",
        highlight:
          "Strict temporal boundary enforcement ensures zero leakage between rolling event frequencies and subsequent churn labels.",
        keyPractices: [
          "Windowed aggregation of 7-day and 30-day session activity drop-off ratios",
          "Automated TreeSHAP feature attribution calculating positive and negative risk factors",
          "FastAPI asynchronous router architecture with Pydantic payload validation and CORS policy",
          "Dockerized deployment for reproducible development and local orchestration",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Preventing future data leakage across rolling aggregation windows.",
          engineeredSolution:
            "Created parameterized SQL extraction scripts bounded by an explicit observation_date cutoff, filtering all event timestamps prior to the window end.",
          outcome:
            "Eliminated artificial model inflation and ensured evaluation metrics reflected real-world out-of-time deployment.",
        },
        {
          challenge: "Making algorithmic predictions actionable for non-technical customer success reps.",
          engineeredSolution:
            "Integrated TreeSHAP values directly into the React interface as human-readable waterfall charts showing the top 3 factors driving each account's risk score.",
          outcome:
            "Enabled reps to address specific friction points (e.g. payment retries vs. dormant feature adoption) rather than guessing intervention strategies.",
        },
      ],
      verifiedResults: [
        {
          metric: "Sub-50ms API Inference",
          context: "Measured on FastAPI endpoint under 50 concurrent requests with cached SHAP trees.",
          evidenceType: "Live Application",
        },
        {
          metric: "13-Table Schema Integration",
          context: "Unified transactional billing, event telemetry, and customer accounts in PostgreSQL.",
          evidenceType: "Benchmarked Architecture",
        },
        {
          metric: "Zero Temporal Leakage",
          context: "Validated through out-of-time train/test splits across 6-month historical spans.",
          evidenceType: "Production Deployment",
        },
      ],
      projectLinks: {
        liveDemo: "https://churnplatform.vercel.app",
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "sales-analytics-engine",
    slug: "omnichannel-analytics",
    title: "OmniChannel Revenue & Cohort Analytics Platform",
    tagline: "High-performance automated data analytics processing 1.2M+ transactions for cohort retention.",
    featured: true,
    flagship: true,
    primaryPillar: "Data Analytics",
    pillars: ["Data Analytics", "Data Engineering"],
    previewImage: "/projects/omnichannel-analytics.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Enterprise retail leadership relied on fragmented CSV spreadsheets with a 2-week lag in revenue reporting and no granular insight into customer cohort retention decay over quarterly sales cycles.",
    solutionSummary:
      "Engineered an automated data transformation and modeling pipeline processing 1.2M+ transactions into normalized star-schema tables, driving interactive Power BI/Recharts executive dashboards with real-time conversion and LTV cohort decay tracking.",
    impactHighlight: "Reduced reporting turnaround from 14 days to real-time automated refresh; discovered $140K in cross-sell customer cohorts.",
    verifiedMetric: "+24% Retention Insight",
    technologies: [
      "SQL",
      "Python",
      "Power BI",
      "Pandas",
      "PostgreSQL",
      "Star Schema",
      "Cohort Analysis",
    ],
    accentColor: "border-cyan-400/40 text-cyan-300",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    liveDemo: "https://github.com/Abhi122802",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "The OmniChannel Revenue & Cohort Platform converts over 1.2 million multi-channel transaction records into structured business intelligence. Designed to replace disjointed manual reporting, the system maps customer acquisition channels against long-term cohort behavior to isolate profitable customer segments.",
      problemStatement:
        "Retail transactions originating across disparate physical point-of-sale systems, e-commerce checkouts, and recurring subscriptions created data silos. Executive leadership suffered from a 14-day delay in weekly sales reporting, rendering target vs. realized pacing analyses obsolete before marketing adjustments could be enacted.",
      engineeringApproach:
        "Architected an automated multi-stage SQL data warehouse pipeline. Raw transaction streams are cleaned, deduplicated, and transformed into a dimensional star schema (Fact_Transactions joined with Dim_Customer, Dim_Channel, Dim_Product, and Dim_Date). Python and Pandas scripts compute rolling cohort retention decay matrices across 30, 60, and 90-day intervals.",
      systemArchitecture: {
        summary:
          "End-to-end data warehousing pipeline connecting multi-source operational feeds to an analytical star schema and interactive executive business intelligence dashboards.",
        diagramPath: "/projects/omnichannel-analytics.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Extraction & Staging",
            component: "Ingestion Pipeline",
            technology: "Python ETL",
            role: "Daily delta ingestion parsing and staging 1.2M+ raw transaction records from POS and web checkout exports.",
          },
          {
            phase: "Dimensional Modeling",
            component: "Analytical Store",
            technology: "PostgreSQL & SQL",
            role: "Star schema warehouse with optimized composite indexes and pre-aggregated monthly summary tables.",
          },
          {
            phase: "Cohort Analytics",
            component: "Decay Engine",
            technology: "Pandas & NumPy",
            role: "Calculates customer lifetime value expansion, repeat purchase intervals, and churn inflection points.",
          },
          {
            phase: "Executive Visualization",
            component: "BI Dashboard",
            technology: "Power BI & Recharts",
            role: "Interactive executive reporting with revenue pacing gauges, channel acquisition attribution, and retention heatmaps.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "Star Schema over Flat Denormalized Tables",
          rationale:
            "A normalized star schema drastically reduced storage redundancy across 1.2M+ transactions while providing sub-second analytical query performance for dynamic dashboard filtering.",
          tradeoffConsidered:
            "Wide flat tables were faster to prototype, but resulted in excessive memory usage and inconsistent updates across historical dimensions.",
        },
        {
          choice: "Vectorized Pandas Operations for Cohort Clustering",
          rationale:
            "Vectorized index groupings enabled calculating multi-month retention matrix tables in under 3 seconds compared to iterative procedural scripts.",
          tradeoffConsidered:
            "Direct SQL window functions were viable, but Pandas provided seamless export to statistical visualization suites.",
        },
      ],
      implementationDetails: {
        title: "Multi-Cohort Longitudinal Retention Calculations",
        highlight:
          "Cohort groups are indexed by customer first-purchase month and evaluated across subsequent calendar intervals to surface decay velocity.",
        keyPractices: [
          "Deduplication and currency normalization across physical POS and web transactions",
          "Automated target vs. realized revenue pacing calculation with seasonal adjustment",
          "Star-schema database design with primary-foreign key integrity constraints",
          "Optimized composite indexing on (customer_id, transaction_date, channel_id)",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Slow aggregation queries across 1.2M+ transaction rows.",
          engineeredSolution:
            "Built pre-aggregated monthly materialized summary views and indexed timestamp columns, routing dashboard queries to summary views unless drill-down was requested.",
          outcome: "Reduced query response time from 18 seconds to under 400 milliseconds.",
        },
        {
          challenge: "Handling discrepancies between physical retail POS and online payment gateways.",
          engineeredSolution:
            "Developed automated reconciliation rules that flag and segregate orphaned transactions for manual review without halting pipeline execution.",
          outcome: "Maintained 100% pipeline run completion with zero data corruption.",
        },
      ],
      verifiedResults: [
        {
          metric: "1.2M+ Transactions Processed",
          context: "Batch-processed across omni-channel retail and online e-commerce records.",
          evidenceType: "Benchmarked Architecture",
        },
        {
          metric: "14-Day to Real-Time Reduction",
          context: "Eliminated manual spreadsheet reconciliation in favor of automated SQL refreshes.",
          evidenceType: "Client Implementation",
        },
        {
          metric: "$140K Cross-Sell Insights",
          context: "Identified high-performing multi-channel customer cohorts with repeat buying habits.",
          evidenceType: "Benchmarked Architecture",
        },
      ],
      projectLinks: {
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "supershopy-platform",
    slug: "supershopy",
    title: "SuperShopy – Quick-Commerce Delivery & Logistics Platform",
    tagline: "Multi-tenant delivery platform with immutable checkout snapshots and HTML5 QR courier verification.",
    featured: true,
    flagship: true,
    primaryPillar: "Full-Stack Development",
    pillars: ["Full-Stack Development"],
    previewImage: "/projects/supershopy-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "High-frequency quick-commerce logistics required synchronous state updates across consumer storefronts, warehouse packaging stations, and mobile courier drivers without order data drift or handoff disputes.",
    solutionSummary:
      "Architected a multi-tenant Node.js/TypeScript and MongoDB platform featuring dedicated client storefronts, warehouse portals, and driver applications. Engineered immutable order checkout snapshots, courier QR handoff verification via HTML5-Qrcode, and enterprise security with RBAC and rate limiting.",
    impactHighlight: "Zero order data drift across fulfillment handoffs with camera-verified proof of delivery.",
    verifiedMetric: "Multi-Tenant & QR Verification",
    technologies: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Tailwind CSS",
      "HTML5-Qrcode",
      "JWT",
      "Docker",
    ],
    accentColor: "border-teal-400/40 text-teal-300",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    liveDemo: "https://supershopy.vercel.app",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "SuperShopy is a complete quick-commerce logistics platform built to manage rapid order lifecycles from customer cart placement to final courier handoff. The platform coordinates four operational touchpoints: consumer storefronts, merchant admin panels, warehouse fulfillment consoles, and mobile courier verification screens.",
      problemStatement:
        "In quick-commerce, items frequently change price or go out of stock during active fulfillment. In traditional CRUD designs, modifying product catalog prices or editing items unintentionally altered historical invoices. Additionally, couriers frequently reported false deliveries without verifiable physical proof.",
      engineeringApproach:
        "Engineered an immutable snapshot pattern for order placement. When a customer initiates checkout, the order document deeply copies all item descriptions, unit prices, applied taxes, and delivery coordinates into a frozen JSON snapshot. For physical proof of handoff, integrated the HTML5-Qrcode SDK directly into the driver portal, requiring couriers to scan the encrypted packaging token before marking delivery complete.",
      systemArchitecture: {
        summary:
          "Modular multi-tenant REST API architecture backed by MongoDB document clustering, secured with Role-Based Access Control and Helmet HTTP hardening.",
        diagramPath: "/projects/supershopy-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Frontends & Portals",
            component: "Role-Based UIs",
            technology: "React & Tailwind CSS",
            role: "Responsive portals for Customers (Storefront), Merchants (Admin), Warehouse (Fulfillment), and Couriers (Driver App).",
          },
          {
            phase: "API Security & Gateway",
            component: "Express Gateway",
            technology: "Node.js & TypeScript",
            role: "Enforces route-level RBAC middleware, JWT authorization, IP-based rate limiting, and Helmet header protection.",
          },
          {
            phase: "Data Engine",
            component: "Document Store",
            technology: "MongoDB Clusters",
            role: "Stores user identities, active inventories, and immutable order checkout documents with audit state histories.",
          },
          {
            phase: "Verification Pipeline",
            component: "Proof of Delivery",
            technology: "HTML5-Qrcode SDK",
            role: "Mobile camera integration decoding signed order QR tokens to authorize delivery state transitions.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "MongoDB Document Model for Immutable Order Snapshots",
          rationale:
            "MongoDB's flexible schema allowed embedding complete snapshot schemas (product details, prices, user addresses) directly within the Order document in a single atomic write without complex multi-table joins.",
          tradeoffConsidered:
            "Relational SQL was considered, but deeply nested snapshot tables introduced heavy join overhead for high-frequency mobile order lookups.",
        },
        {
          choice: "HTML5-Qrcode Client-Side Scanning over Native Mobile Bridge",
          rationale:
            "HTML5-Qrcode operates directly in standard mobile web browsers, eliminating the need to maintain separate iOS/Android app store packages for gig couriers.",
          tradeoffConsidered:
            "Native camera APIs offer slightly lower latency, but web-based camera access was fast enough (<300ms) with zero install friction.",
        },
      ],
      implementationDetails: {
        title: "Immutable Order Snapshot & Cryptographic QR Verification",
        highlight:
          "Guarantees that once placed, an order's financial and line-item details can never be mutated by subsequent store catalog updates.",
        keyPractices: [
          "Atomic document creation with deep clone of cart items and frozen pricing",
          "Role-Based Access Control (RBAC) ensuring drivers only view assigned delivery tokens",
          "Express rate-limiting middleware to guard against checkout brute-force attempts",
          "Responsive mobile-first UI with offline-tolerant handoff feedback",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Preventing race conditions when multiple customers order the last remaining inventory item.",
          engineeredSolution:
            "Implemented MongoDB atomic `$inc` operations with conditional inventory availability checks in the database write query.",
          outcome: "Completely eliminated negative inventory stockouts under concurrent checkouts.",
        },
        {
          challenge: "Scanning QR codes reliably in varying lighting and camera resolutions.",
          engineeredSolution:
            "Tuned HTML5-Qrcode configuration with adaptive fps polling and bounding box contrast filters.",
          outcome: "Achieved instantaneous barcode decoding across diverse Android and iOS mobile browsers.",
        },
      ],
      verifiedResults: [
        {
          metric: "Zero Order State Drift",
          context: "Immutable checkout snapshot architecture prevents price/item modifications post-order.",
          evidenceType: "Live Application",
        },
        {
          metric: "Web Camera QR Scanning",
          context: "Client-side camera scanning directly in mobile browser without native app installation.",
          evidenceType: "Live Application",
        },
        {
          metric: "Role-Based Portal Separation",
          context: "Unified backend serving 4 isolated role portals (Customer, Warehouse, Courier, Admin).",
          evidenceType: "Production Deployment",
        },
      ],
      projectLinks: {
        liveDemo: "https://supershopy.vercel.app",
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "mortgage-loan-appraisal-verifier",
    slug: "qa-pramaan",
    title: "Mortgage Loan Appraisal Report Verification Software (QA-Pramaan)",
    tagline: "Automated underwriting audit software verifying mortgage loan appraisal files against compliance rules.",
    featured: true,
    flagship: true,
    primaryPillar: "Full-Stack Development",
    pillars: ["Full-Stack Development", "Data Engineering"],
    previewImage: "/projects/qapramaan-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Mortgage underwriters spent extensive manual hours auditing multi-page property appraisal packages, frequently overlooking missing legal attributes, underwriting rule violations, and valuation inconsistencies.",
    solutionSummary:
      "Engineered automated compliance verification logic using Python, Django, SQL, and React. Built automated rule-checking pipelines that ingest loan package attributes, evaluate mathematical variance constraints, and display instant discrepancy flags on an interactive React auditing console.",
    impactHighlight: "Instantaneous loan file auditing, highlighting missing attributes and underwriting mismatches in seconds.",
    verifiedMetric: "Instant Underwriting Auditing",
    technologies: [
      "Python",
      "Django",
      "SQL",
      "PostgreSQL",
      "React",
      "REST APIs",
      "Compliance Auditing",
    ],
    accentColor: "border-sky-400/40 text-sky-300",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    liveDemo: "https://qa-pramaan.vercel.app/",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "QA-Pramaan is an automated mortgage appraisal quality assurance system designed for loan underwriters and compliance auditors. By automating rule checking and cross-referencing document attributes, the platform flags high-risk appraisal errors before loan approval packages are committed.",
      problemStatement:
        "Real estate appraisal packages exceed dozens of pages containing complex borrower information, zoning codes, comparable property adjustments, and structural assessments. Underwriters manually cross-checked these values against lender guidelines, leading to human fatigue, delayed loan clearances, and compliance audit penalties.",
      engineeringApproach:
        "Designed a decoupled Python/Django audit engine with a responsive React frontend. Appraisal attributes are parsed into a normalized relational schema. A modular rules engine sequentially executes compliance checks—validating field completeness, comparable sale variance ratios, appraisal date boundaries, and appraiser signature certifications. Discrepancies are categorized by severity (Critical, Warning, Advisory) and streamed to the React audit dashboard.",
      systemArchitecture: {
        summary:
          "Modular Django backend executing declarative compliance rule chains against structured loan packages, exposing REST audit endpoints to a high-density React user interface.",
        diagramPath: "/projects/qapramaan-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "File Ingestion & Parsing",
            component: "Ingestion Module",
            technology: "Python Service",
            role: "Receives structured appraisal data payloads and normalizes borrower, property, and valuation fields.",
          },
          {
            phase: "Compliance Rule Engine",
            component: "Audit Evaluator",
            technology: "Django & Python",
            role: "Executes declarative underwriting rules, verifying mathematical variances and mandatory compliance flags.",
          },
          {
            phase: "Relational Ledger",
            component: "Database Storage",
            technology: "PostgreSQL & SQL",
            role: "Maintains an immutable historical record of all audit runs, triggered exceptions, and auditor sign-offs.",
          },
          {
            phase: "Auditor Console",
            component: "Review Screen",
            technology: "React & REST APIs",
            role: "High-density inspection screen surfacing red-flagged discrepancies with direct document field references.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "Declarative Rule Engine Pattern in Python/Django",
          rationale:
            "Structuring checks as discrete, reusable rule classes allowed non-engineers to define new underwriting rules without altering core database ingestion logic.",
          tradeoffConsidered:
            "Hardcoded conditional statements were faster to write initially, but became unmaintainable as lender compliance specifications expanded.",
        },
        {
          choice: "React Single Page Application for Underwriter Workspace",
          rationale:
            "Auditors require rapid navigation between appraisal sections without full-page reloads. React's stateful components enabled instant filtering of flagged errors.",
          tradeoffConsidered:
            "Django server-rendered templates required round-trips for every filter adjustment.",
        },
      ],
      implementationDetails: {
        title: "Multi-Rule Underwriting Compliance Evaluation",
        highlight:
          "Automated variance threshold verification flags appraisal comparable sales exceeding standard adjustment tolerances.",
        keyPractices: [
          "Modular rule engine design with independent validation handlers",
          "Severity-based exception categorization (Blocker, Warning, Notice)",
          "Audit trail logging tracking every file verification event and timestamp",
          "Clean RESTful API contracts between Django backend and React client",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Handling missing or null attributes without crashing the rule pipeline.",
          engineeredSolution:
            "Implemented safe schema validation with Pydantic/Django serializer bounds, gracefully treating missing fields as explicit validation findings rather than runtime exceptions.",
          outcome: "Achieved 100% pipeline stability across malformed or incomplete loan packages.",
        },
        {
          challenge: "Surfacing complex multi-field discrepancies legibly to auditors.",
          engineeredSolution:
            "Designed a dedicated exception drawer in React that maps every rule failure back to its specific appraisal section and recommended remediation action.",
          outcome: "Significantly accelerated file review speeds for underwriting teams.",
        },
      ],
      verifiedResults: [
        {
          metric: "Instantaneous Rule Execution",
          context: "Evaluates full underwriting rule suite across loan appraisal attributes in under 200ms.",
          evidenceType: "Live Application",
        },
        {
          metric: "Automated Compliance Auditing",
          context: "Standardized rule checking logic for mortgage loan appraisal report verification.",
          evidenceType: "Production Deployment",
        },
        {
          metric: "Live Web Deployment",
          context: "Active web application accessible at qa-pramaan.vercel.app.",
          evidenceType: "Live Application",
        },
      ],
      projectLinks: {
        liveDemo: "https://qa-pramaan.vercel.app/",
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "elevate-tech-platform",
    slug: "elevate-technologies",
    title: "Elevate Technology – E-Commerce & SaaS Licensing Platform",
    tagline: "Commercial software storefront with automated node-locked licensing keys and Razorpay checkout.",
    featured: true,
    flagship: true,
    primaryPillar: "Full-Stack Development",
    pillars: ["Full-Stack Development"],
    previewImage: "/projects/elevate-tech-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Digital software licensing sales suffered from manual license issuance, untracked workstation lock-ins, complex tax accounting (CGST/SGST), and prospect drop-offs during software evaluation.",
    solutionSummary:
      "Engineered an e-commerce platform featuring automated hardware node-locked licensing key generation, Razorpay payment webhooks, real-time stock inventories, automated tax ledgers, and an interactive React ROI calculator, secured with JWT and AuditLog tracking.",
    impactHighlight: "Automated instant hardware-bound key delivery with statutory tax compliance and interactive ROI tooling.",
    verifiedMetric: "Automated Node-Locked Licensing",
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux Toolkit",
      "Razorpay API",
      "AuditLog",
    ],
    accentColor: "border-indigo-400/40 text-indigo-300",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    liveDemo: "https://elevatetechnologies.in",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "Elevate Technologies is a live commercial e-commerce and SaaS software distribution platform (elevatetechnologies.in). The system automates digital product purchases, statutory tax splits, hardware machine node-locking, and license verification without human intervention.",
      problemStatement:
        "Prior to automation, software licenses were generated manually via email after bank transfer confirmation. Customers waited hours to receive product keys. Furthermore, licenses lacked machine binding, allowing single licenses to be shared across unauthorized workstations. Invoicing also required manual split calculations for Indian GST compliance (CGST/SGST).",
      engineeringApproach:
        "Developed a modern React 19 storefront powered by Redux Toolkit for real-time state synchronization, backed by a hardened Node.js/Express API. Upon verified Razorpay payment webhook receipt, the backend generates a cryptographically signed license file bound to the customer's unique hardware identifier. An automated tax ledger instantly computes statutory CGST/SGST allocations and writes immutable invoice audit logs.",
      systemArchitecture: {
        summary:
          "Production e-commerce architecture integrating payment gateway webhooks, automated license generators, statutory tax ledgers, and audit logging.",
        diagramPath: "/projects/elevate-tech-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Client Storefront",
            component: "Product Interface",
            technology: "React 19 & Redux Toolkit",
            role: "Interactive software catalog, interactive ROI calculator, and dynamic shopping cart with real-time stock state.",
          },
          {
            phase: "Backend Services",
            component: "Commercial API",
            technology: "Node.js & Express",
            role: "Handles order verification, JWT authentication, CORS security, and automated system AuditLog entries.",
          },
          {
            phase: "Payment & Tax Engine",
            component: "Checkout Gateway",
            technology: "Razorpay Webhooks",
            role: "Idempotent payment confirmation with automated statutory CGST/SGST tax ledger split calculations.",
          },
          {
            phase: "License Cryptography",
            component: "Key Generator",
            technology: "Node Cryptography",
            role: "Generates tamper-proof license keys locked to customer hardware node IDs with validity timestamps.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "Hardware Node-Locked Key Generation",
          rationale:
            "Binding license files to encrypted CPU/motherboard hardware signatures prevented pirated multi-workstation replication while maintaining offline verification capability for end users.",
          tradeoffConsidered:
            "Pure online cloud license verification required constant internet connectivity, which disrupted clients in isolated engineering environments.",
        },
        {
          choice: "Redux Toolkit for Storefront State Management",
          rationale:
            "Centralized state management allowed the interactive ROI calculator, live cart discounts, and multi-currency pricing to stay strictly synchronized without state divergence.",
          tradeoffConsidered:
            "React Context was evaluated, but RTK provided cleaner separation of API slices and performance optimizations.",
        },
      ],
      implementationDetails: {
        title: "Automated Node-Locked Licensing & Tax Ledger Architecture",
        highlight:
          "Webhook-driven license issuance executes immediately upon cryptographic signature verification from Razorpay.",
        keyPractices: [
          "Idempotent Razorpay webhook handling to prevent double license generation on retries",
          "Automated statutory tax split calculation for Indian CGST and SGST compliance",
          "Interactive React ROI calculator assisting enterprise prospects during software evaluation",
          "AuditLog database collection tracking administrative interventions and key deliveries",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Handling dropped connections during payment gateway redirects.",
          engineeredSolution:
            "Architected asynchronous webhook listeners with signature verification and idempotency keys, ensuring license generation succeeds even if the customer's browser is closed mid-checkout.",
          outcome: "Achieved 100% order fulfillment reliability with zero orphaned payments.",
        },
        {
          challenge: "Providing immediate ROI clarity to hesitant enterprise buyers.",
          engineeredSolution:
            "Built a dynamic ROI calculation widget in React allowing prospects to toggle their engineering team size and compute projected software labor savings.",
          outcome: "Significantly enhanced commercial conversion rates on primary product landing pages.",
        },
      ],
      verifiedResults: [
        {
          metric: "Active Production Deployment",
          context: "Live commercial website serving enterprise software at elevatetechnologies.in.",
          evidenceType: "Production Deployment",
        },
        {
          metric: "Automated Hardware Node-Locking",
          context: "Cryptographically bound software licensing keys tied to workstation signatures.",
          evidenceType: "Live Application",
        },
        {
          metric: "Automated CGST/SGST Ledger",
          context: "Integrated statutory tax split calculations for automated billing and accounting.",
          evidenceType: "Client Implementation",
        },
      ],
      projectLinks: {
        liveDemo: "https://elevatetechnologies.in",
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "str-analytics-platform",
    slug: "str-analytics",
    title: "STR Analytics Platform",
    tagline: "Operational business intelligence, relational modeling, and executive KPI reporting for DJRB Services.",
    featured: false,
    flagship: false,
    primaryPillar: "Data Analytics",
    pillars: ["Data Analytics", "Data Engineering"],
    previewImage: "/projects/str-analytics-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Raw operational service records at DJRB Services suffered from format inconsistencies, duplicate entries, and missing attributes across multi-team spreadsheets, preventing centralized executive visibility.",
    solutionSummary:
      "Built a full-cycle operational analytics pipeline covering raw data ingestion, automated cleaning, relational PostgreSQL schema modeling, SQL data validation gates, and interactive executive trend dashboards.",
    impactHighlight: "Eliminated manual reporting errors while providing operational leadership with verified trend reports.",
    verifiedMetric: "Automated Data Validation & Reporting",
    technologies: [
      "SQL",
      "PostgreSQL",
      "Data Modeling",
      "ETL Pipelines",
      "Executive Dashboards",
      "Data Validation",
    ],
    accentColor: "border-cyan-400/40 text-cyan-300",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    liveDemo: "https://github.com/Abhi122802",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "The STR Analytics Platform is an operational intelligence system designed for DJRB Services. It transforms disorganized operational spreadsheets into a structured, validated relational database feeding weekly and monthly executive dashboards.",
      problemStatement:
        "Service records entered by multiple internal teams contained missing attributes, conflicting formatting, and irregular timestamps. Leadership spent hours resolving conflicting numbers rather than focusing on strategic operational decisions.",
      engineeringApproach:
        "Designed an end-to-end data preparation and relational modeling architecture. Wrote optimized SQL scripts to clean, transform, and load raw records into PostgreSQL tables. Instituted automated data validation rules to intercept format anomalies and built consolidated executive dashboard views.",
      systemArchitecture: {
        summary:
          "Four-phase operational data pipeline covering ingestion, SQL relational transformation, automated quality gatekeeping, and executive dashboard delivery.",
        diagramPath: "/projects/str-analytics-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Raw Ingestion",
            component: "Collection Service",
            technology: "Data Cleaning Scripts",
            role: "Ingests raw operational service records and normalizes timestamps and client identifiers.",
          },
          {
            phase: "SQL Transformation",
            component: "Relational Modeling",
            technology: "PostgreSQL",
            role: "Structures data into clean relational tables with foreign-key constraints and optimized join paths.",
          },
          {
            phase: "Quality Validation",
            component: "Integrity Rules",
            technology: "SQL Rules",
            role: "Intercepts missing fields, null values, and domain boundary errors prior to reporting aggregation.",
          },
          {
            phase: "Executive Reporting",
            component: "Leadership Views",
            technology: "Executive Dashboards",
            role: "Surfaces operational KPI trends, volume tracking, and team throughput metrics for leadership.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "Relational PostgreSQL Schema over Ad-Hoc Spreadsheets",
          rationale:
            "Enforcing schema constraints at the database level prevented teams from entering malformed records, ensuring continuous data integrity.",
          tradeoffConsidered:
            "Spreadsheets were more flexible for casual entry, but created unacceptable error rates for corporate reporting.",
        },
      ],
      implementationDetails: {
        title: "Relational Modeling & Data Integrity Rules",
        highlight:
          "Automated SQL scripts validate field completeness and transform operational data into clean analytical tables.",
        keyPractices: [
          "Optimized SQL join queries linking operational accounts and service events",
          "Automated data validation routines flagging anomalous entries",
          "Weekly and monthly aggregation scripts feeding executive reports",
          "Documentation of relational schemas and field definitions for staff",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Handling inconsistent historical data formats across legacy records.",
          engineeredSolution:
            "Authored robust regex and type casting SQL cleansing routines that standardized dates, phone numbers, and currency values.",
          outcome: "Successfully unified multi-year historical operational data into a single coherent database.",
        },
      ],
      verifiedResults: [
        {
          metric: "Zero Reporting Inconsistency",
          context: "Standardized SQL data models eliminated conflicting manual spreadsheet numbers.",
          evidenceType: "Client Implementation",
        },
        {
          metric: "Automated Quality Gates",
          context: "Data validation rules continuously catch missing records and formatting violations.",
          evidenceType: "Client Implementation",
        },
      ],
      projectLinks: {
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "salesforce-crm-lead-engine",
    slug: "salesforce-crm",
    title: "Enterprise Lead Automation & Apex Lightning CRM",
    tagline: "Custom Salesforce CRM automation with bulkified Apex triggers, SOQL optimization, and reactive LWC.",
    featured: false,
    flagship: false,
    primaryPillar: "Full-Stack Development",
    pillars: ["Full-Stack Development"],
    previewImage: "/projects/salesforce-crm-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Enterprise sales representatives spent hours daily manually qualifying incoming leads, managing contact assignments, and updating opportunity pipelines without automated governance.",
    solutionSummary:
      "Engineered a custom Salesforce application with bulkified Apex Trigger frameworks, asynchronous Queueable jobs, custom SOQL queries, and reactive Lightning Web Components (LWC) for automated lead scoring and round-robin allocation.",
    impactHighlight: "Saved 15+ hours weekly per sales representative while eliminating governor limit violations.",
    verifiedMetric: "15hrs/week Saved",
    technologies: [
      "Salesforce",
      "Apex",
      "Lightning Web Components",
      "SOQL",
      "Flows",
      "Salesforce DX",
    ],
    accentColor: "border-blue-400/40 text-blue-300",
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    liveDemo: "https://github.com/Abhi122802",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "The Enterprise Lead Automation platform is a bespoke Salesforce CRM solution built using Platform Developer I (PD-I) architectural best practices. It automates inbound lead evaluation, round-robin assignment, and executive pipeline visibility through reactive Lightning Web Components.",
      problemStatement:
        "Sales reps manually triaged hundreds of inbound leads weekly. Slower response times caused high-intent prospect drop-offs. Previous workflow attempts frequently failed due to hitting Salesforce SOQL governor limits during high-volume bulk imports.",
      engineeringApproach:
        "Engineered a modular Apex Trigger Handler framework adhering to strict bulkification patterns (one trigger per object, logic encapsulated in service classes, zero SOQL queries within loops). Implemented Queueable Apex for asynchronous scoring calculations and built custom Lightning Web Components (LWC) wired directly to Apex controllers for real-time rep dashboard interactivity.",
      systemArchitecture: {
        summary:
          "Event-driven Salesforce architecture coupling bulkified Apex handlers, asynchronous queueable jobs, custom objects, and reactive Lightning Web Components.",
        diagramPath: "/projects/salesforce-crm-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Intake & Filtering",
            component: "Omni-Channel Lead Queue",
            technology: "Salesforce CRM",
            role: "Captures inbound web-to-lead and API prospects, running immediate deduplication filters.",
          },
          {
            phase: "Apex Processing",
            component: "Trigger Framework",
            technology: "Apex Triggers & Handlers",
            role: "Bulkified trigger execution evaluating scoring matrices and allocating leads via round-robin rules.",
          },
          {
            phase: "Data Persistence",
            component: "Custom Schema",
            technology: "SOQL & Custom Objects",
            role: "Tracks lead scoring histories, rep capacity quotas, and linked opportunity records with indexing.",
          },
          {
            phase: "User Interface",
            component: "Lightning Console",
            technology: "Lightning Web Components",
            role: "Reactive rep workspace with dynamic progress cards and wire adapters for instant state refresh.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "One-Trigger-Per-Object Handler Pattern",
          rationale:
            "Prevents uncontrolled trigger recursion and establishes a predictable execution order for before-insert, after-insert, and after-update contexts.",
          tradeoffConsidered:
            "Multiple ad-hoc triggers were faster to build in sandbox, but created unpredictable race conditions in production orgs.",
        },
      ],
      implementationDetails: {
        title: "Bulkified Apex Trigger & Queueable Architecture",
        highlight:
          "Collections and map structures ensure bulk records process in a single SOQL and DML transaction.",
        keyPractices: [
          "Zero SOQL inside iteration loops to respect 100-query governor limits",
          "Queueable Apex execution for compute-heavy lead scoring matrices",
          "Lightning Web Components utilizing @wire adapters for reactive client rendering",
          "Unit test suites maintaining >85% code coverage with realistic test data factories",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Preventing governor limit exceptions during large-scale CSV lead imports (2,000+ records).",
          engineeredSolution:
            "Refactored trigger logic to aggregate record IDs into Sets and execute single batch queries using Map data structures.",
          outcome: "Processed 2,000+ record batches well within CPU time and query governor limits.",
        },
      ],
      verifiedResults: [
        {
          metric: "Salesforce PD-I Certified",
          context: "Architected to official Salesforce Platform Developer I standards and guidelines.",
          evidenceType: "Production Deployment",
        },
        {
          metric: "Zero Governor Limit Violations",
          context: "Bulkified test classes verified up to 200 records per execution context.",
          evidenceType: "Benchmarked Architecture",
        },
      ],
      projectLinks: {
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "fintech-mobile-banking",
    slug: "fintech-banking",
    title: "Fintech Mobile Banking App & Design System",
    tagline: "Accessible mobile banking UI/UX design architecture built on an 8pt spatial grid system.",
    featured: false,
    flagship: false,
    primaryPillar: "Full-Stack Development",
    pillars: ["Full-Stack Development"],
    previewImage: "/projects/fintech-banking-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Users experienced cognitive friction, high drop-off rates, and anxiety during international multi-currency money transfers and wealth onboarding.",
    solutionSummary:
      "Conducted user research and designed an accessible mobile banking experience in Figma. Built an atomic component library, interactive wireframes, and clickable high-fidelity prototypes based on an 8pt spatial grid system with WCAG AAA color contrast.",
    impactHighlight: "Achieved +38% improvement in task completion speed during benchmarked usability tests.",
    verifiedMetric: "+38% Task Completion",
    technologies: [
      "Figma",
      "Design Systems",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Interaction Design",
    ],
    accentColor: "border-pink-400/40 text-pink-300",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    liveDemo: "https://github.com/Abhi122802",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "The Fintech Mobile Banking Design System is a human-centered digital product architecture designed to reduce friction and cognitive load in complex consumer financial transactions.",
      problemStatement:
        "Consumer banking apps often present dense, confusing transaction screens with unverified currency conversion rates, leading to accidental misdirected transfers and user hesitation during checkout.",
      engineeringApproach:
        "Conducted 15+ user interview sessions to identify core anxiety points during money transfers. Established an 8pt spatial design token system, defined accessible color palettes meeting WCAG AAA requirements, and built interactive Figma prototypes featuring progressive disclosure of fee structures.",
      systemArchitecture: {
        summary:
          "Four-tier design lifecycle encompassing user research, atomic token hierarchy, interactive prototyping, and usability validation.",
        diagramPath: "/projects/fintech-banking-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Discovery & Empathy",
            component: "User Research",
            technology: "User Interviews",
            role: "Identified cognitive bottlenecks and transfer anxiety triggers across onboarding flows.",
          },
          {
            phase: "Atomic Design",
            component: "Token System",
            technology: "8pt Spatial Grid",
            role: "Created reusable typography, input states, and accessible color tokens meeting WCAG AAA standards.",
          },
          {
            phase: "Prototyping",
            component: "Interactive Screens",
            technology: "Figma Prototyping",
            role: "Engineered clickable mobile prototypes with micro-interactions and smooth flow transitions.",
          },
          {
            phase: "Evaluation",
            component: "Usability Testing",
            technology: "Task Benchmark",
            role: "Validated prototype with users, measuring task velocity, misclick rates, and satisfaction scores.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "8pt Spatial Grid System",
          rationale:
            "Standardizing spacing on an 8pt baseline ensured visual rhythm and simplified handoff to frontend React Native/CSS developers.",
          tradeoffConsidered:
            "Freeform spacing felt faster during initial ideation, but created visual inconsistencies across screen sizes.",
        },
      ],
      implementationDetails: {
        title: "Atomic Design Tokens & Progressive Disclosure",
        highlight:
          "Multi-currency conversion fees are progressively revealed to eliminate user cognitive overload without hiding details.",
        keyPractices: [
          "Reusable atomic UI components (Buttons, Inputs, Cards, Modals)",
          "Accessible color contrast ratios exceeding 7:1 for all primary text elements",
          "Interactive micro-interactions for balance reveal and biometric authentication",
          "Complete developer handoff specifications with CSS token mappings",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Preventing accidental money transfers without adding frustrating confirmation roadblocks.",
          engineeredSolution:
            "Implemented a slide-to-confirm gesture component with tactile micro-haptics and a 5-second undo grace window.",
          outcome: "Reduced accidental transfer reports to zero during prototype testing.",
        },
      ],
      verifiedResults: [
        {
          metric: "+38% Task Completion Speed",
          context: "Measured during timed international transfer usability testing sessions.",
          evidenceType: "Benchmarked Architecture",
        },
        {
          metric: "WCAG AAA Accessible Contrast",
          context: "All financial figures and interactive buttons pass stringent accessibility standards.",
          evidenceType: "Benchmarked Architecture",
        },
      ],
      projectLinks: {
        github: "https://github.com/Abhi122802",
      },
    },
  },
  {
    id: "iot-sensor-stream",
    slug: "iot-sensor-stream",
    title: "Real-Time Android Sensor Telemetry & Telematics",
    tagline: "Industrial sensor monitoring client communicating high-frequency machine metrics via REST APIs.",
    featured: false,
    flagship: false,
    primaryPillar: "Full-Stack Development",
    pillars: ["Full-Stack Development", "Data Engineering"],
    previewImage: "/projects/iot-sensor-arch.svg",
    previewType: "illustrative_architecture",
    businessProblem:
      "Manufacturing machinery at Sathe Engineering required constant physical presence for temperature, humidity, and vibration checks, leading to delayed discovery of mechanical overheating.",
    solutionSummary:
      "Engineered an Android telemetry client communicating via REST APIs with cloud storage, real-time chart visualizers, and automated threshold alerts for active plant floor monitoring.",
    impactHighlight: "Deployed on active production machines with continuous real-time uptime monitoring.",
    verifiedMetric: "99.9% Telemetry Uptime",
    technologies: [
      "Android",
      "Java",
      "REST APIs",
      "Node.js",
      "IoT Protocols",
      "SQLite",
      "Real-Time Telemetry",
    ],
    accentColor: "border-emerald-400/40 text-emerald-300",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    liveDemo: "https://github.com/Abhi122802",
    github: "https://github.com/Abhi122802",
    caseStudy: {
      overview:
        "The IoT Sensor Telemetry application is an industrial monitoring system built for Sathe Engineering. It pairs high-frequency environmental sensors with an Android mobile client to provide plant operators with live condition telematics.",
      problemStatement:
        "Factory floor workers were required to manually log thermometer and vibration readings at fixed intervals. Critical temperature spikes occurring between inspection shifts were missed, causing equipment wear and unexpected downtime.",
      engineeringApproach:
        "Built an Android application using Java that polls sensor transducers via industrial interfaces. Sensor readings are buffered locally in an SQLite database to ensure zero data loss during plant Wi-Fi dropouts, and synchronized asynchronously to a cloud REST backend when connectivity is restored.",
      systemArchitecture: {
        summary:
          "Fault-tolerant industrial IoT pipeline connecting machine sensors to an offline-resilient Android client and cloud telemetry gateway.",
        diagramPath: "/projects/iot-sensor-arch.svg",
        diagramType: "illustrative_architecture",
        steps: [
          {
            phase: "Hardware Transducers",
            component: "Industrial Sensors",
            technology: "Hardware Sensors",
            role: "Captures continuous temperature, humidity, and vibration readings from active machinery.",
          },
          {
            phase: "Mobile Client",
            component: "Android Application",
            technology: "Java & Android SDK",
            role: "Executes background polling, renders real-time telemetry graphs, and manages local SQLite caching.",
          },
          {
            phase: "Cloud Gateway",
            component: "REST API",
            technology: "Node.js REST API",
            role: "Ingests telemetry streams, validates payloads, and evaluates anomalous threshold breach rules.",
          },
          {
            phase: "Plant Floor View",
            component: "Operator Console",
            technology: "Mobile Dashboard",
            role: "High-visibility plant terminal displaying immediate thermal spike alerts and historical shift logs.",
          },
        ],
      },
      technologyDecisions: [
        {
          choice: "Local SQLite Buffer on Android Client",
          rationale:
            "Factory environments frequently experience electromagnetic interference and Wi-Fi dead zones. Local SQLite buffering guaranteed zero data loss during network interruptions.",
          tradeoffConsidered:
            "Pure real-time streaming without local buffering caused immediate telemetry gaps whenever connections dropped.",
        },
      ],
      implementationDetails: {
        title: "Offline-Resilient Telemetry Ingestion",
        highlight:
          "Automatic network state listeners flush buffered SQLite sensor records to the cloud backend upon reconnection.",
        keyPractices: [
          "Android Background Service polling sensors at configured time intervals",
          "Local SQLite caching with transactional batch flushes upon network reconnection",
          "Real-time graph visualization rendering smooth rolling temperature curves",
          "Automated threshold evaluation triggering visual alerts when tolerances are exceeded",
        ],
      },
      challengesAndSolutions: [
        {
          challenge: "Preventing Android OS battery management from killing the background sensor polling service.",
          engineeredSolution:
            "Implemented an Android Foreground Service with a persistent low-overhead notification and partial wake lock management.",
          outcome: "Maintained continuous uninterrupted sensor logging across 24-hour plant shifts.",
        },
      ],
      verifiedResults: [
        {
          metric: "99.9% Telemetry Uptime",
          context: "Maintained continuous data acquisition during active plant floor machinery monitoring.",
          evidenceType: "Client Implementation",
        },
        {
          metric: "Active Machinery Deployment",
          context: "Deployed on active production machines at Sathe Engineering in Solapur.",
          evidenceType: "Client Implementation",
        },
      ],
      projectLinks: {
        github: "https://github.com/Abhi122802",
      },
    },
  },
]
