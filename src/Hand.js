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
            </div>
        </div>
    );
}

export default Hand;