/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { OptionType } from './types/OptionType';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState<OptionType>('all');
  const [listLoading, setListLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setListLoading(true);
      const todosDb = await getTodos();

      setTodos(todosDb);
      setListLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = todos;

    switch (option) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }

    setFilteredTodos(filtered);
  }, [option, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setOption={setOption}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>

            <div className="block">
              {listLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  searchParams={searchInput}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};
