import React from 'react';

function Deck(props) {
    let buttonContent;
    switch (props.gameState) {
        case 'init': // Show when init
            buttonContent = (
                <button onClick={() => {
                    props.startGame();
                    props.setGameState('start')
                }} className="btn btn-primary mx-auto w-75">Start Game</button>
            );
            break;
        case 'start': // Show when game starts
            buttonContent = (
                <>
                    <button onClick={() =>props.onHit()} className="col btn btn-primary m-1">Hit</button>
                    <button onClick={() => {
                        props.onStand();
                        props.setGameState('dealer')
                    }} className="col btn btn-success m-1">Stand</button>
                    <button onClick={() => {
                        props.onReset();
                        props.setGameState('init')
                    }} className="col-2 btn btn-danger m-1">Reset</button>
                </>
            );
            break;
        case 'dealer': // Show when it dealer turn
            buttonContent = (
                <button onClick={props.dealerDraw} className="btn btn-warning mx-auto w-75">Continue</button>
            );
            break;
        case 'end': //Show when game end
        default:
            buttonContent = (
                <button onClick={() => {
                    props.onReset();
                    props.setGameState('init')
                }} className="btn btn-primary mx-auto w-75">Play again</button>
            );
            break;
    }

    return (
        <div className="row">
            <br />
            {buttonContent}
        </div>
    );
}

export default Deck;
