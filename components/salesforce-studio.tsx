"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Database,
  Cloud,
  CheckCircle2,
  Workflow,
  ShieldAlert,
  ArrowRight,
  Code2,
  Layers,
  Award,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SalesforceStudio() {
  const [selectedTab, setSelectedTab] = useState<"pipeline" | "apex" | "lwc">("pipeline")

  const pipelineStages = [
    { stage: "01. Lead Capture", status: "Automated Web-to-Lead with deduplication rules", badge: "Trigger" },
    { stage: "02. Qualification", status: "Flow automation assigning accounts via round-robin", badge: "Flow" },
    { stage: "03. Opportunity", status: "Apex trigger validating discount thresholds & tiers", badge: "Apex" },
    { stage: "04. Closed Won", status: "Asynchronous integration pushing invoice data to ERP", badge: "REST API" },
  ]

  const apexCode = `// LeadScoreTriggerHandler.cls
public with sharing class LeadScoreTriggerHandler {
    public static void evaluateInboundLeads(List<Lead> newLeads) {
        List<Task> followupTasks = new List<Task>();
        for (Lead l : newLeads) {
            if (l.LeadSource == 'Enterprise Inbound' && l.AnnualRevenue > 1000000) {
                l.Rating = 'Hot';
                l.Priority_Tier__c = 'Tier 1 Executive';
                followupTasks.add(new Task(
                    Subject = 'Priority SLA: Contact ' + l.Company,
                    WhoId = l.Id,
                    Priority = 'High',
                    ActivityDate = System.today()
                ));
            }
        }
        if (!followupTasks.isEmpty()) {
            insert followupTasks;
        }
    }
}`

  return (
    <section id="salesforce" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-blue uppercase tracking-wider">
            <Cloud className="h-3.5 w-3.5" /> Salesforce Enterprise Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Certified Salesforce <span className="text-aurora-blue">Platform Developer I</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Enterprise-grade CRM architecture, custom Apex automations, responsive Lightning Web Components (LWC),
            and reliable third-party integrations designed for mission-critical business pipelines.
          </p>
        </div>

        {/* Enterprise Card Shell with distinct clean blue styling */}
        <div className="rounded-2xl bg-[#09101F] border border-[#1E3A8A]/50 p-6 sm:p-8 shadow-2xl shadow-blue-950/30 space-y-8">
          {/* Top Bar: Credentials & Platform Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#F8FAFC]">Salesforce PD-I Certified Environment</h4>
                <span className="text-xs text-blue-300 font-mono">Trailhead Ranger • 100+ Badges Verified</span>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              {[
                { id: "pipeline", label: "Lead-to-Cash Pipeline" },
                { id: "apex", label: "Apex Trigger Logic" },
                { id: "lwc", label: "Lightning Web Component" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Lead to Cash Pipeline */}
          {selectedTab === "pipeline" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pipelineStages.map((stg) => (
                  <div
                    key={stg.stage}
                    className="p-5 rounded-xl bg-[#0B132B] border border-[#1E293B] space-y-3 hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-400">{stg.stage}</span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-[10px]">
                        {stg.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{stg.status}</p>
                  </div>
                ))}
              </div>

              {/* CRM Key Capabilities Grid */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-[#1E293B]">
                <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-1.5">
                  <div className="text-xs font-bold text-[#F8FAFC]">SOQL & Query Governor Limits</div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Strict bulkification patterns preventing 101 SOQL limit exceptions across large data volumes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-1.5">
                  <div className="text-xs font-bold text-[#F8FAFC]">Declarative Flow & Apex Synthesis</div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Combining Record-Triggered Flows with Invocable Apex actions for clean business administration.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] space-y-1.5">
                  <div className="text-xs font-bold text-[#F8FAFC]">External API Integrations</div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Named Credentials, outbound REST callouts, and secure webhook ingestion for ERP syncing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Apex Code Editor Simulation */}
          {selectedTab === "apex" && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                <span className="text-blue-400 font-bold">Apex Trigger Handler Pattern • 100% Code Coverage</span>
                <span className="text-emerald-400">Deployed to Production Org</span>
              </div>
              <pre className="text-blue-200 p-5 rounded-xl bg-[#0B132B] border border-[#1E293B] overflow-x-auto leading-relaxed">
                {apexCode}
              </pre>
            </div>
          )}

          {/* Tab 3: Lightning Web Component (LWC) Preview */}
          {selectedTab === "lwc" && (
            <div className="p-6 rounded-xl bg-[#0B132B] border border-[#1E293B] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <span className="text-xs font-bold text-[#F8FAFC] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  c-lead-qualification-card (LWC Component)
                </span>
                <span className="text-[11px] font-mono text-blue-300">Salesforce Lightning Design System (SLDS)</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-[#0F172A] border border-[#1E293B]">
                  <div className="text-[#94A3B8] mb-1">Target Account</div>
                  <div className="font-bold text-[#F8FAFC]">Global Enterprise Inc.</div>
                  <div className="text-emerald-400 text-[11px] mt-1">Tier 1 • $1.2M Revenue</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0F172A] border border-[#1E293B]">
                  <div className="text-[#94A3B8] mb-1">Assigned Executive</div>
                  <div className="font-bold text-[#F8FAFC]">Senior Account Director</div>
                  <div className="text-blue-400 text-[11px] mt-1">Round-Robin Assigned</div>
                </div>
                <div className="p-4 rounded-lg bg-[#0F172A] border border-[#1E293B]">
                  <div className="text-[#94A3B8] mb-1">SLA Response Status</div>
                  <div className="font-bold text-emerald-400">Within Target (14 mins)</div>
                  <div className="text-[#94A3B8] text-[11px] mt-1">Automated Task Created</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
