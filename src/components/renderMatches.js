import React, { useState } from 'react';
import matches from '../classes/matches';

function RenderMatch() {
  const [resultados, setResultados] = useState([]);

  const handleUpdateSelection = (partidoId, resultado) => {
    // Verificar si ya existe un resultado para el partido seleccionado
    const matchSelected = resultados.find(item => item.partidoId === partidoId);
    if (matchSelected) {
      // Si ya existe, actualizar el resultado
      setResultados(prevResultados =>
        prevResultados.map(item =>
          item.partidoId === partidoId ? { ...item, resultado } : item
        )
      );
    } else {
      // Si no existe, agregar un nuevo resultado
      setResultados(prevResultados => [...prevResultados, { partidoId, resultado }]);
    }

  } 
  

  return (
    <div>
      
      {/* Agrega más botones y partidos según sea necesario */}
      <h2>Resultados seleccionados:</h2>
      <ul>
        {matches.map((item, index) => (
          <li key={index}>
            {item.team1.name} vs {item.team2.name}
      <button onClick={() => handleUpdateSelection(1, 'local')}>Gana local</button>
      <button onClick={() => handleUpdateSelection(1, 'visitante')}>Gana visitante</button>
      <button onClick={() => handleUpdateSelection(1, 'empate')}>Empate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RenderMatch;