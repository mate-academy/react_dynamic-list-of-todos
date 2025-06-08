// import React from 'react';
// import { Loader } from '../Loader';

// export const TodoModal: React.FC = () => {
//   return (
//     <div className="modal is-active" data-cy="modal">
//       <div className="modal-background" />

//       {true ? (
//         <Loader />
//       ) : (
//         <div className="modal-card">
//           <header className="modal-card-head">
//             <div
//               className="modal-card-title has-text-weight-medium"
//               data-cy="modal-header"
//             >
//               Todo #2
//             </div>

//             {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//             <button type="button" className="delete" data-cy="modal-close" />
//           </header>

//           <div className="modal-card-body">
//             <p className="block" data-cy="modal-title">
//               quis ut nam facilis et officia qui
//             </p>

//             <p className="block" data-cy="modal-user">
//               {/* <strong className="has-text-success">Done</strong> */}
//               <strong className="has-text-danger">Planned</strong>

//               {' by '}

//               <a href="mailto:Sincere@april.biz">Leanne Graham</a>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: Todo | null;
  user: User | null;
  loadingUser: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  user,
  loadingUser,
  onClose,
}) => {
  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Unknown User'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
