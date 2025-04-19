"use client";

import { Suspense } from "react";
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
import { useSearchParams } from "next/navigation";

function LoginForm() {
	const searchParams = useSearchParams();
	const message = searchParams.get("message");

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
						<Button className="w-full">Login</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Button form="login-form" variant={"link"} className="p-0">
							Sign up
						</Button>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

export default function Login() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginForm />
		</Suspense>
	);
}
