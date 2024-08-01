import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
  selectOption: string;
};

export const TodoList: React.FC<Props> = ({ todos, selectOption }) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (selectOption) {
      case 'All':
        setFilteredTodos(todos);
        break;

      case 'Active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      case 'Completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }, [selectOption, todos]);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
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
          {filteredTodos.map(todo => (
            <tr data-cy="todo" className="" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span className="icon">
                  <i className={`fas ${todo.completed ? 'fa-check' : ''}`} />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={`${
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }`}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodoId(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodoId === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal
          userId={selectedTodo.userId}
          onClose={() => setSelectedTodoId(null)}
          text={selectedTodo.title}
          completed={selectedTodo.completed}
        />
      )}
    </>
  );
};
