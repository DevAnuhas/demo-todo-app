"use client";

import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import { oAuthLogin } from "./actions";

type OAuthProvider = {
	name: Provider;
	displayName: string;
	icon?: JSX.Element;
};

export function OAuthButtons() {
	const oAuthProviders: OAuthProvider[] = [
		{
			name: "github",
			displayName: "GitHub",
			icon: <Github />,
		},
	];

	return (
		<>
			{oAuthProviders.map((provider) => (
				<Button
					key={provider.name}
					variant="outline"
					className="w-full flex items-center gap-2 mt-4"
					onClick={async () => await oAuthLogin(provider.name)}
				>
					<span>{provider.icon}</span>
					Login with {provider.displayName}
				</Button>
			))}
		</>
	);
}
