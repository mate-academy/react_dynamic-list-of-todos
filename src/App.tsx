import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export enum FilterBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const getFilteredTodos = (todos: Todo[], filerBy: FilterBy, query: string) => {
  const filteredTodos = todos.filter(({ title }) => (
    title.toLowerCase().includes(query.toLowerCase())
  ));

  if (filerBy !== FilterBy.ALL) {
    switch (filerBy) {
      case FilterBy.ACTIVE:
        return filteredTodos.filter(({ completed }) => !completed);

      case FilterBy.COMPLETED:
        return filteredTodos.filter(({ completed }) => completed);

      default:
        break;
    }
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filerBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromApi = await getTodos();

      setTodos(todosFromApi);
      setIsLoaded(true);
    };

    loadTodos();
  }, []);

  const selectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const resetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const selectFilterType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  const onQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const visibleTodos = getFilteredTodos(todos, filerBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectFilterType={selectFilterType}
                onQuery={onQuery}
                resetQuery={resetQuery}

              />
            </div>

            <div className="block">
              {isLoaded ? (
                <TodoList
                  todos={visibleTodos}
                  onClick={selectTodo}
                  selectedTodo={selectedTodo}
                />
              ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClick={resetSelectedTodo}
        />
      )}

    </>
  );
};
