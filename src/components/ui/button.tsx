
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-byzantine text-white hover:bg-byzantine-dark shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-gold/30 bg-transparent text-gold hover:bg-gold/10 hover:border-gold/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-byzantine underline-offset-4 hover:underline",
        gold: "bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white hover:from-gold hover:to-gold shadow-lg hover:shadow-xl",
        byzantineGold: "bg-gradient-to-r from-gold/20 via-byzantine to-gold/20 text-white hover:from-gold/30 hover:to-gold/30 border border-gold/20 shadow-lg hover:shadow-xl",
        divine: "bg-gradient-to-r from-byzantineLight/80 via-gold/40 to-byzantineDark/80 text-white border border-gold/30 shadow-xl hover:shadow-2xl hover:border-gold/50 hover:from-byzantineLight hover:to-byzantineDark transition-all duration-300",
        holy: "relative bg-gradient-to-br from-gold/80 via-gold/20 to-gold/80 text-white border border-gold/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-gold hover:to-gold/80 overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-all after:duration-1000",
        ethereal: "bg-transparent backdrop-blur-sm border border-gold/30 text-gold hover:bg-byzantine/10 hover:border-gold/50 shadow-lg hover:shadow-xl transition-all duration-300"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "h-14 rounded-md px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
