import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/API";
import CardItem from "../components/cardItem";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Quiz1 from "../assets/images/carrousel/quiz1.jpeg";
import Quiz2 from "../assets/images/carrousel/quiz2.jpeg";
import Quiz3 from "../assets/images/carrousel/quiz3.jpeg";
// import InfiniteHorizontalScroll from "../components/InfiniteHorizontalScroll";

const Home = () => {
    const [subjectquizzes, setSubjectQuizzes] = useState([]);

    const data = [
        {
            theme: { backgroundColor: "#ff7747" },
            miniEggTheme: { backgroundColor: "#ffc377", top: "-49%", right: "52%", width: "30%", height: "74%", borderRadius: "42% 58% 54% 46% / 59% 50% 50% 41% " },
            title: "Animal",
        },
        {
            theme: { backgroundColor: "#8f98fd" },
            miniEggTheme: { backgroundColor: "#172b88", top: "-12%", right: "-5%", width: "22%", height: "80%", borderRadius: "100% 10% 10% 85% / 77% 10% 10% 38% " },
            title: "Geography",
        },
        {
            theme: { backgroundColor: "#172b88" },
            miniEggTheme: { backgroundColor: "#8f98fd", top: "40%", right: "91%", width: "12%", height: "40%", borderRadius: "10% 83% 87% 34% / 77% 81% 45% 38% " },
            title: "History",
        },
        {
            theme: { backgroundColor: "#ffc377" },
            miniEggTheme: { backgroundColor: "#ff7747", top: "75%", right: "-4%", width: "31%", height: "40%", borderRadius: "41% 67% 87% 0% / 77% 87% 0% 0% " },
            title: "Science",
        },
    ];

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
            <div>
                <Title className="categories_title">
                    <span>Categories</span>
                </Title>
                <Section className="categories_container">
                    {data.map((item) => (
                        <SectionItem theme={item.theme} key={item.title}>
                            <h5 style={{ overflow: "hidden" }}>
                                <MiniEgg theme={item.miniEggTheme} />
                            </h5>
                            <h3>{item.title}</h3>
                        </SectionItem>
                    ))}
                </Section>
            </div>
            <Section className="popular_container">
                <div>
                    <Title className="popular_title">
                        <span>Popular</span>
                    </Title>
                    <List>
                        {subjectquizzes && subjectquizzes.length !== 0 && (subjectquizzes.map((quiz) => (
                            <CardItem quiz={quiz} key={quiz.id} />
                        )))}
                    </List>
                </div>
            </Section>
            <Section>
                <Side>
                    <p>Get Reward From Doing <span>Quizzes</span></p>
                    <p>Discover how much you know about any topics --</p>
                    <section>
                        <div></div>
                        <div></div>
                    </section>
                </Side>
            </Section>

            {/* <div className="egg"></div> */}
            {/* <InfiniteHorizontalScroll /> */}
            <List>

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
    height: 24rem;
  }

  & .carousel {
border-radius: 10px;
border: 2px solid black;
height: 100%;
  }

  &. .carousel-root > carousel-slider {
    height: 100%;
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

    .slider-wrapper, .slider > li, .slider, .slide > div > img, .slide > div {
        height: 100%;
    }
`;

const Title = styled.h2`
  display : flex;
  color: black;
  margin: 3rem 0 2rem 0;
  font-weight: 900;
  z-index: 9999;
  position: relative;
  align-items: center;
  display: block;
  font-size: 1.75rem;

  &.categories_title {
    margin-right: 0.5rem;
  }

  &.popular_title {
    margin: 0;
  }
`;

const List = styled.ul`
  list-style: none;
  z-index: 9999;
  padding: 0;
  margin-top: 2rem;
`;

const Side = styled.div`
border-radius: 10px; 
-webkit-box-shadow: 12px 14px 24px -1px rgba(0,0,0,0.63); 
box-shadow: 12px 14px 24px -1px rgba(0,0,0,0.63);
`;

const Section = styled.section`
    display: grid;
    flex-wrap: wrap;
    z-index: 1;
    color: black;
    box-sizing: border-box;

    &.categories_container {
        justify-content: center;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 1.5rem;
        grid-row-gap: 1.5rem;
    }

    &.popular_container {
    margin-top: 2rem;
    }

    @media (min-width: 768px) {
        &.categories_container {
            grid-template-columns: repeat(3, 1fr);
        }

        &.popular_container {
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 1.5rem;
            grid-row-gap: 1.5rem;
        }
    }
    `;

const SectionItem = styled.div`
position : relative;
background-color: ${(props) => props.theme.backgroundColor};
overflow: hidden;
width: 100%;
height: 6rem;
border-radius: 10px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
display: flex;
justify-content: center;
align-items: center;
font-size: 1.5rem;
font-weight: 900;
cursor: pointer;
transition: all 0.3s ease-in-out;
color: white;

& .categories_container > div {
    
}

&:hover {
     margin: 0 5px;
    transform: scale(1.1);
}
`;

const MiniEgg = styled.span`
position : absolute;
background-color: ${(props) => props.theme.backgroundColor};
top: ${(props) => props.theme.top};
right: ${(props) => props.theme.right};
width: ${(props) => props.theme.width};
height: ${(props) => props.theme.height};
border-radius: ${(props) => props.theme.borderRadius};
`;

export default Home;
