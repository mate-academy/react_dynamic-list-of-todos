import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectTodoId, setSelectTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [isLoading, setIsLoading] = useState(false);

  const uploadTodo = async () => {
    setIsLoading(true);
    try {
      const todosFromServer = getTodos();

      setTodos(await todosFromServer);
      setVisibleTodos(await todosFromServer);
    } catch {
      throw new Error('Todos not fond');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    uploadTodo();
  }, []);

  const onSetQuery = (value: string) => setQuery(value);

  const findSelectedTodo = () => todos.find(todo => todo.id === selectTodoId);

  const onSetFilterBy = (value: FilterBy) => {
    setFilterBy(value);
  };

  const checkTitle = (title: string) => title.toLowerCase()
    .includes(query.toLowerCase());

  useEffect(() => {
    const filteredTodos = todos
      .filter(({ completed, title }) => {
        switch (filterBy) {
          case FilterBy.Active:
            return !completed && checkTitle(title);

          case FilterBy.Completed:
            return completed && checkTitle(title);

          default:
            return checkTitle(title);
        }
      });

    setVisibleTodos(filteredTodos);
  }, [query, filterBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={onSetQuery}
                filterBy={filterBy}
                setFilterBy={onSetFilterBy}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    viewModule={setSelectTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {!!selectTodoId && (
        <TodoModal
          selectedTodo={findSelectedTodo()}
          viewModule={setSelectTodoId}
        />
      )}
    </>
  );
};
