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

export const App: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [filtered, setFiltered] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => {
        let filteredTodos = todos;

        if (category === 'active') {
          filteredTodos = filteredTodos.filter(todo => !todo.completed);
        } else if (category === 'completed') {
          filteredTodos = filteredTodos.filter(todo => todo.completed);
        }

        if (filtered.trim()) {
          filteredTodos = filteredTodos.filter(todo =>
            todo.title.toLowerCase().includes(filtered.toLowerCase()),
          );
        }

        setTodoList(filteredTodos);
      })
      .finally(() => setLoading(false));
  }, [category, filtered]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selected={category}
                onSelected={setCategory}
                filter={filtered}
                onFilter={setFiltered}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todoList}
                onSelectedTodo={setSelectedTodo}
                selectTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onTodo={setSelectedTodo} />
      )}
    </>
  );
};
