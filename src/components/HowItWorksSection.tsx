interface StepCardProps {
	number: number;
	title: string;
	description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
	return (
		<div className="card p-6">
			<h3 className="text-xl font-semibold mb-4">
				{number}. {title}
			</h3>
			<p className="text-foreground/70">{description}</p>
		</div>
	);
}

export function HowItWorksSection() {
	const steps = [
		{
			number: 1,
			title: "Crie sua conta",
			description:
				"Registre-se usando Google, GitHub ou seu endereço de e-mail para acessar a plataforma.",
		},
		{
			number: 2,
			title: "Adicione créditos",
			description:
				"Escolha a quantidade de créditos que deseja adicionar para utilização da plataforma.",
		},
		{
			number: 3,
			title: "Gerencie seus créditos",
			description:
				"Acompanhe o uso, adicione mais créditos quando necessário e veja seu histórico de transações.",
		},
	];

	return (
		<section className="py-16 md:py-24 px-6 md:px-10 bg-background-alt">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Como Funciona o Sistema de Créditos
					</h2>
					<p className="text-foreground/70">
						Entenda como funciona nossa plataforma de demonstração com sistema
						de créditos via Stripe.
					</p>
				</div>

				<div className="space-y-8">
					{steps.map((step) => (
						<StepCard key={step.number} {...step} />
					))}
				</div>
			</div>
		</section>
	);
}
