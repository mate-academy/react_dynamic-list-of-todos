import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [areUsersLoaded, setLoadingStatus] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setLoadingStatus(true);
      });
  }, []);

  const handleClean = useCallback(() => {
    setQuery('');
  }, []);

  const handleTodoSelect = useCallback((id: number) => {
    // const newSelectedTodo = todosFromServer
    //   .find(todo => todo.id === id) || null;

    setSelectedTodo(id);
  }, [todosFromServer]);

  const getSelectedTodo = (id: number) => (
    todosFromServer.find(todo => todo.id === id) || null
  );

  const handleTodoClose = useCallback(() => {
    setSelectedTodo(0);
  }, []);

  const visibleTodos = useMemo(() => (
    todosFromServer.filter(todo => {
      const condition1 = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (filterType) {
        case 'all':
          return condition1;
        case 'active':
          return condition1 && !todo.completed;
        case 'completed':
          return condition1 && todo.completed;
        default:
          return true;
      }
    })
  ), [todosFromServer, filterType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                query={query}
                onFilter={setFilterType}
                onSearch={setQuery}
                onClean={handleClean}
              />
            </div>

            <div className="block">
              {
                areUsersLoaded
                  ? (
                    <TodoList
                      todos={visibleTodos}
                      onSelect={handleTodoSelect}
                      selectedId={selectedTodo}
                    />
                  )
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={getSelectedTodo(selectedTodo)}
          onClose={handleTodoClose}
        />
      )}
    </>
  );
};
