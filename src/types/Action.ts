import { Todo } from './Todo';
import { User } from './User';
import { Filter } from './Filter';

export type Action = { type: 'setTodos', payload: Todo[] }
| { type: 'setOpenedTodo', payload: Todo }
| { type: 'setUser', payload: User }
| { type: 'setFilterOption', payload: Filter }
| { type: 'setFilterQuery', payload: string }
| { type: 'setIsModalOpened', payload: boolean }
| { type: 'setIsLoadingTodos', payload: boolean }
| { type: 'setIsLoadingUser', payload: boolean };
