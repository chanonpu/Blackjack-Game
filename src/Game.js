import React, { useState, useEffect } from 'react';
import Deck from './Deck.js';
import Player from './Player.js';
import Hand from './Hand.js';

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
    const [gameState, setGameState] = useState('init');

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
                setScore(false, data.cards[0].value, data.cards[2].value)
                setDealerHand([data.cards[1], data.cards[3]]);
                setScore(true, data.cards[1].value, data.cards[3].value)
                setRemaining(data.remaining);
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
        setDealerAceCount(0);
        setGameResult('');
    };

    const onHit = () => {
        //draw 1 card to player hand
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then((data) => {
                setRemaining(data.remaining);
                setPlayerHand([...playerHand, data.cards[0]])
                setScore(false, data.cards[0].value)
            })
            .catch(console.log);
    };

    //check busted after each hit
    useEffect(() => {
        if (playerScore > 21) {
            calculateResult();
        }
    }, [playerScore]);

    const setScore = (dealer, ...score) => {
        let sum = dealer ? dealerScore : playerScore;
        let ace = dealer ? dealerAceCount : playerAceCount;
        for (let val of score) {
            if (val === 'ACE') {
                sum += 11;
                ace++;
            } else if (["JACK", "QUEEN", "KING"].includes(val)) {
                sum += 10;
            } else {
                sum += parseInt(val);
            }
        }
        while (sum > 21 && ace > 0) {
            sum -= 10;
            ace--;
        }
        dealer ? setDealerScore(sum) : setPlayerScore(sum);
        dealer ? setDealerAceCount(ace) : setPlayerAceCount(ace);
    };

    const onStand = () => {
        //will implement show dealer face down card
    };

    const dealerDraw = () => {
        //draw card to dealer if dealer score < 17
        if (dealerScore < 17) {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(res => res.json())
                .then((data) => {
                    setRemaining(data.remaining);
                    setDealerHand([...dealerHand, data.cards[0]])
                    setScore(true, data.cards[0].value)
                })
                .catch(console.log);
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        let result;

        if (playerScore > 21) {
            result = (
                <div className="alert alert-danger">
                    <p className="h4 text-center">Busted</p>
                </div>
            );
        } else if (dealerScore < playerScore || dealerScore > 21) {
            result = (
                <div className="alert alert-success">
                    <p className="h4 text-center">You Win</p>
                </div>
            );
        } else if (dealerScore === playerScore) {
            result = (
                <div className="alert alert-warning">
                    <p className="h4 text-center">Tie</p>
                </div>
            );
        } else {
            result = (
                <div className="alert alert-danger">
                    <p className="h4 text-center">You Lose</p>
                </div>
            );
        }
        setGameState('end');
        setGameResult(result);
    };

    return (
        <div class="container-fluid">
            <p class="h2">Welcome to our project</p>
            <div className='row'>
                <Player name='Dealer' score={dealerScore} dealer={true}>
                    <Hand hand={dealerHand} />
                </Player>
            </div>

            {/* Show result when game end */}

            {gameResult && (
                <p>{gameResult}</p>
            )}

            <div className='row'>
                <Player name='Player' score={playerScore} dealer={false}>
                    <Hand hand={playerHand} />
                </Player>
            </div>
            <div className='row'>
                <Deck
                    startGame={startGame}
                    remaining={remaining}
                    onHit={onHit}
                    onStand={onStand}
                    onReset={resetGame}
                    gameState={gameState}
                    setGameState={setGameState} //state lifting
                    dealerDraw={dealerDraw}
                    calculateResult={calculateResult}
                    playerScore={playerScore}
                />
            </div>
        </div>
    );
};


export default Game;