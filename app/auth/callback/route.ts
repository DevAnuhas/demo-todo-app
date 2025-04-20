import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/todos";

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const baseUrl =
				process.env.NEXT_PUBLIC_SITE_URL ||
				`https://${request.headers.get("host")}`;

			return NextResponse.redirect(`${baseUrl}${next}`);
		}
	}

	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL ||
		`https://${request.headers.get("host")}`;
	return NextResponse.redirect(`${baseUrl}/login?message=Error authenticating`);
}
