import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const CardItem = ({ quiz }) => {

    const navigate = useNavigate();

    const handleQuizClick = (id) => {
        navigate(`/quiz/${id}`);
    };

    return (
        <Card onClick={() => handleQuizClick(quiz.id)} key={quiz.topic} className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <p className="title">{quiz.topic}</p>
                    <p>{ }</p>
                </div>
                <div className="flip-card-back">
                    <p className="title">{quiz.description}</p>
                </div>
            </div>
        </Card>
    );
};

const Card = styled.div`
    background-color: transparent;
    width: 190px;
    height: 254px;
    perspective: 1000px;
    font-family: sans-serif;
    margin-right: 2rem;
  
  & .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }
  
  & .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  
  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  & .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }
  
  & .flip-card-front {
    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
       rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
    color: coral;
  }
  
  & .flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
       bisque 40%, rgb(255, 185, 160) 78%);
    color: white;
    transform: rotateY(180deg);
  }
`;

export default CardItem;