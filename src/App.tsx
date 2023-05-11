/* eslint-disable max-len */
import {
  useEffect,
  useState,
  FC,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { CompletedStatus } from './types/CompletedStatus';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<CompletedStatus>(CompletedStatus.All);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todo, setTodo] = useState<Todo | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event !== 'string') {
      setQuery(event.target.value);
    }
  }, []);

  const handleClearInput = useCallback(() => setQuery(''), []);

  const handleUserInfo = useCallback((inputedTodo: Todo) => {
    setTodo(todo);
    setSelectedTodoId(inputedTodo.id);
  }, []);

  const handleCloseModal = () => {
    setSelectedTodoId(0);
    setTodo(null);
  };

  let vissibleTodos = useMemo(() => todos.filter(todoItem => {
    const lowerQuery = query.toLowerCase().trim();
    const lowerTitle = todoItem.title.toLowerCase();

    return lowerTitle.includes(lowerQuery);
  }), [todos, query]);

  if (selectedStatus !== CompletedStatus.All) {
    vissibleTodos = vissibleTodos.filter(({ completed }) => {
      switch (selectedStatus) {
        case CompletedStatus.Active:
          return !completed;

        case CompletedStatus.Completed:
          return completed;

        default: return null;
      }
    });
  }

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeInput={handleChange}
                query={query}
                onClearInput={handleClearInput}
                selectedOption={selectedStatus}
                onSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={vissibleTodos}
                onSelectTodo={handleUserInfo}
                clickedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={todo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
