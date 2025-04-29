"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Session } from "next-auth";

// Definindo tipo adequado para o session
type UserSession = Session & {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		credits?: number;
	};
};

const CREDIT_PACKAGES = [
	{
		id: 0,
		credits: 100,
		price: 1,
		description: "Pacote básico para começar",
		popular: false,
	},
	{
		id: 1,
		credits: 600,
		price: 5,
		description: "Melhor custo-benefício",
		popular: true,
	},
	{
		id: 2,
		credits: 1500,
		price: 10,
		description: "Ideal para uso intensivo",
		popular: false,
	},
];

export default function AddCredits() {
	const { data: session, status } = useSession();
	const userSession = session as UserSession;
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleBuyCredits = async (packageId: number) => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/credits/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ packageId }),
			});

			const data = await response.json();

			if (data.url) {
				window.location.href = data.url;
			} else {
				throw new Error(data.error || "Erro ao processar pagamento");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Erro ao processar pagamento. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div
					className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"
					aria-label="Carregando..."
				/>
			</div>
		);
	}

	if (status === "unauthenticated") {
		router.push("/");
		return null;
	}

	return (
		<div className="min-h-screen bg-background">
			<Navbar status={status} session={userSession} />

			<main className="max-w-7xl mx-auto px-6 py-16">
				<div className="mb-12">
					<h1 className="text-3xl font-bold mb-2">Adicionar Créditos</h1>
					<p className="text-foreground/70">
						Escolha o pacote de créditos que melhor atende suas necessidades
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{CREDIT_PACKAGES.map((pkg) => (
						<div key={pkg.id} className="relative">
							{pkg.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="px-3 py-1 bg-accent text-white text-sm rounded-full">
										Mais Popular
									</span>
								</div>
							)}
							<div className="card p-6 h-full flex flex-col">
								<div className="mb-6">
									<h3 className="text-xl font-semibold mb-2">
										{pkg.credits} Créditos
									</h3>
									<p className="text-foreground/70 mb-4">{pkg.description}</p>
									<div className="text-3xl font-bold mb-2">
										R$ {pkg.price.toFixed(2)}
									</div>
								</div>
								<button
									type="button"
									onClick={() => handleBuyCredits(pkg.id)}
									disabled={isLoading}
									className={`mt-auto w-full stripe-button ${
										isLoading ? "opacity-50 cursor-not-allowed" : ""
									}`}
								>
									{isLoading ? "Processando..." : "Comprar Agora"}
								</button>
							</div>
						</div>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
}
