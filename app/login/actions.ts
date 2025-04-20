"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getURL } from "@/utils/helpers";

export async function emailLogin(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/login?message=Invalid email or password");
	}

	revalidatePath("/", "layout");
	redirect("/todos");
}

export async function signUp(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect("/login?message=Invalid email or password");
	}

	revalidatePath("/", "layout");
	redirect("/login");
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/login");
}

export async function oAuthLogin(provider: Provider) {
	if (!provider) {
		return redirect("/login?message=Invalid provider");
	}

	const supabase = await createClient();
	const redirectUrl = getURL("/auth/callback");
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: redirectUrl,
			scopes: provider === "github" ? "repo" : undefined,
			queryParams: {
				next: "/todos",
			},
		},
	});

	if (error) {
		redirect("/login?message=Invalid provider");
	}

	redirect(data.url);
}
