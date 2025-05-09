"use server";

import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
	const supabase = await createClient();
	const text = formData.get("text") as string | null;

	if (!text) {
		throw new Error("No text provided");
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not logged in");
	}

	const { error } = await supabase.from("todos").insert({
		task: text,
		user_id: user.id,
	});

	if (error) {
		throw new Error("Failed to add todo");
	}

	revalidatePath("/todos");
}

export async function deleteTodo(id: number) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not logged in");
	}

	const { error } = await supabase.from("todos").delete().match({
		user_id: user.id,
		id: id,
	});

	if (error) {
		throw new Error("Failed to delete todo");
	}

	revalidatePath("/todos");
}

export async function toggleTodo(todo: Todo) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not logged in");
	}

	const { error } = await supabase.from("todos").update(todo).match({
		user_id: user.id,
		id: todo.id,
	});

	if (error) {
		throw new Error("Failed to toggle todo");
	}

	revalidatePath("/todos");
}
