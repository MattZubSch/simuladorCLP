import {teams} from "./teams";

//clase Partido (Determina los cruces y el resultado del mismo)
class Match {
    constructor(id, team1, team2, result) {
        this.id = id;
        this.team1 = team1;
        this.team2 = team2;
        this.result = result; 
    }

    updateTeams() {
        if (this.result === "V") {
            this.team1.points += 3;
            this.team1.matches += 1;
            this.team2.matches += 1;
            this.team1.goals += 1;
            this.team2.goals -= 1;
        } else if (this.result === "E") {
            this.team1.points += 1;
            this.team2.points += 1;
            this.team1.matches += 1;
            this.team2.matches += 1;
        } else {
            this.team2.points += 3;
            this.team1.matches += 1;
            this.team2.matches += 1;
            this.team2.goals += 1;
            this.team1.goals -= 1;
        }
    }

    changeResult(newResult) {
        this.result = newResult;
    }

    updateOriginalTeams() {
        if (this.result === "V") {
            this.team1.originalPoints += 3;
            this.team1.originalMatches += 1;
            this.team2.originalMatches += 1;
            this.team1.originalGoals += 1;
            this.team2.originalGoals -= 1;
        } else if (this.result === "E") {
            this.team1.originalPoints += 1;
            this.team2.originalPoints += 1;
            this.team1.originalMatches += 1;
            this.team2.originalMatches += 1;
        } else {
            this.team2.originalPoints += 3;
            this.team1.originalMatches += 1;
            this.team2.originalMatches += 1;
            this.team2.originalGoals += 1;
            this.team1.originalGoals -= 1;
        }
    }
}

const riv = teams[0];
const arg = teams[1];
const vel = teams[2];
const tal = teams[3];
const bar = teams[4];
const ind = teams[5];
const ins = teams[6];
const ros = teams[7];
const ban = teams[9];
const rie = teams[10];
const hur = teams[11];
const indR = teams[12];
const atlT = teams[13];


const match1 = new Match(1, hur, riv)
const match2 = new Match(2, ind, atlT)
const match3 = new Match(3, ins, arg)
const match4 = new Match(4, ros, bar)
const match5 = new Match(5, tal, vel)

const match6 = new Match(6, ban, ind)
const match7 = new Match(7, bar, ins)
const match8 = new Match(8, riv, ros)
const match9 = new Match(9, tal, indR)
const match10 = new Match(10, vel, arg)

const match11 = new Match(11, arg, bar)
const match12 = new Match(12, ind, tal)
const match13 = new Match(13, indR, vel)
const match14 = new Match(14, ins, riv)
const match15 = new Match(15, ros, rie)


const matches = [match1, match2, match3, match4, match5, match6, match7, match8, match9, match10, match11, match12, match13, match14, match15]

export default matches;