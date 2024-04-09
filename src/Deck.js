import React from 'react';

function Deck(props) {

    return (
        <div className="row">
            <br />
            {props.gameState === 'init' ? (
                // Show when init
                <button onClick={() => {
                    props.startGame();
                    props.setGameState('start')
                }} className="btn btn-primary">Start Game</button>
            ) : props.gameState === 'start' ? (
                // Show when game starts
                <>
                    <button onClick={props.onHit} className="col btn btn-primary m-1">Hit</button>
                    <button onClick={() => {
                        props.onStand();
                        props.setGameState('dealer')
                    }} className="col btn btn-success m-1">Stand</button>
                    <button onClick={() => {
                        props.onReset();
                        props.setGameState('init')
                    }} className="col-2 btn btn-danger m-1">Reset</button>
                </>
            ) : props.gameState === 'dealer' ?  (
                // Show when it dealer turn
                <button onClick={props.dealerDraw} className="btn btn-warning">Continue</button>
            ) : (
                //Show when game end
                <button onClick={() => {
                    props.onReset();
                    props.setGameState('init')
                }} className="btn btn-primary">Play again</button>
            )
            }

        </div>
    );
}

export default Deck;
