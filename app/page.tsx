import Link from "next/link";

export default async function Index() {
	return (
		<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
			<div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
				<h1 className="font-sans text-balance font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
					Next.js Server Actions and Supabase / Auth.
				</h1>
				<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
					A demo todo app that utilizes Supabase for databse and auth, combined
					with NextJS Server Actions.
				</p>
				<div className="space-x-4">
					<Link
						className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md"
						href="/login"
					>
						Get Started
					</Link>
				</div>
			</div>
		</section>
	);
}
