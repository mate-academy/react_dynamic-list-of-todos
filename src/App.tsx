/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodosStatus } from './types/TodosStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState<TodosStatus>(TodosStatus.ALL);
  const [todosQuery, setTodosQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const onSetOfSelectedTodo = (pickedTodo: Todo | null) => {
    setSelectedTodo(pickedTodo);
  };

  const filterByStatus = (option: TodosStatus) => {
    setTodosStatus(option);
  };

  const filterByQuery = (query: string) => {
    setTodosQuery(query);
  };

  let filteredTodos = [...todos];

  if (todosStatus !== TodosStatus.ALL) {
    filteredTodos = filteredTodos
      .filter(todoStatus => {
        switch (todosStatus) {
          case (TodosStatus.ACTIVE):
            return todoStatus.completed === false;

          case (TodosStatus.COMPLETED):
            return todoStatus.completed === true;

          default:
            return 0;
        }
      });
  }

  if (todosQuery.trim() !== '') {
    const lowerQuery = todosQuery.toLocaleLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todoQuery => todoQuery.title.toLocaleLowerCase().trim().includes(lowerQuery));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByStatus={filterByStatus}
                filterByQuery={filterByQuery}
                query={todosQuery}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSetOfSelectedTodo={onSetOfSelectedTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSetOfSelectedTodo={onSetOfSelectedTodo}
        />
      )}
    </>
  );
};
