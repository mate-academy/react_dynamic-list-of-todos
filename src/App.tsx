/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [todoId, setTodoId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copiedTodos, setCopiedTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setCopiedTodos(todosFromServer);
      setLoading(true);
    };

    fetchList();
  }, []);

  useEffect(() => {
    const filteredTodos: Todo[] = copiedTodos.filter((todo: Todo) => {
      const smallInput = query.toLowerCase();
      const smallDesc = todo.title.toLowerCase();

      switch (selectedFilter) {
        case 'active':
          return todo.completed === false && smallDesc.includes(smallInput);

        case 'completed':
          return todo.completed === true && smallDesc.includes(smallInput);

        default:
          return smallDesc.includes(smallInput);
      }
    });

    setTodos(filteredTodos);
  }, [selectedFilter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={(select: string) => setSelectedFilter(select)}
                query={query}
                setQuery={(searchText: string) => setQuery(searchText)}
              />
            </div>

            <div className="block">
              {!loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodoId={todoId}
                  setTodoId={(id: number) => setTodoId(id)}
                  setUserId={(id: number) => setUserId(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId > 0 && (
        <TodoModal
          userId={userId}
          setUserId={(id: number) => setUserId(id)}
          todos={todos}
          selectedTodoId={todoId}
          selectTodo={(id: number) => setTodoId(id)}
        />
      )}
    </>
  );
};
