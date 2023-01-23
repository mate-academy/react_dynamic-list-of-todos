import { FC } from 'react';
import './Loader.scss';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const Loader: FC<Props> = ({ todos }) => (
  <div className="Loader" data-cy="loader">
    {todos.length === 0 && (
      <div className="Loader__content" />
    )}
  </div>
);
