"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Session } from "next-auth";

interface CreditHistory {
	id: string;
	amount: number;
	type: "add" | "use";
	description: string;
	date: string;
}

// Definindo tipo adequado para o session
type UserSession = Session & {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		credits?: number;
	};
};

export default function MyAccount() {
	const { data: session, status } = useSession();
	const userSession = session as UserSession;
	const [activeTab, setActiveTab] = useState<
		"profile" | "subscription" | "credits"
	>("profile");

	// Mock data - In a real app, this would come from your API
	const mockCreditHistory: CreditHistory[] = [
		{
			id: "1",
			amount: 100,
			type: "add",
			description: "Compra de créditos",
			date: "2025-04-25",
		},
		{
			id: "2",
			amount: 5,
			type: "use",
			description: "Uso do serviço",
			date: "2025-04-24",
		},
	];

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
		return (
			<div className="min-h-screen bg-background">
				<Navbar status={status} />
				<div className="max-w-7xl mx-auto px-6 py-16 text-center">
					<h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
					<p className="text-foreground/70">
						Você precisa estar logado para acessar esta página.
					</p>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<Navbar status={status} session={userSession} />

			<main className="max-w-7xl mx-auto px-6 py-16">
				<div className="mb-12">
					<h1 className="text-3xl font-bold mb-2">Minha Conta</h1>
					<p className="text-foreground/70">
						Gerencie seu perfil, assinatura e créditos
					</p>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-border mb-8">
					<button
						type="button"
						onClick={() => setActiveTab("credits")}
						className={`px-6 py-3 font-medium ${
							activeTab === "credits"
								? "border-b-2 border-primary text-primary"
								: "text-foreground/70 hover:text-foreground"
						}`}
					>
						Créditos
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("profile")}
						className={`px-6 py-3 font-medium ${
							activeTab === "profile"
								? "border-b-2 border-primary text-primary"
								: "text-foreground/70 hover:text-foreground"
						}`}
					>
						Perfil
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("subscription")}
						className={`px-6 py-3 font-medium ${
							activeTab === "subscription"
								? "border-b-2 border-primary text-primary"
								: "text-foreground/70 hover:text-foreground"
						}`}
					>
						Assinatura
					</button>
				</div>

				{/* Profile Tab */}
				{activeTab === "profile" && (
					<div className="space-y-8">
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-6">
								Informações Pessoais
							</h2>
							<div className="space-y-4">
								<div>
									<label
										htmlFor="userName"
										className="block text-sm font-medium mb-1"
									>
										Nome
									</label>
									<input
										id="userName"
										type="text"
										className="w-full px-4 py-2 rounded-md bg-background-alt border border-border"
										value={session?.user?.name || ""}
										readOnly
									/>
								</div>
								<div>
									<label
										htmlFor="userEmail"
										className="block text-sm font-medium mb-1"
									>
										Email
									</label>
									<input
										id="userEmail"
										type="email"
										className="w-full px-4 py-2 rounded-md bg-background-alt border border-border"
										value={session?.user?.email || ""}
										readOnly
									/>
								</div>
							</div>
						</div>

						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-6">Preferências</h2>
							<div className="space-y-4">
								<div className="flex items-center">
									<input
										type="checkbox"
										id="emailNotifications"
										className="rounded border-border text-primary focus:ring-primary"
									/>
									<label
										htmlFor="emailNotifications"
										className="ml-2 text-sm font-medium"
									>
										Receber notificações por email
									</label>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Subscription Tab */}
				{activeTab === "subscription" && (
					<div className="space-y-8">
						<div className="card p-6">
							<div className="flex justify-between items-start mb-6">
								<div>
									<h2 className="text-xl font-semibold">Plano Atual</h2>
									<p className="text-foreground/70">Plano Premium</p>
								</div>
								<span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
									Ativo
								</span>
							</div>
							<div className="border-t border-border pt-6">
								<div className="flex justify-between mb-2">
									<span className="font-medium">Próxima cobrança</span>
									<span>25 de Maio, 2025</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Valor</span>
									<span>R$ 99,00</span>
								</div>
							</div>
						</div>

						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-6">
								Histórico de Pagamentos
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between py-3 border-b border-border">
									<div>
										<p className="font-medium">25 de Abril, 2025</p>
										<p className="text-sm text-foreground/70">Plano Premium</p>
									</div>
									<span>R$ 99,00</span>
								</div>
								<div className="flex justify-between py-3 border-b border-border">
									<div>
										<p className="font-medium">25 de Março, 2025</p>
										<p className="text-sm text-foreground/70">Plano Premium</p>
									</div>
									<span>R$ 99,00</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Credits Tab */}
				{activeTab === "credits" && (
					<div className="space-y-8">
						<div className="card p-6">
							<div className="flex justify-between items-center mb-6">
								<div>
									<h2 className="text-xl font-semibold">Saldo de Créditos</h2>
									<p className="text-3xl font-bold mt-2">495 créditos</p>
								</div>
								<button type="button" className="stripe-button">
									Adicionar Créditos
								</button>
							</div>
							<div className="flex items-center text-sm text-foreground/70">
								<svg
									className="w-4 h-4 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<title>Informação sobre expiração</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Seus créditos expiram em 30 dias
							</div>
						</div>

						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-6">
								Histórico de Créditos
							</h2>
							<div className="space-y-4">
								{mockCreditHistory.map((item) => (
									<div
										key={item.id}
										className="flex justify-between py-3 border-b border-border"
									>
										<div>
											<p className="font-medium">{item.description}</p>
											<p className="text-sm text-foreground/70">{item.date}</p>
										</div>
										<span
											className={
												item.type === "add" ? "text-green-500" : "text-red-500"
											}
										>
											{item.type === "add" ? "+" : "-"}
											{item.amount} créditos
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
