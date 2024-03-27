// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Define el estado que deseas compartir
  const [teamSelected, setTeamSelected] = useState('');
  const [matchSelected, setMatchSelected] = useState([]);
  const [matchesToProcess, setMatchesToProcess] = useState([]);

  return (
    <AppContext.Provider
      value={{
        teamSelected,
        setTeamSelected,
        matchSelected,
        setMatchSelected,
        matchesToProcess,
        setMatchesToProcess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };