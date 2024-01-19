import { Action } from '../State/State';
import { getUser } from '../api';
import { ControlParams } from '../types/ControlParams';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export function getPreperedTodos(
  todos: Todo[],
  { appliedQuery, filterBy }: ControlParams,
): Todo[] {
  const preperedTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.active:
        return !todo.completed;
      case Filter.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return preperedTodos.filter(todo => todo.title.includes(appliedQuery));
}

export function getSelectedTodo(
  userId: number,
  selectedTodo: Todo,
  dispatch: React.Dispatch<Action>,
) {
  let selectedUser: User | null = null;

  getUser(userId).then(user => {
    selectedUser = user;
  });

  dispatch({
    type: 'getSelectedTodo',
    payload: { ...selectedTodo, user: selectedUser },
  });
}
