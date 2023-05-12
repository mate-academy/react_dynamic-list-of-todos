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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event !== 'string') {
      setQuery(event.target.value);
    }
  }, []);

  const handleClearInput = useCallback(() => setQuery(''), []);

  const handleSelectingTodo = useCallback((inputedTodo: Todo) => {
    setSelectedTodo(inputedTodo);
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
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
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={vissibleTodos}
                    selectedTodoId={selectedTodo?.id}
                    onSelectTodo={handleSelectingTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
