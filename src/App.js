import { useCallback, useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/doge1.png", matched: false},
  {"src": "/img/doge2.png", matched: false},
  {"src": "/img/doge3.png", matched: false},
  {"src": "/img/doge4.png", matched: false},
  {"src": "/img/doge5.png", matched: false},
  {"src": "/img/doge6.png", matched: false}  
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random()-0.5)
      .map((card)=>({ ...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare selected cards
  useEffect(()=>{
    if (choiceOne && choiceTwo){
      setDisabled(true);

      if (choiceOne.src===choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        
      } else {
        

      }
      setTimeout(()=>{resetTurn();},1000);
      
    }
  },[choiceOne,choiceTwo])

  console.log(cards);

  const resetTurn = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //start game automatically
  useEffect(()=>{
    shuffleCards();
  },[])

  // Once there's 2 choices, compare for match using src. Must only fire if choice1 & choice2 not null and log match or not match. 
  // Finally after comparison, reset choices back to null and add one to current turns regardless of match



  return (
    <div className="App">
      <h1>Doge Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card=>(
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
