import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { Options } from '../types/Options';
import { getUser } from '../api';
import { User } from '../types/User';

export const filterTodos = (
  todos: Todo[],
  selectedOption: string,
  appliedQuery: string,
): Todo[] => {
  let filteresTodos: Todo[] = todos;

  if (selectedOption === Options.COMPLETED) {
    filteresTodos = filteresTodos.filter(todo => todo.completed);
  }

  if (selectedOption === Options.ACTIVE) {
    filteresTodos = filteresTodos.filter(todo => !todo.completed);
  }

  if (appliedQuery) {
    filteresTodos = filteresTodos.filter((todo) => (
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase())
    ));
  }

  return filteresTodos;
};

export const getSelectedUser = async (
  userId: number,
  setSelectedUser: Dispatch<SetStateAction<User | null>>,
  setHasRequestError: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    const userFromServer = await getUser(userId);

    setSelectedUser(userFromServer);
  } catch (error) {
    setHasRequestError(true);
  }
};
