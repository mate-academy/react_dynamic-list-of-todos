import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  appTodo: Todo[],
  setTodo: (todo: Todo) => void,
  onCheck: (isSelected: boolean) => void,
  onSelect: (selectedTodoId: number) => void,
  selected: number,
};

export const TodoList: React.FC<Props> = ({
  appTodo, setTodo, onCheck, onSelect, selected,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    setTodos(appTodo);
  }, [appTodo]);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className={cn('has-text-success', {
                'has-text-danger': !todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  onCheck(true);
                  setTodo(todo);
                  onSelect(todo.id);
                }}
              >
                <span className="icon">
                  <i className={cn(
                    'far',
                    { 'fa-eye': selected !== todo.id },
                    { 'fa-eye-slash': selected === todo.id },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
