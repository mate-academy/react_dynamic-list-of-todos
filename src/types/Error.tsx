import { Todo } from './Todo';

type Props = {
  todos: Todo[],
  errorMessage: boolean,
};

export const ErrorApp: React.FC<Props> = ({
  todos,
  errorMessage,
}) => {
  return (
    <>
      {(todos.length === 0 && errorMessage) && (
        <div className="notification is-danger has-text-centered">
          <h2 className="title is-1 has-text-black">
            This request unfortunately failed
          </h2>
          <p className="title is-5 has-text-black">
            We couldn&apos;t find your spec,
            <br />
            But we found other things instead!
            Like change in the couch cushion
            and a monster under the bed
          </p>
        </div>
      )}
    </>
  );
};
