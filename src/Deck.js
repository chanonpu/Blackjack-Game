import React from 'react';

function Deck(props) {
    const buttonStyle = {
        marginRight: '10px'
    };

    return (
        <div className="row">
            <br/>
            {props.start ? 
            // Show when game starts
            <>
                <button onClick={props.onHit} className="col btn btn-primary" style={buttonStyle}>Hit</button>
                <button onClick={props.onStand} className="col btn btn-success" style={buttonStyle}>Stand</button>
                <button onClick={props.onReset} className="col-2 btn btn-danger">Reset</button>
            </> 
            : 
            // Show when reset
            <button onClick={props.startGame} className="btn btn-primary">Start Game</button>}
        </div>
    );
}

export default Deck;
