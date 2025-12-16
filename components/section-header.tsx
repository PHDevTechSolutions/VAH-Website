interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  return (
    <div className={`space-y-4 ${align === "center" ? "text-center" : "text-left"}`}>
      <div className={`flex items-center ${align === "center" ? "justify-center" : "justify-start"} space-x-4`}>
        <div className="h-px w-12 bg-accent" />
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">{title}</h2>
        <div className="h-px w-12 bg-accent" />
      </div>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
