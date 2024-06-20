import { Todo } from './Todo';
import { FilterOption } from './variables';

export type OnTodoClick = (id: number | null) => void;
export type OnOptionChange = (option: FilterOption) => void;
export type OnQueryChange = (query: string) => void;
export type FilterCallback = (todo: Todo) => boolean;
