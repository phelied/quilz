import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";

const Home = () => {
    const [subjectquizzes, setSubjectQuizzes] = useState([]);
    const navigate = useNavigate();

    const handleQuizClick = (id) => {
        navigate(`/quiz/${id}`);
    };

    useEffect(() => {
        API.getListQuizzes().then((res) => {
            setSubjectQuizzes(res.data.quizzes);
        });
    }, []);

    return (
        <Wrapper>
            <Title>Quiz disponibles</Title>
            <List>
                {console.log(subjectquizzes)}
                {subjectquizzes && subjectquizzes.length !== 0 && (subjectquizzes.map((quiz) => (
                    <ListItem key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
                        {quiz.title}
                    </ListItem>
                )))}
            </List>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  background-color: #ffaa7f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #9c3c3c;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  color: #fff;
  font-size: 1.2em;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateX(5px);
  }
`;

export default Home;
