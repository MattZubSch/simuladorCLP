import React, {useState, useEffect, useContext} from 'react'
import matches from '../classes/matches'
import { relevantTeams } from '../classes/teams'
import MatchRender from '../components/MatchRender'

import { AppContext } from './appContext'
import { useNavigate } from 'react-router-dom';

function Matches({ matches, seleccionTemporal, setSeleccionTemporal }) {
  
  const handleMatchSelection = (partidoId, nuevaSeleccion) => {
    // Verificar si el partido ya está en el array temporal
    const partidoExistente = seleccionTemporal.find(seleccion => seleccion.partido.id === partidoId);
    // Si el partido existe, actualiza su selección
    if (partidoExistente) {
      setSeleccionTemporal(prevSeleccion =>
        prevSeleccion.map(seleccion =>
          seleccion.partido.id === partidoId ? { ...seleccion, seleccion: nuevaSeleccion } : seleccion
        )
      );
    } else {
      // Si el partido no existe, añade un nuevo objeto de selección al array temporal
      const partidoSeleccionado = matches.find(match => match.id === partidoId);
      setSeleccionTemporal(prevSeleccion => [...prevSeleccion, { partido: partidoSeleccionado, seleccion: nuevaSeleccion }]);
    }
  };

  const handleClearSelection = (partidoId) => {
    // Elimina el objeto del array temporal para el partido especificado
    setSeleccionTemporal(prevSeleccion => prevSeleccion.filter(seleccion => seleccion.partido.id !== partidoId));
  };

  // console.log(seleccionTemporal)

  return (
    <div>
      {matches.map((match, index) => (
        <MatchRender key={index} match={match} onSelection={handleMatchSelection} onClearSelection={handleClearSelection} />
      ))}
    </div>
  );
}


export default function MainPage() {
  const [checkStatus, setCheckStatus] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  const [itInitialRender, setItInitialRender] = useState(true);

  const [simulate, setSimulate] = useState(false);

  const { teamSelected, setTeamSelected, matchSelected, setMatchSelected, matchesToProcess, setMatchesToProcess } = useContext(AppContext);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (itInitialRender) {
      // console.log("Reiniciando valores...")
      // console.log(teams)
      setItInitialRender(false);
      setTeamSelected("");
      setMatchSelected([]);
      setMatchesToProcess([]);
      // console.log("Valores reiniciados!")
      // console.log(teams)
      // console.log("Equipos originales: ")
      // console.log(originalTeams)
    }
  }, [itInitialRender]);
    

  useEffect(() => {
    handleStatus() // eslint-disable-next-line
  }, [teamSelected, matchSelected])

function TeamSelector({ opciones, onSelect }) {

  const handleSeleccion = (e) => {
    const selectedTeam = e.target.value;
    setTeamSelected(selectedTeam);
    onSelect(selectedTeam);
  };

  return (
    <div>
      <h2>Selecciona un equipo:</h2>
      <select value={teamSelected} onChange={handleSeleccion}>
        <option value="">Seleccionar...</option>
        {opciones.map((opcion, index) => (
          <option key={index} value={opcion.name}>
            {opcion.name}
          </option>
        ))}
      </select>
    </div>
  );
}






  function handleStatus(){
    if (teamSelected !== "" && matchSelected.length !== 0){
      console.log("Condicion Cumplida!")
      setCheckStatus(true)
    } else {
      // console.log("Condicion NO Cumplida!")
      setCheckStatus(false)
    }
  }

  const handleTeamSelect = (team) => {
    setTeamSelected(team);
  };
  
  function filterTeams(matchesSelected) {
    const matchesFiltered = matches.filter(obj1 => !matchesSelected.some(obj2 => obj1.id === obj2.partido.id));
    return matchesFiltered
  }

  function showProps(teamSelect, matchToChange, matchesToSimulate) {
    // console.log("Equipo Seleccionado: ")
    // console.log(teamSelect)
    // console.log("Partidos Seleccionados: ")
    // console.log(matchToChange)
    // console.log("Partidos a Simular: ")
    // console.log(matchesToSimulate)
  }

  // function handleConfirm() {
  //   // setShowAlert(false); // Oculta la alerta
  //   updateMatches(matchSelected);
  // }

  function updateMatches (matchesSelected) {
    // console.log("Matches Seleccionados: ")
    // console.log(matchesSelected)
    const matchesToFilter = filterTeams(matchesSelected)
    // console.log("Matches a Filtrar: ")
    // console.log(matchesToFilter)
    setMatchesToProcess(matchesToFilter)
    // console.log("Matches Filtrados: ")
    // console.log(matchesToProcess)
    setSimulate(true)

  }

  useEffect(() => {
    if (checkStatus) {
      showProps(teamSelected, matchSelected, matchesToProcess);
    }
  }, [matchesToProcess]);

  useEffect(() => {
    if (simulate) {
      navigate('/simulator')
    }
  }, [simulate]);
  // console.log("Seleccion Temporal: ")
  // console.log(matchSelected)

  return (
    <div>
      {simulate ? (
        <div>
          <h2>Simulación en proceso...</h2>
        </div>
      ) : (
        <div>
          <TeamSelector opciones={relevantTeams} onSelect={handleTeamSelect} />
          <div>
            <Matches matches={matches} seleccionTemporal={matchSelected} setSeleccionTemporal={setMatchSelected} />
          </div>
          <div>
            <button onClick={() => updateMatches(matchSelected)} disabled={!checkStatus}>
              Actualizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

