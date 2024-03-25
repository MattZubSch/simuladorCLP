//clase Equipo (con informacion para ubicarlos en la tabla y para visualizarlos)
export class Team {
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

const orig_riverPlate = riverPlate;
const orig_argentinos = argentinos;
const orig_velez = velez;
const orig_talleres = talleres;
const orig_barracasCentral = barracasCentral;
const orig_independiente = independiente;
const orig_instituto = instituto;
const orig_rosarioCentral = rosarioCentral;
const orig_gimnasia = gimnasia;
const orig_banfield = banfield;
const orig_riestra = riestra;
const orig_huracan = huracan;
const orig_indRivadavia = indRivadavia;
const orig_atlTucuman = atlTucuman;


export const teams = [riverPlate, argentinos, velez, talleres, barracasCentral, independiente, instituto, rosarioCentral, gimnasia, banfield, riestra, huracan, indRivadavia, atlTucuman];
export const relevantTeams = [riverPlate, argentinos, velez, talleres, barracasCentral, independiente, instituto, rosarioCentral]
export const originalTeams = [orig_riverPlate, orig_argentinos, orig_velez, orig_talleres, orig_barracasCentral, orig_independiente, orig_instituto, orig_rosarioCentral, orig_gimnasia, orig_banfield, orig_riestra, orig_huracan, orig_indRivadavia, orig_atlTucuman];
