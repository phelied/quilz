import styled from 'styled-components';

const ErrorMessage = ({ message }) => {
  return (
    <Message>
      <p>{message}</p>
    </Message>
  );
};

export default ErrorMessage;


const Message = styled.div`
  color: red;
  padding:  1px 10px;
  width: 58%;
  border-radius: 10px;
  margin: 0 10px;
  background-color : #FBC6C2;
  
  & p {
    margin: 10px 0;
  }
`;
