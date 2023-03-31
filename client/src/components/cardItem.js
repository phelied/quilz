import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const CardItem = ({ quiz }) => {

  const navigate = useNavigate();

  const handleQuizClick = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <ListItem onClick={() => handleQuizClick(quiz.id)}>
      <div>
        <h5>{quiz.topic}</h5>
        <h6>{quiz.level}</h6>
      </div>
      <span>{quiz.totalQuestions}</span>
    </ListItem>
  );
};

const ListItem = styled.li`
  list-style: none;
  z-index: 9999;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  display: flex;
  background-color: #f8f8f8;
  justify-content: space-between;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;

  & h5 {
    margin: 0;
    font-size: 1rem;
  }

  & div {
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-around;
  }

  & h6 {
    font-size: O.5rem;
    margin: 0;
    font-weight: 500;
    color: #818181;
  }

  & span {
    align-self: flex-end;
  }
`;

export default CardItem;