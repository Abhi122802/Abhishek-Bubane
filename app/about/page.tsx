"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award, Users, Code, Palette, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  /* -------------------------------------------------- */
  /*                     DATA                           */
  /* -------------------------------------------------- */
  const experiences = [
    {
      title: "Data Analyst",
      company: "DJRB SERVICES, Pune, India",
      period: "Dec 2025 – Present",
      description:
        "Leading data operations, SQL data modeling, and executive intelligence dashboards for the STR Analytics Platform. Developed automated loan file auditing logic and React screen for Mortgage Loan Appraisal Report Verification Software.",
      projects: [
        {
          name: "STR Analytics Platform",
          points: [
            "Handled step-by-step data work including collecting raw details, cleaning datasets, structuring database models, and generating business performance reports.",
            "Wrote clean, optimized SQL scripts to join, aggregate, and prepare raw operational data for reporting.",
            "Set up data validation rules to find missing values, wrong formatting, and rule violations across database records.",
            "Built executive dashboard views to highlight key business metrics and trend insights for decision-makers."
          ]
        },
        {
          name: "Mortgage Loan Appraisal Report Verification Software (QA-Pramaan)",
          points: [
            "Built automated rule-checking logic using Python, Django, SQL, and React to verify mortgage loan files.",
            "Created validation logic to catch missing attributes, mismatched values, and compliance issues across loan entries.",
            "Connected backend API checking logic to a React user screen for simple, rapid loan auditing (qa-pramaan.vercel.app)."
          ]
        }
      ]
    },
    {
      title: "Freelance Web & Application Developer",
      company: "Elevate Technologies, Pune",
      period: "2025 – Present",
      description:
        "Architecting and delivering the core E-Commerce & SaaS Licensing Platform for Elevate Technologies (elevatetechnologies.in) with automated licensing keys, Razorpay checkout, and compliance logic.",
      points: [
        "Built an e-commerce platform with automated hardware node-locked licensing keys, Razorpay payments, real-time stock updates, and automated tax (CGST/SGST) ledger logic.",
        "Created an interactive ROI calculator tool in React and secured backend routes using JWT auth, CORS whitelisting, and system audit logging (AuditLog).",
        "Engineered responsive React 19 storefront with Redux Toolkit state management and Node/Express RESTful APIs."
      ]
    },
    {
      title: "Data Analyst Intern",
      company: "DJRB SERVICES, Pune, India",
      period: "Jun 2025 – Nov 2025",
      description:
        "Cleaned, normalized, and transformed raw data before importing it into PostgreSQL databases. Wrote PostgreSQL queries to build datasets for weekly and monthly business analytics reports.",
      points: [
        "Cleaned, normalized, and transformed raw data before importing it into PostgreSQL databases.",
        "Wrote PostgreSQL queries to build datasets for weekly and monthly business analytics reports."
      ]
    },
    {
      title: "Web Developer",
      company: "MASS IT, India",
      period: "Jan 2025 – Apr 2025",
      description:
        "Assisted with application database connection, user input validation, and backend service fixes.",
      points: [
        "Assisted with application database connection, user input validation, and backend service fixes."
      ]
    },
    {
      title: "Android Sensor-Data App",
      company: "Sathe Engineering, Solapur",
      period: "Jan 2024 – Mar 2024",
      description:
        "Created an Android app that captures real-time sensor data (temperature, humidity, motion) for smart monitoring.",
    },
    {
      title: "Salesforce PD-I Certified",
      company: "Salesforce Trailhead",
      period: "2024",
      description:
        "Built custom Lightning components and Apex automations while earning the Platform Developer I credential.",
    },
  ]

  const education = [
    {
      degree: "B.Tech in Electronics & Computer Engineering",
      institution: "Walchand Institute of Technology, Solapur",
      period: "2021 – 2025",
      score: "CGPA: 8.5 / 10.0",
      description:
        "Graduated with distinction. Comprehensive coursework covering electronics, computer architectures, data structures, algorithms, databases, and software engineering. Capstone work in real-time sensor analytics.",
    },
    {
      degree: "HSC – Science Stream",
      institution: "Chhatrapati Shivaji Maharaj High School, Dharashiv",
      period: "2019 – 2021",
      score: "88.83%",
      description:
        "Higher secondary education with strong emphasis on physics, chemistry, mathematics, and analytical problem solving.",
    },
    {
      degree: "SSC – Semi-English Medium",
      institution: "Chhatrapati Shivaji Maharaj High School, Dharashiv",
      period: "2018 – 2019",
      score: "71.20%",
      description:
        "Secondary school certificate with solid fundamentals across mathematics, sciences, and English language communication.",
    },
  ]

  const skills = [
    { category: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
    { category: "Backend", items: ["Python", "Django", "SQL", "PostgreSQL", "Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs"] },
    { category: "Salesforce", items: ["Apex", "Lightning Web Cmp", "SOQL", "Salesforce APIs", "Process Builder"] },
    { category: "UI/UX", items: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"] },
    { category: "Tools", items: ["Git", "VS Code", "Postman", "Salesforce DX", "Trailhead"] },
  ]

  const certificationBadges = [
    {
      name: "Salesforce PD-I",
      icon: "☁️",
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
      description: "Platform Developer I",
    },
    {
      name: "Cloud Computing",
      icon: "🌩️",
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      description: "AWS & Azure",
    },
    {
      name: "Lightning Expert",
      icon: "⚡",
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
      description: "Lightning Components",
    },
    {
      name: "Trailhead Ranger",
      icon: "🏆",
      color: "bg-green-500/10 text-green-600 border-green-200",
      description: "100+ Badges",
    },
  ]

  /* -------------------------------------------------- */
  /*                   RENDER                           */
  /* -------------------------------------------------- */
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* ----------  HEADER  ---------- */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm Abhishek Bubane – a fresher passionate about Full-Stack Development, UI/UX Design, and the Salesforce
            platform. Open to work and excited to contribute to innovative projects.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* ----------  LEFT COLUMN  ---------- */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile card */}
            <Card>
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src="/profile.jpg"
                    alt="Abhishek Bubane portrait"
                    fill
                    className="rounded-full object-cover object-[50%_12%]"
                  />
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Abhishek Balasaheb Bubane</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" /> Maharashtra, India
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" /> Open to work
                    </div>
                  </div>
                </div>

                {/* Certification Badges */}
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Certifications & Expertise</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {certificationBadges.map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group cursor-default"
                      >
                        <div
                          className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${badge.color}`}
                        >
                          <div className="text-center space-y-1">
                            <div className="text-lg">{badge.icon}</div>
                            <div className="text-xs font-medium">{badge.name}</div>
                            <div className="text-xs opacity-75">{badge.description}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Code className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">15+</div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">10+</div>
                  <p className="text-sm text-muted-foreground">Clients</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* ----------  RIGHT COLUMN  ---------- */}
          <div className="lg:col-span-2 space-y-12">
            {/* -----  STORY  ----- */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Palette className="h-6 w-6 text-primary" /> My Story
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                  My tech journey began during computer-science studies where I found equal love for development and
                  design. I'm fascinated by using technology to solve real-world problems and craft meaningful user
                  experiences.
                </p>
                <p>
                  I've built responsive web apps, designed intuitive UIs, and delivered Salesforce customizations –
                  always eager to learn and apply new tech.
                </p>
                <p>
                  Outside coding you'll find me exploring emerging tools, contributing to open-source, or diving into
                  design trends.
                </p>
              </div>
            </motion.section>

            {/* -----  EXPERIENCE  ----- */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <Award className="h-6 w-6 text-primary" /> Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <Badge variant="secondary">{exp.period}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{exp.description}</p>

                        {"projects" in exp && exp.projects && (
                          <div className="space-y-3 mt-4 pt-4 border-t border-border/60">
                            {exp.projects.map((proj, pIdx) => (
                              <div key={pIdx} className="p-3 rounded-lg bg-muted/40 border border-border/50">
                                <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {proj.name}
                                </h4>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                  {proj.points.map((pt, ptIdx) => (
                                    <li key={ptIdx} className="flex items-start gap-1.5">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span className="leading-relaxed">{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {"points" in exp && exp.points && (
                          <ul className="space-y-1.5 mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                            {exp.points.map((pt, ptIdx) => (
                              <li key={ptIdx} className="flex items-start gap-1.5">
                                <span className="text-primary mt-0.5">•</span>
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* -----  EDUCATION  ----- */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <GraduationCap className="h-6 w-6 text-primary" /> Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{edu.degree}</h3>
                            <p className="text-primary font-medium">{edu.institution}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono font-semibold text-primary border-primary/40">
                              {edu.score}
                            </Badge>
                            <Badge variant="secondary">{edu.period}</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{edu.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* -----  SKILLS  ----- */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold">Skills & Technologies</h2>

              {/* Skill cards */}
              <div className="grid gap-8">
                {skills.map((group, gi) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + gi * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-primary text-lg">
                              {{
                                Frontend: "🎨",
                                Backend: "⚙️",
                                Salesforce: "☁️",
                                "UI/UX": "✨",
                                Tools: "🛠️",
                              }[group.category] ?? "📌"}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-primary">{group.category}</h3>
                          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>

                        {/* badges */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {group.items.map((skill, si) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.4,
                                delay: 1.2 + gi * 0.1 + si * 0.05,
                                type: "spring",
                                stiffness: 220,
                              }}
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              <Badge
                                variant="outline"
                                className="w-full justify-center py-2 text-sm border-2 hover:border-primary/50 hover:bg-primary/5 transition"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Skills summary (no left margin) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {skills.reduce((t, g) => t + g.items.length, 0)}+
                        </p>
                        <p className="text-sm text-muted-foreground">Total Technologies</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{skills.length}</p>
                        <p className="text-sm text-muted-foreground">Skill Categories</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">3+</p>
                        <p className="text-sm text-muted-foreground">Years Learning</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
