import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
        <Comp
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-primary text-white hover:bg-primary/90": variant === "default",
                    "bg-transparent border border-black text-black hover:bg-black/5": variant === "outline",
                    "bg-transparent text-primary hover:underline hover:text-primary/90": variant === "link",
                    "h-10 px-4 py-2": size === "default",
                    "h-9 rounded-md px-3": size === "sm",
                    "h-11 rounded-md px-8": size === "lg",
                },
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-white text-card-foreground shadow-sm", className)}
        {...props}
    />
))
Card.displayName = "Card"
