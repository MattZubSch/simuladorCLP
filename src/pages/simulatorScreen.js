import React, {useState, useEffect} from "react";
import matches from "../classes/matches";
import SimularResultados from "../classes/simulator";

function SimulatorScreen() {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(false);

    useEffect(() => {      
        function filterTeams(matchesSelected) {
            return matches.filter(obj1 => !matchesSelected.some(obj2 => obj1.id === obj2.partido.id));
        }
        
        
        const matchesSelected = [
            {partido: matches[2], seleccion: "V"},
            {partido: matches[6], seleccion: "D"},
            {partido: matches[13], seleccion: "V"}
        ]
        
        const teamSelected = "Instituto";
        
        const matchesToProcess = filterTeams(matchesSelected);

        setResults(SimularResultados(teamSelected, matchesSelected, matchesToProcess));
        setLoading(false);
    }, []);
    // console.log("En Screen")
    // console.log(matchesToProcess)  


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

