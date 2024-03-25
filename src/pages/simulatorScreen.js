import React, {useState, useEffect} from "react";
import { Table } from "../classes/table";
import matches from "../classes/matches";
import { teams } from "../classes/teams";
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
    
    {/*
    
    console.log("Matches to process: ", matchesToProcess.length)
    matchesToProcess.forEach(match => {
        console.log(match)  
    })
    
    
console.log("Matches selected: ", matchesSelected.length)
matchesSelected.forEach(match => {
    console.log("Partido: " + match.partido.team1.name + " vs " + match.partido.team2.name + "\nResultado: " + match.seleccion)
})

console.log("Team selected: ", teamSelected)
*/}
    


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

{/*
    //estado de generacion de datos
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const resultadosPosibles = ["V", "E", "D"];
    const partidos = []; // Aquí almacenaremos los resultados de los partidos
    const searchTeam = "Instituto";


    useEffect(() => {
            function generarCombinaciones(partidoActual, resultadosPartidos) {
                if (partidoActual === matchesToProcess.length) {
                    partidos.push([...resultadosPartidos]);
                } else {
                    for (let i = 0; i < resultadosPosibles.length; i++) {
                        resultadosPartidos[partidoActual] = resultadosPosibles[i];
                        generarCombinaciones(partidoActual + 1, resultadosPartidos);
                    }
                }
            }
            if (partidos.length !== 0) {
                partidos.length = 0
            }
            generarCombinaciones(0, []);
            console.log("finished");
            console.log(partidos.length)
            setIsInitialRender(false); // Cambia la bandera después de la ejecución inicial
            iniciarSimulacion(searchTeam);
    }, []);



    const selectedMatches = [
        {partido: matches[2], seleccion: "V"},
        {partido: matches[6], seleccion: "D"},
        {partido: matches[13], seleccion: "V"}
    ]

    //definir acumuladores
    let accClasificaciones = 0;
    let accClPrimero = 0;
    let accClSegundo = 0;
    let accClTercero = 0;
    let accClCuarto = 0;
    let accCLasificaPorDif = 0; 
    
    //funcion para determinar la posicion en la tabla
    function estaEnLosPrimerosCuatro(equipo, tabla) {
        const indice = tabla.findIndex(teams => teams.name === equipo);
        if (indice < 4) {
            if (tabla[indice].points === tabla[4].points) {
                return {clasif: true, posicion: indice + 1, igualdadPts: true};
            } else {
                return {clasif: true, posicion: indice + 1, igualdadPts: false};
            }
        } else if (tabla[indice].points === tabla[3].points) {
            return {clasif: true, posicion: indice + 1, igualdadPts: true};
        }
        return {clasif: false, posicion: -1, igualdadPts: false};
    }
    
    //definir tabla
    function crearTabla(team) {  
        const tabla = new Table();
        for (let i = 0; i < teams.length; i++) {
            tabla.agregarEquipo(teams[i]);
        }
    
        //ordenar tabla
        tabla.sortTeams();
    
        //recuperar posicion en la tabla (team = equipo buscado)
        const estado = estaEnLosPrimerosCuatro(team, tabla.equipos);
        //evaluar posicion
        if (estado.clasif) {
            accClasificaciones++;
            switch (estado.posicion) {
                case 1:
                    accClPrimero += 1;
                    break;
                case 2:
                    accClSegundo += 1;
                    break;
                case 3:
                    accClTercero += 1;
                    break;
                case 4:
                    accClCuarto += 1;
                    break;
            }
            if (estado.igualdadPts) {
                accCLasificaPorDif++;
            }
        }
    }

    //resetear estados
    function resetearEquipos(equipos) {
        equipos.forEach(equipo => {
            equipo.points = equipo.originalPoints;
            equipo.matches = equipo.originalMatches;
            equipo.goals = equipo.originalGoals;
        });
    }

    //actualizar tabla (simulacion de partidos)
    function actualizarPartidosYEquipos(matches, results, team, equipos) {
        for (let i = 0; i < matches.length; i++) {
            matches[i].changeResult(results[i]);
            matches[i].updateTeams();
        }
        crearTabla(team);
        resetearEquipos(equipos);
    }

    //equipo buscado (luego se pasara por props)

    //filtrar los partidos no seleccionados
    function filterTeams(matchesSelected) {
        return matches.filter(obj1 => !matchesSelected.some(obj2 => obj1.id === obj2.partido.id));
      }

    //guardar referencia de los partidos con resultado seleccionado
    //Accion: actualizar los valores originales de cada equipo
    function updateSelectedMatches(matches, selected) {
        selected.forEach(matchToUpdate => {
            matches.find(match => match.id === matchToUpdate.partido.id).changeResult(matchToUpdate.seleccion);
        })
        const filteredMatches = filterTeams(selected);
        // console.log(filteredMatches)

        return filteredMatches;
    }


    // llamar a la funcion para generar los resultados posibles. El primer parametro es el valor iterador inicial, y el segundo es el array donde se van a ir guardando los resultados
    generarCombinaciones(0, [])
    console.log("resultados terminados")
    //evaluar eliminar este nombre de variable
    

    // const resultados = partidos; //modifico referencia para que sea mas facil de entender
    // console.log("Resultados a utilizar: " + resultados.length)

    //calcular los promedios de las clasificaciones
    function obtenerPromedio(numPromediar, numTotal) {
        let numeroOriginal = (numPromediar *100 ) / numTotal;
        let promedio = parseFloat(numeroOriginal.toFixed(2));
        return promedio;
    }

    //comenzar la simulacion
    function iniciarSimulacion(team) {
        //definir acumuladores
        accClasificaciones = 0;
        accClPrimero = 0;
        accClSegundo = 0;
        accClTercero = 0;
        accClCuarto = 0;
        accCLasificaPorDif = 0;
        console.log("ingreso")
        //iniciar la iteracion de resultados
        for (let i = 0; i < partidos.length; i++) {
            actualizarPartidosYEquipos(matches, partidos[i], team, teams);
            // iteraciones += 1;
            // console.log("Iteracion " + iteraciones + " de " + resultados.length + " completada")
        }
        setLoading(false);
        console.log("Simulacion finalizada")
        console.log("Resultados posibles: " + partidos.length)
        console.log("Clasificaciones" + accClasificaciones)
        console.log("Primeros: " + accClPrimero)
        console.log("Segundos: " + accClSegundo)
        console.log("Terceros: " + accClTercero)
        console.log("Cuartos: " + accClCuarto)
        console.log("Clasifica por diferencia: " + accCLasificaPorDif)
    }

    const matchesToProcess = updateSelectedMatches(matches, selectedMatches);
    // console.log(matchesToProcess.length)
    // llamar a la funcion para generar los resultados posibles. El primer parametro es el valor iterador inicial, y el segundo es el array donde se van a ir guardando los resultados
    // generarCombinaciones(0, [])

*/}