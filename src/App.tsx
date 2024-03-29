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

enum FilterType {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

const filterTodos = (todos: Todo[], filterType: string, filterText: string) => {
  let filteredTodos: Todo[] = [...todos];

  if (filterType === FilterType.Active) {
    filteredTodos = filteredTodos.filter(todo => {
      return !todo.completed;
    });
  }

  if (filterType === FilterType.Completed) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.completed;
    });
  }

  if (filterText) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(filterText.toLowerCase()),
    );
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodods] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterText, setFilterText] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodods(data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterText={filterText}
                setFilterText={setFilterText}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos(todos, filterType, filterText)}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
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
