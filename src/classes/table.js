//clase Tabla (genera y ordena la tabla de posiciones)
export class Table {
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

    createTable(teams) {
        const tabla = new Table();
        teams.forEach((equipo) => {
            tabla.agregarEquipo(equipo);
        });
        tabla.sortTeams();
        return tabla;
    }
}

