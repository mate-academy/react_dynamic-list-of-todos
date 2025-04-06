/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [actualFilters, setActualFilters] = useState<string>('All');
  const [filterQuery, setFilterQuery] = useState<string>(''); // filterQury
  const [todoModal, setTodoModal] = useState<Todo | null>(null); // todoModalId

  useEffect(() => {
    // const loadTodos = async () => {
    //   try {
    //     const data: Todo[] = await getTodos();

    //     if (data) {
    //       setTodos(data);
    //     }
    //   } catch (error) {
    //     console.error('Errors with getting todos:', error);

    //     throw new Error();
    //   }
    // };

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Помилки під час отримання завдань:', error);

        throw new Error();
      });

    // loadTodos();
  }, []);

  const getFilteredTodos = (array: Todo[], filter: string) => {
    switch (filter) {
      case 'All':
        return array;
      case 'Active':
        return array.filter(todo => !todo.completed);
      case 'Completed':
        return array.filter(todo => todo.completed);
      default:
        return array;
    }
  };

  const filteredTodos = getFilteredTodos(todos, actualFilters);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                actualFilters={actualFilters}
                setActualFilters={setActualFilters}
                setFilterQuery={setFilterQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                filterQuery={filterQuery}
                setTodoModal={setTodoModal}
              />
            </div>
          </div>
        </div>
      </div>
      {!!todoModal && (
        <TodoModal todo={todoModal} setTodoModal={setTodoModal} />
      )}
    </>
  );
};
