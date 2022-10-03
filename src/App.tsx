import {
  FC,
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [completeStatus, setCompleteStatus] = useState('all');
  const [query, setQuery] = useState('');

  async function loadTodos() {
    setIsLoading(true);

    try {
      const response = await getTodos();

      setTodos(response);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => (todos.filter(todo => {
    const compareTitle = todo.title.toLowerCase()
      .includes(query.toLowerCase());

    switch (completeStatus) {
      case 'active':
        return !todo.completed && compareTitle;
      case 'completed':
        return todo.completed && compareTitle;
      default:
        return compareTitle;
    }
  })), [todos, completeStatus, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completeStatus={completeStatus}
                setCompleteStatus={setCompleteStatus}
                filterText={query}
                setFilterText={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={todoId}
                    selectTodo={setTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId && (
        <TodoModal
          todos={visibleTodos}
          todoId={todoId}
          selectTodo={setTodoId}
        />
      )}
    </>
  );
};
