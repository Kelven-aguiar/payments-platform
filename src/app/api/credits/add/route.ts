import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const CREDIT_PACKAGES = [
	{ credits: 100, price: 100 }, // R$ 1,00 = 100 créditos
	{ credits: 600, price: 500 }, // R$ 5,00 = 600 créditos
	{ credits: 1500, price: 1000 }, // R$ 10,00 = 1500 créditos
];

export async function POST(request: Request) {
	try {
		// Verificar se a chave do Stripe está configurada
		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error("A chave secreta do Stripe não está configurada");
		}

		const session = await getServerSession();
		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: "Você precisa estar logado" },
				{ status: 401 },
			);
		}

		const body = await request.json();
		const { packageId } = body;

		const creditPackage = CREDIT_PACKAGES[packageId];
		if (!creditPackage) {
			return NextResponse.json(
				{ error: "Pacote de créditos inválido" },
				{ status: 400 },
			);
		}

		const headersList = headers();
		// O headers().get não retorna uma Promise, então não precisa de await
		const protocol = headersList.get("x-forwarded-proto") || "http";
		const host = headersList.get("host");
		const baseUrl = `${protocol}://${host}`;

		const checkoutSession = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "brl",
						product_data: {
							name: `${creditPackage.credits} Créditos`,
							description: `Pacote com ${creditPackage.credits} créditos para usar na plataforma`,
						},
						unit_amount: creditPackage.price,
					},
					quantity: 1,
				},
			],
			success_url: `${baseUrl}/account?success=true`,
			cancel_url: `${baseUrl}/account?canceled=true`,
			metadata: {
				credits: creditPackage.credits.toString(),
				userEmail: session.user.email,
			},
		});

		return NextResponse.json({ url: checkoutSession.url });
	} catch (error: any) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{ error: error.message || "Erro ao processar pagamento" },
			{ status: 500 },
		);
	}
}
