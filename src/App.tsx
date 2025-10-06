/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { ExtendedTodo } from './types/ExtendedTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [select, setSelect] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [extendedTodo, setExtendedTodo] = useState<ExtendedTodo | null>(null);

  useEffect(() => {
    setLoading(true);

    const allTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (e) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    allTodos();
  }, []);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (!selectedTodo) {
        setExtendedTodo(null);

        return;
      }

      try {
        setExtendedTodo(null);
        const user = await getUser(selectedTodo.userId);

        if (!ignore) {
          setExtendedTodo({ ...selectedTodo, user });
        }
      } catch (e) {
        if (!ignore) {
          setExtendedTodo(null);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [selectedTodo]);

  const visibleTodos: Todo[] = useMemo(() => {
    let list = todos;

    switch (select) {
      case 'completed':
        list = list.filter(t => t.completed);
        break;
      case 'active':
        list = list.filter(t => !t.completed);
        break;
    }

    const correctQuery = query.trim().toLowerCase();

    if (correctQuery) {
      list = list.filter(todo =>
        todo.title?.toLowerCase().includes(correctQuery),
      );
    }

    return list;
  }, [todos, select, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectValue={select}
                onSelectChange={setSelect}
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && visibleTodos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onClick={todo =>
                    setSelectedTodo(prev =>
                      prev?.id === todo.id ? null : todo,
                    )
                  }
                  selectedTodo={selectedTodo}
                />
              )}

              {!loading && !error && visibleTodos.length === 0 && (
                <p className="title is-5">There are no todos in the list</p>
              )}

              {error && <p className="notification is-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={extendedTodo} onClose={setSelectedTodo} />
      )}
    </>
  );
};
