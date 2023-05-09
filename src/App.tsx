/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { PrepaparedTodo } from './types/PreparedTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<PrepaparedTodo | null>(null);
  const [todoModal, setTodoModal] = useState(false);
  //  const [selectedTodosName, setSelecetedTodosName] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, [JSON.stringify(getTodos())]);

  const filteredTodos = todos.filter(todo => {
    const filtered = todo.title.toLowerCase().includes(query.toLowerCase().trim());

    switch (sort) {
      case 'active':
        return filtered && !todo.completed;
      case 'completed':
        return filtered && todo.completed;
      default:
        return filtered;
    }
  });

  const visibleTodos = useMemo(
    () => filteredTodos,
    [JSON.stringify(filteredTodos)],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                sort={sort}
                setSort={setSort}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visibleTodos}
                setTodo={setSelectedTodo}
                todoModal={todoModal}
                setTodoModal={setTodoModal}
              />
            </div>
          </div>
        </div>
      </div>
      {
        todoModal && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            setTodoModal={setTodoModal}
          />
        )
      }
    </>
  );
};
