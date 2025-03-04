import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-slate-800 focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-50 text-slate-900 hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-800 text-slate-50 hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-900 text-slate-50 hover:bg-red-900/80",
        outline: " text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
