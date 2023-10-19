type Props = {
  errorMessage: string,
};

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <article className="message is-danger">
      <div className="message-body">
        {errorMessage}
      </div>
    </article>
  );
};
