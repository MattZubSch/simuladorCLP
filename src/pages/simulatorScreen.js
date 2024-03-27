import React, {useState, useEffect, useContext} from "react";
// import { Match, matches } from "../classes/matches";
import SimularResultados from "../classes/simulator";
import { AppContext } from './appContext'
// import { useLocation } from 'react-router-dom';
import { teams } from "../classes/teams";
// import matches from "../classes/matches";

function SimulatorScreen() {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(false);
    // const [simulationCompleted, setSimulationCompleted] = useState(false);
    const { teamSelected, matchSelected, matchesToProcess } = useContext(AppContext);

    // const location = useLocation();
    // const teamsToSimulate = teams.map(obj => ({ ...obj }));


    // const matchesDuplicate = matchesToProcess.map(match => {
    //   const copyTeam1 = teamsToSimulate.find(team => team.name === match.team1.name);
    //   const copyTeam2 = teamsToSimulate.find(team => team.name === match.team2.name);
    //   return new Match(match.id, copyTeam1, copyTeam2, match.result);
    // }
    // );
    
      
      

    useEffect(() => {
        const fetchData = async () => {
          try {
            const simulationResults = await SimularResultados(teamSelected, matchSelected, matchesToProcess, teams);
            setResults(simulationResults);
            setLoading(false);
          } catch (error) {
            console.error('Error al simular resultados:', error);
            setLoading(false);
          }
        };
    
        fetchData(); // Llama a la función fetchData para iniciar la simulación
      }, [matchSelected, matchesToProcess, teamSelected]);// eslint-disable-next-line



    // {/*
    // useEffect(() => {      
    //     // Simular los resultados
    //     SimularResultados(teamSelected, matchSelected, matchesToProcess)
    //       .then((results) => {
    //         setResults(results);
    //         setSimulationCompleted(true);
    //       })
    //       .catch((error) => {
    //         console.error("Error al simular resultados:", error);
    //         setSimulationCompleted(true); // Manejar el error estableciendo la simulación como completada
    //       });
    //   }, []);
    
    //   // Redirigir a la página anterior si la simulación se ha completado
    //   useEffect(() => {
    //     if (simulationCompleted) {
    //       setLoading(false); // Ocultar el mensaje de carga
    //     }
    //   }, [simulationCompleted]);
      
    // */}

    // {/*
    // useEffect(() => {      
    //     setResults(SimularResultados(teamSelected, matchSelected, matchesToProcess));
    //     setLoading(false);
    // }, []);
    // */}


    if (loading) {
        return (
            <div>
                <h2>Simulacion en proceso...</h2>
            </div>
        )
    }

    return (
        <div>
            <h1>Simulador</h1>
            <h1>Equipo Seleccionado: {results.team}</h1>
            <h2>Resultados Analizados: {results.escenarios}</h2>
            <h2>Clasificaciones: {results.clasificaciones}</h2>
            <h2>Primeros: {results.primeros}</h2>
            <h2>Segundos: {results.segundos}</h2>
            <h2>Terceros: {results.terceros}</h2>
            <h2>Cuartos: {results.cuartos}</h2>
        </div>
    )
}

export default SimulatorScreen;

