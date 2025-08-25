/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOptions } from './types/FilterOptions';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const [todoListState, setTodoListState] = useState<Todo[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<FilterOptions>(
    FilterOptions.All,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<Errors>();

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodoListState(fetchedTodos);
        setIsLoading(false);
      } catch (e) {
        setError(Errors.Todo);
      }
    };

    fetchTodos();
  }, []);

  const onSelectChange = (option: FilterOptions) => {
    setSelectedOption(option);
  };

  const handleSearchQuery = (string: string) => {
    setSearchQuery(string);
  };

  const handleClearSearchQuery = () => {
    setSearchQuery('');
  };

  const handleIsModal = () => {
    setIsModal(!isModal);
  };

  const handleCurrenTodo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const fileteredTodos = useMemo(() => {
    let result = todoListState;

    if (selectedOption !== FilterOptions.All) {
      result = result.filter(todo =>
        selectedOption === FilterOptions.Active
          ? !todo.completed
          : todo.completed,
      );
    }

    if (searchQuery.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return result;
  }, [todoListState, selectedOption, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectChange={onSelectChange}
                filterOption={selectedOption}
                handleSearchQuery={handleSearchQuery}
                searchQuery={searchQuery}
                handleClearSearchQuery={handleClearSearchQuery}
              />
            </div>

            <div className="block">
              {error && <p className="has-danger">{error}</p>}
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={fileteredTodos}
                  handleIsModal={handleIsModal}
                  handleCurrenTodo={handleCurrenTodo}
                  currentTodo={currentTodo}
                  isModal={isModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModal && (
        <TodoModal todo={currentTodo} handleIsModal={handleIsModal} />
      )}
    </>
  );
};
