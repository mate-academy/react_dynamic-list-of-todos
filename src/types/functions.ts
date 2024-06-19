import { Todo } from './Todo';
import { FilterOption } from './variables';

export type OnTodoSelect = (id: number | null) => void;
export type OnFilterSelect = (option: FilterOption) => void;
export type OnFilterChange = (query: string) => void;
export type FilterCallback = (todo: Todo) => boolean;
