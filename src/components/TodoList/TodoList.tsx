import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectTodo: any;
  // handleClick():any;
  // getTodos():any;
};

export const TodoList: React.FC<Props> = ({ todos, selectTodo }) => {
  // const completedTodo = todos.filter((el: Todo) => el.completed);
  // const completedTodo = todos.filter((el: Todo) => el.completed === true);
  // const notCompletedTodo = todos.filter((el: Todo) => !el.completed);
  // const notCompletedTodo = todos.filter((el: Todo) => el.completed === false);

  // console.log(completedTodo)
  // console.log(notCompletedTodo)

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
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  {todo.completed ? (
                    <p className="has-text-success">{todo.title}</p>
                  ) : (
                    <p className="has-text-danger">{todo.title}</p>
                  )}
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
