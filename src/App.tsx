import React, {
  useEffect, useMemo, useState,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { ListAction } from './components/Enum/ListAction';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<ListAction>(ListAction.ALL);
  const [applyQuery, setApplyQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((setTodos))
      .catch(() => {
        throw new Error('Something Went Wrong. Try Again');
      })
      .finally(() => setLoading(false));
  }, []);

  const searchTodos = useMemo(() => {
    let filteredTodos = [...todos];
    const searchQuery = applyQuery.trim().toLowerCase();

    if (searchQuery) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(searchQuery),
      );
    }

    switch (filter) {
      case ListAction.ACTIVE:
        return filteredTodos.filter(todo => !todo.completed);
      case ListAction.COMPLETED:
        return filteredTodos.filter(todo => todo.completed);
      case ListAction.ALL:
      default:
        return filteredTodos;
    }
  }, [applyQuery, filter, todos]);

  const selectTodo = (todo: Todo) => {
    setActiveTodo(todo);
  };

  const handleCloseTodo = () => {
    setActiveTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setApplyQuery={setApplyQuery}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  searchTodos={searchTodos}
                  activeTodo={activeTodo}
                  selectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          handleCloseTodo={handleCloseTodo}
        />
      )}
    </>
  );
};
