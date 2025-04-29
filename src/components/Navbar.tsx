import Link from "next/link";
import { signOut } from "next-auth/react";
import { AuthButtons } from "./AuthButtons";
import { useState } from "react";

interface NavbarProps {
	status: "authenticated" | "loading" | "unauthenticated";
	session?: {
		user?: {
			credits?: number;
		};
	};
}

export function Navbar({ status, session }: NavbarProps) {
	const [showAuthModal, setShowAuthModal] = useState(false);
	const userCredits = session?.user?.credits ?? 0;

	return (
		<nav className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-4 px-6 md:px-10">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link
					href="/"
					className="flex items-center gap-2 hover:opacity-90 transition"
				>
					<div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
						S
					</div>
					<h1 className="text-xl font-bold gradient-text">StripePortfolio</h1>
				</Link>

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
							<Link
								href="/account"
								className="text-foreground hover:text-primary transition"
							>
								Créditos: {userCredits}
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
						<div className="relative">
							<button
								type="button"
								onClick={() => setShowAuthModal(!showAuthModal)}
								className="stripe-button"
								aria-expanded={showAuthModal}
								aria-haspopup="true"
							>
								Entrar
							</button>
							{showAuthModal && (
								<>
									<div
										className="fixed inset-0"
										onClick={() => setShowAuthModal(false)}
										onKeyDown={(e) => {
											if (e.key === "Escape") setShowAuthModal(false);
										}}
										role="button"
										tabIndex={0}
										aria-label="Fechar menu de autenticação"
									/>
									<div
										className="absolute right-0 mt-2 card p-4 w-72"
										role="dialog"
										aria-modal="true"
										aria-label="Opções de login"
									>
										<AuthButtons />
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
