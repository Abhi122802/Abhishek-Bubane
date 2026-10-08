import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Midnight Aurora palette
        midnight: {
          DEFAULT: "#070B14",
          surface: "#0B1020",
          elevated: "#111827",
          card: "#151D32",
          border: "#26324A",
          muted: "#94A3B8",
          text: "#F8FAFC",
        },
        aurora: {
          blue: "#38BDF8",
          cyan: "#22D3EE",
          violet: "#8B5CF6",
          purple: "#A78BFA",
          emerald: "#34D399",
          amber: "#FBBF24",
        },
        // Light mode specific colors
        "light-text": "#1a202c",
        "light-muted": "#4a5568",
        "light-primary": "#553c9a",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 6s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "aurora-pulse": "aurora-pulse 8s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aurora-gradient": "linear-gradient(135deg, #38BDF8 0%, #8B5CF6 50%, #C084FC 100%)",
        "aurora-gradient-subtle": "linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(192, 132, 252, 0.15) 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(21, 29, 50, 0.8) 0%, rgba(11, 16, 32, 0.9) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        aurora: "0 0 40px -10px rgba(56, 189, 248, 0.25), 0 0 60px -15px rgba(139, 92, 246, 0.25)",
        "aurora-card": "0 8px 32px 0 rgba(7, 11, 20, 0.6)",
        "aurora-glow": "0 0 25px rgba(56, 189, 248, 0.35)",
        "violet-glow": "0 0 25px rgba(139, 92, 246, 0.35)",
        "emerald-glow": "0 0 25px rgba(52, 211, 153, 0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
