// import { Team, RiverPlate, Velez, Talleres, BarracasCentral, Argentinos, Independiente, Instituto, RosarioCentral, Gimnasia, Banfield, Riestra, Huracan, IndRivadavia, AtlTucuman } from './teams';

class Team {
    constructor(name, abrev, points, matches, goals) {
        this.name = name;
        this.abrev = abrev;
        this.points = points;
        this.matches = matches;
        this.goals = goals;
    }
}

const gimnasia = new Team("Gimnasia", "GIM", 16, 14, -4);
const banfield = new Team("Banfield", "BAN", 13, 13, -2);
const riestra = new Team("Riestra", "RIE", 13, 13, -7);
const huracan = new Team("Huracan", "HUR", 11, 13, -5);
const indR = new Team("Ind. Rivadavia", "CSI", 8, 12, -10);
const atlTucuman = new Team("Atl. Tucuman", "ATU", 8, 13, -12);
const riverPlate = new Team("River Plate", "RIV", 22, 12, 14);
const vel = new Team("Velez", "VEL", 21, 11, 1);
const tal = new Team("Talleres", "TAL", 19, 11, 7);
const bar = new Team("Barracas Central", "BAR", 20, 12, 3);
const arg = new Team("Argentinos", "ARG", 18, 11, 6);
const ind = new Team("Independiente", "IND", 18, 11, 3);
const ins = new Team("Instituto", "INS", 22, 14, 6);
const ros = new Team("Rosario Central", "ROS", 14, 10, -3);



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
// tabla.sortTeams();


// // Mostrar tabla de posiciones
// console.log("Tabla de Posiciones:");
// tabla.equipos.forEach((equipo, index) => {
//     console.log(`${index + 1}. ${equipo.name} - Puntos: ${equipo.points}, PJ: ${equipo.matches}, DIF: ${equipo.goals}`);
// });

console.log(tabla.equipos)

let nombreBuscado = "Instituto";

const indice = tabla.equipos.findIndex(equipo => equipo.name === nombreBuscado);
console.log("El equipo buscado se encuentra en la posicion " + (indice + 1) + " de " + tabla.equipos.length + " equipos.");


// const gimnasia = new Gimnasia("Gimnasia", "GIM", 16, 14, -4);
// const banfield = new Banfield("Banfield", "BAN", 13, 13, -2);
// const riestra = new Riestra("Riestra", "RIE", 13, 13, -7);
// const huracan = new Huracan("Huracan", "HUR", 11, 13, -5);
// const indRivadavia = new IndRivadavia("Ind. Rivadavia", "CSI", 8, 12, -10);
// const atlTucuman = new AtlTucuman("Atl. Tucuman", "ATU", 8, 13, -12);
// const riverPlate = new RiverPlate("River Plate", "RIV", 21, 11, 14);
// const velez = new Velez("Velez", "VEL", 21, 11, 1);
// const talleres = new Talleres("Talleres", "TAL", 19, 11, 7);
// const barracasCentral = new BarracasCentral("Barracas Central", "BAR", 19, 11, 3);
// const argentinos = new Argentinos("Argentinos", "ARG", 18, 10, 7);
// const independiente = new Independiente("Independiente", "IND", 18, 11, 3);
// const instituto = new Instituto("Instituto", "INS", 17, 11, 5);
// const rosarioCentral = new RosarioCentral("Rosario Central", "ROS", 14, 10, -3);


//8.21s

// const indice = tabla.findIndex(teams => teams.name === equipo);
//     if (indice < 4) {
//         if (tabla[indice].points === tabla[4].points) {
//             return {retorno: true, posicion: indice + 1, igualdadPts: true};
//         } else {
//             return {retorno: true, posicion: indice + 1, igualdadPts: false};
//         }
//     } else if (tabla[indice].points === tabla[3].points) {
//         return {retorno: true, posicion: indice + 1, igualdadPts: true};
//     }
//     return {retorno: false, posicion: -1, igualdadPts: false};


// Ahora, puedes llamar a la función `actualizarPartidosYEquipos` con diferentes arrays de resultados para actualizar los partidos y equipos según los nuevos resultados, y luego restablecer los equipos a sus parámetros originales.

// Ejemplo de uso:

// actualizarPartidosYEquipos(matches, ["V", "D", "E", "V", "D", "V", "E", "V", "E", "D", "V", "D", "E", "V", "D"], [gimnasia, banfield, riestra, huracan, indRivadavia, atlTucuman, riverPlate, velez, talleres, barracasCentral, argentinos, independiente, instituto, rosarioCentral]);



// for (let i = 0; i < matches.length; i++) {
//     matches[i].changeResult(results[i])
//     matches[i].updateTeams()
// }

// const tabla = new Table();
//     tabla.agregarEquipo(gimnasia);
//     tabla.agregarEquipo(banfield);
//     tabla.agregarEquipo(riestra);
//     tabla.agregarEquipo(huracan);
//     tabla.agregarEquipo(indRivadavia);
//     tabla.agregarEquipo(atlTucuman);
//     tabla.agregarEquipo(riverPlate);
//     tabla.agregarEquipo(velez);
//     tabla.agregarEquipo(talleres);
//     tabla.agregarEquipo(barracasCentral);
//     tabla.agregarEquipo(argentinos);
//     tabla.agregarEquipo(independiente);
//     tabla.agregarEquipo(instituto);
//     tabla.agregarEquipo(rosarioCentral);
    
//     console.log(tabla)
//     tabla.sortTeams();
    
    
//     // Mostrar tabla de posiciones
//     console.log("Tabla de Posiciones original:");
//     tabla.equipos.forEach((equipo, index) => {
//         console.log(`${index + 1}. ${equipo.name} - Puntos: ${equipo.points}, PJ: ${equipo.matches}, DIF: ${equipo.goals}`);
//     });