"use client";

import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Todo } from "@/types/custom";
import { useOptimistic } from "react";

export type Action = "delete" | "toggle" | "create";

export function todoReducer(
	state: Array<Todo>,
	{ action, todo }: { action: Action; todo: Todo }
) {
	switch (action) {
		case "delete":
			return state.filter((t) => t.id !== todo.id);
		case "toggle":
			return state.map((t) =>
				t.id === todo.id ? { ...t, is_complete: !t.is_complete } : t
			);
		case "create":
			return [todo, ...state];
		default:
			throw new Error("Invalid action");
	}
}

export type TodoOptimisticUpdate = (action: {
	action: Action;
	todo: Todo;
}) => void;

export function TodoList({ todos }: { todos: Array<Todo> }) {
	const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(
		todos,
		todoReducer
	);
	return (
		<>
			<TodoForm optimisticUpdate={optimisticTodosUpdate} />
			<div className="w-full flex flex-col gap-4">
				{optimisticTodos?.map((todo) => {
					return (
						<TodoItem
							optimisticUpdate={optimisticTodosUpdate}
							todo={todo}
							key={todo.id}
						/>
					);
				})}
			</div>
		</>
	);
}
