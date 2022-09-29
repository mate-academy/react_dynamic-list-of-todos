import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setLoading(false);
        setTodos(todosFromServer);
      });
  }, []);

  const selectrdTodos = todos.filter((todo) => {
    switch (filterBy) {
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

  const filteredTodos = selectrdTodos.filter(({ title }) => (
    title.toLowerCase().includes(query.toLowerCase())
  ));

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
                setQuery={(prevQuery) => {
                  setQuery(prevQuery);
                }}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    setSelectedTodoId={setSelectedTodoId}
                    setSelectedUserId={setSelectedUserId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId
        && (
          <TodoModal
            selectedTodoId={selectedTodoId}
            setSelectedTodoId={setSelectedTodoId}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            todos={todos}
          />
        )}

    </>
  );
};
