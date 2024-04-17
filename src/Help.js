import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
//import './Help.css'; // Assuming your CSS file is named Help.css

const Help = () => {
  return (
    <div className="main">  {/* Semantic class for main container */}
      <h1 className="guide-title">How to Play Blackjack</h1> {/* Semantic class for title */}
      <p className="guide-intro">
        Blackjack is a classic casino card game where you aim to get a hand closer to 21 than the dealer without going over. Here's a breakdown of the gameplay:
      </p>

      <h2>Basics</h2>
      <ul className="basics-list">  {/* Class for unordered list */}
        <li>Number cards (2-10) are worth their face value.</li>
        <li>Face cards (Jack, Queen, King) are worth 10.</li>
        <li>Ace can be worth 1 or 11, depending on your advantage.</li>
      </ul>

      <h2>Gameplay</h2>
      <ol className="gameplay-list">  {/* Class for ordered list */}
        <li>You and the dealer each receive two cards face-up.</li>
        <li>Based on your cards and the dealer's exposed card, you can:</li>
        <ul className="action-list">  {/* Class for nested unordered list */}
          <li>**Hit:** Request another card to get closer to 21.</li>
          <li>**Stand:** Keep your current hand and hope it's higher than the dealer's.</li>
        </ul>
        <li>The dealer must hit until their hand reaches 17 or higher.</li>
        <li>You win if your hand is closer to 21 than the dealer's without going over (busting).</li>
        <li>You lose if the dealer's hand is closer to 21 or you bust.</li>
        <li>If both hands have the same value, it's a push (tie) and your bet is returned.</li>
      </ol>

      <Accordion >
        <Accordion.Item>
          <Accordion.Header><h4>Tips</h4></Accordion.Header>
          <Accordion.Body>
            <h2>Card Values and Strategy</h2>
            <p className="guide-intro">
              Understanding basic blackjack strategy can significantly improve your odds of winning. This section delves deeper into card values and decision-making based on your hand and the dealer's up card (consult a blackjack strategy chart for more detailed guidance):
            </p>
            <ul className="strategy-list">  {/* Class for unordered list */}
              <li>**Always hit on 8 or lower.**</li>
              <li>**Stand on 17 or higher.**</li>
            </ul>

            <h2>House Edge and Responsible Gambling</h2>
            <p className="guide-intro">
              Blackjack has a house edge (the casino's advantage), but skillful play can minimize it. Remember to gamble responsibly and set spending limits.
            </p>

            <h2>Additional Tips</h2>
            <ul className="tips-list">  {/* Class for unordered list */}
              <li>Learn basic blackjack terminology (e.g., hit, stand, bust, blackjack).</li>
              <li>Practice with a free blackjack game before playing for real money.</li>
              <li>Set realistic goals and manage your bankroll effectively.</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p className="guide-conclusion">
        This guide provides a foundation for playing blackjack. Remember, practice, strategy, and responsible gambling are key to success. Have fun!
      </p>
    </div>
  );
};

export default Help;