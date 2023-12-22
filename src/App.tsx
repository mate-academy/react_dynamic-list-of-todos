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
import { Status } from './types/Status';
import { filterTodos } from './service/getFilteredTodo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.All);
  const [selectedTodoItem, setSelectedTodoItem] = useState<Todo | null>(null);

  const filteredTodos = filterTodos(todoList, searchQuery, selectedStatus);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodoList)
      .finally(() => {
        setLoading(false);
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
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && (
                <TodoList
                  todoList={filteredTodos}
                  selectedTodoItem={selectedTodoItem}
                  setSelectedTodoItem={setSelectedTodoItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoItem && (
        <TodoModal
          selectedTodoItem={selectedTodoItem}
          setSelectedTodoItem={setSelectedTodoItem}
        />
      )}
    </>
  );
};
