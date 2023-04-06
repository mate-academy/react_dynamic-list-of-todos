import { ActionTypes } from './ActionTypes';
import { Todo } from './Todo';

export interface Action {
  type: ActionTypes,
  selectedTodo?: Todo | null,
}
