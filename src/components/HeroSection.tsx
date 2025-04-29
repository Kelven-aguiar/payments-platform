import Link from "next/link";
import type { Session } from "next-auth";
import { AuthButtons } from "./AuthButtons";
import { PricingCard } from "./PricingCard";

type UserSession = Session & {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
};

interface HeroSectionProps {
	status: "authenticated" | "loading" | "unauthenticated";
	session: UserSession | null;
}

export function HeroSection({ status, session }: HeroSectionProps) {
	return (
		<section className="relative py-16 md:py-24 px-6 md:px-10 bg-background-alt">
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						<span className="gradient-text">Sistema de Créditos</span> com
						Stripe
					</h1>
					<p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg">
						Um exemplo de portfólio que demonstra integração completa com a API
						do Stripe para gerenciamento de pagamentos e sistema de créditos.
					</p>
					{status === "authenticated" ? (
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/dashboard"
								className="stripe-button inline-block text-center"
							>
								Acessar Dashboard
							</Link>
							<Link
								href="/account/add-credits"
								className="px-6 py-2.5 bg-background border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary/5 transition text-center"
							>
								Adicionar Créditos
							</Link>
						</div>
					) : (
						<div className="card p-8 max-w-md">
							{session ? (
								<p className="text-center">
									Bem-vindo, {session.user?.name || "Usuário"}!
								</p>
							) : (
								<AuthButtons />
							)}
						</div>
					)}
				</div>
				<div className="hidden md:block">
					<PricingCard />
				</div>
			</div>
		</section>
	);
}
