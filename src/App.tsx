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


export interface Filter {
  title: string,
  status: string;
}

function getFilteredTodos(todos:Todo[], filter: Filter) {
  return todos.filter(todo => todo.title.toLowerCase().includes(filter.title.toLowerCase())
  && (filter.status === 'all'
  || (filter.status === 'active' && !todo.completed)
  || (filter.status === 'completed' && todo.completed)));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sorting, setSorting] = useState<Filter>({ status: 'all', title: '' });


  useEffect(() => {
    getTodos().then(setTodos);
  }, [todos]);


  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filterBy={setSorting} />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={getFilteredTodos(todos, sorting)}
                  selectedTodo={selectedTodo}
                  onTodoSelected={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo &&
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />}
    </>
  );
};
