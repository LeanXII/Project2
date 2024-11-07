import React, { useState, useEffect } from 'react';

// cap values at 100
const capValueAt100 = (value, increase) => Math.min(value + increase, 100);


const getRandomEvent = () => {
  const events = [
    { type: 'item', message: 'You found a Potion! It has been added to your inventory.', item: 'Potion' },
    { type: 'wild_pokemon', message: 'A wild Rattata appeared!', battle_message: 'Do you want to fight or run?' },
    { type: 'berry', message: 'You found a Berry! It has been added to your inventory.', item: 'Berry' },
    { type: 'nothing', message: 'You continue your journey peacefully.' },
    { type: 'treasure', message: 'You found a hidden treasure! Your Pokémon gained 20 XP.', effect: { xp: 20 } },
    { type: 'trap', message: 'Oh no! You fell into a trap and lost some energy.', effect: { hunger: -10 } },
    { type: 'merchant', message: 'You met a merchant! He offers to trade XP for your items.', trade_message: 'Do you want to trade with the merchant?' },
    { type: 'cave', message: 'You found a mysterious cave. Do you want to explore it?', cave_message: 'The cave is dark and full of surprises!' },
    { type: 'river', message: 'A river blocks your path. Do you swim across or find another way around?', river_message: 'The current looks strong!' },
    { type: 'trainer', message: 'A wandering Pokémon Trainer challenges you to a battle!' }
  ];

  return events[Math.floor(Math.random() * events.length)];
};

const AdventureGame = ({ hunger, happiness, setHappiness, setHunger, closeModal }) => {
  const [stage, setStage] = useState(1);
  const [eventMessage, setEventMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [xp, setXP] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Save game state to localStorage
  const saveGameState = () => {
    const gameState = {
      stage,
      eventMessage,
      gameOver,
      xp,
      hunger,
      happiness,
      inventory,
      currentEvent
    };
    localStorage.setItem('adventureGameState', JSON.stringify(gameState));
  };

  // Load game state from localStorage
  const loadGameState = () => {
    const savedState = JSON.parse(localStorage.getItem('adventureGameState'));
    if (savedState) {
      setStage(savedState.stage);
      setEventMessage(savedState.eventMessage);
      setGameOver(savedState.gameOver);
      setXP(savedState.xp);
      setHunger(savedState.hunger);
      setHappiness(savedState.happiness);
      setInventory(savedState.inventory);
      setCurrentEvent(savedState.currentEvent);
    }
  };

  
  const clearSavedGame = () => {
    localStorage.removeItem('adventureGameState');
    setStage(1);
    setEventMessage('');
    setGameOver(false);
    setXP(0);
    setInventory([]);
    setCurrentEvent(null);
    setHappiness(100); 
    setHunger(100); 
  };

  // Check if the game is over (if hunger reaches 0)
  const checkGameOver = () => {
    if (hunger <= 0) {
      setGameOver(true);
      setEventMessage('Your Pokémon has run out of energy! Game Over.');
    }
  };

  
  const applyEventEffects = (event) => {
    if (event.effect) {
      if (event.effect.happiness) setHappiness(prev => capValueAt100(prev, event.effect.happiness));
      if (event.effect.hunger) setHunger(prev => capValueAt100(prev, event.effect.hunger));
      if (event.effect.xp) setXP(prevXP => prevXP + event.effect.xp);
    }
  };

  // Add item to inventory
  const addToInventory = (item) => {
    setInventory(prevInventory => [...prevInventory, item]);
  };

  
  const handleChoice = (choice) => {
    if (gameOver) return;

    switch (stage) {
      case 1: // Crossroad
        handleCrossroadChoice(choice);
        break;
      case 2: // Wild Pokémon Encounter
        handleWildPokemonChoice(choice);
        break;
      case 3: // Merchant trade
        handleMerchantChoice(choice);
        break;
      case 4: // Post-battle or event continuation
        handlePostEventChoice(choice);
        break;
      case 6: // Cave exploration
        handleCaveChoice();
        break;
      case 7: // River crossing
        handleRiverChoice();
        break;
      case 8: // Trainer battle
        handleTrainerChoice(choice);
        break;
      default:
        break;
    }
  };

  const handleCrossroadChoice = (choice) => {
    const randomEvent = getRandomEvent();
    setCurrentEvent(randomEvent);
    setEventMessage(randomEvent.message);

    if (['wild_pokemon', 'merchant', 'cave', 'river', 'trainer'].includes(randomEvent.type)) {
      setStage(2 + ['wild_pokemon', 'merchant', 'cave', 'river', 'trainer'].indexOf(randomEvent.type));
    } else {
      applyEventEffects(randomEvent);
      if (randomEvent.item) addToInventory(randomEvent.item);
      checkGameOver();
      setStage(4);
    }
  };

  const handleWildPokemonChoice = (choice) => {
    if (choice === 'fight') {
      if (Math.random() > 0.5) {
        setHappiness(prev => capValueAt100(prev, 20));
        setXP(prevXP => prevXP + 15);
        setEventMessage('You defeated the wild Pokémon and gained 20 Happiness!');
      } else {
        setHunger(prev => Math.max(prev - 10, 0));
        setEventMessage('The battle was tough! Your Pokémon lost some energy.');
      }
    }
    checkGameOver();
    setStage(4);
  };

  const handleMerchantChoice = (choice) => {
    if (choice === 'trade' && inventory.length > 0) {
      const tradedItem = inventory.pop();
      setXP(prevXP => prevXP + 20);
      setInventory([...inventory]);
      setEventMessage(`You traded a ${tradedItem} for 20 XP!`);
    } else if (choice === 'trade') {
      setEventMessage('You have no items to trade!');
    }
    checkGameOver();
    setStage(4); 
  };

  const handlePostEventChoice = (choice) => {
    setStage(4);
  };

  const handleCaveChoice = () => {
    setEventMessage(currentEvent.cave_message);
    checkGameOver();
    setStage(4);
  };

  const handleRiverChoice = () => {
    setEventMessage(currentEvent.river_message);
    checkGameOver();
    setStage(4);
  };

  const handleTrainerChoice = (choice) => {
    if (Math.random() > 0.5) {
      setHappiness(prev => capValueAt100(prev, 20));
      setXP(prevXP => prevXP + 25);
      setEventMessage('You defeated the wandering trainer and gained experience!');
    } else {
      setHunger(prev => Math.max(prev - 10, 0));
      setEventMessage('The trainer was tough! Your Pokémon lost some energy.');
    }
    checkGameOver();
    setStage(4);
  };

  useEffect(() => {
    loadGameState(); 
  }, []);

  const handleContinue = () => {
    if (stage === 4 || stage === 6 || stage === 7) {
      setStage(1); 
      
    }
  };

  return (
    <div>
      <h2>Adventure Game</h2>
      <p>Experience Points (XP): {xp}</p>
      <p>Inventory: {inventory.length > 0 ? inventory.join(', ') : 'No items in inventory'}</p>
      <p>{eventMessage}</p>
  
      {gameOver && (
        <div>
          <h3>Game Over! Thanks for playing!</h3>
          <button onClick={() => {
            clearSavedGame();  // Reset game state
            closeModal();  // Close modal if applicable
          }}>Try Again</button>
        </div>
      )}
  
      {!gameOver && (
        <>
          {stage === 1 && (
            <div>
              <p>You are standing at a crossroad. Do you go left or right?</p>
              <button onClick={() => handleChoice('left')}>Go Left</button>
              <button onClick={() => handleChoice('right')}>Go Right</button>
            </div>
          )}
  
          {stage === 2 && (
            <div>
              <p>A wild Pokémon appeared! Do you want to fight or run?</p>
              <button onClick={() => handleChoice('fight')}>Fight</button>
              <button onClick={() => handleChoice('run')}>Run Away</button>
            </div>
          )}
  
          {stage === 3 && (
            <div>
              <p>{currentEvent.trade_message}</p>
              <button onClick={() => handleChoice('trade')}>Trade</button>
              <button onClick={() => handleChoice('continue')}>Continue</button>
            </div>
          )}
  
          {/* Add Continue Button for events without further choices  */}
          {(stage === 4 || stage === 6 || stage === 7) && !gameOver && (
            <div>
              <button onClick={handleContinue}>Continue</button>
            </div>
          )}
  
        
          {stage === 5 && (
            <div>
              <p>Would you like to start a new adventure or end your journey?</p>
              <button onClick={() => clearSavedGame()}>Start New Adventure</button>
              <button onClick={closeModal}>End Adventure</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdventureGame;