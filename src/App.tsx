/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { CompletedStatus } from './types/CompletedStatus';

const getFilteredTodos = (
  initialTodos: Todo[],
  completedStatus: CompletedStatus,
  titleQuery: string,
) => {
  let filteredTodos = [...initialTodos];

  if (titleQuery) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLocaleLowerCase().includes(titleQuery.toLocaleLowerCase()),
    );
  }

  filteredTodos = filteredTodos.filter(todo => {
    switch (completedStatus) {
      case CompletedStatus.ACTIVE:
        return !todo.completed;
      case CompletedStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titleQuery, setTitleQuery] = useState('');
  const [completedStatus, setCompletedStatus] = useState(CompletedStatus.ALL);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, completedStatus, titleQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusSelect={setCompletedStatus}
                onTitleChange={setTitleQuery}
                titleQuery={titleQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
