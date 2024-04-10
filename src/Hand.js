import React from 'react';
import Card from './Card';

function Hand(props) {
    return (
        <div class="card">
            <div class="card-body">
            {props.hand.map((card, index) => (
                <Card
                    index={index}
                    code={card.code}
                    image={card.image}
                    value={card.value}
                    suit={card.suit}
                />
            ))}
            {props.dealer && props.gameState === 'start' ? <Card
                    index= {-1}
                    code={'back'}
                    image={'https://deckofcardsapi.com/static/img/back.png'}
                    value={0}
                    suit={0}
                /> : null} 
            </div>
        </div>
    );
}

export default Hand;