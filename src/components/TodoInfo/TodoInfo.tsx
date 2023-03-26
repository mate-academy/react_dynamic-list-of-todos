import React, { useEffect, useState } from 'react';
import { TodoList } from '../TodoList';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

export const TodoInfo = React.memo(
  ({
    selected,
    searchHolder,
    carierTodo,
    setCarierTodo,
  }: {
    selected: string
    searchHolder: string
    carierTodo: Todo
    setCarierTodo: React.Dispatch<React.SetStateAction<Todo>>
  }) => {
    const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    useEffect(() => {
      try {
        getTodos()
          .then((todosFromServer) => {
            setInitialTodos(todosFromServer);
            setTodos(todosFromServer);
          });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }, []);

    const searchElement = () => {
      if (searchHolder) {
        setTodos((prevTodos) => {
          return prevTodos.filter((todo) => todo.title
            .toLowerCase().includes(searchHolder));
        });
      }
    };

    const filterTodos = () => {
      switch (selected) {
        case 'active':
          setTodos(initialTodos);
          setTodos((todosBefore) => todosBefore
            .filter((todo) => !todo.completed));
          searchElement();
          break;
        case 'completed':
          setTodos(initialTodos);
          setTodos((todosBefore) => todosBefore
            .filter((todo) => todo.completed));
          searchElement();
          break;

        case 'All':
        default:
          setTodos(initialTodos);
          searchElement();
          break;
      }
    };

    useEffect(() => {
      filterTodos();
    }, [selected, searchHolder]);

    if (initialTodos.length) {
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
            {todos.map((todo) => (
              <TodoList
                carierTodo={carierTodo}
                todo={todo}
                key={todo.id}
                setCarierTodo={setCarierTodo}
              />
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <Loader />
    );
  },
);
