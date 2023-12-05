import { Todo } from './Todo';
import { User } from './User';
import { Filter } from './Filter';

export enum ActionType {
  setTodos,
  setOpenedTodo,
  setUser,
  setFilterOption,
  setFilterQuery,
  setIsModalOpened,
  setIsLoadingTodos,
  setIsLoadingUser,
}

export type Action = { type: ActionType.setTodos, payload: Todo[] }
| { type: ActionType.setOpenedTodo, payload: Todo }
| { type: ActionType.setUser, payload: User }
| { type: ActionType.setFilterOption, payload: Filter }
| { type: ActionType.setFilterQuery, payload: string }
| { type: ActionType.setIsModalOpened, payload: boolean }
| { type: ActionType.setIsLoadingTodos, payload: boolean }
| { type: ActionType.setIsLoadingUser, payload: boolean };
