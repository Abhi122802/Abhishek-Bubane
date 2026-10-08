"use client"

export function AuroraGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Top electric blue ambient glow */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-aurora-blue/15 via-aurora-cyan/10 to-transparent rounded-full blur-[120px] animate-pulse-slow" />

      {/* Right violet glow */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-aurora-violet/15 via-aurora-purple/10 to-transparent rounded-full blur-[140px]" />

      {/* Bottom emerald glow */}
      <div className="absolute bottom-1/4 -left-40 w-[550px] h-[550px] bg-gradient-to-tr from-aurora-emerald/10 via-aurora-cyan/5 to-transparent rounded-full blur-[140px]" />

      {/* Center subtle purple glow */}
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-aurora-purple/10 via-aurora-blue/5 to-transparent rounded-full blur-[130px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(38,50,74,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(38,50,74,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  )
}
