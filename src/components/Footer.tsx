import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="h-6 w-6 rounded-md bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
          <p className="text-sm font-medium">
            StripePortfolio © {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex gap-6">
          <Link
            href="/termos"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Termos
          </Link>
          <Link
            href="/privacidade"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Privacidade
          </Link>
          <Link
            href="/contato"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Contato
          </Link>
        </div>
      </div>
    </footer>
  );
}