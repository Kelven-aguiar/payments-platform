import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

interface NavbarProps {
  status: "authenticated" | "loading" | "unauthenticated";
}

export function Navbar({ status }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-4 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
            S
          </div>
          <h1 className="text-xl font-bold gradient-text">StripePortfolio</h1>
        </div>

        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition"
              >
                Dashboard
              </Link>
              <Link
                href="/account"
                className="text-foreground hover:text-primary transition"
              >
                Minha Conta
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="px-4 py-1.5 text-sm text-white bg-error hover:bg-error/90 rounded-md transition"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signIn()}
              className="stripe-button"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}