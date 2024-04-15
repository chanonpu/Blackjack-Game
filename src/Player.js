import React from "react";

export default function Player(props) {
    return (
        <div>
            <p class="h3">{props.name}</p>
            {props.children} 
            <p class="fst-italic text-end">score: {props.score}</p> 
        </div>
    )
}