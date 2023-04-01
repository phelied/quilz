import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/API";
import CardItem from "../components/cardItem";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Quiz1 from "../assets/images/carrousel/quiz1.jpeg";
import Quiz2 from "../assets/images/carrousel/quiz2.jpeg";
import Quiz3 from "../assets/images/carrousel/quiz3.jpeg";

const Home = () => {
    const [subjectquizzes, setSubjectQuizzes] = useState([]);


    useEffect(() => {
        API.getListQuizzes().then((res) => {
            setSubjectQuizzes(res.data.quizzes);
        });
    }, []);

    return (
        <Wrapper>
            <Carousel showArrows={false} showStatus={false} showThumbs={false} autoPlay={true}>
                <div>
                    <img src={Quiz1} alt='carrousel' />
                </div>
                <div>
                    <img src={Quiz2} alt='carrousel' />
                </div>
                <div>
                    <img src={Quiz3} alt='carrousel' />
                </div>
            </Carousel>
            <Title>
                <span>Quiz</span>
                <span>general knowledge</span>
            </Title>
            <div className="egg"></div>
            <List>
                {subjectquizzes && subjectquizzes.length !== 0 && (subjectquizzes.map((quiz) => (
                    <CardItem quiz={quiz} key={quiz.id} />
                )))}
            </List>
        </Wrapper>
    );
};

const Wrapper = styled.main`
  padding: 20px;
  position: relative;
  margin: 0 1.5rem;

  & .carousel-root {
    width: 100%;
    border-radius: 10px;
    margin: 1rem auto;
  }

  & .carousel {
border-radius: 10px;
border: 2px solid black
  }

  .egg {
    position: absolute;
    width: 48%;
    height: 29%;
    top: 54%;
    right: 52%;
    background-color: #ca451a;
    border-radius: 17% 83% 80% 20% / 30% 72% 28% 70% ;
    }
`;

const Title = styled.h2`
  color: #000;
  margin: 5rem 0;
  font-weight: 900;
  z-index: 9999;
  position: relative;

  span {
    display: block;
    color: #fff;
    font-size: 1.5rem;
  }

    span:last-child {
        color: #f9b7a1;
        font-size: 2.5rem;
    }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 4rem 0;
  z-index: 9999;
`;

export default Home;
