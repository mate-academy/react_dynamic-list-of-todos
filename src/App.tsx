import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, isContains, emptyTodo } from './api';
import { Todo } from './types/Todo';

enum SelectValue {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(emptyTodo);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  async function loadTodos() {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const getVisibleTodos = () => {
    let visibleTodos = todos.filter(todo => isContains(todo.title, query));

    switch (selectValue) {
      case SelectValue.Active:
        visibleTodos = visibleTodos.filter(todo => (
          todo.completed === false
        ));
        break;

      case SelectValue.Completed:
        visibleTodos = visibleTodos.filter(todo => (
          todo.completed === true
        ));
        break;

      default:
        break;
    }

    return visibleTodos;
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [query, selectValue, todos],
  );

  const handleShowTodoModal = (todoId: string | undefined) => {
    const selectedTodoId = Number(todoId);
    const selectTodo = todos.find(todo => todo.id === selectedTodoId) as Todo;

    setSelectedTodo(selectTodo);
    setShowTodoModal(true);
  };

  const closeTodoModal = useCallback(() => {
    setShowTodoModal(false);
    setSelectedTodo(emptyTodo);
  }, []);

  const handleQuery = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleSelectValue = useCallback((value) => {
    setSelectValue(value);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={handleQuery}
                selectValue={selectValue}
                setSelectValue={handleSelectValue}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onHandleShowTodoModal={handleShowTodoModal}
                  selectedTodoId={selectedTodo.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showTodoModal && (
        <TodoModal
          todo={selectedTodo}
          onCloseTodoModal={closeTodoModal}
        />
      )}
    </>
  );
};
