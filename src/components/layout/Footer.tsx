import { PibythreeLogo } from "./PibythreeLogo";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2 px-6 py-5 lg:px-10">
        <span className="text-xs text-muted-foreground">Powered by</span>
        <PibythreeLogo size={18} />
      </div>
    </footer>
  );
}
