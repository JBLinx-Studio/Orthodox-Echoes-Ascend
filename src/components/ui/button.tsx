
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
        divine: "bg-[#0a0d16]/80 backdrop-blur-md border border-gold/40 text-gold hover:border-gold/80 hover:text-goldLight shadow-lg hover:shadow-gold/20 hover:shadow-xl transition-all relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold/10 before:to-transparent before:translate-x-[-100%] hover:before:animate-[shine_1.5s_ease]",
        holy: "bg-gradient-to-r from-gold/80 via-gold to-gold/80 text-[#0a0d16] font-semibold hover:from-gold hover:to-gold shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:shadow-xl relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:animate-[shine_1.5s_ease]",
        ethereal: "bg-transparent border border-gold/20 text-gold/80 backdrop-filter backdrop-blur-md hover:bg-gold/5 hover:border-gold/40 hover:text-gold transition-all relative overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
