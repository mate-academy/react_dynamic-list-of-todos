import { Loader } from '../Loader';

type Props = {
  message: string
  onReload: (val: Date) => void
  setErrorMessage: (val: string) => void
};

export const ErrorMessage: React.FC<Props> = ({
  message,
  onReload,
  setErrorMessage,
}) => {
  return (
    <div>
      <p>{message}</p>
      <span className="" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          onClick={() => {
            onReload(new Date());
            setErrorMessage('');
          }}
        >
          Reload
        </button>
      </span>
      <Loader />
    </div>
  );
};
