import {
  FC,
  useCallback,
  useEffect,
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
import { SelectOptions } from './types/SelectOptions';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption]
    = useState(SelectOptions.All);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const handleSelectTodo = useCallback((id: number) => {
    setSelectedTodoId(id);
  }, []);

  const handleUnselectTodo = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const getTodosFromServer = useCallback(async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setIsTodosLoaded(true);
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    setVisibleTodos(todos.filter(({ title }) => {
      const normalizedQuery = query.toLowerCase();
      const normalizedTitle = title.toLowerCase();
      const includedInTitle = normalizedTitle.includes(normalizedQuery);

      return includedInTitle;
    })
      .filter((todo => {
        switch (selectedOption) {
          case SelectOptions.Active:
            return !todo.completed;
          case SelectOptions.Completed:
            return todo.completed;
          default:
            return todo;
        }
      })));
  }, [selectedOption, query, todos]);

  const selectedTodo = todos.find(({ id }) => id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!isTodosLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    handleSelectTodo={handleSelectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleUnselectTodo={handleUnselectTodo}
        />
      )}
    </>
  );
};
