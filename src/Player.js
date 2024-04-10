import React from "react";

export default function Player(props) {
    return (
        <div>
            <p class="h3">{props.name}</p>
            {props.children}
            {/*hide dealer score*/}
            {props.dealer ? null : <p>score: {props.score}</p>} 
        </div>
    )
}