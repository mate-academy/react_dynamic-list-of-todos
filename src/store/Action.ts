import { ActionTypes } from './ActionTypes';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export type Action = {
  type: ActionTypes.ToggleTodoModal,
  payload: {
    todo: Todo | null,
  }
} | {
  type: ActionTypes.ChangeStatus,
  payload: {
    status: Status,
  }
} | {
  type: ActionTypes.ChangeQuery,
  payload: {
    query: string,
  }
};
