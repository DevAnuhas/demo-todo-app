import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
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
					<LoginForm message={message} />
				</CardContent>
			</Card>
		</section>
	);
}
