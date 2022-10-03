import { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function isIncludesTitle(title: string, query: string) {
  return title.toLowerCase().includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('All');
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);

  const downloadData = async () => {
    const get = await getTodos();

    setTodos(get);
  };

  useEffect(() => {
    downloadData();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case 'active':
        return (todos.filter(({ title, completed }) => (
          !completed && isIncludesTitle(title, query))));
      case 'completed':
        return (todos.filter(({ title, completed }) => (
          completed && isIncludesTitle(title, query))));
      default:
        return (todos.filter(({ title }) => isIncludesTitle(title, query)));
    }
  }, [filterBy, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                !todos.length ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    todoId={todoId}
                    setTodoId={setTodoId}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {todoId && (
        <TodoModal
          todos={visibleTodos}
          todoId={todoId}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
