import Link from "next/link";

export function PricingCard() {
	return (
		<div className="relative">
			<div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30" />
			<div className="card p-6 relative">
				{/* Cabeçalho do card */}
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold ">Adicione créditos</h2>
					<span className="px-2.5 py-1 bg-primary/10 text-primary rounded text-sm">
						Popular
					</span>
				</div>

				{/* Informações de preço */}
				<div className="mb-6">
					<h4 className="text-lg text-muted-foreground mb-1">A partir de:</h4>
					<span className="text-4xl font-bold">R$ 5,00</span>
				</div>

				{/* Lista de benefícios */}
				<ul className="space-y-3 mb-6">
					<li className="flex items-center gap-2">
						<CheckmarkIcon />
						<span>500 créditos</span>
					</li>
					<li className="flex items-center gap-2">
						<CheckmarkIcon />
						<span>Teste minha API stripe</span>
					</li>
					<li className="flex items-center gap-2">
						<CheckmarkIcon />
						<span>Veja o historico de compras e sistema de créditos</span>
					</li>
				</ul>

				{/* Nota informativa */}
				<div className="mb-6 p-3 bg-muted/50 rounded-lg text-sm">
					<p className="text-muted-foreground">
						Este é um portfólio de demonstração. Os créditos adquiridos não
						possuem valor real ou funcionalidade prática. Sua compra contribui
						para apoiar meu desenvolvimento e demonstra a integração da API
						Stripe neste projeto.
					</p>
				</div>

				{/* Botão de ação */}
				<Link href="/account/add-credits" className="w-full">
					<button type="button" className="w-full stripe-button">
						Adicione créditos agora
					</button>
				</Link>
			</div>
		</div>
	);
}

function CheckmarkIcon() {
	return (
		<svg
			className="w-5 h-5 text-accent"
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title>Confirmação</title>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
