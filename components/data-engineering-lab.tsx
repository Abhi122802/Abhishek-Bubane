"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Workflow,
  Database,
  Layers,
  ArrowRight,
  Code2,
  CheckCircle2,
  Clock,
  Key,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  ChevronRight,
  Info,
  Server,
  FileCode,
  Activity,
  Play,
  Pause,
  AlertTriangle,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* =========================================================================
   1. Data Pipeline Interactive Stages
   ========================================================================= */

interface PipelineStage {
  id: string
  name: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  description: string
  techStack: string[]
  keyDecision: string
  latencySLA: string
}

const pipelineStages: PipelineStage[] = [
  {
    id: "sources",
    name: "Data Sources",
    category: "Ingestion Tier",
    icon: Server,
    badge: "Multi-Source",
    description: "Capturing transactional webhook events, database CDC logs, and client telemetry streams.",
    techStack: ["Stripe Webhooks", "PostgreSQL CDC", "SaaS Event Stream", "REST Log Collector"],
    keyDecision: "Buffered ingestion with idempotency keys prevents duplicate transaction records under network retries.",
    latencySLA: "< 15ms buffer entry",
  },
  {
    id: "ingestion",
    name: "Airflow Ingestion",
    category: "Orchestration Tier",
    icon: Workflow,
    badge: "Scheduled DAGs",
    description: "Automated batch and micro-batch DAGs coordinating extraction and staging with failure alerts.",
    techStack: ["Apache Airflow 2.8", "Python Operators", "Celery Executor", "Slack Webhooks"],
    keyDecision: "DAG tasks are isolated in stateless Docker containers ensuring reproducible execution across environments.",
    latencySLA: "Hourly / Daily Cadence",
  },
  {
    id: "validation",
    name: "Quality & Validation",
    category: "Integrity Gate",
    icon: ShieldCheck,
    badge: "Zero-Drift",
    description: "Automated schema enforcement, null checks, outlier bounds, and foreign key verification before load.",
    techStack: ["Pydantic Schemas", "Great Expectations", "SQL Assertions", "Anomaly Traps"],
    keyDecision: "Failed validation triggers dead-letter tables, blocking corrupted data from contaminating the feature store.",
    latencySLA: "100% Schema Compliance",
  },
  {
    id: "transformation",
    name: "SQL Transformations",
    category: "Data Modeling",
    icon: Code2,
    badge: "ELT In-Database",
    description: "In-engine transformation computing windowed rolling aggregates, tenure calculations, and cohort metrics.",
    techStack: ["PostgreSQL 16 Engine", "Window Functions", "Common Table Expressions (CTEs)", "PgBouncer"],
    keyDecision: "In-database transformations leverage composite B-Tree indexes, reducing memory footprint by 75%.",
    latencySLA: "Sub-2s Batch Run",
  },
  {
    id: "feature-store",
    name: "Feature Engineering",
    category: "Point-in-Time",
    icon: Zap,
    badge: "Leakage-Proof",
    description: "Extracting historical features as of specific prediction timestamps without future data contamination.",
    techStack: ["Temporal SQL Windows", "Historical Cutoff Bounds", "Feature Materialization", "Parquet Snapshots"],
    keyDecision: "Strict point-in-time timestamp filtering guarantees zero lookahead bias during XGBoost training and inference.",
    latencySLA: "Deterministic Output",
  },
  {
    id: "relational-db",
    name: "PostgreSQL 16",
    category: "System of Record",
    icon: Database,
    badge: "13 Relational Tables",
    description: "ACID-compliant storage enforcing strict foreign keys, cascade rules, and optimized query indexes.",
    techStack: ["PostgreSQL 16.2", "Composite B-Trees", "BRIN Indexes", "Connection Pooling"],
    keyDecision: "Normalized 3NF relational schema prevents anomaly duplicates while materialized views accelerate BI queries.",
    latencySLA: "1.8ms P95 Indexed Query",
  },
  {
    id: "downstream",
    name: "ML & Analytics",
    category: "Consumer Tier",
    icon: Activity,
    badge: "Production Serving",
    description: "Delivering real-time feature vectors to FastAPI inference microservices and BI executive dashboards.",
    techStack: ["FastAPI REST Worker", "XGBoost 2.0 Engine", "Recharts BI Dashboards", "TreeSHAP"],
    keyDecision: "Pre-materialized feature store allows asynchronous FastAPI scoring in under 40ms without heavy live joins.",
    latencySLA: "38ms P95 REST Inference",
  },
]

/* =========================================================================
   2. 13-Table PostgreSQL Relational Schema Data
   Grounding: ChurnPlatform Production Architecture
   ========================================================================= */

interface ColumnDef {
  name: string
  type: string
  isPk?: boolean
  isFk?: boolean
  fkTarget?: string
  nullable?: boolean
  desc: string
}

interface TableDef {
  id: string
  name: string
  domain: "Core & Accounts" | "Telemetry & Usage" | "Support & Feedback" | "Billing & Finance" | "ML & Feature Store"
  rowCountEst: string
  description: string
  primaryKey: string
  foreignKeys: string[]
  indexes: string[]
  columns: ColumnDef[]
}

const relationalTables: TableDef[] = [
  {
    id: "accounts",
    name: "accounts",
    domain: "Core & Accounts",
    rowCountEst: "10,000+",
    description: "Root multi-tenant customer entity holding organization metadata, tier status, and signup origin.",
    primaryKey: "id (UUID)",
    foreignKeys: [],
    indexes: ["idx_accounts_status", "idx_accounts_created_at"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Primary key identifier" },
      { name: "company_name", type: "VARCHAR(255)", desc: "Customer organization legal name" },
      { name: "account_status", type: "VARCHAR(50)", desc: "Active, Inactive, Suspended, or Churned" },
      { name: "created_at", type: "TIMESTAMPTZ", desc: "Account creation timestamp" },
      { name: "updated_at", type: "TIMESTAMPTZ", desc: "Last modification timestamp" },
    ],
  },
  {
    id: "users",
    name: "users",
    domain: "Core & Accounts",
    rowCountEst: "45,000+",
    description: "Authorized members linked to accounts with role-based access control and login tracking.",
    primaryKey: "id (UUID)",
    foreignKeys: ["account_id -> accounts.id"],
    indexes: ["idx_users_account_id", "idx_users_email"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Primary user identifier" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Parent organization reference" },
      { name: "email", type: "VARCHAR(255)", desc: "Unique login identifier" },
      { name: "role", type: "VARCHAR(50)", desc: "Admin, Member, Viewer" },
      { name: "last_login_at", type: "TIMESTAMPTZ", desc: "Most recent platform session timestamp" },
    ],
  },
  {
    id: "subscriptions",
    name: "subscriptions",
    domain: "Billing & Finance",
    rowCountEst: "12,000+",
    description: "Contractual plan instances governing MRR, billing recurrence, renewal dates, and status lifecycle.",
    primaryKey: "id (UUID)",
    foreignKeys: ["account_id -> accounts.id", "plan_id -> plans.id"],
    indexes: ["idx_subscriptions_account_id", "idx_subscriptions_status_period"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Subscription record ID" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Associated customer account" },
      { name: "plan_id", type: "UUID", isFk: true, fkTarget: "plans.id", desc: "Assigned tier definition" },
      { name: "status", type: "VARCHAR(50)", desc: "Active, Past Due, Canceled, Trialing" },
      { name: "mrr_amount", type: "NUMERIC(10,2)", desc: "Monthly Recurring Revenue value" },
      { name: "current_period_end", type: "TIMESTAMPTZ", desc: "Next scheduled renewal timestamp" },
    ],
  },
  {
    id: "plans",
    name: "plans",
    domain: "Billing & Finance",
    rowCountEst: "12",
    description: "Catalog tier master defining pricing models, seat limits, and API feature access boundaries.",
    primaryKey: "id (UUID)",
    foreignKeys: [],
    indexes: ["idx_plans_tier_code"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Plan catalog identifier" },
      { name: "tier_name", type: "VARCHAR(100)", desc: "Starter, Professional, Enterprise" },
      { name: "base_price", type: "NUMERIC(10,2)", desc: "Base subscription rate" },
      { name: "max_seats", type: "INTEGER", desc: "Seat threshold allowance" },
      { name: "is_active", type: "BOOLEAN", desc: "Availability flag" },
    ],
  },
  {
    id: "invoices",
    name: "invoices",
    domain: "Billing & Finance",
    rowCountEst: "120,000+",
    description: "Periodic billing statements with line-item totals, tax allocations, and payment reconciliation.",
    primaryKey: "id (UUID)",
    foreignKeys: ["account_id -> accounts.id", "subscription_id -> subscriptions.id"],
    indexes: ["idx_invoices_account_created", "idx_invoices_status"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Invoice serial number" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Billed customer organization" },
      { name: "subscription_id", type: "UUID", isFk: true, fkTarget: "subscriptions.id", desc: "Related contract" },
      { name: "amount_due", type: "NUMERIC(10,2)", desc: "Total invoiced charge" },
      { name: "status", type: "VARCHAR(50)", desc: "Paid, Unpaid, Void, Refunded" },
      { name: "due_date", type: "DATE", desc: "Payment deadline" },
    ],
  },
  {
    id: "payments",
    name: "payments",
    domain: "Billing & Finance",
    rowCountEst: "115,000+",
    description: "Processed monetary transactions recorded via payment gateway webhooks with retry counts.",
    primaryKey: "id (UUID)",
    foreignKeys: ["invoice_id -> invoices.id"],
    indexes: ["idx_payments_invoice_id", "idx_payments_gateway_ref"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Transaction record ID" },
      { name: "invoice_id", type: "UUID", isFk: true, fkTarget: "invoices.id", desc: "Associated invoice record" },
      { name: "gateway_txn_id", type: "VARCHAR(100)", desc: "Stripe / Gateway charge reference" },
      { name: "amount_paid", type: "NUMERIC(10,2)", desc: "Reconciled funds amount" },
      { name: "retry_count", type: "INTEGER", desc: "Number of dunning recovery attempts" },
      { name: "settled_at", type: "TIMESTAMPTZ", desc: "Gateway settlement timestamp" },
    ],
  },
  {
    id: "user_events",
    name: "user_events",
    domain: "Telemetry & Usage",
    rowCountEst: "1.2M+",
    description: "High-volume clickstream capturing critical in-app actions, module clicks, and workflows.",
    primaryKey: "id (BIGSERIAL)",
    foreignKeys: ["user_id -> users.id", "account_id -> accounts.id"],
    indexes: ["idx_events_account_time", "idx_events_type_time"],
    columns: [
      { name: "id", type: "BIGINT", isPk: true, desc: "Incremental event sequence ID" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Tenant account ID" },
      { name: "user_id", type: "UUID", isFk: true, fkTarget: "users.id", desc: "Acting user reference" },
      { name: "event_name", type: "VARCHAR(100)", desc: "Feature action (e.g., report_export, filter_applied)" },
      { name: "session_id", type: "VARCHAR(128)", desc: "Browser session identifier" },
      { name: "event_timestamp", type: "TIMESTAMPTZ", desc: "Point-in-time creation mark" },
    ],
  },
  {
    id: "session_logs",
    name: "session_logs",
    domain: "Telemetry & Usage",
    rowCountEst: "350,000+",
    description: "Aggregated user login sessions logging duration, device classification, and IP client hashes.",
    primaryKey: "id (UUID)",
    foreignKeys: ["user_id -> users.id"],
    indexes: ["idx_sessions_user_id", "idx_sessions_started_at"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Session tracking identifier" },
      { name: "user_id", type: "UUID", isFk: true, fkTarget: "users.id", desc: "User initiating session" },
      { name: "duration_seconds", type: "INTEGER", desc: "Active engagement length" },
      { name: "device_type", type: "VARCHAR(50)", desc: "Desktop, Tablet, Mobile" },
      { name: "started_at", type: "TIMESTAMPTZ", desc: "Session start timestamp" },
    ],
  },
  {
    id: "feature_usage_aggregates",
    name: "feature_usage_aggregates",
    domain: "Telemetry & Usage",
    rowCountEst: "600,000+",
    description: "Daily rolled-up compute metrics and API call counts per organization for analytical querying.",
    primaryKey: "id (BIGSERIAL)",
    foreignKeys: ["account_id -> accounts.id"],
    indexes: ["idx_usage_account_date", "idx_usage_feature_metric"],
    columns: [
      { name: "id", type: "BIGINT", isPk: true, desc: "Aggregate sequence ID" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Customer organization" },
      { name: "feature_key", type: "VARCHAR(100)", desc: "Module / API service tag" },
      { name: "daily_count", type: "INTEGER", desc: "Number of module invocations" },
      { name: "compute_seconds", type: "NUMERIC(10,2)", desc: "Backend processing time utilized" },
      { name: "usage_date", type: "DATE", desc: "Rollup calendar date" },
    ],
  },
  {
    id: "support_tickets",
    name: "support_tickets",
    domain: "Support & Feedback",
    rowCountEst: "18,000+",
    description: "Customer service cases synced from support desk with priority tags, status, and SLA timers.",
    primaryKey: "id (UUID)",
    foreignKeys: ["account_id -> accounts.id", "opened_by_user_id -> users.id"],
    indexes: ["idx_tickets_account_id", "idx_tickets_severity_status"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Ticket identifier" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Reporting account" },
      { name: "opened_by_user_id", type: "UUID", isFk: true, fkTarget: "users.id", desc: "Reporter user" },
      { name: "severity", type: "VARCHAR(50)", desc: "Low, Medium, High, Urgent Escalation" },
      { name: "status", type: "VARCHAR(50)", desc: "Open, Pending, Resolved, Closed" },
      { name: "resolution_time_minutes", type: "INTEGER", desc: "Total elapsed time to final fix" },
    ],
  },
  {
    id: "ticket_messages",
    name: "ticket_messages",
    domain: "Support & Feedback",
    rowCountEst: "85,000+",
    description: "Granular interaction thread entries between customer support representatives and end users.",
    primaryKey: "id (UUID)",
    foreignKeys: ["ticket_id -> support_tickets.id"],
    indexes: ["idx_messages_ticket_id", "idx_messages_sent_at"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Message sequence entry ID" },
      { name: "ticket_id", type: "UUID", isFk: true, fkTarget: "support_tickets.id", desc: "Parent ticket thread" },
      { name: "sender_type", type: "VARCHAR(50)", desc: "Customer or Support Representative" },
      { name: "sentiment_score", type: "NUMERIC(3,2)", desc: "Heuristic sentiment rating (-1.0 to 1.0)" },
      { name: "sent_at", type: "TIMESTAMPTZ", desc: "Message creation timestamp" },
    ],
  },
  {
    id: "nps_surveys",
    name: "nps_surveys",
    domain: "Support & Feedback",
    rowCountEst: "8,500+",
    description: "Periodic in-app satisfaction ratings (0-10) and qualitative sentiment feedback records.",
    primaryKey: "id (UUID)",
    foreignKeys: ["account_id -> accounts.id", "user_id -> users.id"],
    indexes: ["idx_nps_account_score", "idx_nps_submitted_at"],
    columns: [
      { name: "id", type: "UUID", isPk: true, desc: "Survey response record ID" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Customer account" },
      { name: "user_id", type: "UUID", isFk: true, fkTarget: "users.id", desc: "Responding user" },
      { name: "score", type: "INTEGER", desc: "Net Promoter Score rating (0 to 10)" },
      { name: "category", type: "VARCHAR(50)", desc: "Detractor (0-6), Passive (7-8), Promoter (9-10)" },
      { name: "submitted_at", type: "TIMESTAMPTZ", desc: "Response submission timestamp" },
    ],
  },
  {
    id: "customer_feature_store",
    name: "customer_feature_store",
    domain: "ML & Feature Store",
    rowCountEst: "45,000+",
    description: "Materialized point-in-time analytical feature vectors feeding the trained XGBoost model.",
    primaryKey: "id (BIGSERIAL)",
    foreignKeys: ["account_id -> accounts.id"],
    indexes: ["idx_cfs_account_asof", "idx_cfs_churn_target"],
    columns: [
      { name: "id", type: "BIGINT", isPk: true, desc: "Feature vector identifier" },
      { name: "account_id", type: "UUID", isFk: true, fkTarget: "accounts.id", desc: "Tenant account ID" },
      { name: "as_of_date", type: "DATE", desc: "Temporal cutoff boundary (leakage-proof)" },
      { name: "rolling_30d_events", type: "INTEGER", desc: "Windowed event frequency in past 30 days" },
      { name: "support_tickets_30d", type: "INTEGER", desc: "Escalation count in past 30 days" },
      { name: "days_since_last_login", type: "INTEGER", desc: "Platform recency inactivity metric" },
      { name: "failed_payments_90d", type: "INTEGER", desc: "Dunning payment exception counter" },
      { name: "churn_label", type: "SMALLINT", desc: "Target classification ground truth (0 or 1)" },
    ],
  },
]

/* =========================================================================
   3. Real-World SQL Transformation Queries
   ========================================================================= */

interface SqlSnippet {
  id: string
  title: string
  purpose: string
  query: string
  optimizationTip: string
}

const sqlSnippets: SqlSnippet[] = [
  {
    id: "point-in-time",
    title: "1. Point-in-Time Feature Extraction (Preventing Data Leakage)",
    purpose: "Calculates rolling 30-day activity features strictly as of historical prediction cutoffs.",
    query: `-- ChurnPlatform: Leakage-Proof Temporal Feature Extraction
WITH prediction_cutoffs AS (
  SELECT
    a.id AS account_id,
    c.as_of_date
  FROM accounts a
  CROSS JOIN (
    SELECT generate_series(
      CURRENT_DATE - INTERVAL '6 months',
      CURRENT_DATE,
      INTERVAL '1 month'
    )::DATE AS as_of_date
  ) c
),
windowed_telemetry AS (
  SELECT
    pc.account_id,
    pc.as_of_date,
    COUNT(ue.id) FILTER (
      WHERE ue.event_timestamp >= pc.as_of_date - INTERVAL '30 days'
        AND ue.event_timestamp <  pc.as_of_date
    ) AS events_last_30d,
    COUNT(DISTINCT ue.session_id) FILTER (
      WHERE ue.event_timestamp >= pc.as_of_date - INTERVAL '30 days'
        AND ue.event_timestamp <  pc.as_of_date
    ) AS active_sessions_30d
  FROM prediction_cutoffs pc
  LEFT JOIN user_events ue ON ue.account_id = pc.account_id
  GROUP BY pc.account_id, pc.as_of_date
)
SELECT
  wt.account_id,
  wt.as_of_date,
  COALESCE(wt.events_last_30d, 0) AS rolling_30d_events,
  COALESCE(wt.active_sessions_30d, 0) AS rolling_30d_sessions
FROM windowed_telemetry wt;`,
    optimizationTip:
      "Filtered aggregation inside a single table scan avoids multiple subqueries and maintains B-Tree index scan efficiency.",
  },
  {
    id: "cohort-retention",
    title: "2. Monthly Cohort Retention & Churn Rate Matrix",
    purpose: "Transforms monthly customer cohorts into triangular retention matrices for executive BI dashboards.",
    query: `-- ChurnPlatform: Cohort Retention & Inactivity Matrix
WITH customer_cohorts AS (
  SELECT
    id AS account_id,
    DATE_TRUNC('month', created_at)::DATE AS cohort_month
  FROM accounts
),
monthly_activity AS (
  SELECT
    cc.cohort_month,
    DATE_TRUNC('month', ue.event_timestamp)::DATE AS activity_month,
    COUNT(DISTINCT cc.account_id) AS active_accounts
  FROM customer_cohorts cc
  JOIN user_events ue ON ue.account_id = cc.account_id
  GROUP BY 1, 2
)
SELECT
  cohort_month,
  activity_month,
  (EXTRACT(YEAR FROM AGE(activity_month, cohort_month)) * 12 +
   EXTRACT(MONTH FROM AGE(activity_month, cohort_month)))::INT AS period_month,
  active_accounts,
  ROUND(
    active_accounts::NUMERIC / 
    FIRST_VALUE(active_accounts) OVER (PARTITION BY cohort_month ORDER BY activity_month) * 100, 
    2
  ) AS retention_percentage
FROM monthly_activity
ORDER BY cohort_month, period_month;`,
    optimizationTip:
      "Window function FIRST_VALUE partitioned by cohort calculates base cohort size in-memory without extra self-joins.",
  },
  {
    id: "data-quality",
    title: "3. Automated Data Quality & Anomaly Constraint Check",
    purpose: "Enforces structural data integrity rules before loading transformed records into production stores.",
    query: `-- ChurnPlatform: Quality Gate & Validation Traps
SELECT
  a.id AS account_id,
  CASE
    WHEN s.id IS NULL THEN 'Missing Active Subscription'
    WHEN s.mrr_amount <= 0 THEN 'Invalid Non-Positive MRR'
    WHEN s.current_period_end < a.created_at THEN 'Temporal Paradox: End Before Start'
    WHEN COUNT(u.id) = 0 THEN 'Orphaned Account Without Users'
    ELSE 'VALID'
  END AS validation_status
FROM accounts a
LEFT JOIN subscriptions s ON s.account_id = a.id AND s.status = 'Active'
LEFT JOIN users u ON u.account_id = a.id
GROUP BY a.id, s.id, s.mrr_amount, s.current_period_end, a.created_at
HAVING 
  s.id IS NULL 
  OR s.mrr_amount <= 0 
  OR s.current_period_end < a.created_at
  OR COUNT(u.id) = 0;`,
    optimizationTip:
      "HAVING filter isolates anomaly exceptions directly in the database engine, dispatching clean data to downstream stages.",
  },
]

/* =========================================================================
   Main Data Engineering Lab Component
   ========================================================================= */

export function DataEngineeringLab() {
  const [activePipelineStage, setActivePipelineStage] = useState<string>("feature-store")
  const [selectedTableId, setSelectedTableId] = useState<string>("customer_feature_store")
  const [activeSqlId, setActiveSqlId] = useState<string>("point-in-time")
  const [copiedSql, setCopiedSql] = useState<boolean>(false)

  const currentStage = pipelineStages.find((s) => s.id === activePipelineStage) || pipelineStages[0]
  const selectedTable = relationalTables.find((t) => t.id === selectedTableId) || relationalTables[0]
  const currentSql = sqlSnippets.find((s) => s.id === activeSqlId) || sqlSnippets[0]

  const handleCopySql = () => {
    navigator.clipboard.writeText(currentSql.query)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2000)
  }

  return (
    <div className="space-y-16">
      {/* SECTION A: Pipeline Conduit Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-xs font-semibold text-teal-300 uppercase tracking-wider">
              <Workflow className="h-3.5 w-3.5 text-teal-400" /> Pipeline Architecture &bull; Conduit
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] tracking-tight">
              ChurnPlatform Data Pipeline &bull; <span className="text-teal-400">Zero Data Drift</span>
            </h3>
            <p className="text-sm text-[#94A3B8]">
              Interactive conduit: Click any stage to inspect transformation logic, schemas, and engineering decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs font-mono text-teal-300 self-start md:self-auto">
            <CheckCircle2 className="h-4 w-4 text-teal-400" />
            <span>Airflow Orchestrated &bull; Automated DAGs</span>
          </div>
        </div>

        {/* Pipeline Stages Flow Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon
            const isSelected = activePipelineStage === stage.id

            return (
              <button
                key={stage.id}
                onClick={() => setActivePipelineStage(stage.id)}
                className={`p-3.5 rounded-xl text-left transition-all duration-300 relative border flex flex-col justify-between h-28 backdrop-blur-md ${
                  isSelected
                    ? "bg-[#111B30] border-teal-400 ring-1 ring-teal-400/60 shadow-lg shadow-teal-500/20 scale-[1.02]"
                    : "bg-[#070B14]/80 border-white/[0.08] hover:border-teal-400/40 hover:bg-[#111B30]/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                      isSelected ? "bg-teal-400 text-slate-950" : "bg-[#111B30] text-teal-300 border border-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#94A3B8]">0{idx + 1}</span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#E0F2FE] line-clamp-1">{stage.name}</h4>
                  <span className="text-[10px] font-mono text-[#94A3B8] block">{stage.badge}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Stage Deep Dive Inspector */}
        <div className="p-6 rounded-2xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-teal-500/15 text-teal-300 border border-teal-400/30 uppercase font-semibold">
                {currentStage.category}
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">&bull; SLA: {currentStage.latencySLA}</span>
            </div>
            <h4 className="text-xl font-bold text-[#E0F2FE]">{currentStage.name}</h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed">{currentStage.description}</p>

            <div className="p-4 rounded-xl bg-[#111B30]/80 border border-white/[0.08] space-y-1.5">
              <span className="text-xs font-mono font-bold uppercase text-teal-400 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> Architectural Decision Rationale
              </span>
              <p className="text-xs text-[#E0F2FE] leading-relaxed">{currentStage.keyDecision}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Active Tooling & Engine Components
            </span>
            <div className="flex flex-wrap gap-2">
              {currentStage.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111B30]/80 border border-white/10 text-[#E0F2FE]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: 13-Table Relational Schema Explorer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-xs font-semibold text-teal-300 uppercase tracking-wider">
              <Database className="h-3.5 w-3.5 text-teal-400" /> Relational Architecture Explorer
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] tracking-tight">
              13-Table PostgreSQL Relational Schema &bull; <span className="text-teal-400">ChurnPlatform</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Representative Architectural Blueprint of ChurnPlatform&apos;s relational database. Select any table to inspect column attributes, primary/foreign key constraints, and relational lineage.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/40 border border-sky-800/40 text-[11px] font-mono text-sky-300">
              <Info className="h-3.5 w-3.5 shrink-0" />
              <span>Grounding: Architectural design schema. Capacities model production workload scale.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#070B14]/80 border border-white/10 text-right shrink-0">
            <span className="text-xs font-mono text-teal-400 block font-bold">13 Tables Modeled</span>
            <span className="text-[11px] text-[#94A3B8] font-mono">3NF Relational Normalization</span>
          </div>
        </div>

        {/* 13 Table Selector Grid */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Select Relational Table (Grouped by Architectural Domain):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {relationalTables.map((tbl) => {
              const isSelected = selectedTableId === tbl.id
              return (
                <button
                  key={tbl.id}
                  onClick={() => setSelectedTableId(tbl.id)}
                  className={`p-3 rounded-xl text-left border transition-all duration-200 backdrop-blur-md ${
                    isSelected
                      ? "bg-[#111B30] border-teal-400 ring-1 ring-teal-400/60 shadow-md text-[#E0F2FE]"
                      : "bg-[#070B14]/80 border-white/[0.08] hover:bg-[#111B30]/60 text-[#94A3B8] hover:text-[#E0F2FE]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                      <Database className={`h-3.5 w-3.5 ${isSelected ? "text-teal-400" : "text-[#94A3B8]"}`} />
                      {tbl.name}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-teal-400 shadow-sm shadow-teal-400/80" />}
                  </div>
                  <span className="text-[10px] text-[#94A3B8] block truncate">{tbl.domain}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Table Inspector Panel */}
        <div className="p-6 rounded-2xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-mono font-black text-[#E0F2FE] tracking-tight">
                  TABLE: {selectedTable.name}
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-500/15 border border-teal-400/30 text-teal-300">
                  {selectedTable.domain}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">{selectedTable.description}</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#94A3B8]">Capacity Model Scale: <strong className="text-[#E0F2FE]">{selectedTable.rowCountEst}</strong></span>
              <span className="text-[#94A3B8]">PK: <strong className="text-amber-400">{selectedTable.primaryKey}</strong></span>
            </div>
          </div>

          {/* Table Columns Schema List */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Column Definitions & Constraints ({selectedTable.columns.length} Fields)
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-[#94A3B8]">
                    <th className="pb-2">Field Name</th>
                    <th className="pb-2">Data Type</th>
                    <th className="pb-2">Constraint</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {selectedTable.columns.map((col) => (
                    <tr key={col.name} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-2.5 font-bold text-[#E0F2FE] flex items-center gap-1.5">
                        {col.isPk && (
                          <span title="Primary Key">
                            <Key className="h-3 w-3 text-amber-400" />
                          </span>
                        )}
                        {col.isFk && (
                          <span title="Foreign Key">
                            <GitBranch className="h-3 w-3 text-teal-300" />
                          </span>
                        )}
                        {col.name}
                      </td>
                      <td className="py-2.5 text-sky-300">{col.type}</td>
                      <td className="py-2.5">
                        {col.isPk && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[10px]">
                            PRIMARY KEY
                          </span>
                        )}
                        {col.isFk && (
                          <span className="px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-400/30 text-[10px]">
                            FK: {col.fkTarget}
                          </span>
                        )}
                        {!col.isPk && !col.isFk && <span className="text-[#94A3B8]">NOT NULL</span>}
                      </td>
                      <td className="py-2.5 text-[#94A3B8] font-sans">{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Indexes & Relational Links */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="space-y-1.5">
              <span className="font-mono text-[#94A3B8] uppercase text-[11px] block">
                Engine Indexes Configured
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTable.indexes.map((idxName) => (
                  <span
                    key={idxName}
                    className="px-2 py-1 rounded bg-[#111B30] border border-white/10 font-mono text-[11px] text-teal-300"
                  >
                    {idxName}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[#94A3B8] uppercase text-[11px] block">
                Foreign Key Relationships
              </span>
              <div className="space-y-1">
                {selectedTable.foreignKeys.length > 0 ? (
                  selectedTable.foreignKeys.map((fk) => (
                    <div key={fk} className="font-mono text-[11px] text-sky-300">
                      &bull; {fk}
                    </div>
                  ))
                ) : (
                  <span className="text-[#94A3B8] font-mono text-[11px]">Root Entity (No Outgoing Foreign Keys)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: Airflow DAG Orchestration Architecture */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-xs font-semibold text-teal-300 uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5 text-teal-400" /> ETL / ELT Orchestration
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] tracking-tight">
            Apache Airflow DAG Execution Architecture
          </h3>
          <p className="text-sm text-[#94A3B8] max-w-3xl leading-relaxed">
            The automated pipeline executes on scheduled cron cadences, chaining extraction, data quality validation, temporal feature engineering, and downstream ML triggers with idempotent execution guarantees.
          </p>
        </div>

        {/* Visual DAG Flow Diagram */}
        <div className="p-6 rounded-2xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] gap-3">
            {[
              { id: "d1", title: "extract_cdc_logs", type: "PostgresHook", desc: "Batch extraction from transactional DB" },
              { id: "d2", title: "validate_schema_quality", type: "PythonOperator", desc: "Anomaly & null assertion check" },
              { id: "d3", title: "compute_windowed_features", type: "PostgresOperator", desc: "30D/90D rolling SQL aggregates" },
              { id: "d4", title: "materialize_feature_store", type: "PostgresOperator", desc: "Upsert into customer_feature_store" },
              { id: "d5", title: "trigger_fastapi_warmup", type: "HttpOperator", desc: "Refresh model cache & pre-score" },
            ].map((dagNode, idx) => (
              <React.Fragment key={dagNode.id}>
                <div className="p-3.5 rounded-xl bg-[#111B30]/80 border border-white/10 space-y-1.5 flex-1 min-w-[150px]">
                  <span className="text-[10px] font-mono text-teal-300 block font-semibold">{dagNode.type}</span>
                  <h5 className="text-xs font-mono font-bold text-[#E0F2FE]">{dagNode.title}</h5>
                  <p className="text-[10px] text-[#94A3B8] leading-tight">{dagNode.desc}</p>
                </div>
                {idx < 4 && (
                  <ArrowRight className="h-4 w-4 text-[#94A3B8] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION D: SQL Transformation Inspector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-xs font-semibold text-teal-300 uppercase tracking-wider">
              <FileCode className="h-3.5 w-3.5 text-teal-400" /> SQL Engineering Inspector
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] tracking-tight">
              Production SQL Transformations &bull; Window Functions
            </h3>
            <p className="text-sm text-[#94A3B8]">
              Inspect the exact SQL transformation patterns engineered for point-in-time feature extraction and cohort retention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopySql}
              variant="outline"
              size="sm"
              className="bg-[#111B30] border-white/10 text-xs font-mono hover:bg-[#111B30]/80 text-[#E0F2FE]"
            >
              {copiedSql ? (
                <>
                  <Check className="h-3.5 w-3.5 text-teal-400 mr-1.5" />
                  <span>Copied Query</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* SQL Tab Selector */}
        <div className="flex flex-wrap gap-2">
          {sqlSnippets.map((snip) => (
            <button
              key={snip.id}
              onClick={() => setActiveSqlId(snip.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-colors border backdrop-blur-md ${
                activeSqlId === snip.id
                  ? "bg-[#111B30] border-teal-400 text-[#E0F2FE] font-bold ring-1 ring-teal-400/50"
                  : "bg-[#070B14]/80 border-white/[0.08] text-[#94A3B8] hover:text-[#E0F2FE]"
              }`}
            >
              {snip.title}
            </button>
          ))}
        </div>

        {/* Code Box with Syntax Display */}
        <div className="rounded-2xl bg-[#070B14]/90 backdrop-blur-md border border-white/10 overflow-hidden shadow-xl">
          <div className="px-4 py-2.5 bg-[#111B30]/80 border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-[#94A3B8]">{currentSql.purpose}</span>
            <span className="text-teal-300 font-bold">PostgreSQL 16 Dialect</span>
          </div>

          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs text-[#E0F2FE] leading-relaxed">
            <pre className="text-teal-300">
              <code>{currentSql.query}</code>
            </pre>
          </div>

          <div className="p-3.5 bg-[#111B30]/60 border-t border-white/10 flex items-start gap-2 text-xs text-[#94A3B8]">
            <Info className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>Engine Tuning:</strong> {currentSql.optimizationTip}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
