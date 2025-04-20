import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailLogin, signUp } from "./actions";
import { OAuthButtons } from "./oauth-login";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

interface PageProps {
	searchParams: Promise<{ message?: string }>;
}

export default async function Login({ searchParams }: PageProps) {
	const supabase = await createClient();
	const params = await searchParams;
	const message = params?.message;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return redirect("/todos");
	}

	return (
		<section className="h-[calc(100vh-57px)] flex justify-center items-center">
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="login-form" className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								minLength={6}
								name="password"
								id="password"
								type="password"
								required
							/>
						</div>
						{message && (
							<div className="text-sm font-medium text-destructive">
								{message}
							</div>
						)}
						<Button formAction={emailLogin} className="w-full">
							Login
						</Button>
					</form>
					<OAuthButtons />
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Button
							formAction={signUp}
							form="login-form"
							variant={"link"}
							className="p-0"
						>
							Sign up
						</Button>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
