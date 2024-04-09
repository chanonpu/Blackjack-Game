import React, { useState, useEffect } from 'react';
import Deck from  './Deck.js';
import Player from  './Player.js';
import Hand from  './Hand.js';

const Game = () => {
    const [playerHand, setPlayerHand] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerAceCount, setPlayerAceCount] = useState(0);
    const [dealerHand, setDealerHand] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerAceCount, setDealerAceCount] = useState(0);
    const [gameResult, setGameResult] = useState('');
    const [deckId, setDeckId] = useState('');
    const [remaining, setRemaining] = useState(0);
    const [start,setStart] = useState(false);

    //fetch the deck from api to get deckid
    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(data => {
                setDeckId(data.deck_id);
                setRemaining(data.remaining);
            })
            .catch(console.log);
    }, []);

    const startGame = () => {
        resetGame();
        setDealerAceCount(0);
        // Return cards to deck and shuffle
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            .catch(console.log);
        // Draw 2 cards each for player and dealer
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
                setPlayerHand([data.cards[0], data.cards[2]]);
                setScore(false,data.cards[0].value,data.cards[2].value)
                setDealerHand([data.cards[1], data.cards[3]]);
                setScore(true,data.cards[1].value,data.cards[3].value)
                setRemaining(data.remaining);
                setStart(true);
                setGameResult(''); // reset game result
            })
            .catch(console.log);
    };

    const resetGame = () => {
        //empty hand
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerScore(0);
        setPlayerAceCount(0);
        setDealerScore(0);
        setGameResult('');
        setStart(false);
    };

    const onHit = () => {
        //draw 1 card to player hand
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then((data) => {
            setRemaining(data.remaining);
            setPlayerHand([...playerHand,data.cards[0]])
            setScore(false,data.cards[0].value)
        })
        .catch(console.log);
        if(playerScore>21) {
            calculateResult();
        }
    };

    const setScore = (dealer, ...score) => {
        let sum = dealer ? dealerScore: playerScore;
        let ace = dealer ? dealerAceCount: playerAceCount;
        for(let val of score) {
            if(val === 'ACE') {
                sum += 11;
                ace++;
           } else if (["JACK","QUEEN","KING"].includes(val)) {
                sum +=10;
           } else {
                sum += parseInt(val);
           }
        }
        while(sum>21 && ace>0) {
            sum -= 10;
            ace--;
        }
        dealer ? setDealerScore(sum) : setPlayerScore(sum);
        dealer ? setDealerAceCount(ace) :setPlayerAceCount(ace);
    };

    const onStand =() => {
        //draw card to dealer if dealer score < 17
        if(dealerScore<17) {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then((data) => {
                setRemaining(data.remaining);
                setDealerHand([...dealerHand,data.cards[0]])
                setScore(true,data.cards[0].value)
            })
            .catch(console.log);
        }
        calculateResult();
    };

    const calculateResult = () => {
        let result;

        if (playerScore>21) {
            result = (
                <div className="alert alert-danger">
                    <p className="h4">Busted</p>
                </div>
            );
        } else if (dealerScore < playerScore || dealerScore > 21) {
            result = (
                <div className="alert alert-success">
                    <p className="h4">You Win</p>
                </div>
            );
        } else if (dealerScore === playerScore) {
            result = (
                <div className="alert alert-warning">
                    <p className="h4">Tie</p>
                </div>
            );
        } else {
            result = (
                <div className="alert alert-danger">
                    <p className="h4">You Lose</p>
                </div>
            );
        }
    
        setGameResult(result);
    };

    return (
        <div className='container'>
          <p class="h2">Welcome to our project</p>
          <div className='row'>
            <div className='col'>
              <Player name='Dealer' score={dealerScore} dealer={true}>
                <Hand hand={dealerHand} />
              </Player>
            </div>
          </div>
          
          {/* Show result when game end */}

          {gameResult && (
                <p>{gameResult}</p>
          )}

          <div className='row'>
            <div className='col'>
              <Player name='Player' score={playerScore} dealer={false}>
                <Hand hand={playerHand} />
              </Player>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <Deck
                startGame={startGame}
                remaining={remaining}
                onHit={onHit}
                onStand={onStand}
                onReset={resetGame}
                start={start}
              />
            </div>
          </div>
        </div>
      );
};


export default Game;