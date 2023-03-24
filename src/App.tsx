/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchBarValue, setSearchBarValue] = useState('');

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, []);

  const showTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const getCurrentTodo = () => {
    if (!selectedTodo) {
      return todos[0];
    }

    return todos.filter(todo => todo.id === selectedTodo.id)[0];
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  const getFilter = useCallback(
    (filter: string) => setSelectedFilter(filter), [],
  );

  const filterTodos = (option: string, searchValue?: string) => {
    let filteredTodos = [...todos];

    if (searchValue) {
      filteredTodos = filteredTodos.filter(todo => todo.title.includes(searchValue));
    }

    switch (option) {
      case 'completed':
        return filteredTodos.filter(todo => todo.completed);

      case 'active':
        return filteredTodos.filter(todo => !todo.completed);

      default:
        return filteredTodos;
    }
  };

  const filteredTodos = useMemo(() => (
    filterTodos(selectedFilter, searchBarValue)), [todos, selectedFilter, searchBarValue]);

  const getSearchBarValue = useCallback(
    (value: string) => setSearchBarValue(value), [],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getFilter={getFilter}
                selectedFilter={selectedFilter}
                searchBarValue={searchBarValue}
                getSearchBarValue={getSearchBarValue}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodo?.id}
                showTodo={showTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          closeModal={closeModal}
          currentTodo={getCurrentTodo()}
        />
      )}
    </>
  );
};
