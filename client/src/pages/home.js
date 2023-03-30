import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/API";
import CardItem from "../components/cardItem";

const Home = () => {
    const [subjectquizzes, setSubjectQuizzes] = useState([]);


    useEffect(() => {
        API.getListQuizzes().then((res) => {
            setSubjectQuizzes(res.data.quizzes);
        });
    }, []);

    return (
        <Wrapper>
            <Title>Quiz disponibles</Title>
            <List>
                {subjectquizzes && subjectquizzes.length !== 0 && (subjectquizzes.map((quiz) => (
                    <CardItem quiz={quiz} />
                )))}
            </List>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #000;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

export default Home;
