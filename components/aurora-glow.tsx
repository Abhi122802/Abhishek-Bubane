"use client"

export function AuroraGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Top electric cyan and sky blue ambient glow */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/15 via-[#38BDF8]/12 to-transparent rounded-full blur-[120px] animate-pulse-slow" />

      {/* Right soft violet and lavender glow */}
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-gradient-to-bl from-[#C084FC]/15 via-[#A78BFA]/10 to-transparent rounded-full blur-[140px]" />

      {/* Bottom periwinkle glow */}
      <div className="absolute bottom-1/4 -left-40 w-[550px] h-[550px] bg-gradient-to-tr from-[#818CF8]/12 via-cyan-500/8 to-transparent rounded-full blur-[140px]" />

      {/* Center subtle lavender/cyan bridge */}
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-[#A78BFA]/10 via-[#38BDF8]/8 to-transparent rounded-full blur-[130px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(38,50,74,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,50,74,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  )
}
