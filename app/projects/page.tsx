"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "ChurnPlatform – AI Customer Analytics & Retention Engine",
      description:
        "Engineered an end-to-end customer predictive analytics platform with a 13-table PostgreSQL schema, point-in-time feature extraction, and XGBoost models to predict churn risk. Explained predictions to non-technical teams, configured Airflow automated pipelines, and built a React dashboard powered by FastAPI.",
      image: "/placeholder.svg",
      technologies: ["Python", "SQL", "PostgreSQL", "XGBoost", "FastAPI", "Airflow", "React", "Docker", "AWS"],
      github: "https://github.com/Abhi122802",
      live: "https://churnplatform.vercel.app",
      featured: true,
    },
    {
      title: "SuperShopy – Quick-Commerce Delivery & Logistics Platform",
      description:
        "Designed a multi-tenant delivery system with client storefronts, warehouse portals, admin dashboards, and a driver app; built immutable order checkout snapshots to prevent data inconsistencies. Built courier verification via HTML5-Qrcode SDK scanning and hardened backend APIs with rate limiting, Helmet headers, and Role-Based Access Control (RBAC).",
      image: "/placeholder.svg",
      technologies: ["Node.js", "Express", "TypeScript", "MongoDB", "React", "Tailwind CSS", "Docker", "JWT"],
      github: "https://github.com/Abhi122802",
      live: "https://supershopy.vercel.app",
      featured: true,
    },
    {
      title: "Elevate Technology – E-Commerce & SaaS Licensing Platform",
      description:
        "Built an e-commerce platform with automated hardware node-locked licensing keys, Razorpay payments, real-time stock updates, and automated tax (CGST/SGST) ledger logic. Created an interactive ROI calculator tool in React and secured backend routes using JWT auth, CORS whitelisting, and system audit logging (AuditLog).",
      image: "/placeholder.svg",
      technologies: ["React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Razorpay API"],
      github: "https://github.com/Abhi122802",
      live: "https://elevatetechnologies.in",
      featured: true,
    },
    {
      title: "STR Analytics Platform",
      description:
        "End-to-end data analytics and business intelligence platform built for operational performance reporting. Covers raw data collection, cleaning, relational database modeling, optimized SQL queries, validation rules, and executive trend dashboards.",
      image: "/placeholder.svg",
      technologies: ["SQL", "PostgreSQL", "Data Modeling", "ETL", "Executive Dashboards", "Data Validation"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: true,
    },
    {
      title: "Mortgage Loan Appraisal Report Verification Software (QA-Pramaan)",
      description:
        "Automated compliance and rule-checking software verifying mortgage loan appraisal files. Built with Python and Django backend APIs, SQL data querying, and an intuitive React frontend for rapid loan auditing and mismatch detection.",
      image: "/placeholder.svg",
      technologies: ["Python", "Django", "SQL", "React", "REST APIs", "Automated Auditing"],
      github: "https://github.com/Abhi122802",
      live: "https://qa-pramaan.vercel.app/",
      featured: true,
    },
    {
      title: "E-Learning Platform",
      description:
        "A comprehensive e-learning platform built with React and Node.js. Features include course management, user authentication, progress tracking, and interactive quizzes with a modern, responsive design.",
      image: "/placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: false,
    },
    {
      title: "Salesforce CRM Customization",
      description:
        "Custom Salesforce application for lead management with automated workflows, custom objects, and Lightning components. Includes data validation rules and custom reports for sales analytics.",
      image: "/placeholder.svg",
      technologies: ["Salesforce", "Apex", "Lightning Components", "SOQL", "Process Builder"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: true,
    },
    {
      title: "Restaurant Management System",
      description:
        "Full stack restaurant management application with order processing, inventory management, and customer feedback system. Includes admin dashboard and mobile-responsive design.",
      image: "/placeholder.svg",
      technologies: ["React", "Python", "Django", "PostgreSQL", "Bootstrap"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: false,
    },
    {
      title: "Mobile Banking UI/UX Design",
      description:
        "Complete UI/UX design for a mobile banking application. Includes user research, wireframes, prototypes, and high-fidelity designs focusing on security and user experience.",
      image: "/placeholder.svg",
      technologies: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: false,
    },
    {
      title: "Task Management Dashboard",
      description:
        "Interactive task management dashboard with drag-and-drop functionality, real-time updates, and team collaboration features. Built with modern React patterns and responsive design.",
      image: "/placeholder.svg",
      technologies: ["React", "TypeScript", "Firebase", "Material-UI", "React DnD"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: false,
    },
    {
      title: "Weather Forecast App",
      description:
        "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics. Features clean UI design and smooth animations.",
      image: "/placeholder.svg",
      technologies: ["JavaScript", "Weather API", "CSS3", "Chart.js"],
      github: "https://github.com/Abhi122802",
      live: "https://github.com/Abhi122802",
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold">My Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here's a showcase of projects I've built during my learning journey, demonstrating my skills in full stack
            development, UI/UX design, and Salesforce platform development.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      unoptimized
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={200}
                      unoptimized
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex gap-2 w-full">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Link>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16 p-8 rounded-lg bg-muted/50"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to collaborate?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm actively seeking opportunities to start my career and contribute to innovative projects. Let's discuss
            how I can bring value to your team!
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
