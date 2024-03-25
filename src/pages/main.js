import React, {useState, useEffect} from 'react'
import matches from '../classes/matches'
import { relevantTeams } from '../classes/teams'
import MatchRender from '../components/MatchRender'



function TeamSelector({ opciones, onSelect }) {
  const [teamSelected, setTeamSelected] = useState("")


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

  console.log(seleccionTemporal)

  return (
    <div>
      {matches.map((match, index) => (
        <MatchRender key={index} match={match} onSelection={handleMatchSelection} onClearSelection={handleClearSelection} />
      ))}
    </div>
  );
}


export default function MainPage() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [seleccionTemporal, setSeleccionTemporal] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);
  
  useEffect(() => {
    handleStatus() // eslint-disable-next-line
  }, [selectedTeam, seleccionTemporal])


  function handleStatus(){
    // console.log("Condicion de Check")
    // console.log("Selected Team: " + selectedTeam)
    // console.log(!selectedTeam === "")
    // console.log("Seleccion Temporal: " + seleccionTemporal.length)
    // console.log(!seleccionTemporal.length === 0)
    if (selectedTeam !== "" && seleccionTemporal.length !== 0){
      console.log("Condicion Cumplida!")
      setCheckStatus(true)
    } else {
      console.log("Condicion NO Cumplida!")
      setCheckStatus(false)
    }
  }

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };
  
  function filterTeams(matchesSelected) {
    return matches.filter(obj1 => !matchesSelected.some(obj2 => obj1.id === obj2.partido.id));
  }

  function updateMatches (matchesSelected) {
    const matchesFiltered = filterTeams(matchesSelected) 
    
  }


  console.log(seleccionTemporal)

  return (
    <div>
        <TeamSelector opciones={relevantTeams} onSelect={handleTeamSelect} />
        {/* {selectedTeam && <SearchMatches team={selectedTeam} matches={matches} />} */}
        <div>
          {<Matches matches={matches} seleccionTemporal={seleccionTemporal} setSeleccionTemporal={setSeleccionTemporal}/>}
        </div>
        <button onClick={() => updateMatches(seleccionTemporal)} disabled={!checkStatus}>Actualizar</button>
    </div>
  )
}

