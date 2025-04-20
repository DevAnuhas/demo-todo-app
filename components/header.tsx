import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/login/actions";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

export default async function Header() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-8">
				<nav className="flex items-center space-x-4 lg:space-x-6">
					<Link className="mr-6 flex items-center space-x-2" href="/">
						<span className="font-bold">Todo App</span>
					</Link>
					<Link href="/todos">Todos</Link>
				</nav>
				<div className="flex flex-1 items-center justify-end space-x-2">
					{user ? (
						<form action={signOut}>
							<Button>
								<LogOut />
								Sign Out
							</Button>
						</form>
					) : (
						<Button asChild>
							<Link href="/login">
								<LogIn />
								Sign In
							</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
