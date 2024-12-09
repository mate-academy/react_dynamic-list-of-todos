/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getUser } from './api';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoInfo } from './types/TodoInfo';

export const App: React.FC = () => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodoModal, setIsLoadingTodoModal] = useState(false);
  const [todoInfo, setTodoInfo] = useState<TodoInfo | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value);
  }

  function handleQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleDeleteQuery() {
    setQuery('');
  }

  function handleSelectTodo(id: number) {
    setSelectedTodoId(id);
  }

  function handleCloseTodo() {
    setSelectedTodoId(null);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todosFromServer = (await getTodos()).filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );

        switch (filter) {
          case 'all':
            setTodos(todosFromServer);
            break;
          case 'active':
            const activeFirst = [...todosFromServer].filter(a => !a.completed);

            setTodos(activeFirst);
            break;
          case 'completed':
            const completedFirst = [...todosFromServer].filter(
              a => a.completed,
            );

            setTodos(completedFirst);
            break;
          default:
            break;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [filter, query]);

  useEffect(() => {
    if (selectedTodoId === null) {
      return;
    }

    const fetchUser = async () => {
      setIsLoadingTodoModal(true);
      try {
        const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

        if (selectedTodo?.userId) {
          const userFromServer = await getUser(selectedTodo.userId);

          const user = {
            id: userFromServer.id,
            name: userFromServer.name,
            email: userFromServer.email,
            phone: userFromServer.phone,
          };

          setTodoInfo({ ...selectedTodo, user });
        }
      } finally {
        setIsLoadingTodoModal(false);
      }
    };

    fetchUser();
  }, [selectedTodoId, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleFilter}
                filter={filter}
                query={query}
                onQuery={handleQuery}
                onDeleteQuery={handleDeleteQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todoInfo={todoInfo}
          isLoadingTodoModal={isLoadingTodoModal}
          onCloseTodo={handleCloseTodo}
        />
      )}
    </>
  );
};
