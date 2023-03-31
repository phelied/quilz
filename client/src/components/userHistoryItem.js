import styled from 'styled-components';

const UserHistoryItem = ({ user }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  }


  return (
    <Card key={user.date}>
      <div className="topic-card">
        {user.topic}
      </div>
      <div className="add-cart">Add to Cart</div>
      <div className="info-card">
        <p><strong>{user.topic}</strong></p>
        <p>score: {user.score}</p>
        <p>{formatDate(user.date)}</p>
      </div>

    </Card>
  );
};

const Card = styled.div`
    position: relative;
    width: 190px;
    height: 254px;
    background: #fff;
    border: solid 4px #333;
    box-shadow: -5px 5px #333;
    transition: all .2s ease-in-out;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: 0 0.75rem;
  
 &:hover {
    margin: 10px 10px 0 0;
    box-shadow: 0px 0px #333;
  }
  
  & .topic-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter .2s 1s ease-in-out;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  &:hover .topic-card {
    filter: blur(1px);
  }
  
 & .add-cart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 250px;
    font-weight: bold;
    font-size: 19px;
    opacity: 0;
  }
  
  &:hover .add-cart {
    opacity: 1;
    transition: opacity .3s 1s ease-in-out;
  }
  
& .info-card {
    position: absolute;
    height: 80px;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: solid 1px #333;
  }
  
 & .info-card p {
    font-size: 14px;
    margin: 5px;
  }
  
  
`;

export default UserHistoryItem;