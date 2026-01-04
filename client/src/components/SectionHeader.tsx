import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({ label, title, className, light = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16 md:mb-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className={cn("h-px w-8", light ? "bg-white/30" : "bg-primary/30")}></span>
          <span className={cn(
            "text-sm font-mono tracking-widest uppercase",
            light ? "text-white/80" : "text-primary/60"
          )}>
            {label}
          </span>
        </div>
        <h2 className={cn(
          "text-3xl md:text-5xl font-display font-semibold max-w-2xl leading-tight",
          light ? "text-white" : "text-primary"
        )}>
          {title}
        </h2>
      </motion.div>
    </div>
  );
}
