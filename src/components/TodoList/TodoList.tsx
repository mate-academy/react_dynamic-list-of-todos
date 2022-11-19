import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: any;
  // handleClick():any;
  // getTodos():any;
};

export const TodoList: React.FC<Props> = ({ todos, selectTodo }) => {
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
          {todos.map(
            todo => (
              <tr data-cy="todo" className="">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered" />
                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">{todo.title}</p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    // onClick={() => handleClick()}
                    onClick={() => {
                      selectTodo(todo.id);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
};

// const [loaderState, setLoaderState] = useState(false);
// const handleClick = () => {
//   getTodos()
//     .then(todos => {
//       return todos;
//     });

//   setLoaderState(true);
// };
