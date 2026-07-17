import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ eyebrow, title, description, className, action }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-semibold text-foreground tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}
