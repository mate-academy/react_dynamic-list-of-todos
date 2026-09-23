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
import { FilterOptions } from './types/FilterOptions';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [toDoList, setToDoList] = useState<Todo[]>([]);

  const [filterOption, setFilterOption] = useState<FilterOptions>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchTodos = async () => {
      const result = await getTodos();

      setToDoList(result);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const getFilteredTodo = (list: Todo[]) => {
    let result: Todo[] = [];

    switch (filterOption) {
      case 'active':
        result = list.filter(todo => todo.completed === false);
        break;
      case 'completed':
        result = list.filter(todo => todo.completed === true);
        break;
      case 'all':
      default:
        result = list;
        break;
    }

    return result.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterOption={setFilterOption}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                toDoList={getFilteredTodo(toDoList)}
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
