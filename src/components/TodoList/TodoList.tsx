import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
  selectOption: string;
  inputText: string;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectOption,
  inputText,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    let newFilteredTodos = todos;

    switch (selectOption) {
      case 'all':
        newFilteredTodos = todos;
        break;

      case 'active':
        newFilteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        newFilteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        newFilteredTodos = todos;
        break;
    }

    if (inputText.length > 0) {
      newFilteredTodos = newFilteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(inputText.toLowerCase()),
      );
    }

    setFilteredTodos(newFilteredTodos);
  }, [selectOption, todos, inputText]);

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
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className={`fas ${todo.completed ? 'fa-check' : ''}`} />
                  </span>
                )}
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
                  onClick={() => setSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
          id={selectedTodo.id}
          onClose={() => setSelectedTodo(null)}
          text={selectedTodo.title}
          completed={selectedTodo.completed}
        />
      )}
    </>
  );
};
