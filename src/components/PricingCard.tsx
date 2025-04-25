export function PricingCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30" />
      <div className="card p-6 relative">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Plano Premium</h3>
            <span className="px-2.5 py-1 bg-primary/10 text-primary rounded text-sm">
              Popular
            </span>
          </div>
          <div className="mt-4 mb-6">
            <span className="text-4xl font-bold">R$ 99</span>
            <span className="text-foreground/60">/mês</span>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckmarkIcon />
              <span>500 créditos por mês</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckmarkIcon />
              <span>Suporte prioritário</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckmarkIcon />
              <span>Analytics avançado</span>
            </li>
          </ul>
        </div>
        <button type="button" className="w-full stripe-button">
          Assinar Agora
        </button>
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