import styled from 'styled-components';
import errorImage from '../assets/error.svg';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 100;
`;

type Props = {
  error: string;
};

export const ErrorModal = ({ error }: Props) => {
  return (
    <StyledDiv>
      <img src={errorImage} alt="Error" style={{ height: '200px' }} />

      <h1 className="title">Whooops!</h1>

      <strong>Something went wrong!</strong>

      <small>
        Error message:
        {' '}
        {error}
      </small>
    </StyledDiv>
  );
};
