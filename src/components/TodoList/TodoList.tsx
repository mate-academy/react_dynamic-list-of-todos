import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { Selected } from '../../types/index';

type Props = {
  isLoadTodos: (data: boolean) => void;
  whichModal: (todo: number, userId: number) => void;
  query: string;
  selected: Selected;
  todoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  isLoadTodos,
  whichModal,
  query,
  selected,
  todoId,
}) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodos, setSelectedTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      isLoadTodos(true);

      try {
        const todoData = await getTodos();

        setTodos(todoData);
        setSelectedTodos(todoData);
      } finally {
        isLoadTodos(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isQuery = async () => {
      if (todos) {
        const filtered = todos.filter(todo => (
          todo.title.toLowerCase().includes(query.toLowerCase())
        ));

        if (filtered) {
          setSelectedTodos(filtered.filter(filteredTodo => {
            switch (selected) {
              case Selected.all:
                return filteredTodo;
              case Selected.active:
                return filteredTodo.completed === false;
              case Selected.completed:
                return filteredTodo.completed === true;
              default:
                return filteredTodo;
            }
          }));
        }
      }
    };

    isQuery();
  }, [query, selected, todos]);

  return (
    <>
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
          {selectedTodos?.map(todo => (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => whichModal(todo.userId, todo.id)}
                >
                  <span className="icon">
                    <i className={todoId === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};
