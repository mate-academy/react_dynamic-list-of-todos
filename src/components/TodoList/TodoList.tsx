import React, { useEffect, useState } from 'react';
import { Todo, TodoState } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoModal } from '../TodoModal';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';

type TodoListProps = {
  styleFilter: TodoState;
  inputSearch: string;
};

export const TodoList: React.FC<TodoListProps> = ({
  styleFilter,
  inputSearch,
}) => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [currentUser, setCurrenUser] = useState<User>();
  const [isTodoModal, setTodoModal] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => setTodosList(todos))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleButtonClick = (todo: Todo) => {
    setActiveTodo(todo);
    setTodoModal(true);
    getUser(todo.userId).then(user => setCurrenUser(user));
  };

  const handleCloseModal = () => {
    setTodoModal(false);
    setActiveTodo(null);
  };

  let newTodosList = todosList;

  if (styleFilter === 'active') {
    newTodosList = todosList.filter(todo => todo.completed === false);
  } else if (styleFilter === 'completed') {
    newTodosList = todosList.filter(todo => todo.completed === true);
  }

  newTodosList = newTodosList.filter(todo =>
    todo.title.toLowerCase().includes(inputSearch.toLowerCase()),
  );

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {newTodosList.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              activeTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  handleButtonClick(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={
                      activeTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}

        {isTodoModal && activeTodo !== null && (
          <TodoModal
            user={currentUser}
            todo={activeTodo}
            todoId={activeTodo.id}
            onClose={handleCloseModal}
          />
        )}
      </tbody>
    </table>
  );
};
