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
  background-color: #ffe2e2;
  color: #ff4b4b;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
