import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/API";
import { useParams } from 'react-router-dom';

const Quiz = () => {
    const [listQuestions, setListQuestions] = useState([]);
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');


    useEffect(() => {
        API.getQuizById(id, token).then((res) => {
            setListQuestions(res.data);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (listQuestions && listQuestions.length !== 0) {
            setQuestion(listQuestions.questions[activeQuestion].question);
            setChoices(listQuestions.questions[activeQuestion].answers);
            setCorrectAnswer(listQuestions.questions[activeQuestion].correctAnswer);
        }
    }, [listQuestions, activeQuestion]);

    const onClickNext = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        );
        if (activeQuestion !== listQuestions.questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setActiveQuestion(0);
            setShowResult(true);
            API.dispatchResult(id, token, result);
            console.log(result)
        }
    };

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index);
        if (answer === correctAnswer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }
    };

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

    return (
        <Wrapper className="quiz-container">
            {!showResult && listQuestions && listQuestions.length !== 0 ? (
                <div>
                    <div>
                        <span className="active-question-no">
                            {addLeadingZero(activeQuestion + 1)}
                        </span>
                        <span className="total-question">
                            /{addLeadingZero(listQuestions.questions.length)}
                        </span>
                    </div>
                    <h2>{question}</h2>
                    <ul>
                        {choices.map((answer, index) => (
                            <li
                                onClick={() => onAnswerSelected(answer, index)}
                                key={answer}
                                className={
                                    selectedAnswerIndex === index ? 'selected-answer' : null
                                }>
                                {answer}
                            </li>
                        ))}
                    </ul>
                    <div className="flex-right">
                        <button
                            onClick={onClickNext}
                            disabled={selectedAnswerIndex === null}>
                            {activeQuestion === listQuestions.questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="result">
                    <h3>Result</h3>
                    <p>
                        Total Score:<span> {result.score}</span>
                    </p>
                    <p>
                        Correct Answers:<span> {result.correctAnswers}</span>
                    </p>
                    <p>
                        Wrong Answers:<span> {result.wrongAnswers}</span>
                    </p>
                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
max-width: 500px;
min-width: 250px;
background: #ffffff;
border-radius: 4px;
margin-top: 100px;
padding: 30px 60px;

& .active-question-no {
    font-size: 32px;
    font-weight: 500;
    color: #800080;
  }
  
  & .total-question {
    font-size: 16px;
    font-weight: 500;
    color: #e0dee3;
  }
  
  & h2 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  
  & ul {
    margin-top: 20px;
    margin-left: -40px;
  }
  
  & ul li {
    text-decoration: none;
    list-style: none;
    color: #2d264b;
    font-size: 16px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 16px;
    padding: 11px;
    margin-top: 15px;
    cursor: pointer;
  }
  
  & ul .selected-answer {
    background: #ffd6ff;
    border: 1px solid #800080;
  }
  
  & button {
    background: linear-gradient(90.04deg, #800080 0.03%, #ffc0cb 99.96%);
    border-radius: 9px;
    font-size: 18px;
    color: #ffffff;
    padding: 10px 42px;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 15px;
  }
  
  & button:disabled {
    background: #e7e8e9;
    color: #9fa3a9;
    cursor: not-allowed;
  }
  
  & .flex-right {
    display: flex;
    justify-content: flex-end;
  }
  
 & .result h3 {
    font-size: 24px;
    letter-spacing: 1.4px;
    text-align: center;
  }
  
 & .result p {
    font-size: 16px;
    font-weight: 500;
  }
  
 & .result p span {
    color: #800080;
    font-size: 22px;
  }
`;

export default Quiz;