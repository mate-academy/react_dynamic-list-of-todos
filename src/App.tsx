/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedList, setSelectedList] = useState<string>('all');
  const [filterText, setFilterText] = useState('');
  const [filteredList, setFilteredList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then(todos => {
      setTodoList(todos);
      setFilteredList(todos);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const selectedTable = todoList.filter(todo => {
      const matchesFilterText = todo.title
        .toLowerCase()
        .includes(filterText.toLowerCase());

      switch (selectedList) {
        case 'active':
          return !todo.completed && matchesFilterText;
        case 'completed':
          return todo.completed && matchesFilterText;
        default:
          return matchesFilterText;
      }
    });

    setFilteredList(selectedTable);
  }, [selectedList, todoList, filterText]);

  const handleFilterChange = (newValue: string) => {
    setFilterText(newValue);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSelectedChange={setSelectedList}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todoList={filteredList} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
