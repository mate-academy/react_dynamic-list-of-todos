/* eslint-disable max-len */
import React, {
  useContext,
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
import { getAllTodos } from './api';
import { StateContext } from './components/Store';
import { TodosType } from './types/TodosType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todosType, setTodosType] = useState(TodosType.All);
  const { selectedTodo } = useContext(StateContext);
  const [query, setQuery] = useState('');
  const visibleTodos = useMemo(() => {
    switch (todosType) {
      case TodosType.Active:
        return todos.filter(todo => !todo.completed);
      case TodosType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, todosType]);

  useEffect(() => {
    getAllTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [todos]);

  const filteredTodos: Todo[] = useMemo(() => {
    return visibleTodos.filter(todo => todo.title.includes(query));
  }, [query, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setType={setTodosType}
                setAppliedQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              {!loading && (<TodoList todos={filteredTodos} />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
