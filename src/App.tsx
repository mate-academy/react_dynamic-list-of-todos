/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedValue, setSelect] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const todosLoaded = await getTodos();

      setTodos(todosLoaded);
      setLoading(false);
    })();
  }, []);

  const includesQuery = (text:string) => {
    return text.toLowerCase().includes(query.toLowerCase());
  };

  const visibleTodos = [...todos].filter((todo) => {
    switch (selectedValue) {
      case 'completed':
        return todo.completed && includesQuery(todo.title);
      case 'active':
        return !todo.completed && includesQuery(todo.title);
      default:
        return includesQuery(todo.title);
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedValue={selectedValue}
                onSelection={(option:string) => setSelect(option)}
                query={query}
                onQuery={(text:string) => setQuery(text)}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                selectTodo={(todo:Todo | null) => setSelectedTodo(todo)}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onCloseModal={(todo:Todo | null) => setSelectedTodo(todo)} />}
    </>
  );
};
