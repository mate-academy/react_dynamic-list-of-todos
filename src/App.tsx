import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './types';
import { debounce } from './helpers/wrappers';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    getTodos().then(loadedTodos => setTodos(loadedTodos));
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const clear = () => {
    setSelectedUserId(0);
  };

  const getFiltredTodos = () => {
    return todos.filter(todo => {
      switch (selectedStatus) {
        case 'completed':
          return todo.title.toLowerCase().startsWith(appliedQuery)
            && todo.completed;
        case 'active':
          return todo.title.toLowerCase().startsWith(appliedQuery)
            && !todo.completed;
        default:
          return todo.title.toLowerCase().startsWith(appliedQuery);
      }
    });
  };

  const shuffleTodos = useCallback(() => {
    const shuffled = [...todos];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const currTodo = shuffled[i];
      const randomIndex = Math.floor(Math.random() * (i + 1));

      shuffled[i] = shuffled[randomIndex];
      shuffled[randomIndex] = currTodo;
    }

    setTodos(shuffled);
  }, [todos]);

  const filtredTodos = useMemo(
    getFiltredTodos,
    [appliedQuery, selectedStatus, todos],
  );

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={filtredTodos}
          selectUser={selectUser}
          selectedUser={selectedUserId}
          changeQuery={applyQuery}
          changeSelectedStatus={handleSelect}
          randomizeTodos={shuffleTodos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} clearUser={clear} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
