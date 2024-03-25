import React, { useState } from 'react';


function MatchRender({match, onSelection, onClearSelection}) {
    const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onSelection(match.id, option);
  };

  const handleClearSelection = () => {
    // Borra el objeto del array en MatchRender
    setSelectedOption(null);
    // Borra el objeto del array en Matches
    onClearSelection(match.id);
  };
  

  return (
    <div className='matchContainer'>
        <div className='matchData'>
            <div className='teamData' id='team1'>
                <h2>{match.team1.name}</h2>
                <h4>{match.team1.points}Pts</h4>
            </div>
        </div>

        <div className='resultContainer'>
            <div className='radioInput'>
              <label className='labelDisplay'>
                <input
                  type="radio"
                  value="Victoria"
                  checked={selectedOption === 'Victoria'}
                  onChange={() => handleOptionChange('Victoria')}
                  className='inputDisplay'
                />
                V
              </label>
              <label className='labelDisplay'>
                <input
                  type="radio"
                  value="Empate"
                  checked={selectedOption === 'Empate'}
                  onChange={() => handleOptionChange('Empate')}
                  className='inputDisplay'
                />
                E
              </label>
              <label className='labelDisplay'>
                <input
                  type="radio"
                  value="Derrota"
                  checked={selectedOption === 'Derrota'}
                  onChange={() => handleOptionChange('Derrota')}
                  className='inputDisplay'
                />
                D
              </label>
            </div>
            <div className='cleanButton'>
                <button 
                onClick={handleClearSelection}
                >
                    Limpiar
                </button>
            </div>
        </div>
        
        <div className='matchData'>
            <div className='teamData' id='team1'>
                <h2>{match.team2.name}</h2>
                <h4>{match.team2.points}Pts</h4>
            </div>
        </div>
    </div>
  );
}

export default MatchRender;