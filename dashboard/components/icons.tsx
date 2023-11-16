import {
  LucideProps,
  ThumbsDown,
  ThumbsUp,
  type Icon as LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type Icon = LucideIcon

export const Icons = {
  thumbsUp: ({ size, className, ...props }: LucideProps) => (
    <ThumbsUp
      size={size ?? 16}
      className={cn(
        "cursor-pointer stroke-gray-300 group-hover:stroke-green-500",
        className
      )}
      {...props}
    />
  ),
  thumbsDown: ({ size, className, ...props }: LucideProps) => (
    <ThumbsDown
      size={size ?? 16}
      className={cn(
        "cursor-pointer stroke-gray-300 group-hover:stroke-red-500",
        className
      )}
      {...props}
    />
  ),
}
