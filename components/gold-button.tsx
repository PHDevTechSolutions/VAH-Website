import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"
}

const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-8 py-4 font-semibold text-base transition-all duration-300 relative overflow-hidden group rounded-lg",
          /* Enhanced button with gradient and better hover effects */
          variant === "primary" &&
            "gradient-gold-accent text-black hover:shadow-xl hover:scale-105 border-2 border-accent",
          variant === "outline" && "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white",
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)

GoldButton.displayName = "GoldButton"

export { GoldButton }
