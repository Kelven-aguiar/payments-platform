"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Footer } from "@/components/Footer";

// Definindo tipo adequado para o session
type UserSession = Session & {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		credits?: number;
	};
};

export default function Home() {
	const { data: session, status } = useSession();
	const userSession = session as UserSession;

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

	return (
		<main className="min-h-screen bg-background font-sans">
			<Navbar status={status} session={userSession} />
			<HeroSection status={status} session={userSession} />
			<FeaturesSection />
			<HowItWorksSection />
			<Footer />
		</main>
	);
}
