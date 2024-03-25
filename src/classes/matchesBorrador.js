// import { Table, RiverPlate, Velez, Talleres, BarracasCentral, Argentinos, Independiente, Instituto, RosarioCentral, Banfield, Gimnasia, Riestra, Huracan, IndRivadavia, AtlTucuman } from './table.js';


//Marcar el tiempo de inicio
const tiempoInicio = performance.now();



//clase Equipo (con informacion para ubicarlos en la tabla y para visualizarlos)
class Team {
    constructor(name, abrev, points, matches, goals) {
        this.name = name;
        this.abrev = abrev;
        this.points = points;
        this.matches = matches;
        this.goals = goals;

        // Guardar copia de los valores originales
        this.originalPoints = points;
        this.originalMatches = matches;
        this.originalGoals = goals;
    }
}


//clase Tabla (genera y ordena la tabla de posiciones)
class Table {
    constructor(equipos = []) {
        this.equipos = equipos
    }

    agregarEquipo(equipo) {
        this.equipos.push(equipo);
    }

    // Función de comparación para ordenar equipos
    compareTeams(a, b) {
        // Comparar por puntos
        if (a.points !== b.points) {
            return b.points - a.points; // Orden descendente por puntos
        }
        
        // En caso de empate en puntos, comparar por goles
        if (a.goals !== b.goals) {
            return b.goals - a.goals; // Orden descendente por goles
        }
        
        // En caso de empate en puntos y goles, ordenar alfabéticamente por nombre
        return a.name.localeCompare(b.name);
    }
 
    // Ordenar equipos
    sortTeams() {
        this.equipos.sort(this.compareTeams);
    }

}

//clase Partido (Determina los cruces y el resultado del mismo)
class Match {
    constructor(team1, team2, result) {
        this.team1 = team1;
        this.team2 = team2;
        this.result = result; 
    }

    updateTeams() {
        if (this.result === "V") {
            this.team1.points += 3;
            this.team1.originalMatches += 1;
            this.team2.originalMatches += 1;
            this.team1.originalGoals += 1;
            this.team2.originalGoals -= 1;
        } else if (this.result === "E") {
            this.team1.points += 1;
            this.team2.points += 1;
            this.team1.originalMatches += 1;
            this.team2.originalMatches += 1;
        } else {
            this.team2.points += 3;
            this.team1.originalMatches += 1;
            this.team2.originalMatches += 1;
            this.team2.originalGoals += 1;
            this.team1.originalGoals -= 1;
        }
    }

    changeResult(newResult) {
        this.result = newResult;
    }

    updateOriginalTeams() {
        if (this.result === "V") {
            this.team1.originalPoints += 3;
            this.team1.matches += 1;
            this.team2.matches += 1;
            this.team1.goals += 1;
            this.team2.goals -= 1;
        } else if (this.result === "E") {
            this.team1.originalPoints += 1;
            this.team2.originalPoints += 1;
            this.team1.matches += 1;
            this.team2.matches += 1;
        } else {
            this.team2.originalPoints += 3;
            this.team1.matches += 1;
            this.team2.matches += 1;
            this.team2.goals += 1;
            this.team1.goals -= 1;
        }
    }
}

const riverPlate = new Team("River Plate", "RIV", 21, 11, 14);
const argentinos = new Team("Argentinos", "ARG", 21, 11, 10);
const velez = new Team("Velez", "VEL", 21, 11, 1);
const talleres = new Team("Talleres", "TAL", 19, 11, 7);
const barracasCentral = new Team("Barracas Central", "BAR", 19, 11, 3);
const independiente = new Team("Independiente", "IND", 18, 11, 3);
const instituto = new Team("Instituto", "INS", 17, 11, 5);
const rosarioCentral = new Team("Rosario Central", "ROS", 14, 11, -6);
const gimnasia = new Team("Gimnasia", "GIM", 16, 14, -4);
const banfield = new Team("Banfield", "BAN", 13, 13, -2);
const riestra = new Team("Riestra", "RIE", 13, 13, -7);
const huracan = new Team("Huracan", "HUR", 11, 13, -5);
const indRivadavia = new Team("Ind. Rivadavia", "CSI", 8, 12, -10);
const atlTucuman = new Team("Atl. Tucuman", "ATU", 8, 13, -12);



const match1 = new Match(huracan, riverPlate)
const match2 = new Match(ind, atlTucuman)
const match3 = new Match(ins, arg)
const match4 = new Match(ros, bar)
const match5 = new Match(tal, vel)

const match6 = new Match(banfield, ind)
const match7 = new Match(bar, ins)
const match8 = new Match(riverPlate, ros)
const match9 = new Match(tal, indR)
const match10 = new Match(vel, arg)

const match11 = new Match(arg, bar)
const match12 = new Match(ind, tal)
const match13 = new Match(indR, vel)
const match14 = new Match(ins, riverPlate)
const match15 = new Match(ros, riestra)

const matches = [match1, match2, match3, match4, match5, match6, match7, match8, match9, match10, match11, match12, match13, match14, match15]

//corte de archivo. Pasarlo a otro archivo para mantener la modularidad

//definir acumuladores
let accClasificaciones = 0;
let accClPrimero = 0;
let accClSegundo = 0;
let accClTercero = 0;
let accClCuarto = 0;
let accCLasificaPorDif = 0;

//buscar equipo entre los clasificados
function estaEnLosPrimerosCuatro(equipo, tabla) {
    const indice = tabla.findIndex(teams => teams.name === equipo);
    if (indice < 4) {
        if (tabla[indice].points === tabla[4].points) {
            return {retorno: true, posicion: indice + 1, igualdadPts: true};
        } else {
            return {retorno: true, posicion: indice + 1, igualdadPts: false};
        }
    } else if (tabla[indice].points === tabla[3].points) {
        return {retorno: true, posicion: indice + 1, igualdadPts: true};
    }
    return {retorno: false, posicion: -1, igualdadPts: false};
}

function crearTabla(team) {
    // console.log("Creando tabla de posiciones simuladas...")
    const tabla = new Table();
    tabla.agregarEquipo(gimnasia);
    tabla.agregarEquipo(banfield);
    tabla.agregarEquipo(riestra);
    tabla.agregarEquipo(huracan);
    tabla.agregarEquipo(indR);
    tabla.agregarEquipo(atlTucuman);
    tabla.agregarEquipo(riverPlate);
    tabla.agregarEquipo(vel);
    tabla.agregarEquipo(tal);
    tabla.agregarEquipo(bar);
    tabla.agregarEquipo(arg);
    tabla.agregarEquipo(ind);
    tabla.agregarEquipo(ins);
    tabla.agregarEquipo(ros);
    
    // console.log(tabla)
    tabla.sortTeams();
    
    const equipoBuscado = team;
    const estado = estaEnLosPrimerosCuatro(equipoBuscado, tabla.equipos);
    if (estado.retorno) {
        accClasificaciones += 1;
        if (estado.igualdadPts) {
            accCLasificaPorDif += 1;
        }
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
    } 
}

function resetearEquipos(equipos) {
    equipos.forEach(equipo => {
        equipo.points = equipo.originalPoints;
        equipo.matches = equipo.originalMatches;
        equipo.goals = equipo.originalGoals;
    });
}

// Luego, puedes modificar la función `actualizarPartidosYEquipos` para que, después de actualizar los partidos y los equipos, llame a la función `resetearEquipos` para restablecer los equipos a sus parámetros originales.
function actualizarPartidosYEquipos(matches, results, team, equipos) {
    for (let i = 0; i < matches.length; i++) {
        matches[i].changeResult(results[i]);
        matches[i].updateTeams();
    }
    crearTabla(team);
    resetearEquipos(equipos);
}


// Suponiendo que 'equipoBuscado' es el nombre del equipo que deseas buscar
const equipoBuscado = 'Instituto';

// Filtrar los partidos en los que participa el equipo buscado
const partidosDelEquipo = matches.filter(match => {
    return match.team1.name === equipoBuscado || match.team2.name === equipoBuscado;
});

partidosDelEquipo.forEach(partido => {
    partido.changeResult("V");
    partido.updateOriginalTeams();
});

const indicesAEliminar = [];
matches.forEach((match, index) => {
    if (match.team1.name === equipoBuscado || match.team2.name === equipoBuscado) {
        indicesAEliminar.push(index);
    }
});

// Eliminar los elementos filtrados del array original
for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
    matches.splice(indicesAEliminar[i], 1);
}




const resultadosPosibles = ["V", "E", "D"];
const partidos = []; // Aquí almacenaremos los resultados de los partidos

function generarCombinaciones(partidoActual, resultadosPartidos) {
    if (partidoActual === matches.length) {
      partidos.push([...resultadosPartidos]);
    } else {
      for (let i = 0; i < resultadosPosibles.length; i++) {
        resultadosPartidos[partidoActual] = resultadosPosibles[i];
        generarCombinaciones(partidoActual + 1, resultadosPartidos);
      }
    }
  }
  
  // llamar a la funcion para generar los resultados posibles. El primer parametro es el valor iterador inicial, y el segundo es el array donde se van a ir guardando los resultados
generarCombinaciones(0, [])
const resultados = partidos;


function obtenerPromedio(numPromediar, numTotal) {
    let numeroOriginal = (numPromediar *100 ) / numTotal;
    let promedio = parseFloat(numeroOriginal.toFixed(2));
    return promedio;
}

let iteraciones = 0;

function iniciarSimulacion(team) {
    //iniciar la iteracion de resultados
    for (let i = 0; i < resultados.length; i++) {
        actualizarPartidosYEquipos(matches, resultados[i], team, [gimnasia, banfield, riestra, huracan, indR, atlTucuman, riverPlate, vel, tal, bar, arg, ind, ins, ros]);
        // iteraciones += 1;
        // console.log("Iteracion " + iteraciones + " de " + resultados.length + " completada")
    }

    console.log("\n========PROBABILIDAD DE CLASIFICAR========");
    console.log("------------------" + obtenerPromedio(accClasificaciones, resultados.length) + "%------------------");
    console.log(accClasificaciones + " clasificaciones de " + resultados.length + " resultados posibles");
    console.log("=".repeat(42));
    console.log("Primer Puesto: " + accClPrimero + " veces (" + obtenerPromedio(accClPrimero, accClasificaciones) + "%)(" + obtenerPromedio(accClPrimero, resultados.length) + "% del total)");
    console.log("Segundo Puesto: " + accClSegundo + " veces (" + obtenerPromedio(accClSegundo, accClasificaciones) + "%)(" + obtenerPromedio(accClSegundo, resultados.length) + "% del total)");
    console.log("Tercer Puesto: " + accClTercero + " veces (" + obtenerPromedio(accClTercero, accClasificaciones) +"%)(" + obtenerPromedio(accClTercero, resultados.length) + "% del total)");
    console.log("Cuarto Puesto: " + accClCuarto + " veces (" + obtenerPromedio(accClCuarto, accClasificaciones) + "%)(" + obtenerPromedio(accClCuarto, resultados.length) + "% del total)");
    console.log("Clasificaciones por Diferencia de Gol: " + accCLasificaPorDif + " veces (" + obtenerPromedio(accCLasificaPorDif, accClasificaciones) + "%)(" + obtenerPromedio(accCLasificaPorDif, resultados.length) + "% del total)");

}

// matches.forEach(partido => {
//     console.log(partido.team1.name + " vs " + partido.team2.name);
// });
// console.log("Cantidad de partidos: " + matches.length);



// Ahora 'partidosDelEquipo' contendrá un array con los partidos en los que participa el equipo buscado
// console.log(partidosDelEquipo);


iniciarSimulacion("Instituto")


// Marcar el tiempo de finalización
const tiempoFin = performance.now();

// Calcular la duración en milisegundos
const milisegundos = tiempoFin - tiempoInicio;
const segundos = milisegundos / 1000;
const duracion = parseFloat(segundos.toFixed(2));

console.log(`La acción tomó ${duracion} segundos en ejecutarse(${duracion / 60} minutos).`);

  