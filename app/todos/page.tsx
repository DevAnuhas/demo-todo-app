import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function TodosPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	const { data: todos } = await supabase
		.from("todos")
		.select()
		.order("inserted_at", { ascending: false });

	return (
		<section className="p-3 pt-6">
			<div className="container mx-auto max-w-2xl w-full flex flex-col gap-4">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					Todo&apos;s
				</h1>
				<Separator className="w-full " />
				<TodoList todos={todos ?? []} />
			</div>
		</section>
	);
}
