import { Todo } from './Todo';
import { Filter } from './enum/Filter';

export interface TodosState {
  todos: Todo[]
  filter: Filter
  query: string
}
