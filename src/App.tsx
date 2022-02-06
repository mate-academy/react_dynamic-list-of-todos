import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, deleteTodo, addTodo } from './api/todos';

function debounce(f: (...args: any[]) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
}

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [queryForFilter, setQueryForFilter] = useState('');

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  const addNewTodo = async () => {
    const date = new Date();

    const title = `TODO - ${date.toLocaleTimeString()}`;

    await addTodo(
      title,
      3,
      Math.random() > 0.5,
    );

    loadTodos();
  };

  const deleteSelectedTodo = useCallback(async (todoId: number) => {
    await deleteTodo(todoId);
    await loadTodos();
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => todo.title.includes(queryForFilter))
  ), [queryForFilter, todos]);

  const setQueryForFilterWithDebounce = useCallback(
    debounce(setQueryForFilter, 1000),
    [],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <button
          type="button"
          onClick={addNewTodo}
        >
          Add New Todo
        </button>

        <input
          type="text"
          value={query}
          onChange={({ target }) => {
            setQueryForFilterWithDebounce(target.value);
            setQuery(target.value);
          }}
        />
        <TodoList
          todos={filteredTodos}
          setUserId={setSelectedUserId}
          deleteTodo={deleteSelectedTodo}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
