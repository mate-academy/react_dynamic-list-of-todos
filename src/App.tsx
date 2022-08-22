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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const filterList = (list: Todo[]) => {
    let todoList = list.filter(todoItem => todoItem.title.includes(query));

    switch (filter) {
      case 'all': break;
      case 'completed': todoList = todoList.filter(todoItem => todoItem.completed); break;
      case 'active': todoList = todoList.filter(todoItem => !todoItem.completed); break;
      default: break;
    }

    return todoList;
  };

  const visiableTodos = filterList(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visiableTodos}
                selectedTodo={selectedTodo}
                onSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
