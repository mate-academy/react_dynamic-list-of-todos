import { Todo } from "../types/Todo";
import { AgroupField } from "../types/AgroupField"

interface Filters {
    query: string;
    agroupField: string;
}

export function getFilteredTodos(
    todos: Todo[],
    { query, agroupField }: Filters,
): Todo[] {
    let todosCopy = [...todos];

    if (query) {
        const normalizedQuery = query.trim().toLocaleLowerCase();

        todosCopy = todosCopy.filter( todo => {
            const normalizedTitle = todo.title.trim().toLowerCase();

            return normalizedTitle.includes(normalizedQuery);
        });
    }

    if (agroupField) {
        switch(agroupField){
            case AgroupField.ACTIVE:
                return (todosCopy = todosCopy.filter(todo => todo.completed === false));
            case AgroupField.COMPLETED:
                return (todosCopy = todosCopy.filter(todo => todo.completed === true));
            default:
                break
        }
    }

    return todosCopy;
}