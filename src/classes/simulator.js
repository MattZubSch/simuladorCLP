
import { Table } from "../classes/table";
import { teams, originalTeams } from "../classes/teams";

export default function SimularResultados(teamSelected, matchesSelected, matchesToProcess){
    console.log("#1")
    console.log("En simulador")
    console.log(matchesToProcess)

    //definir acumuladores
    console.log("#2")
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
            // console.log("Ha clasificado")
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
                default:
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
    function actualizarPartidosYEquipos(matchesToProcess, results, team, equipos) {
        for (let i = 0; i < matchesToProcess.length; i++) {
            matchesToProcess[i].changeResult(results[i]);
            matchesToProcess[i].updateTeams();
        }
        crearTabla(team);
        resetearEquipos(equipos);
    }

    console.log("#3")
    const resultadosPosibles = ["V", "E", "D"];
    const partidos = []; // Aquí almacenaremos los resultados de los partidos

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
  
    // llamar a la funcion para generar los resultados posibles. El primer parametro es el valor iterador inicial, y el segundo es el array donde se van a ir guardando los resultados
    console.log("#4")
    generarCombinaciones(0, [])
    const resultados = partidos;
    console.log("#5")

    //reiniciar los cambios de los equipos
    function resetTeamsToOriginal() {
        for (let i = 0; i < teams.length; i++) {
            teams[i] = originalTeams[i];
        }
    }


    //guardar referencia de los partidos con resultado seleccionado
    //Accion: actualizar los valores originales de cada equipo
    function updateSelectedMatches(matchesSelected) {
        resetTeamsToOriginal();
        matchesSelected.forEach(matchToUpdate => {
            console.log(matchToUpdate)
            matchToUpdate.partido.changeResult(matchToUpdate.seleccion);
            matchToUpdate.partido.updateTeams();
            matchToUpdate.partido.updateOriginalTeams();
        })
        // console.log("Partidos actualizados")
        // console.log(matchesSelected)
        // console.log("Partidos no actualizados")
        // console.log(matchesToProcess)
    }

    //calcular los promedios de las clasificaciones
    // function obtenerPromedio(numPromediar, numTotal) {
    //     let numeroOriginal = (numPromediar *100 ) / numTotal;
    //     let promedio = parseFloat(numeroOriginal.toFixed(2));
    //     return promedio;
    // }

    //comenzar la simulacion
    function iniciarSimulacion(team) {
        console.log("#7")
        console.log(team)
        console.log("ingreso")
        //iniciar la iteracion de resultados
        console.log("#8")
        console.log("Resultados a utilizar: " + resultados.length)
        for (let i = 0; i < resultados.length; i++) {
            actualizarPartidosYEquipos(matchesToProcess, resultados[i], team, teams);
        }
        console.log("#9")
        console.log("Simulacion finalizada")
        // console.log("Resultados posibles: " + partidos.length)
        // console.log("Clasificaciones" + accClasificaciones)
        // console.log("Primeros: " + accClPrimero)
        // console.log("Segundos: " + accClSegundo)
        // console.log("Terceros: " + accClTercero)
        // console.log("Cuartos: " + accClCuarto)
        // console.log("Clasifica por diferencia: " + accCLasificaPorDif)
    }


    //actualizar partidos seleccionados
    console.log("#6")
    updateSelectedMatches(matchesSelected, matchesToProcess);
    //iniciar simulacion
    iniciarSimulacion(teamSelected);

    return {escenarios: resultados.length, clasificaciones: accClasificaciones, primeros: accClPrimero, segundos: accClSegundo, terceros: accClTercero, cuartos: accClCuarto, clasificaPorDif: accCLasificaPorDif, team: teamSelected}
} 