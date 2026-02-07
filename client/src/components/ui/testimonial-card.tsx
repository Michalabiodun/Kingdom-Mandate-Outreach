import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
    name: string
    handle: string
    avatar: string
}

export interface TestimonialCardProps {
    author: TestimonialAuthor
    text: string
    href?: string
    className?: string
}

export function TestimonialCard({
    author,
    text,
    href,
    className
}: TestimonialCardProps) {
    const Card = href ? motion.a : motion.div

    return (
        <Card
            {...(href ? { href } : {})}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex flex-col rounded-lg border-t",
                "bg-linear-to-b from-muted/50 to-muted/10",
                "p-4 text-start sm:p-6",
                "max-w-[320px] sm:max-w-[320px]",
                "transition-all duration-300",
                "cursor-default",
                href && "cursor-pointer",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={author.avatar} alt={author.name} />
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold leading-none">
                        {author.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {author.handle}
                    </p>
                </div>
            </div>
            <p className="sm:text-md mt-4 text-sm text-muted-foreground leading-relaxed">
                {text}
            </p>
        </Card>
    )
}
