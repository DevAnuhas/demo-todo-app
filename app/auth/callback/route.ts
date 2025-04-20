import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getURL } from "@/utils/helpers";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/todos";

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(getURL(next));
		}
	}

	return NextResponse.redirect(getURL("/login?message=Error authenticating"));
}
