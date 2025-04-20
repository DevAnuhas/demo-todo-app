"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailLogin, signUp } from "./actions";
import { OAuthButtons } from "./oauth-login";

interface LoginFormProps {
	message?: string;
}

function LoginButton() {
	const { pending } = useFormStatus();

	return (
		<Button formAction={emailLogin} className="w-full" disabled={pending}>
			{pending ? "Logging in..." : "Login"}
		</Button>
	);
}

export function LoginForm({ message }: LoginFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { pending } = useFormStatus();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const formData = new FormData(e.currentTarget);
			await emailLogin(formData);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const form = document.getElementById("login-form") as HTMLFormElement;
			const formData = new FormData(form);
			await signUp(formData);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isDisabled = pending || isSubmitting;

	return (
		<>
			<form id="login-form" onSubmit={handleSubmit} className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="m@example.com"
						required
						disabled={isDisabled}
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
						disabled={isDisabled}
					/>
				</div>
				{message && (
					<div className="text-sm font-medium text-destructive">{message}</div>
				)}
				<LoginButton />
			</form>
			<OAuthButtons />
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{" "}
				<Button
					onClick={handleSignUp}
					form="login-form"
					variant={"link"}
					className="p-0"
					disabled={isDisabled}
				>
					Sign up
				</Button>
			</div>
		</>
	);
}
